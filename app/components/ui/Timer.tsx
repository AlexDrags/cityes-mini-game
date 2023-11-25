import { useEffect } from 'react';

export interface TimerProps {
  minutes: number;
  setMinutes: (n: number) => void;
  seconds: number;
  setSeconds: (n: number) => void;
  finishTimer: number;
  setFinishTimer: (n: number) => void;
  mode: boolean;
  setMode: (prev: boolean) => void;
}
export default function Timer({
  minutes,
  setMinutes,
  seconds,
  setSeconds,
  finishTimer,
  setFinishTimer,
  mode,
  setMode,
}: TimerProps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if ((minutes === 0 && seconds === 0) || finishTimer === 0) {
        setMode(!mode);
        return;
      }
      if (seconds === 0) {
        setMinutes(0);
        setSeconds(59);
      }
      if (seconds !== 0) {
        setSeconds(seconds - 1);
        setFinishTimer(finishTimer - 1);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [minutes, setMinutes, seconds, setSeconds, finishTimer, setFinishTimer, mode, setMode]);
  return (
    <div>
      <span>{`0${minutes}`}</span>:<span>{seconds >= 10 ? `${seconds}` : `0${seconds}`}</span>
    </div>
  );
}
