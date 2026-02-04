import { useEffect, useRef, useState } from "react";

const TOAST_TIMER = 45;

//when you press the toast button
export default function Tosting() {
  const [isToast, setIsToasting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

//To store timers for later use.
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

//use to stop the timer
  const clearTimers = () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
  };

  const toastPopUp = () => {
    clearTimers();
    setIsToasting(false);
    setTimeLeft(0);
  };
//for when you start the toast button
  const startToast = () => {
    if (isToast) return;

    setIsToasting(true);
    setTimeLeft(TOAST_TIMER);

    intervalRef.current = setInterval(() => {
      setTimeLeft((ti) => (ti > 0 ? ti - 1 : 0));
    }, 1000);

    timeoutRef.current = setTimeout(toastPopUp, TOAST_TIMER * 1000);
  };

  const cancelToast = () => {
    toastPopUp();
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

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
