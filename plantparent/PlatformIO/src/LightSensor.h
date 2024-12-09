#ifndef LIGHT_SENSOR
#define LIGHT_SENSOR

#include <Sensor.h>
#include <BH1750.h>

class LightSensor : public Sensor {
    private:
        BH1750 sensor;
        uint8_t address;
    public:
        LightSensor(uint8_t i2cAddress) : address(i2cAddress) {}
        bool initialize() override;
        SensorData readData() override;
        const char* getSensorName() override;
};

#endif