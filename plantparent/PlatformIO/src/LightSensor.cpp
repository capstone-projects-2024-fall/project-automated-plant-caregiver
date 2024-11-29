#include "LightSensor.h"

bool LightSensor::initialize() {
    if (sensor.begin(BH1750::CONTINUOUS_HIGH_RES_MODE)) {
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
    return data;
}

const char* LightSensor::getSensorName() {
    return "BH1750 Light Sensor";
}
