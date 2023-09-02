import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE, HOURS_IN_DAY } from './constans';

export const normalizePageHash = () => {
  const hash = window.location.hash.slice(1);

  if ([PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE].includes(hash)) {
    return hash;
  }

  window.location.hash = PAGE_TIMELINE;

  return PAGE_TIMELINE;
};

export const generateTimelineItems = () => {
  const timelineItems = [];

  for (let hour = 0; hour < HOURS_IN_DAY; hour++) {
    timelineItems.push({ hour });
  }

  return timelineItems;
};
