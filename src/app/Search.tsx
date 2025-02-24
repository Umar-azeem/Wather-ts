import React, { useState } from "react";
import Graph from "./Graph";
import WeatherCard from "./WeatherCard";

const Search = () => {
  const [cityName, setCityName] = useState("");
  const [apiData, setApiData] = useState<{
    name?: string;
    tempt?: number;
    Feel?: number;
    min?: number;
    max?: number;
    pressure?:number;
    speed?:number;
    humidity?:number;
    kf?:number;
  }>({});

  const apiKey = "3bfd361a1485032641d310ec65159174";
  const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`;

  const fetchData = () => {
    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.city && data.list) {
          setApiData({
            name: data.city.name,
            tempt: data.list[0].main.temp,
            Feel: data.list[0].main.feels_like,
            min: data.list[0].main.temp_min,
            max: data.list[0].main.temp_max,
            pressure:data.list[0].main.pressure,
            speed:data.list[0].wind.speed,
            humidity:data.list[0].main.humidity,
            kf:data.list[0].main.temp_kf
          });
        } else {
          console.error("Invalid API response:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <>
      <div className="flex flex-col p-8 w-full justify-center items-center mt-16">
        <div className="flex p-4 justify-between items-center max-w-md min-w-[150px] backdrop-blur-sm bg-blue-300/10 rounded-full">
          <div>
            <p className="text-2xl font-bold">{apiData?.tempt ?? "N/A"}°C</p>
            <p className="text-sm text-gray-900">
              Feels like:{" "}
              <span className="text-white">{apiData?.Feel ?? "N/A"}°C</span>
            </p>
          </div>
          <div className="text-yellow-500 text-2xl">☀️</div>
        </div>

        <p className="text-center text-lg mt-2">
          {apiData?.name ?? "Search for a city"}
        </p>

        <div className="relative w-full max-w-md min-w-[150px] backdrop-blur-sm bg-white/10 rounded-full">
          <div className="relative">
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-full pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Search"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
            <button
              onClick={fetchData}
              className="absolute top-1 right-1 flex items-center justify-center backdrop-blur-sm bg-white/10 w-8 h-8 rounded-full bg-slate-800 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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

        <div className="relative mt-4 flex flex-col w-full max-w-lg backdrop-blur-sm bg-white/10 shadow-sm border border-slate-100 rounded-lg">
          <div>
            <Graph />
          </div>
          <div className="mx-3 border-t border-white">
            <span className="text-sm text-slate-600 font-medium">
              <WeatherCard apiData={apiData} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
