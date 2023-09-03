import { PAGE_TIMELINE, HOURS_IN_DAY, MIDNIGT_HOUR } from './constans';
import { isPageValid } from './validators';

export const normalizePageHash = () => {
  const page = window.location.hash.slice(1);

  if (isPageValid(page)) {
    return page;
  }

  window.location.hash = PAGE_TIMELINE;

  return PAGE_TIMELINE;
};

export const generateTimelineItems = () => {
  const timelineItems = [];

  for (let hour = MIDNIGT_HOUR; hour < HOURS_IN_DAY; hour++) {
    timelineItems.push({ hour });
  }

  return timelineItems;
};

export const generateActivitySelectOptions = (activities) => {
  return activities.map((label, value) => ({ label, value }));
};
