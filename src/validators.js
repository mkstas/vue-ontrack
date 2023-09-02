import { NAV_ITEMS, HOURS_IN_DAY } from './constans';

export const isPageValid = (page) => {
  return Object.keys(NAV_ITEMS).includes(page);
};

export const isTimelineValid = ({ hour }) => {
  return typeof hour === 'number' && hour >= 0 && hour < HOURS_IN_DAY;
};
