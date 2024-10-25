// #include <Arduino.h>
// #include <Wire.h>        
// #include <BH1750.h>   
// #include <ESPAsyncWebServer.h>      
// #include <WiFi.h>     
// // I2C pins
// #define I2C_SDA 21 
// #define I2C_SCL 22
// // Create an instance of the BH1750 sensor
// BH1750 lightsensor(0x23);
// // Create an instance of the AsyncWebServer
// AsyncWebServer server(80);
// // WiFi credentials
// const char* ssid = "tuguestwireless";
// const char* password = "";
// // Setup function
// void setup() {
//   // Initialize the Serial Monitor
//   Serial.begin(115200); 
//   // Initialize the I2C communication
//   Wire.begin(I2C_SDA, I2C_SCL); 
//   // Connect to the Access Point
//   WiFi.begin(ssid, password); 
//   // Wait for the connection
//   while(WiFi.status() != WL_CONNECTED) {
//     delay(1000);
//     Serial.println("Connecting to WiFi......");
//   }
//   Serial.println("Connected to WiFi");
//   Serial.println("IP address: ");
//   Serial.println(WiFi.localIP());
//   // Initialize the BH1750 sensor
//   if (lightsensor.begin(BH1750::CONTINUOUS_HIGH_RES_MODE)) {
//     Serial.println("BH1750 Enabled");
//   }
//   else {
//     Serial.println("BH1750 Error");
//   }
//   // Define API endpoint to get the light sensor data
//   server.on("/lightsensor", HTTP_GET, [](AsyncWebServerRequest *request) {
//     float lux = lightsensor.readLightLevel();
//     String message = String(lux);
//     // Send the light level in lux as plain text
//     request->send(200, "text/plain", message);  
//   });
//   // Start the server
//   server.begin();
// }
// // Loop function
// void loop() {
//   // Read the light intensity
//   float lux = lightsensor.readLightLevel(); 
//   // Check if the reading is valid and print it
//   if (lux < 0) {
//     Serial.println("Error reading light level.");
//   } else {
//     Serial.print("Light Level: ");
//     Serial.print(lux);
//     Serial.println(" lux");
//   }
//   // Wait for 1 second
//   delay(1000);

// }

