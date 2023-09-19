import { ref, computed } from 'vue';

import { SECONDS_IN_HOUR } from '@/constans';
import { id } from '@/functions';

const generateActivities = () => {
  return ['Coding', 'Reading', 'Trainig'].map((name, hours) => ({
    id: id(),
    name,
    secondsToComplete: hours * SECONDS_IN_HOUR,
  }));
};

const generateActivitySelectOptions = (activities) => {
  return activities.map((activity) => ({
    label: activity.name,
    value: activity.id,
  }));
};

export const activities = ref(generateActivities());

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
