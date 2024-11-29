#include "TemperatureHumiditySensor.h"

bool TemperatureHumiditySensor::initialize() {
    if (sensor.begin()) {
        Serial.println("Temperature and Humidity Sensor Initialized");
        return true;
    } else {
        Serial.println("Temperature and Humidity Sensor Initialization Failed");
        return false;
    }
}

SensorData TemperatureHumiditySensor::readData() {
    SensorData data;
    data.temperature = sensor.readTemperature();
    data.humidity = sensor.readHumidity();
    return data;
}

const char* TemperatureHumiditySensor::getSensorName() {
    return "AM2320 Temperature and Humidity Sensor";
}