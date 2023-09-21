import {
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
  LOW_PERCENT,
  MEDIUM_PERCENT,
  HUNDRED_PERCENT,
} from '@/constans';
import { isNull } from '@/validators';

export const id = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const currentHour = () => {
  return new Date().getHours();
};

export const formatSeconds = (seconds) => {
  const date = new Date();

  date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND);

  const utc = date.toUTCString();

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
};

export const formatSecondsWithSign = (seconds) => {
  return `${seconds >= 0 ? '+' : '-'}${formatSeconds(seconds)}`;
};

export const normalizeSelectValue = (value) => {
  return isNull(value) || isNaN(value) ? value : +value;
};

export const generatePeriodSelectOptionsLabel = (periodInMinutes) => {
  const hours = Math.floor(periodInMinutes / MINUTES_IN_HOUR)
    .toString()
    .padStart(2, 0);

  const minutes = (periodInMinutes % MINUTES_IN_HOUR).toString().padStart(2, 0);

  return `${hours}:${minutes}`;
};

export const generatePeriodSelectOptions = () => {
  const periodsInMinutes = [
    15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420,
    450, 480,
  ];

  return periodsInMinutes.map((periodInMinutes) => ({
    value: periodInMinutes * SECONDS_IN_MINUTE,
    label: generatePeriodSelectOptionsLabel(periodInMinutes),
  }));
};

export const getProgressColorClass = (percentage) => {
  if (percentage < LOW_PERCENT) return 'bg-red-500';
  if (percentage < MEDIUM_PERCENT) return 'bg-yellow-500';
  if (percentage < HUNDRED_PERCENT) return 'bg-blue-500';

  return 'bg-green-500';
};
