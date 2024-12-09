#ifndef SOIL_MOISTURE_SENSOR
#define SOIL_MOISTURE_SENSOR

#include <Sensor.h>
#include <Adafruit_seesaw.h>

class SoilMoistureSensor : public Sensor {
    private:
        Adafruit_seesaw sensor;
        uint8_t address;
    public:
        SoilMoistureSensor(uint8_t i2cAddress) : address(i2cAddress) {}
        bool initialize() override;
        SensorData readData() override;
        const char* getSensorName() override;
};

#endif