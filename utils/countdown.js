import dayjs from 'dayjs';

export function calculateDiff(timeInMs) {
  const timeStampDayjs = dayjs(timeInMs);
  const nowDayjs = dayjs();

  if (timeStampDayjs.isBefore(nowDayjs)) {
    return {
      seconds: "00",
      minutes: "00",
      hours: "00",
      days: "00",
    }
  }

  return {
    seconds: getRemainingSeconds(nowDayjs, timeStampDayjs),
    minutes: getRemainingMinutes(nowDayjs, timeStampDayjs),
    hours: getRemainingHours(nowDayjs, timeStampDayjs),
    days: getRemainingDays(nowDayjs, timeStampDayjs),
  };
};

function getRemainingSeconds(nowDayjs, timeStampDayjs) {
  const seconds = timeStampDayjs.diff(nowDayjs, "seconds") % 60;
  return padWithZero(seconds, 2);
};

function getRemainingMinutes(nowDayjs, timeStampDayjs) {
  const minutes = timeStampDayjs.diff(nowDayjs, "minutes") % 60;
  return padWithZero(minutes, 2);
};

function getRemainingHours(nowDayjs, timeStampDayjs) {
  const hours = timeStampDayjs.diff(nowDayjs, "hours") % 60;
  return padWithZero(hours, 2);
};

function getRemainingDays(nowDayjs, timeStampDayjs) {
  const days = timeStampDayjs.diff(nowDayjs, "days") % 60;
  return days.toString();
};

function padWithZero(num, length) {
  const numberString = num.toString();
  if (numberString.length >= length) return numberString;
  return "0".repeat(length - numberString.length) + numberString;
}