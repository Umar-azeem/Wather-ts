import React, { useState } from "react";
import Graph from "./Graph";
import WeatherCard from "./WeatherCard";
import moment from "moment";

interface WeatherItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
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
interface Response {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherItem[];
}
const Search = () => {
  const [cityName, setCityName] = useState("");
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const [daySelect, SetDaySelect] = useState(today);
  console.log("qqq",daySelect)
  const [apiData, setApiData] = useState<WeatherItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiKey = "3bfd361a1485032641d310ec65159174";
  const fetchData = async () => {
    if (!cityName) return;
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(apiURL);
      const data: Response = await response.json();

      if (data.cod !== "200") {
        setError("City not found. Please enter a valid city.");
        setApiData([]);
      } else {
        setApiData(data.list);
        setError(null);
      }
    } catch (error) {
      console.error("Invalid API response:", error);
      setError("Failed to fetch weather data.");
    }
  }
 const Day = [
    { day: "Mon",fullDay:'Monday'},
    { day: "Tue",fullDay:'Tuesday' },
    { day: "Wed",fullDay:'Wednesday' },
    { day: "Thu",fullDay:'Thursday' },
    { day: "Fri",fullDay:'Friday' },
    { day: "Sat",fullDay:'Saturday' },
    { day: "Sun",fullDay:'Sunday' },
  ];
  const mapdata = apiData
    .map((item) => {
      const day = moment(item.dt_txt).format("dddd");
      const time = moment(item.dt_txt).format("HH:mm"); 
      const hour = parseInt(moment(item.dt_txt).format("h A"))
      return { ...item, day,time ,hour}; 
    })
    const currentHour = parseInt(moment().format("H"), 10);

    const filteredData = mapdata.filter((v) => v.day === daySelect );  
  const handleDaySelect = (shortDay: string) => {
    const fullDay = Day.find((d) => d.day === shortDay)?.fullDay; 
    if (fullDay) {
      SetDaySelect(fullDay);
    }
  };
  const nearestTimeData = filteredData.find((item) => item.hour === currentHour) || filteredData?.[0] || null;
  

  return (
    <>
      <div className="flex flex-col p-4 w-full justify-center items-center mt-12">
        <div className="flex mt-2 p-1 justify-between items-center max-w-md min-w-[150px] backdrop-blur-sm bg-blue-300/10 rounded-full">
          <div>
            <p className="text-xl md:text-2xl font-bold">
              {filteredData.length > 0 ? `${filteredData[0].main.temp}°C` : "N/A"}
            </p>
            <p className="text-sm text-gray-900">
              Feels like:
              <span className="text-white">
                {filteredData.length > 0 ? `${filteredData[0]?.main?.feels_like}°C` : "N/A"}
              </span>
            </p>
          </div>
          <div className="text-yellow-500 text-xl md:text-2xl">☀️</div>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="text-center text-lg mt-2">
          {cityName ? `Weather in ${cityName}` : "Search for a city"}
        </p>
        <div className="relative w-full max-w-md min-w-[150px] backdrop-blur-sm bg-white/10 rounded-full">
          <div className="relative">
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-black text-sm border border-slate-200 rounded-full pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
            <button
              onClick={fetchData}
              className="absolute top-1 right-1 flex items-center ml-1 mb-1  justify-center backdrop-blur-sm bg-white/10 w-8 h-8 rounded-full bg-slate-800 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative mt-2 flex flex-col w-full max-w-lg backdrop-blur-sm bg-white/10 shadow-sm border border-slate-100 rounded-lg">
          <Graph filteredData={filteredData} />
          <div className="flex justify-center w-full max-w-full px-4 overflow-x-scroll whitespace-nowrap custom-scrollbar space-x-4 lg:space-x-6">
            {Day.map((item, index) => (
              <button
                key={index}
                onClick={() => handleDaySelect(item.day)}
                className={`text-sm text-white font-medium px-3 py-1 rounded-bl-md rounded-br-md transition-all 
                  ${
                    daySelect === item.day
                      ? "text-white backdrop-blur-sm bg-blue-300/40 lg:bg-blue-300/20"
                      : "text-gray-100"
                  }
                `}
              >
                {item.day} <span className="lg:inline hidden">☀️</span>
              </button>
            ))}
          </div>
          <div className="mx-3 border-t border-white">
          <WeatherCard nearestTimeData={nearestTimeData}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
