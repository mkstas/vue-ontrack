import { ref } from 'vue';

import { generateTimelineItems } from '@/functions';

import { activities } from '@/activities';

export const timelineItems = ref(generateTimelineItems(activities));

export const setTimelineItemActivity = (timelineItem, activityId) => {
  timelineItem.activityId = activityId;
};

export const updateTimelineItemActivitySeconds = (
  timelineItem,
  activitySeconds,
) => {
  timelineItem.activitySeconds += activitySeconds;
};
