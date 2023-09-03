import { NAV_ITEMS, HOURS_IN_DAY, MIDNIGT_HOUR } from './constans';

const isUndefined = (value) => {
  return value === undefined;
};

const isNumber = (value) => {
  return typeof value === 'number';
};

const isString = (value) => {
  return typeof value === 'string';
};

const isNull = (value) => {
  return value === null;
};

const isBetween = (value, start, end) => {
  return value >= start && value <= end;
};

const isSelectOptionValid = ({ value, label }) => {
  return isNumber(value) && isString(label);
};

const isNotEmptyString = (value) => {
  return isString(value) && value.length > 0;
};

export const isUndefinedOrNull = (value) => {
  return isUndefined(value) || isNull(value);
};

export const isNumberOrNull = (value) => {
  return isNumber(value) || isNull(value);
};

export const isPageValid = (page) => {
  return Object.keys(NAV_ITEMS).includes(page);
};

export const isHourValid = (hour) => {
  return isNumber(hour) && isBetween(hour, MIDNIGT_HOUR, HOURS_IN_DAY - 1);
};

export const isTimelineValid = ({ hour }) => {
  return isHourValid(hour);
};

export const validateTimelineItems = (timelineItems) => {
  return timelineItems.every(isTimelineValid);
};

export const validateSelectOptions = (options) => {
  return options.every(isSelectOptionValid);
};

export const isActivityValid = (activity) => {
  return isNotEmptyString(activity);
};

export const validateActivities = (activities) => {
  return activities.every(isActivityValid);
};
