import { ref, computed } from 'vue';

import { generateActivities, generateActivitySelectOptions } from '@/functions';

export const activities = ref(generateActivities());

export const activitySelectOptions = computed(() =>
  generateActivitySelectOptions(activities.value),
);

export const createActivity = (activity) => {
  activities.value.push(activity);
};

export const deleteActivity = (activity) => {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null;
      timelineItem.activitySeconds = 0;
    }
  });

  activities.value.splice(activities.value.indexOf(activity), 1);
};

export const setActivitySecondsToComplete = (activity, secondsToComplete) => {
  activity.secondsToComplete = secondsToComplete || 0;
};
