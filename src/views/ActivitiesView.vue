<script setup>
import { validateActivities } from '@/validators';

import ActivityItem from '@/components/Activity/ActivityItem.vue';

defineProps({
  activities: {
    type: Array,
    required: true,
    validator: validateActivities,
  },
});
</script>

<template>
  <div>
    <ul class="divide-y">
      <ActivityItem v-for="activity in activities" :key="activity" :activity="activity" />
    </ul>
  </div>
</template>
