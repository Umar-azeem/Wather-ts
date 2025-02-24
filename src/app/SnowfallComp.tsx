"use client";
import React from "react";
import Snowfall from "react-snowfall";

const SnowfallComp = () => {
  return (
    <div
      style={{
        height: 1200,
        width: 1200,
        position: "relative",
      }}
    >
      <Snowfall />
    </div>
  );
};

export default SnowfallComp;
