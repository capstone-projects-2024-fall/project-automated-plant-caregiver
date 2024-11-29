#include <Arduino.h>
#include <Wire.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <time.h>
#include <FastLED.h>
// Header files for sensors
#include "Sensor.h"
#include "LightSensor.h"
#include "SoilMoistureSensor.h"
#include "TemperatureHumiditySensor.h"
// Initalize Instances of Sensors
LightSensor lightsensor;
SoilMoistureSensor soilSensor(0x36);
TemperatureHumiditySensor tempHumidSensor;
// Define the LED strip 
#define LED_PIN 5
#define NUM_LEDS 120
#define BRIGHTNESS 5
CRGB leds[NUM_LEDS];
// Water pump settings
#define WATER_PUMP_PIN 23
#define SOIL_MOISTURE_THRESHOLD 1000
// Water pump debounce settings
const unsigned long pumpOnTime = 500; // Pump on time in milliseconds (0.5 seconds)
const unsigned long debounceIntervalPump = 5000; // Minimum time between pump toggles (5 seconds)
unsigned long lastPumpToggleTime = 0; // Last time the pump was toggled
// Light sensor settings
#define LIGHT_THRESHOLD 0
// Light debounce settings
const unsigned long debounceIntervalLight = 5000; // Minimum time between light toggles (5 seconds)
unsigned long lastLightToggleTime = 0; // Last time the light was toggled
// WiFi credentials
const char* ssid = "Nokia G310";
const char *password = "17328912";
// NTP Server settings
const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = -18000;  // UTC-5 (Eastern Standard Time)
const int daylightOffset_sec = 3600; // US observes DST (adds 1 hour)
// Your API endpoint URL --TO BE ADDED--
// Get the current time
std::string getCurrentTime() {
    struct tm timeinfo;
    if(!getLocalTime(&timeinfo)){
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
    // Connect to WiFi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println(" CONNECTED");
    // Initialize and get the time
    configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
    // Initialize sensors
    lightsensor.initialize();
    soilSensor.initialize();
    tempHumidSensor.initialize();
    // Initialize FastLED
    FastLED.addLeds<WS2812B, LED_PIN, GRB>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);
    FastLED.setBrightness(BRIGHTNESS);  // Set brightness to 5 (range is 0-255)
    // Initialize water pump pin
    pinMode(WATER_PUMP_PIN, OUTPUT);
    digitalWrite(WATER_PUMP_PIN, LOW); // Ensure pump is off initially
}
// Loop function
void loop() {
    // Read Sensors and display values
    SensorData lightsensordata = lightsensor.readData();
    Serial.println("Lux: " + String(lightsensordata.lux));
    SensorData soilmoisturedata = soilSensor.readData();
    Serial.println("Soil Moisture: " + String(soilmoisturedata.moisture));
    SensorData tempHumidData = tempHumidSensor.readData();
    Serial.println("Temperature: " + String(tempHumidData.temperature) + "°C");
    Serial.println("Humidity: " + String(tempHumidData.humidity) + "%");
    // Check soil moisture and water the plant if necessary
    if (soilmoisturedata.moisture > SOIL_MOISTURE_THRESHOLD) {
        unsigned long currentMillis = millis();
        if (currentMillis - lastPumpToggleTime >= debounceIntervalPump) {
            lastPumpToggleTime = currentMillis;
            digitalWrite(WATER_PUMP_PIN, HIGH);
            delay(pumpOnTime);
            digitalWrite(WATER_PUMP_PIN, LOW);
        } 
    } else {
        digitalWrite(WATER_PUMP_PIN, LOW);
    }
    // Check light levels and turn on the light if necessary
    if (lightsensordata.lux = LIGHT_THRESHOLD) {
        unsigned long currentMillis = millis();
        if (currentMillis - lastLightToggleTime >= debounceIntervalLight) {
            lastLightToggleTime = currentMillis;
            fill_solid(leds, NUM_LEDS, CRGB::Blue);
            FastLED.show();
        }
    } else {
        fill_solid(leds, NUM_LEDS, CRGB::Black);
        FastLED.show();
    }
    delay(1000);
}
