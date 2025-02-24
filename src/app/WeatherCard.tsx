type WeatherCardProps = {
  apiData: {
    name?: string;
    tempt?: number;
    Feel?: number;
    min?: number;
    max?: number;
    pressure?: number;
    speed?: number;
    humidity?: number;
    kf?: number;
  };
  
};
import React from "react";

const WeatherCard = ({apiData}:WeatherCardProps) => {
  return (
    <>
      <div className=" text-black rounded-lg shadow-lg w-full">
        <div className="grid grid-cols-3 gap-2 lg:gap-4 text-xs lg:text-sm">
          <div className="flex  items-center">
            <span className="mr-2">🌅</span>
            <p>
              Min_temp: <span className="text-gray-100">{apiData?.min}</span>
            </p>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🌇</span>
            <p>
              Max-temp: <span className="text-gray-300">{apiData?.max}</span>
            </p>
          </div>
          <div className="flex items-center">
            <span className="mr-2">💧</span>
            <p>
              Humidity: <span className="text-gray-300">{apiData?.humidity}</span>
            </p>
          </div>
          <div className="flex items-center">
            <span className="mr-2">💨</span>
            <p>
              Wind Speed: <span className="text-gray-300">{apiData?.speed ?? "N/A"} km/h</span>
            </p>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🌡</span>
            <p>
              Pressure: <span className="text-gray-300">{apiData?.pressure} hPa</span>
            </p>
          </div>
          <div className="flex items-center">
            <span className="mr-2">☀️</span>
            <p>
              temp_kf: <span className="text-gray-300">{apiData?.kf}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
