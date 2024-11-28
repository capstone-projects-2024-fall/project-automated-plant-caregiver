#include <Arduino.h>
#include <Wire.h>
#include <BH1750.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Adafruit_seesaw.h>
#include <Adafruit_AM2320.h>
#include <FastLED.h>
#include <time.h>

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

// Create instances of sensors
BH1750 lightsensor(0x23);
Adafruit_seesaw soilSensor;
Adafruit_AM2320 am2320;

// WS2812B LED settings
#define LED_PIN 5
#define NUM_LEDS 120
#define BRIGHTNESS 5
CRGB leds[NUM_LEDS];

// Your API endpoint URL
const char* apiUrl = "https://zxk89h80gg.execute-api.us-east-1.amazonaws.com/dev/data";

// Function to send POST request
bool sendPostRequest(String jsonPayload) {
  HTTPClient http;
  http.begin(apiUrl);  // Specify the API URL
  http.addHeader("Content-Type", "application/json");  // Set the content type

  int httpResponseCode = http.POST(jsonPayload);  // Send the POST request

  if (httpResponseCode > 0) {
    String response = http.getString();  // Get the response
    Serial.println("HTTP Response code: " + String(httpResponseCode));
    Serial.println("Response: " + response);
    http.end();  // End the HTTP connection
    return true;
  } else {
    Serial.println("Error sending POST: " + String(httpResponseCode));
    http.end();
    return false;
  }
}

// Function to read current time
String getCurrentTime() {
  struct tm timeinfo;
  if(!getLocalTime(&timeinfo)){
    Serial.println("Failed to obtain time");
    return "Failed to obtain time";
  }
  char buffer[80];
  strftime(buffer, 80, "%Y-%m-%d %H:%M:%S", &timeinfo);
  return String(buffer);
}

// Setup function
void setup() {
  // Initialize the Serial Monitor
  Serial.begin(115200); 

  // Initialize the I2C communication
  Wire.begin(I2C_SDA, I2C_SCL); 

  // Seed the random number generator
  randomSeed(analogRead(0));

  // Connect to the WiFi network
  WiFi.begin(ssid, password); 
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // Init and get the time
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

  // Initialize the BH1750 sensor
  if (lightsensor.begin(BH1750::CONTINUOUS_HIGH_RES_MODE)) {
    Serial.println("BH1750 Enabled");
  } else {
    Serial.println("BH1750 Error");
  }

  // Initialize the Soil Moisture Sensor
  if (!soilSensor.begin(0x36)) { 
    Serial.println("Soil Moisture Sensor not found!");
  } else {
    Serial.println("Soil Moisture Sensor Enabled");
  }

  // Initialize the AM2320 sensor
  if (!am2320.begin()) {
    Serial.println("AM2320 not found!");
  } else {
    Serial.println("AM2320 Enabled");
  }

  // Initialize FastLED
  FastLED.addLeds<WS2812B, LED_PIN, GRB>(leds, NUM_LEDS);
  FastLED.setBrightness(BRIGHTNESS);  // Set brightness to 50 (range is 0-255)
}

// Loop function
void loop() {
  // Check if WiFi is connected
  Serial.println(getCurrentTime());
  if (WiFi.status() == WL_CONNECTED) {
    // Read sensor data
    float lux = lightsensor.readLightLevel();
    uint16_t soil_moisture = soilSensor.touchRead(0);
    float temperature = am2320.readTemperature();
    float humidity = am2320.readHumidity();

    // Set the color of the LED (example: red color)
    for (int i = 0; i < NUM_LEDS; i++) {
      leds[i] = CRGB::Red;
    }
    FastLED.show();

    // Create JSON string to send
    String jsonPayload = "{\"time\": \"" + getCurrentTime() + "\", \"lux\": " + String(lux) + ", \"soil_moisture\": " + String(soil_moisture) + ", \"temperature\": " + String(temperature) + ", \"humidity\": " + String(humidity) + "}";

    // Send the POST request
    if (sendPostRequest(jsonPayload)) {
      Serial.println("Data sent successfully");
      Serial.println("Data: " + jsonPayload);
    } else {
      Serial.println("Failed to send data");
    }
  }

  // Wait for 5 seconds before sending the next data
  delay(5000);
}
