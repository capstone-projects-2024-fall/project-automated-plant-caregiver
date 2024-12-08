// #include <Arduino.h>
// #include <Wire.h>
// #include <BH1750.h>
// #include <WiFi.h>
// #include <WiFiClientSecure.h>
// #include <time.h>
// #include <Adafruit_seesaw.h>
// #include <Adafruit_AM2320.h>

// Adafruit_AM2320 am2320;

// void setup() {
//   Wire.begin(21, 22);  // Use your SDA and SCL pins
//   Serial.begin(115200);
//   while (!Serial);     // Wait for Serial Monitor to open
//   Serial.println("\nI2C Scanner");

//   // Initialize AM2320
//   if (!am2320.begin()) {
//     Serial.println("AM2320 not found, check wiring?");
//   } else {
//     Serial.println("AM2320 found");
//   }
// }

// void loop() {
//   byte error, address;
//   int nDevices = 0;

//   Serial.println("Scanning...");

//   for (address = 1; address < 127; address++ ) {
//     Wire.beginTransmission(address);
//     error = Wire.endTransmission();

//     if (error == 0) {
//       Serial.print("I2C device found at address 0x");
//       if (address < 16)
//         Serial.print("0");
//       Serial.print(address, HEX);
//       Serial.println("  !");
//       nDevices++;
//     } else if (error == 4) {
//       Serial.print("Unknown error at address 0x");
//       if (address < 16)
//         Serial.print("0");
//       Serial.println(address, HEX);
//     }
//   }

//   if (nDevices == 0)
//     Serial.println("No I2C devices found\n");
//   else
//     Serial.println("done\n");

//   // Check for AM2320 sensor
//   if (!am2320.begin()) {
//     Serial.println("AM2320 not responding, attempting to wake up...");
//     delay(1000); // Wait for 1 second before retrying
//   } else {
//     // Read data from AM2320
//     float temperature = am2320.readTemperature();
//     float humidity = am2320.readHumidity();

//     if (!isnan(temperature) && !isnan(humidity)) {
//       Serial.print("Temperature: ");
//       Serial.print(temperature);
//       Serial.print(" °C, Humidity: ");
//       Serial.print(humidity);
//       Serial.println(" %");
//     } else {
//       Serial.println("Failed to read from AM2320");
//     }
//   }

//   delay(5000);  // Scan again every 5 seconds
// }
