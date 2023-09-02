<script setup>
import { HOURS_IN_DAY } from '../constans';

import TimelineItem from '../components/timeline/TimelineItem.vue';

defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator(timelineItems) {
      return timelineItems.every(
        ({ hour }) => typeof hour === 'number' && hour >= 0 && hour < HOURS_IN_DAY,
      );
    },
  },
});
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timelineItem="timelineItem"
      />
    </ul>
  </div>
</template>
