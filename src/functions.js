import { PAGE_TIMELINE, HOURS_IN_DAY, MIDNIGT_HOUR, SECONDS_IN_HOUR } from './constans';
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

export const id = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const generateActivities = () => {
  return [
    {
      id: id(),
      name: 'Coding',
      secondsToComplete: 0 * SECONDS_IN_HOUR,
    },
    {
      id: id(),
      name: 'Training',
      secondsToComplete: 1 * SECONDS_IN_HOUR,
    },
    {
      id: id(),
      name: 'Reading',
      secondsToComplete: 2 * SECONDS_IN_HOUR,
    },
  ];
};

export const generateActivitySelectOptions = (activities) => {
  return activities.map((activity) => ({ label: activity.name, value: activity.id }));
};
