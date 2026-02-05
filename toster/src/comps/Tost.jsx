import { useEffect, useRef, useState } from "react";

const TOAST_TIMER = 45;


export default function Tosting() { //definines the toasting component
  const [isToast, setIsToasting] = useState(false);//tracks if the toast is active initially or not
  const [timeLeft, setTimeLeft] = useState(0);//tracks seconds left in the countdown

//To store timers IDs for later use.
  const intervalRef = useRef(null); // for countdown timer
  const timeoutRef = useRef(null);//for dismissing the toast

//use to stop the timer
  const clearTimers = () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current); 
  };
//functions to handle stop timers and reset state
  const toastPopUp = () => {
    clearTimers();
    setIsToasting(false);
    setTimeLeft(0);
  };
//start the toast to set up countdown and auto-dsimiss
  const startToast = () => {
    if (isToast) return;

    setIsToasting(true);
    setTimeLeft(TOAST_TIMER);

    intervalRef.current = setInterval(() => {
      setTimeLeft((ti) => (ti > 0 ? ti - 1 : 0));
    }, 1000);

    timeoutRef.current = setTimeout(toastPopUp, TOAST_TIMER * 1000);
  };
//cancells the toast
  const cancelToast = () => {
    toastPopUp();
  };
//cleans up timers 
  useEffect(() => {
    return () => clearTimers();
  }, []);
//jsx shows status,countdown and buttons
  return (
    <div>
      <p>Status: <b>{isToast ? "Toasting..." : "Off"}</b></p>

      {isToast && <p>Time left: {timeLeft}s</p>}

      <button onClick={startToast} disabled={isToast}>
        Toast
      </button>

      <button onClick={cancelToast} disabled={!isToast} style={{ marginLeft: 10 }}>
        Cancel
      </button>

      {!isToast && timeLeft === 0 && <p>Toast popped.</p>}
    </div>
  );
}
