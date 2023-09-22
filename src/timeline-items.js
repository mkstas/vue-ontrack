import { ref } from 'vue';

import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constans';
import { currentHour } from '@/functions';

export const timelineItemRefs = ref([]);

const generateTimelineItems = () => {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: null, // [0, 1, 2, 3, 4].includes(hour)
    // ? activities.value[hour % 3].id
    // : null,
    activitySeconds: 0, // [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : null,
  }));
};

export const timelineItems = ref(generateTimelineItems());

export const updateTimelineItem = (timelineItem, fields) => {
  return Object.assign(timelineItem, fields);
};

const filterTimelineItemsByActivity = (timelineItems, { id }) => {
  return timelineItems.filter(({ activityId }) => activityId === id);
};

export const resetTimelineItemActivity = (timelineItems, activity) => {
  filterTimelineItemsByActivity(timelineItems, activity).forEach(
    (timelineItem) =>
      updateTimelineItem(timelineItem, {
        activityId: null,
        activitySeconds:
          timelineItem.hour === currentHour()
            ? timelineItem.activitySeconds
            : 0,
      }),
  );
};

export const calculateTrackedActivitySeconds = (timelineItems, activity) => {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0);
};

export const scrollToHour = (hour, isSmooth = true) => {
  const element =
    hour === MIDNIGHT_HOUR
      ? document.body
      : timelineItemRefs.value[hour - 1].$el;

  element.scrollIntoView({
    behavior: isSmooth ? 'smooth' : 'instant',
  });
};

export const scrollToCurrentHour = (isSmooth = false) => {
  scrollToHour(currentHour(), isSmooth);
};
