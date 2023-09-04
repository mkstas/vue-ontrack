<script setup>
import { validateActivities, isActivityValid } from '@/validators';

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
  deleteActivity: isActivityValid,
  createActivity: isActivityValid,
});
</script>

<template>
  <div class="flex flex-col grow">
    <ul v-if="activities.length > 0" class="divide-y grow">
      <ActivityItem
        v-for="activity in activities"
        :key="activity"
        :activity="activity"
        @delete="emit('deleteActivity', activity)"
      />
    </ul>
    <TheActivitiesEmptyState v-else />
    <TheActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>
