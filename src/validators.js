import {
  NAV_ITEMS,
  HOURS_IN_DAY,
  MIDNIGT_HOUR,
  BUTTON_TYPES,
} from './constans';

export const isNull = (value) => {
  return value === null;
};

export const isUndefined = (value) => {
  return value === undefined;
};

export const isNumber = (value) => {
  return typeof value === 'number';
};

export const isString = (value) => {
  return typeof value === 'string';
};

export const isBetween = (value, start, end) => {
  return value >= start && value <= end;
};

export const isNotEmptyString = (value) => {
  return isString(value) && value.length > 0;
};

export const isUndefinedOrNull = (value) => {
  return isUndefined(value) || isNull(value);
};

export const isNumberOrNull = (value) => {
  return isNumber(value) || isNull(value);
};

export const isSelectOptionValid = ({ value, label }) => {
  return (
    isNumber(value) || (isNotEmptyString(label) && isNotEmptyString(label))
  );
};

export const isSelectValueValid = (value) => {
  return isNotEmptyString(value) || isNumberOrNull(value);
};

export const isPageValid = (page) => {
  return Object.keys(NAV_ITEMS).includes(page);
};

export const isButtonTypeValid = (type) => {
  return BUTTON_TYPES.includes(type);
};

export const isHourValid = (hour) => {
  return isNumber(hour) && isBetween(hour, MIDNIGT_HOUR, HOURS_IN_DAY - 1);
};

export const isTimelineValid = ({ hour }) => {
  return isHourValid(hour);
};

export const isActivityValid = ({ id, name, secondsToComplete }) => {
  return [
    isNotEmptyString(id),
    isNotEmptyString(name),
    isNumber(secondsToComplete),
  ].every(Boolean);
};

export const validateTimelineItems = (timelineItems) => {
  return timelineItems.every(isTimelineValid);
};

export const validateSelectOptions = (options) => {
  return options.every(isSelectOptionValid);
};

export const validateActivities = (activities) => {
  return activities.every(isActivityValid);
};
