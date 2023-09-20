<script setup>
import { isTimelineItemValid } from '@/validators';

import { activitySelectOptions } from '@/activities';
import { updateTimelineItem } from '@/timeline-items';

import BaseSelect from '../@ui/BaseSelect.vue';
import TimelineHour from './TimelineHour.vue';
import TimelineStopwatch from './TimelineStopwatch.vue';

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
});
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      placeholder="Rest"
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      @select="updateTimelineItem(timelineItem, { activityId: $event })"
    />
    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>
