// #include <Arduino.h>
// #include <Wire.h>
// #include <BH1750.h>
// #include <WiFi.h>
// #include <WiFiClientSecure.h>
// #include <time.h>
// #include <Adafruit_seesaw.h>
// #include <Adafruit_AM2320.h>

// void setup() {
//   Wire.begin(21, 22);  // Use your SDA and SCL pins
//   Serial.begin(115200);
//   while (!Serial);     // Wait for Serial Monitor to open
//   Serial.println("\nI2C Scanner");
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

//   delay(5000);  // Scan again every 5 seconds
// }
