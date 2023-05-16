import React, { useEffect, useState } from 'react';
import styles from './countdown.module.scss';
import { calculateDiff } from '../../utils/countdown';

const defaultRemainingTime = {
  seconds: "45",
  minutes: "35",
  hours: "12",
  days: "40",
};

const Countdown = ({ date }) => {
  const [timeInMs, setTimeInMs] = useState(date.getTime());
  const [remainingTime, setRemainingTime] = useState();

  // set time after change
  useEffect(()=>{
    setTimeInMs(date.getTime());
  },[date]);

  // update remain time
  const updateRemainingTime = (timeInMs) => {
    setRemainingTime(calculateDiff(timeInMs));
  };

// every 1s update the remain time
  useEffect(()=>{
    const interval = setInterval(()=>{
      updateRemainingTime(timeInMs);
    },1000);
    return () => clearInterval(interval);
  },[timeInMs]);

  return (
    <div className={styles.countdown}>
      <span>{remainingTime?.hours.slice(0, 1)}</span>
      <span>{remainingTime?.hours.slice(1, 2)}</span>
      <b>:</b>
      <span>{remainingTime?.minutes.slice(0, 1)}</span>
      <span>{remainingTime?.minutes.slice(1, 2)}</span>
      <b>:</b>
      <span>{remainingTime?.seconds.slice(0, 1)}</span>
      <span>{remainingTime?.seconds.slice(1, 2)}</span>
    </div>
  )
}

export default Countdown;