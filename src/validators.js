import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGT_HOUR } from './constans';

export const isPageValid = (page) => {
  return Object.keys(NAV_ITEMS).includes(page);
};

export const isTimelineValid = ({ hour }) => {
  return typeof hour === 'number' && hour >= MIDNIGT_HOUR && hour < HOURS_IN_DAY;
};

export const validateTimelineItems = (timelineItems) => {
  return timelineItems.every(isTimelineValid);
};

const isSelectOptionValid = ({ value, label }) => {
  return typeof value === 'number' && typeof label === 'string';
};

export const validateSelectOptions = (options) => {
  return options.every(isSelectOptionValid);
};
