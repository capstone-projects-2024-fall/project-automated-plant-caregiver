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

    // Error handling for invalid data
    if (isnan(data.temperature) || data.temperature < -40 || data.temperature > 80) {
        Serial.println("Invalid temperature reading");
        data.temperature = -999; // Set to a default invalid value
    }
    if (isnan(data.humidity) || data.humidity < 0 || data.humidity > 100) {
        Serial.println("Invalid humidity reading");
        data.humidity = -999; // Set to a default invalid value
    }

    return data;
}

const char* TemperatureHumiditySensor::getSensorName() {
    return "AM2320 Temperature and Humidity Sensor";
}