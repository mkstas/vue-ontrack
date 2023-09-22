import { ref, computed } from 'vue';

// import { SECONDS_IN_HOUR } from '@/constans';
import { HUNDRED_PERCENT } from '@/constans';
import { id } from '@/functions';

const generateActivities = () => {
  return ['Coding', 'Reading', 'Trainig'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: 15 * 60, // hours * SECONDS_IN_HOUR,
  }));
};

const generateActivitySelectOptions = (activities) => {
  return activities.map((activity) => ({
    label: activity.name,
    value: activity.id,
  }));
};

export const activities = ref(generateActivities());

export const trackedActivities = computed(() =>
  activities.value.filter(({ secondsToComplete }) => secondsToComplete),
);

const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.value
    .map(({ secondsToComplete }) => secondsToComplete)
    .reduce((total, seconds) => total + seconds, 0);
});

export const activitySelectOptions = computed(() =>
  generateActivitySelectOptions(activities.value),
);

export const createActivity = (activity) => {
  activities.value.push(activity);
};

export const deleteActivity = (activity) => {
  activities.value.splice(activities.value.indexOf(activity), 1);
};

export const updateActivity = (activity, fields) => {
  return Object.assign(activity, fields);
};

export const calculateCompletionPercentage = (totalTrackedSeconds) => {
  return Math.floor(
    (totalTrackedSeconds * HUNDRED_PERCENT) /
      totalActivitySecondsToComplete.value,
  );
};

export const calculateActivityCompletionPercentage = (
  { secondsToComplete },
  trackedSeconds,
) => {
  return Math.floor((trackedSeconds * HUNDRED_PERCENT) / secondsToComplete);
};
