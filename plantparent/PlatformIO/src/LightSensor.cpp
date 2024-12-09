#include "LightSensor.h"

bool LightSensor::initialize() {
    Serial.print("Initializing BH1750 at address 0x");
    Serial.println(address, HEX);
    if (sensor.begin(BH1750::CONTINUOUS_HIGH_RES_MODE, address, &Wire)) {
        Serial.println("Light Sensor Initialized");
        return true;
    } else {
        Serial.println("Light Sensor Initialization Failed");
        return false;
    }
}

SensorData LightSensor::readData() {
    SensorData data;
    data.lux = sensor.readLightLevel();

    // Error handling for invalid data
    if (data.lux < 0 || data.lux > 65535 || isnan(data.lux)) { // Adjust the range based on your sensor's specifications
        Serial.println("Invalid light sensor reading");
        data.lux = -999; // Set to a default invalid value
    }

    return data;
}

const char* LightSensor::getSensorName() {
    return "BH1750 Light Sensor";
}
