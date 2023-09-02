<script setup>
import { isTimelineValid } from '../validators';

import TimelineItem from '../components/timeline/TimelineItem.vue';

defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator(timelineItems) {
      return timelineItems.every(isTimelineValid);
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
