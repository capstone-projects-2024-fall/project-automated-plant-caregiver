#include <Arduino.h>
#include <Wire.h>
#include <WiFi.h>
#include <WebServer.h>
#include <ArduinoJson.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include <time.h>
#include <FastLED.h>
#include <algorithm>

// Header files for sensors
#include "Sensor.h"
#include "LightSensor.h"
#include "SoilMoistureSensor.h"
#include "TemperatureHumiditySensor.h"

// Initialize Instances of Sensors with I2C addresses
LightSensor lightsensor(0x23); // Address for BH1750
SoilMoistureSensor soilSensor(0x36); // Address for Soil Moisture Sensor
TemperatureHumiditySensor tempHumidSensor; // Address for AM2320

// Pin Definitions
#define I2C_SDA 21
#define I2C_SCL 22
#define LED_PIN 5
#define WATER_PUMP_PIN 4

// LED && BRIGHTNESS settings
#define NUM_LEDS 120
bool FastLEDInitialized = false;
CRGB leds[NUM_LEDS];
int BRIGHTNESS = 5;
const int BRIGHTNESS_STEP = 25;
const int MAX_BRIGHTNESS = 255;
const int MIN_BRIGHTNESS = 0;
const unsigned long debounceIntervalLight = 5000; // Minimum time between light toggles (5 seconds)
unsigned long lastLightToggleTime = 0; // Last time the light was toggled

// Water pump settings
const unsigned long pumpOnTime = 500; // Pump on time in milliseconds (0.5 seconds)
const unsigned long debounceIntervalPump = 5000; // Minimum time between pump toggles (5 seconds)
unsigned long lastPumpToggleTime = 0; // Last time the pump was toggled

// WiFi credentials
const char* ssid = "Nokia G310";
const char* password = "17328912";

// API endpoint URL
const char* apiUrl = "https://so7bglvkza.execute-api.us-east-1.amazonaws.com/dev/sensorDataV2";

// WebServer instance
WebServer server(80);

// Sensor targets
int soilSensorTarget = 200;
int lightSensorTarget = 200;

// Error number for sensor readings
const int errorNumber = -999;

// Function to connect to WiFi
void connectToWiFi() {
    unsigned long startAttemptTime = millis();

    if (WiFi.status() != WL_CONNECTED) {
        Serial.printf("Connecting to %s ", ssid);
        WiFi.begin(ssid, password);

        // Wait for connection with a timeout of 5 seconds
        while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 5000) {
            delay(500);
            Serial.print(".");
        }

        if (WiFi.status() == WL_CONNECTED) {
            Serial.println(" CONNECTED");
            Serial.println("IP Address: " + WiFi.localIP().toString());
        } else {
            Serial.println("Failed to connect to WiFi. Restarting...");
            ESP.restart();
        }
    } else {
        return;
    }
}

// Function to send json data to the API endpoint
bool sendPostRequest(String jsonPayload) {
    HTTPClient http;
    http.begin(apiUrl);
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST(jsonPayload);
    if (httpResponseCode > 0) {
        String response = http.getString();
        Serial.println("HTTP Response code: " + String(httpResponseCode));
        Serial.println("Response: " + response);
        http.end();
        return true;
    } else {
        Serial.println("Error on sending POST: " + http.errorToString(httpResponseCode));
        http.end();
        return false;
    }
}

// Function to handle updating sensor targets
void handleUpdateTarget() {
    if (server.hasArg("plain")) {
        String body = server.arg("plain");
        DynamicJsonDocument doc(200);
        DeserializationError error = deserializeJson(doc, body);

        if (error) {
            server.send(400, "application/json", "{\"message\":\"Invalid JSON\"}");
            return;
        }

        if (doc.containsKey("soilMoistureTarget")) {
            soilSensorTarget = doc["soilMoistureTarget"];
        }

        if (doc.containsKey("lightSensorTarget")) {
            lightSensorTarget = doc["lightSensorTarget"];
        }

        server.send(200, "application/json", "{\"message\":\"Sensor Targets updated\"}");
    } else {
        server.send(400, "application/json", "{\"message\":\"No JSON body found\"}");
    }
}

// Function to initialize sensors
void initializeSensors() {
    unsigned long startAttemptTime = millis();
    unsigned long currentAttemptTime;

    // Initialize Light Sensor
    while (!lightsensor.initialize()) {
        Serial.println("Retrying to initialize Light Sensor (2s)");
        delay(2000);
        currentAttemptTime = millis();
        if (currentAttemptTime - startAttemptTime > 10000) {
            Serial.println("Retried 5 times, restarting...");
            ESP.restart();
        }
    }

    // Reset startAttemptTime for the next sensor
    startAttemptTime = millis();

    // Initialize Soil Moisture Sensor
    while (!soilSensor.initialize()) {
        Serial.println("Retrying to initialize Soil Moisture Sensor (2s)");
        delay(2000);
        currentAttemptTime = millis();
        if (currentAttemptTime - startAttemptTime > 10000) {
            Serial.println("Retried 5 times, restarting...");
            ESP.restart();
        }
    }

    // Reset startAttemptTime for the next sensor
    startAttemptTime = millis();

    // Initialize Temperature & Humidity Sensor
    while (!tempHumidSensor.initialize()) {
        Serial.println("Retrying to initialize Temperature & Humidity Sensor (2s)");
        delay(2000);
        currentAttemptTime = millis();
        if (currentAttemptTime - startAttemptTime > 10000) {
            Serial.println("Retried 5 times, restarting...");
            ESP.restart();
        }
    }
}

// Function to update LED brightness
bool updateLEDBrightness(int brightness) {
    bool limited = false;

    if (brightness < MIN_BRIGHTNESS) {
        brightness = MIN_BRIGHTNESS;
        limited = true;
    }
    if (brightness > MAX_BRIGHTNESS) {
        brightness = MAX_BRIGHTNESS;
        limited = true;
    }

    if (limited) {
        Serial.println("Brightness value was confined to Range");
    }

    // Check if FastLED is initialized (assuming a global flag or similar mechanism)
    if (!FastLEDInitialized) {
        Serial.println("Error: FastLED not initialized.");
        return false;
    }

    FastLED.setBrightness(brightness);
    BRIGHTNESS = brightness;
    FastLED.show();
    Serial.println("Brightness updated to: " + String(brightness));
    return true;
}

// Adjust light settings based on light sensor readings
void adjustLight(int lightSensorReading, int* TargetRange) {
    if (lightSensorReading >= TargetRange[0] && lightSensorReading <= TargetRange[1]) {
        return;
    }
    bool success;
    if (lightSensorReading < TargetRange[0]) {
        success = updateLEDBrightness(BRIGHTNESS + BRIGHTNESS_STEP);
    } else if (lightSensorReading > TargetRange[1]) {
        success = updateLEDBrightness(BRIGHTNESS - BRIGHTNESS_STEP);
    }
    if (!success) {
        Serial.println("Failed to update LED brightness");
    }
}

// Function to get the light sensor target range
int* getLightSensorTargetRange(int lightSensorTarget) {
    static int range[2];
    const int rangeOffset = 100; // Adjust this value as needed
    range[0] = std::max(0, lightSensorTarget - rangeOffset);
    range[1] = std::min(65535, lightSensorTarget + rangeOffset);
    return range;
}

// Turn the water pump on with debounce
void turnOnWaterPump() {
    unsigned long currentMillis = millis();
    if (currentMillis - lastPumpToggleTime >= debounceIntervalPump) {
        digitalWrite(WATER_PUMP_PIN, HIGH);
        delay(pumpOnTime);
        digitalWrite(WATER_PUMP_PIN, LOW);
        lastPumpToggleTime = currentMillis;
        Serial.println("Water Pump Gave Some Water");
    }
}

// Adjust Soil Moisture based on Soil Moisture readings
void adjustSoilMoisture(int soilMoistureReading, int* TargetRange) {
    if (soilMoistureReading >= TargetRange[0] && soilMoistureReading <= TargetRange[1]) {
        return;
    }
    if (soilMoistureReading < TargetRange[0]) {
        turnOnWaterPump();
    }
}

// Function to get the soil moisture sensor target range
int* getSoilMoistureSensorTargetRange(int soilSensorTarget) {
    static int range[2];
    const int rangeOffset = 100; // Adjust this value as needed
    range[0] = std::max(0, soilSensorTarget - rangeOffset);
    range[1] = std::min(3000, soilSensorTarget + rangeOffset);
    return range;
}

// Set light sensor target to 0
bool LightSensorSetTo0() {
    lightSensorTarget = 0;
    return true;
}

bool turnOffLED() {
    if (updateLEDBrightness(0)) {
        return true;
    };
    return false;
}

bool turnOnLED() {
    if (updateLEDBrightness(50)) {
        return true;
    };
    return false;
}

void LightSensorTest() {
    if (lightSensorTarget == lightsensor.readData().lux) {
        turnOnLED();
    } else {
        turnOffLED();
    }
}

void WaterPumpTest() {
    if (soilSensor.readData().moisture >= 1000) {
        turnOnWaterPump();
    }
}

// Setup Static IP
void setupStaticIP() {
    IPAddress local_IP(192, 168, 114, 184); // Change to your desired static IP
    IPAddress gateway(192, 168, 114, 226);  // Gateway IP address
    IPAddress subnet(255, 255, 255, 0);     // Subnet mask
    IPAddress primaryDNS(8, 8, 8, 8);       // Primary DNS server
    IPAddress secondaryDNS(8, 8, 4, 4);     // Secondary DNS server (optional)
    if (!WiFi.config(local_IP, gateway, subnet, primaryDNS, secondaryDNS)) {
        Serial.println("STA Failed to configure");
    }
}

// Setup function
void setup() {
    // Initialize Serial at 115200 baud rate
    Serial.begin(115200);

    // Initialize I2C communication
    Wire.begin(I2C_SDA, I2C_SCL);

    // Setup static IP
    setupStaticIP();

    // Connect to WiFi
    connectToWiFi();

    // Initialize sensors
    initializeSensors();

    // Initialize FastLED
    FastLED.addLeds<WS2812B, LED_PIN, GRB>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);
    fill_solid(leds, NUM_LEDS, CRGB::Blue);
    FastLEDInitialized = true;
    updateLEDBrightness(BRIGHTNESS); // Set brightness to 5 (range is 0-255)
    // Initialize water pump pin
    pinMode(WATER_PUMP_PIN, OUTPUT);
    digitalWrite(WATER_PUMP_PIN, LOW); // Ensure pump is off initially
    // Setup the server
    server.on("/updateTargets", HTTP_POST, handleUpdateTarget);
    server.begin();
    Serial.println("Server started");
}

// Loop function
void loop() {
    // Handle server requests
    server.handleClient();
    // Reconnect to WiFi if disconnected
    connectToWiFi();
    // Read Sensors and display values
    SensorData lightsensordata = lightsensor.readData();
    SensorData soilmoisturedata = soilSensor.readData();
    SensorData tempHumidData = tempHumidSensor.readData();
    // Validate Sensor Data
    if (lightsensordata.lux == errorNumber || soilmoisturedata.moisture == errorNumber
        || tempHumidData.temperature == errorNumber || tempHumidData.humidity == errorNumber) {
        Serial.println("Invalid sensor readings, reinitializing sensors...");
        initializeSensors();
        return;
    } else {
        Serial.println("Lux: " + String(lightsensordata.lux));
        Serial.println("Soil Moisture: " + String(soilmoisturedata.moisture));
        Serial.println("Temperature: " + String(tempHumidData.temperature) + "°C");
        Serial.println("Humidity: " + String(tempHumidData.humidity) + "%");
        Serial.println("Current Targets - Soil Moisture: " + String(soilSensorTarget) + ", Light: " + String(lightSensorTarget));
    }
    // Adjust light to target range
    adjustLight(lightsensordata.lux, getLightSensorTargetRange(lightSensorTarget));

    // Adjust soil moisture to target range
    adjustSoilMoisture(soilmoisturedata.moisture, getSoilMoistureSensorTargetRange(soilSensorTarget));

    // // Test Light Sensor
    // LightSensorSetTo0();
    // LightSensorTest();
    // // Test Water Pump
    // WaterPumpTest();

    // Create JSON payload
    String jsonPayload = "{\"lux\": " + String(lightsensordata.lux) 
    + ", \"soil_moisture\": " + String(soilmoisturedata.moisture) 
    + ", \"temp\": " + String(tempHumidData.temperature) + "}";

    // Send data to API endpoint
    if (sendPostRequest(jsonPayload)) {
        Serial.println("Data sent successfully");
        Serial.println("Data: " + jsonPayload);
    } else {
        Serial.println("Failed to send data");
    }
    // Separator between each loop for better readability
    Serial.println("------------------------------------------------------------");
    // Delay for 1 second
    delay(1000);
}
