/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "./style.scss";
import { useState, useEffect, SetStateAction, Dispatch } from "react";

interface TimerProps {
  minutes: number;
  setIsTimeOver: Dispatch<SetStateAction<boolean>>;
}
const INTERVAL = 1000;

const Timer = ({ minutes, setIsTimeOver }: TimerProps) => {
  const minutesInMs = minutes * 60 * 1000;
  const [time, setTime] = useState(minutesInMs);

  const timerMinutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  const timerSecond = String(Math.floor((time / 1000) % 60)).padStart(2, "0");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - INTERVAL);
    }, INTERVAL);

    if (time <= 0) {
      clearInterval(timer);
      setIsTimeOver(true);
      console.log("시간 종료.");
    }

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return (
    <div className="timer">
      <p className="timer__content">
        {timerMinutes} : {timerSecond}
      </p>
    </div>
  );
};
export default Timer;
