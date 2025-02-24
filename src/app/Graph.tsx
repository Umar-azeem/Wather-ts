import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Graph() {

  const data = [
    { day: "Mon ☀️", temp: 16.55 },
    { day: "Tus ☀️", temp: 26.55 },
    { day: "Wed ☀️", temp: 13.58 },
    { day: "Thu ☀️", temp: 24.91 },
    { day: "Fri ☀️", temp: 35.46 },
  ];
  return (
    <>
      <div className="relative rounded-lg shadow-lg flex">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} className="text-sm ">
            <XAxis dataKey="day" stroke="black" tick={{ fill: "black" }} />
            
            <YAxis stroke="black" tick={{ fill: "black" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", color: "white" }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="orange"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-between text-sm text-white mt-2">
   
         
        </div>
        
      </div>
      
    </>
  );
}

export default Graph;
