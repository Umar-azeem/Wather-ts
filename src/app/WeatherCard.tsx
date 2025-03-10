import React from "react";

interface WeatherItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    temp_kf?: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  dt_txt: string;
}

interface WeatherCardProps {
  nearestTimeData?: WeatherItem; 
}
const WeatherCard: React.FC<WeatherCardProps> = ({ nearestTimeData }) => {
  if (!nearestTimeData) {
    return <p className="text-center text-gray-400">No weather data available</p>;
  }

  const { main, wind } = nearestTimeData;

  return (
    <div className="text-black rounded-lg shadow-lg w-full p-1">
      <div className="grid grid-cols-3 gap-2 lg:gap-4 text-xs lg:text-sm">
        <div className="flex items-center">
          <span className="">🌅</span>
          <p>Min Temp: <span className="text-white text-sm">{main.temp_min}°C</span></p>
        </div>
        <div className="flex items-center">
          <span className="">🌇</span>
          <p>Max Temp: <span className="text-white text-sm">{main.temp_max}°C</span></p>
        </div>
        <div className="flex items-center">
          <span className="">💧</span>
          <p>Humidity: <span className="text-white text-sm">{main.humidity}%</span></p>
        </div>
        <div className="flex items-center">
          <span className="">💨</span>
          <p>Wind Speed: <span className="text-white text-sm">{wind.speed} km/h</span></p>
        </div>
        <div className="flex items-center">
          <span className="">🌡</span>
          <p>Pressure:<span className="text-white text-sm">{main.pressure} hPa</span></p>
        </div>
        {main.temp_kf !== undefined && (
          <div className="flex items-center">
            <span className="">☀️</span>
            <p>Temp KF:<span className="text-white text-sm">{main.temp_kf}</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
