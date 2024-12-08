// #include <Arduino.h>
// #include <Wire.h>
// #include <BH1750.h>
// #include <WiFi.h>
// #include <WiFiClientSecure.h>
// #include <time.h>
// #include <Adafruit_seesaw.h>
// #include <Adafruit_AM2320.h>
// #include <FastLED.h>

// // WiFi credentials
// const char* ssid = "Nokia G310";
// const char* password = "17328912";

// // NTP Server settings
// const char* ntpServer = "pool.ntp.org";
// const long gmtOffset_sec = -18000;  // UTC-5 (Eastern Standard Time)
// const int daylightOffset_sec = 3600; // US observes DST (adds 1 hour)

// // I2C pins
// #define I2C_SDA 21
// #define I2C_SCL 22

// // Create instances
// BH1750 lightsensor(0x23);
// Adafruit_seesaw soilSensor;
// Adafruit_AM2320 am2320;

// // WS2812B LED settings
// #define LED_PIN 5
// #define NUM_LEDS 120
// #define BRIGHTNESS 5
// CRGB leds[NUM_LEDS];

// // Water pump settings
// #define WATER_PUMP_PIN 4
// #define SOIL_MOISTURE_THRESHOLD 1000

// // Water pump debounce settings
// const unsigned long pumpOnTime = 500; // Pump on time in milliseconds (0.5 seconds)
// const unsigned long debounceInterval = 5000; // Minimum time between pump toggles (5 seconds)
// unsigned long lastPumpToggleTime = 0; // Last time the pump was toggled

// //Light sensor settings
// #define LIGHT_THRESHOLD 0

// // Function to read current time
// std::string getCurrentTime() {
//     struct tm timeinfo;
//     if(!getLocalTime(&timeinfo)){
//         Serial.println("Failed to obtain time");
//         return "Failed to obtain time";
//     }
//     char buffer[80];
//     strftime(buffer, 80, "%Y-%m-%d %H:%M:%S", &timeinfo);
//     return std::string(buffer);
// }

// // Initialize BH1750
// void initializeBH1750() {
//     Serial.println("Initializing BH1750");
//     if (lightsensor.begin(BH1750::CONTINUOUS_LOW_RES_MODE)) {
//         Serial.println("BH1750 Enabled");
//     } else {
//         Serial.println("BH1750 Error");
        
//         Serial.println("Restarting...");
//         delay(3000);
//         ESP.restart();
//     }
// }

// void setup() {
//     // Initialize Serial at 115200 baud rate
//     Serial.begin(115200);
    
//     // Initialize I2C
//     Wire.begin(I2C_SDA, I2C_SCL);

//     // Connect to WiFi
//     Serial.printf("Connecting to %s ", ssid);
//     WiFi.begin(ssid, password);
//     while (WiFi.status() != WL_CONNECTED) {
//         delay(500);
//         Serial.print(".");
//     }
//     Serial.println(" CONNECTED");

//     // Init and get the time
//     configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

//     // Initialize BH1750
//     initializeBH1750();

//     // Initialize Soil Moisture Sensor
//     if (!soilSensor.begin(0x36)) {
//         Serial.println("Soil Moisture Sensor not found!");
//     } else {
//         Serial.println("Soil Moisture Sensor Enabled");
//     }
//     //Initialize AM2320
//     if (!am2320.begin()) {
//         Serial.println("AM2320 not found!");
//     } else {
//         Serial.println("AM2320 Enabled");
//     }

//     // Initialize FastLED
//     FastLED.addLeds<WS2812B, LED_PIN, GRB>(leds, NUM_LEDS).setCorrection(TypicalLEDStrip);
//     FastLED.setBrightness(BRIGHTNESS);  // Set brightness to 50 (range is 0-255)

//     // Initialize water pump pin
//     pinMode(WATER_PUMP_PIN, OUTPUT);
//     digitalWrite(WATER_PUMP_PIN, LOW); // Ensure pump is off initially
// }

// void loop() {
//     // Read and display light level
//     float lux = lightsensor.readLightLevel();
//     if (lux >= 0) {
//         Serial.print("Light Level (lux): ");
//         Serial.println(lux);
//     } else {
//         Serial.println("Error reading BH1750");
//     }

//     // Read and display soil moisture level
//     uint16_t soil_moisture = soilSensor.touchRead(0);
//     if (soil_moisture == 65535) {
//         Serial.println("Error reading soil moisture sensor");
//     } else {
//         Serial.print("Soil Moisture: ");
//         Serial.println(soil_moisture);
//     }

//     // Check if soil moisture exceeds threshold and control the pump with debounce mechanism
//     unsigned long currentTime = millis();
//     if (soil_moisture > SOIL_MOISTURE_THRESHOLD) {
//         if (currentTime - lastPumpToggleTime >= debounceInterval) {
//             digitalWrite(WATER_PUMP_PIN, HIGH); // Turn on water pump
//             delay(pumpOnTime); // Keep the pump on for a short duration
//             digitalWrite(WATER_PUMP_PIN, LOW); // Turn off water pump
//             lastPumpToggleTime = currentTime; // Update the last pump toggle time
//         }
//     } else {
//         digitalWrite(WATER_PUMP_PIN, LOW); // Ensure the pump is off if soil moisture is below threshold
//     }

//     // Read and display temperature and humidity
//     float temperature = am2320.readTemperature();
//     float humidity = am2320.readHumidity();
//     if (isnan(temperature) || isnan(humidity)) {
//         Serial.println("Failed to read data from AM2320 sensor");
//     } else {
//         Serial.print("Temperature: ");
//         Serial.print(temperature);
//         Serial.print("°C, Humidity: ");
//         Serial.print(humidity);
//         Serial.println("%");
//     }
    
//     // Set the color of the LED
//     for (int i = 0; i < NUM_LEDS; i++) {
//         leds[i] = CRGB::Red;
//     }
//     FastLED.show();

//     // Display current time
//     Serial.println(getCurrentTime().c_str());
//     // Space between readings
//     Serial.println("--------------------");
//     // Delay between readings
//     delay(1000);
// }