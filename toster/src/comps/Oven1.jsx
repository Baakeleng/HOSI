import React, { useState, useEffect, useRef } from 'react';

const Oven1 = () => {

  // 1. oven  current state
  const [currentTemp, setCurrentTemp] = useState(0);
  const [targetTemp, setTargetTemp] = useState(0);
  const [mode, setMode] = useState("off"); // "off", "bake", "grill", "both"

  // 2. keeps track of the temperature 
  const sensorInterval = useRef(null);

  // 3. The Brain (useEffect): Runs the logic every time the mode or target changes
  useEffect(() => {
    // Start the "Sensor"
    sensorInterval.current = setInterval(() => {
      updateHeat();
    }, 1000);

    // Cleanup: This stops the timer if the component is closed or restarted
    return () => clearInterval(sensorInterval.current);
  }, [mode, targetTemp, currentTemp]); 

  const updateHeat = () => {
    if (mode === "off") {
      if (currentTemp > 0) setCurrentTemp(prev => prev - 1);
    } else if (currentTemp < targetTemp) {
      const heatRate = calculateHeatRate();
      const nextTemp = currentTemp + heatRate;

      // Rule: Don't overshoot & Auto Shut-off
      if (nextTemp >= targetTemp) {
        setCurrentTemp(targetTemp);
        setMode("off");
      } else {
        setCurrentTemp(nextTemp);
      }
    }
  };

  const calculateHeatRate = () => {
    const rates = { bake: 2, grill: 3, both: 5 };
    return rates[mode] || 0;
  };

  return (
    <div>
      <h2>Smart Oven</h2>
      <p>Status: <strong>{currentTemp}°C</strong> | Mode: <strong>{mode.toUpperCase()}</strong></p>
      
      {/* Input Target Temp */}
      <label>Target Temp: </label>
      <input 
        type="number" 
        value={targetTemp} 
        onChange={(e) => setTargetTemp(Number(e.target.value))} 
      />

      <div>
        <button onClick={() => setMode("bake")}>Bake (+2°/s)</button>
        <button onClick={() => setMode("grill")}>Grill (+3°/s)</button>
        <button onClick={() => setMode("both")}>Both (+5°/s)</button>
        <button onClick={() => setMode("off")}>OFF (-1°/s)</button>
      </div>
    </div>
  );
};

export default Oven1;