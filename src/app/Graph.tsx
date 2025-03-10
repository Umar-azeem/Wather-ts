import React from "react";
import {
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";

interface WeatherItem {
  dt_txt: string;
  main: {
    temp: number;
  };
}

interface GraphProps {
  filteredData: WeatherItem[];
}

const Graph: React.FC<GraphProps> = ({ filteredData = [] }) => {
  const fixedTimeSlots = [
    "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 PM",
    "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 AM"
  ];

  const chartData = fixedTimeSlots.map((timeSlot) => {
    const matchedData = filteredData.find((item) => {
      const formattedTime = moment.utc(item.dt_txt).local().format("h A");

      return formattedTime === timeSlot; 
    });

    console.log("Checking Time Slot:", timeSlot, "Matched Data:", matchedData);

    return {
      time: timeSlot,
      temp: matchedData ? matchedData.main.temp : 0, 
    };
  });

  return (
    <div className="relative rounded-lg shadow-lg flex">
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData} className="text-sm max-w-md min-w-[20px] p-0.5">
        {/* X and Y Axis */}
        <XAxis dataKey="time" stroke="black" tick={{ fill: "black" }} />
        <YAxis stroke="black" tick={{ fill: "black" }} />

        {/* Tooltip */}
        <Tooltip contentStyle={{ backgroundColor: "#333", color: "white" }} />

        <defs>
        <filter id="shadow" x="0" y="0" width="200%" height="200%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="black" floodOpacity="0.5" />
        </filter>
      </defs>
      <Area
        type="monotone"
        dataKey="temp"
        stroke="orange"
        fill="orange"
        fillOpacity={0.6}
        style={{ filter: "url(#shadow)" }} 
      />
        <Line type="monotone" dataKey="temp" stroke="orange" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
  );
};

export default Graph;
