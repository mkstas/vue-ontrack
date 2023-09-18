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

export const setTimelineItemActivity = (timelineItem, activityId) => {
  timelineItem.activityId = activityId;
};

export const updateTimelineItemActivitySeconds = (
  timelineItem,
  activitySeconds,
) => {
  timelineItem.activitySeconds += activitySeconds;
};

export const resetTimelineItemActivity = (activity) => {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null;
      timelineItem.activitySeconds = 0;
    }
  });
};

export const getTotalActivitySeconds = (activity) => {
  return timelineItems.value
    .filter((timelineItem) => timelineItem.activityId === activity.id)
    .reduce(
      (totalSeconds, timelineItem) =>
        Math.round(timelineItem.activitySeconds + totalSeconds),
      0,
    );
};
