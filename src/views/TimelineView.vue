<script setup>
import {
  isNull,
  isActivityValid,
  isTimelineItemValid,
  validateTimelineItems,
  validateSelectOptions,
  validateActivities,
} from '@/validators';

import TimelineItem from '@/components/Timeline/TimelineItem.vue';

defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
  },
  activities: {
    type: Object,
    type: Array,
    validator: validateActivities,
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateSelectOptions,
  },
});

const emit = defineEmits({
  setTimelineItemActivity({ timelineItem, activity }) {
    return [
      isTimelineItemValid(timelineItem),
      isNull(activity) || isActivityValid(activity),
    ].every(Boolean);
  },
});
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        :timeline-item="timelineItem"
        :activities="activities"
        :activity-select-options="activitySelectOptions"
        @select-activity="
          emit('setTimelineItemActivity', {
            timelineItem,
            activity: $event,
          })
        "
      />
    </ul>
  </div>
</template>
