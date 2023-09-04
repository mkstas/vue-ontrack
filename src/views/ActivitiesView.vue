<script setup>
import { isNumber, validateActivities, isActivityValid } from '@/validators';

import ActivityItem from '@/components/Activity/ActivityItem.vue';
import TheActivityForm from '@/components/Activity/TheActivityForm.vue';
import TheActivitiesEmptyState from '@/components/Activity/TheActivitiesEmptyState.vue';

defineProps({
  activities: {
    type: Array,
    required: true,
    validator: validateActivities,
  },
});

const emit = defineEmits({
  setActivitySecondsToComplete(activity, secondsToComplete) {
    return [isActivityValid(activity), isNumber(secondsToComplete)].every(
      Boolean,
    );
  },
  deleteActivity: isActivityValid,
  createActivity: isActivityValid,
});

const setSecondsToComplete = (activity, secondsToComplete) => {
  emit('setActivitySecondsToComplete', activity, secondsToComplete);
};
</script>

<template>
  <div class="flex flex-col grow">
    <ul v-if="activities.length > 0" class="divide-y grow">
      <ActivityItem
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
        @delete="emit('deleteActivity', activity)"
        @set-seconds-to-complete="setSecondsToComplete(activity, $event)"
      />
    </ul>
    <TheActivitiesEmptyState v-else />
    <TheActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>
