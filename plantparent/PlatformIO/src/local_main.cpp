#include <Arduino.h>
#include <Wire.h>
#include <BH1750.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <time.h>
#include <Adafruit_seesaw.h>
#include <Adafruit_AM2320.h>

// WiFi credentials
const char* ssid = "Nokia G310";
const char* password = "17328912";

// NTP Server settings
const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = -18000;  // UTC-5 (Eastern Standard Time)
const int daylightOffset_sec = 3600; // US observes DST (adds 1 hour)

// I2C pins
#define I2C_SDA 21
#define I2C_SCL 22

// Create an instance of the BH1750 sensor
BH1750 lightsensor(0x23);
Adafruit_seesaw soilSensor;
Adafruit_AM2320 am2320;

// Function to read current time
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

void setup() {
    // Initialize Serial at 115200 baud rate
    Serial.begin(115200);
    
    // Initialize I2C
    Wire.begin(I2C_SDA, I2C_SCL);

    // Connect to WiFi
    Serial.printf("Connecting to %s ", ssid);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println(" CONNECTED");

    // Init and get the time
    configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

    // Initialize BH1750
    if (lightsensor.begin(BH1750::CONTINUOUS_HIGH_RES_MODE)) {
        Serial.println("BH1750 Enabled");
    } else {
        Serial.println("BH1750 Error");
    }

    // Initialize Soil Moisture Sensor
    if (!soilSensor.begin(0x36)) {
        Serial.println("Soil Moisture Sensor not found!");
    } else {
        Serial.println("Soil Moisture Sensor Enabled");
    }
    //Initialize AM2320
    if (!am2320.begin()) {
        Serial.println("AM2320 not found!");
    } else {
        Serial.println("AM2320 Enabled");
    }
}

void loop() {
    // Read and display light level
    float lux = lightsensor.readLightLevel();
    if (lux >= 0) {
        Serial.print("Light Level (lux): ");
        Serial.println(lux);
    } else {
        Serial.println("Error reading BH1750");
    }

    // Read and display soil moisture level
    uint16_t soil_moisture = soilSensor.touchRead(0);
    if (soil_moisture == 65535) {
        Serial.println("Error reading Soil Moisture Sensor");
    } else {
        Serial.print("Soil Moisture Level: ");
        Serial.println(soil_moisture);
    }
    // Read and display temperature and humidity
    float temperature = am2320.readTemperature();
    float humidity = am2320.readHumidity();
    if (isnan(temperature) || isnan(humidity)) {
        Serial.println("Failed to read data from AM2320 sensor");
    } else {
        Serial.print("Temperature: ");
        Serial.print(temperature);
        Serial.print("°C, Humidity: ");
        Serial.print(humidity);
        Serial.println("%");
    }
    
    // Display current time
    Serial.println(getCurrentTime().c_str());
    // Space between readings
    Serial.println("--------------------");
    // Delay between readings
    delay(5000);
}