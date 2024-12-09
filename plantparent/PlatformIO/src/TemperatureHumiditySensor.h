#ifndef TEMPERATURE_HUMIDITY_SENSOR
#define TEMPERATURE_HUMIDITY_SENSOR

#include <Sensor.h>
#include <Adafruit_AM2320.h>

class TemperatureHumiditySensor : public Sensor {
    private:
        Adafruit_AM2320 sensor;
    public:
        bool initialize() override;
        SensorData readData() override;
        const char* getSensorName() override;
};

#endif