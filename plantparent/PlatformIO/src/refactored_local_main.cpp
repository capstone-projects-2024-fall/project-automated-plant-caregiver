// #include <Arduino.h>
// #include <Wire.h>
// #include <WiFi.h>
// #include <WiFiClientSecure.h>
// #include <HTTPClient.h>
// #include <time.h>
// #include <FastLED.h>
// // Header files for sensors
// #include "Sensor.h"
// #include "LightSensor.h"
// #include "SoilMoistureSensor.h"
// #include "TemperatureHumiditySensor.h"

// // Initialize Instances of Sensors
// LightSensor lightsensor;
// SoilMoistureSensor soilSensor(0x36);
// TemperatureHumiditySensor tempHumidSensor;

// // I2C pins
// #define I2C_SDA 21
// #define I2C_SCL 22

// // Define the LED strip
// #define LED_PIN 19
// #define NUM_LEDS 120
// #define BRIGHTNESS 5
// CRGB leds[NUM_LEDS];

// // Water pump settings
// #define WATER_PUMP_PIN 5
// #define SOIL_MOISTURE_THRESHOLD 1000

// // Water pump debounce settings
// const unsigned long pumpOnTime = 500; // Pump on time in milliseconds (0.5 seconds)
// const unsigned long debounceIntervalPump = 5000; // Minimum time between pump toggles (5 seconds)
// unsigned long lastPumpToggleTime = 0; // Last time the pump was toggled

// // Light sensor settings
// #define LIGHT_THRESHOLD 0
// const unsigned long debounceIntervalLight = 5000; // Minimum time between light toggles (5 seconds)
// unsigned long lastLightToggleTime = 0; // Last time the light was toggled

// // WiFi credentials
// const char* ssid = "Nokia G310";
// const char* password = "17328912";

// // NTP Server settings
// const char* ntpServer = "pool.ntp.org";
// const long gmtOffset_sec = -18000;  // UTC-5 (Eastern Standard Time)
// const int daylightOffset_sec = 3600; // US observes DST (adds 1 hour)


// // Get the current time
// std::string getCurrentTime() {
//     struct tm timeinfo;
//     if (!getLocalTime(&timeinfo)) {
//         Serial.println("Failed to obtain time");
//         return "Failed to obtain time";
//     }
//     char buffer[80];
//     strftime(buffer, 80, "%Y-%m-%d %H:%M:%S", &timeinfo);
//     return std::string(buffer);
// }

// // Function to connect to WiFi
// void connectToWiFi() {
//     Serial.printf("Connecting to %s ", ssid);
//     WiFi.begin(ssid, password);
//     while (WiFi.status() != WL_CONNECTED) {
//         delay(500);
//         Serial.print(".");
//     }
//     Serial.println(" CONNECTED");
// }

// // Function to initialize sensors
// void initializeSensors() {
//     while (!lightsensor.initialize()) {
//         Serial.println("Failed to initialize Light Sensor");
//         delay(1000);
//         initializeSensors();
//     }
//     while (!soilSensor.initialize()) {
//         Serial.println("Failed to initialize Soil Moisture Sensor");
//         delay(1000);
//         initializeSensors();
//     }
//     while (!tempHumidSensor.initialize()) {
//         Serial.println("Failed to initialize Temperature and Humidity Sensor");
//         delay(1000);
//         initializeSensors();
//     }
// }

// // Setup function
// void setup() {
//     // Initialize Serial at 115200 baud rate
//     Serial.begin(115200);

//     // Initialize I2C communication
//     Wire.begin(I2C_SDA, I2C_SCL);

//     // Connect to WiFi
//     connectToWiFi();

//     // Init and get the time
//     configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

//     // Initialize sensors
//     initializeSensors();

//     // Initialize FastLED
//     FastLED.addLeds<WS2812B, LED_PIN, GRB>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);
//     FastLED.setBrightness(BRIGHTNESS);  // Set brightness to 5 (range is 0-255)

//     // Initialize water pump pin
//     pinMode(WATER_PUMP_PIN, OUTPUT);
//     digitalWrite(WATER_PUMP_PIN, LOW); // Ensure pump is off initially
// }

// // Loop function
// void loop() {
//     // Check if WiFi is connected
//     if (WiFi.status() != WL_CONNECTED) {
//         Serial.println("WiFi disconnected, attempting to reconnect...");
//         connectToWiFi();
//         // Reinitialize sensors after reconnecting
//         initializeSensors();
//     }

//     // Read Sensors and display values
//     SensorData lightsensordata = lightsensor.readData();
//     SensorData soilmoisturedata = soilSensor.readData();
//     SensorData tempHumidData = tempHumidSensor.readData();

//     // Check if sensor readings are valid, if not, reinitialize sensors
//     if (lightsensordata.lux < 0 || soilmoisturedata.moisture < 0) {
//         Serial.println("Invalid sensor readings, reinitializing sensors...");
//         initializeSensors();
//     } else {
//         Serial.println("Lux: " + String(lightsensordata.lux));
//         Serial.println("Soil Moisture: " + String(soilmoisturedata.moisture));
//         Serial.println("Temperature: " + String(tempHumidData.temperature) + "°C");
//         Serial.println("Humidity: " + String(tempHumidData.humidity) + "%");
//         Serial.println(("Current Time: " + getCurrentTime()).c_str());
//     }

//     // Check soil moisture and water the plant if necessary
//     if (soilmoisturedata.moisture > SOIL_MOISTURE_THRESHOLD) {
//         unsigned long currentMillis = millis();
//         if (currentMillis - lastPumpToggleTime >= debounceIntervalPump) {
//             lastPumpToggleTime = currentMillis;
//             digitalWrite(WATER_PUMP_PIN, HIGH);
//             delay(pumpOnTime);
//             digitalWrite(WATER_PUMP_PIN, LOW);
//         } 
//     } else {
//         digitalWrite(WATER_PUMP_PIN, LOW);
//     }
//     // Check light levels and turn on the light if necessary
//     if (lightsensordata.lux == LIGHT_THRESHOLD) {
//         unsigned long currentMillis = millis();
//         if (currentMillis - lastLightToggleTime >= debounceIntervalLight) {
//             lastLightToggleTime = currentMillis;
//             fill_solid(leds, NUM_LEDS, CRGB::Blue);
//             FastLED.show();
//         }
//     } else {
//         fill_solid(leds, NUM_LEDS, CRGB::Black);
//         FastLED.show();
//     }
//     Serial.println("-----------------------------");
//     delay(1000);
// }
