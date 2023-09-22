import { computed } from 'vue';

import { getProgressColorClass } from '@/functions';
import { calculateActivityCompletionPercentage } from '@/activities';
import {
  timelineItems,
  calculateTrackedActivitySeconds,
} from '@/timeline-items';

export const useProgress = (activity) => {
  const percentage = computed(() =>
    calculateActivityCompletionPercentage(
      activity,
      trackedActivitySeconds.value,
    ),
  );

  const trackedActivitySeconds = computed(() =>
    calculateTrackedActivitySeconds(timelineItems.value, activity),
  );

  const colorClass = computed(() => getProgressColorClass(percentage.value));

  return {
    percentage,
    trackedActivitySeconds,
    colorClass,
  };
};
