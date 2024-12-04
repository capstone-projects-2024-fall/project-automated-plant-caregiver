#include "SoilMoistureSensor.h"

bool SoilMoistureSensor::initialize() {
    if (sensor.begin(address)) {
        Serial.println("Soil Moisture Sensor Initialized");
        return true;
    } else {
        Serial.println("Soil Moisture Sensor Initialization Failed");
        return false;
    }
}

SensorData SoilMoistureSensor::readData() {
    SensorData data;
    data.moisture = sensor.touchRead(0);

    // Error handling for invalid data
    if (data.moisture < 0 || data.moisture > 3000 || isnan(data.moisture)) { // Adjust the range based on your sensor's specifications
        Serial.println("Invalid soil moisture reading");
        data.moisture = -999; // Set to a default invalid value
    }

    return data;
}

const char* SoilMoistureSensor::getSensorName() {
    return "Adafruit STEMMA Soil Sensor";
}