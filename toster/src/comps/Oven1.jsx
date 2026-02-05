import React, { useState, useEffect, useRef } from 'react';

const Oven1 = () => { //defining oven1 component

  // oven  current state temp.mode and target
  const [currentTemp, setCurrentTemp] = useState(0);
  const [targetTemp, setTargetTemp] = useState(0);
  const [mode, setMode] = useState("off"); // "off", "bake", "grill", "both"

  //  keeps track of  temperature ID  
  const sensorInterval = useRef(null);

  // The Brain Runs the logic every time the mode or target changes
  useEffect(() => {
    //starts the sensor
    sensorInterval.current = setInterval(() => {
      updateHeat();//to adjust temperature
    }, 1000);// runs every second(1000ms)

    // Cleanup: This stops the timer if the component is closed or restarted
    return () => clearInterval(sensorInterval.current);
  }, [mode, targetTemp, currentTemp]); 
//updateheat function//adjust temp based on the mode ans target
//turns off when the target is reached
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
//function to calculate heatrate
//returns heat rate based on the mode
  const calculateHeatRate = () => {
    const rates = { bake: 2, grill: 3, both: 5 };
    return rates[mode] || 0;
  };
// dsiplays the temperature,mode and contorls
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