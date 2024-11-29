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
    return data;
}

const char* SoilMoistureSensor::getSensorName() {
    return "Adafruit STEMMA Soil Sensor";
}