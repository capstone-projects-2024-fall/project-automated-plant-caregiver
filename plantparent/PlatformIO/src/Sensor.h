#ifndef SENSOR_H
#define SENSOR_H

#include <Arduino.h>

// Define the SensorData struct
struct SensorData {
    float temperature = 0.0; // Default value for temperature
    float humidity = 0.0;    // Default value for humidity
    float lux = 0.0;   // Default value for other data
    float moisture = 0.0;     // Default value for soil moisture
};

// Define the Sensor base class
class Sensor {
public:
    virtual bool initialize() = 0;
    virtual SensorData readData() = 0; // Return a structure
    virtual const char* getSensorName() = 0;
    virtual ~Sensor() {}
};

#endif