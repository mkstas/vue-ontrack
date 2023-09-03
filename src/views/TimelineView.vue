<script setup>
import { validateTimelineItems } from '@/validators';

import TimelineItem from '@/components/Timeline/TimelineItem.vue';

defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
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
