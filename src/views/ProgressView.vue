<script setup>
import { trackedActivities } from '@/activities';

import ProgressItem from '@/components/progress/ProgressItem.vue';
import TheProgressEmptyState from '@/components/progress/TheProgressEmptyState.vue';
</script>

<template>
  <ul v-if="trackedActivities.length" class="divide-y">
    <ProgressItem
      v-for="activity in trackedActivities"
      :key="activity.id"
      :activity="activity"
    />
  </ul>
  <TheProgressEmptyState v-else />
</template>
