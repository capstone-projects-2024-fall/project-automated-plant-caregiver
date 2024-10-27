#include <WiFi.h>
#include <HTTPClient.h>
#include <BH1750.h>
#include <Adafruit_seesaw.h>
#include <SPIFFS.h>

// WiFi credentials
const char* ssid = "";            // Replace with your WiFi SSID
const char* password = "";    // Replace with your WiFi password

// API Gateway endpoint (replace with your actual API Gateway URL)
const char* serverName = "https://zxk89h80gg.execute-api.us-east-1.amazonaws.com/dev/data";

// Create instances for the sensors
BH1750 lightsensor(0x23);
Adafruit_seesaw soilSensor;

void setup() {
  // Initialize the Serial Monitor
  Serial.begin(115200);

  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Initialize I2C communication for sensors
  Wire.begin(21, 22); // I2C SDA and SCL pins for ESP32

  // Initialize the BH1750 light sensor
  if (lightsensor.begin(BH1750::CONTINUOUS_HIGH_RES_MODE)) {
    Serial.println("BH1750 Enabled");
  } else {
    Serial.println("BH1750 Error");
  }

  // Initialize the soil moisture sensor
  if (!soilSensor.begin(0x36)) {
    Serial.println("Soil Moisture Sensor not found!");
  } else {
    Serial.println("Soil Moisture Sensor Enabled");
  }
}

void loop() {
  // Read light intensity from the BH1750 sensor
  float lux = lightsensor.readLightLevel();

  // Read soil moisture level from the soil moisture sensor
  uint16_t soil_moisture = soilSensor.touchRead(0);

  //Hard code
  float temp = 25.0;

  // Check if WiFi is connected
  if (WiFi.status() == WL_CONNECTED) {
    // Create an HTTPClient object
    HTTPClient http;

    // Specify the API Gateway URL
    http.begin(serverName);

    // Set content type to JSON
    http.addHeader("Content-Type", "application/json");

    // Create a JSON payload with the sensor data
    String jsonPayload = "{\"lux\": " + String(lux) + ", \"soil_moisture\": " + String(soil_moisture) + ", \"temp\": " + String(temp) + "}";

    // Send an HTTP POST request with the JSON payload
    int httpResponseCode = http.POST(jsonPayload);

    // Print the HTTP response code and response payload
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Response Code: " + String(httpResponseCode));
      Serial.println("Response: " + response);
    } else {
      Serial.println("Error sending data: " + String(httpResponseCode));
    }

    // End the HTTP connection
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }

  // Delay before the next sensor read and data send
  delay(5000);  // Send data every 5 seconds (adjust as needed)
}