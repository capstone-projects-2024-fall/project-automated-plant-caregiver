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

// Initialize Instances of Sensors
LightSensor lightsensor;
SoilMoistureSensor soilSensor(0x36);
TemperatureHumiditySensor tempHumidSensor;

// Pin Definitions
#define I2C_SDA 21
#define I2C_SCL 22
#define LED_PIN 19
#define WATER_PUMP_PIN 5

// LED && BRIGHTNESS settings
#define NUM_LEDS 120
bool FastLEDInitialized = false;
CRGB leds[NUM_LEDS];
int BRIGHTNESS = 5;
const int BRIGHTNESS_STEP = 5;
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

// NTP Server settings
const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = -18000;  // UTC-5 (Eastern Standard Time)
const int daylightOffset_sec = 3600; // US observes DST (adds 1 hour)

// API endpoint URL
const char* apiUrl = "https://zxk89h80gg.execute-api.us-east-1.amazonaws.com/dev/data";

// WebServer instance
WebServer server(80);

// Sensor targets
int soilSensorTarget = 1000;
int lightSensorTarget = 100;

// Error number for sensor readings
const int errorNumber = -999;

// Function to connect to WiFi
void connectToWiFi() {
    if (WiFi.status() != WL_CONNECTED) {
        Serial.printf("Connecting to %s ", ssid);
        WiFi.begin(ssid, password);
        while (WiFi.status() != WL_CONNECTED) {
            delay(500);
            Serial.print(".");
        }
        Serial.println("CONNECTED");
        Serial.println("IP Address: " + WiFi.localIP().toString());
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
        StaticJsonDocument<200> doc;
        DeserializationError error = deserializeJson(doc, body);

        if (error) {
            server.send(400, "application/json", "{\"message\":\"Invalid JSON\"}");
            return;
        }

        if (doc.containsKey("soilMoistureTarget")) {
            soilSensorTarget = doc["soilMoistureTarget"];
        }

        if (doc.containsKey("lightTarget")) {
            lightSensorTarget = doc["lightSensorTarget"];
        }

        server.send(200, "application/json", "{\"message\":\"Sensor Targets updated\"}");
    } else {
        server.send(400, "application/json", "{\"message\":\"No JSON body found\"}");
    }
}

// Function to initialize sensors
void initializeSensors() {
    while (!lightsensor.initialize()) {
        delay(1000);
    }
    while (!soilSensor.initialize()) {
        delay(1000);
    }
    while (!tempHumidSensor.initialize()) {
        delay(1000);
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

// Get the current time
std::string getCurrentTime() {
    struct tm timeinfo;
    if (!getLocalTime(&timeinfo)) {
        Serial.println("Failed to obtain time");
        return "Failed to obtain time";
    }
    char buffer[80];
    strftime(buffer, 80, "%Y-%m-%d %H:%M:%S", &timeinfo);
    return std::string(buffer);
}

// Setup function
void setup() {
    // Initialize Serial at 115200 baud rate
    Serial.begin(115200);

    // Initialize I2C communication
    Wire.begin(I2C_SDA, I2C_SCL);

    // Connect to WiFi
    connectToWiFi();

    // Init and get the time
    configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

    // Initialize sensors
    initializeSensors();

    // Initialize FastLED
    FastLED.addLeds<WS2812B, LED_PIN, GRB>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);
    fill_solid(leds, NUM_LEDS, CRGB::Blue);
    updateLEDBrightness(BRIGHTNESS); // Set brightness to 5 (range is 0-255)
    FastLEDInitialized = true;
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
        Serial.println("Current Time: " + String(getCurrentTime().c_str()));
    }
    // Adjust light to target range
    adjustLight(lightsensordata.lux, getLightSensorTargetRange(lightSensorTarget));

    // Adjust soil moisture to target range
    adjustSoilMoisture(soilmoisturedata.moisture, getSoilMoistureSensorTargetRange(soilSensorTarget));

    // Create JSON payload
    String jsonPayload = "{\"lux\": " + String(lightsensordata.lux) 
    + ", \"soil_moisture\": " + String(soilmoisturedata.moisture) 
    + ", \"temperature\": " + String(tempHumidData.temperature) 
    + ", \"humidity\": " + String(tempHumidData.humidity) 
    + ", \"timestamp\": \"" + String(getCurrentTime().c_str()) + "\"}";
    // Send the POST request
    if (sendPostRequest(jsonPayload)) {
        Serial.println("Data sent successfully");
        Serial.println("Data: " + jsonPayload);
    } else {
        Serial.println("Failed to send data");
    }
    Serial.println("------------------------------------------------------------");
    delay(1000);
}
