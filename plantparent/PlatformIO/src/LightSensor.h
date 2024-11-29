#ifndef LIGHT_SENSOR
#define LIGHT_SENSOR

#include <Sensor.h>
#include <BH1750.h>

class LightSensor : public Sensor {
    private:
        BH1750 sensor;
    public:
        bool initialize() override;
        SensorData readData() override;
        const char* getSensorName() override;
        };

#endif