import { ref } from 'vue';

import { HOURS_IN_DAY } from '@/constans';

import { activities } from '@/activities';

const generateTimelineItems = () => {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: [0, 1, 2, 3, 4].includes(hour)
      ? activities.value[hour % 3].id
      : null,
    activitySeconds: [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : null,
  }));
};

export const timelineItems = ref(generateTimelineItems());

export const updateTimelineItem = (timelineItem, fields) => {
  return Object.assign(timelineItem, fields);
};

const hasActivity = (timelineItem, activity) => {
  return timelineItem.activityId === activity.id;
};

export const resetTimelineItemActivity = (activity) => {
  timelineItems.value
    .filter((timelineItem) => hasActivity(timelineItem, activity))
    .forEach((timelineItem) =>
      updateTimelineItem(timelineItem, {
        activityId: null,
        activitySeconds: 0,
      }),
    );
};

export const getTotalActivitySeconds = (activity) => {
  return timelineItems.value
    .filter((timelineItem) => hasActivity(timelineItem, activity))
    .reduce(
      (totalSeconds, timelineItem) =>
        Math.round(timelineItem.activitySeconds + totalSeconds),
      0,
    );
};
