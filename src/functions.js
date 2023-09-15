import {
  HOURS_IN_DAY,
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
  MINUTES_IN_HOUR,
} from './constans';
import { isNull } from './validators';

export const id = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const formatSeconds = (seconds) => {
  const date = new Date();

  date.setTime(Math.abs(seconds) * MILLISECONDS_IN_SECOND);

  const utc = date.toUTCString();

  return utc.substring(utc.indexOf(':') - 2, utc.indexOf(':') + 6);
};

export const normalizeSelectValue = (value) => {
  return isNull(value) || isNaN(value) ? value : +value;
};

export const generateTimelineItems = (activities) => {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: [0, 1, 2, 3, 4].includes(hour)
      ? activities.value[hour % 3].id
      : null,
    activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : null,
  }));
};

export const generateActivities = () => {
  return ['Coding', 'Reading', 'Trainig'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR,
  }));
};

export const generateActivitySelectOptions = (activities) => {
  return activities.map((activity) => ({
    label: activity.name,
    value: activity.id,
  }));
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

export const getTotalActivitySeconds = (activity, timelineItems) => {
  return timelineItems
    .filter((timelineItem) => timelineItem.activityId === activity.id)
    .reduce(
      (totalSeconds, timelineItem) =>
        Math.round(timelineItem.activitySeconds + totalSeconds),
      0,
    );
};
