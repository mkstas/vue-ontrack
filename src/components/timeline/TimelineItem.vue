<script setup>
import { NULLABLE_ACTIVITY } from '@/constans';
import {
  isTimelineItemValid,
  isActivityValid,
  validateSelectOptions,
  validateActivities,
} from '@/validators';

import BaseSelect from '../@ui/BaseSelect.vue';
import TimelineHour from './TimelineHour.vue';
import TimelineStopwatch from './TimelineStopwatch.vue';

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
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
  selectActivity: isActivityValid,
});

const findActivityById = (id) => {
  return (
    props.activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
  );
};

const selectActivity = (id) => {
  emit('selectActivity', findActivityById(id));
};
</script>

<template>
  <li class="relative flex flex-col gap-2 border-t border-gray-200 py-10 px-4">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      placeholder="Rest"
      :selected="timelineItem.activityId"
      :options="activitySelectOptions"
      @select="selectActivity"
    />
    <TimelineStopwatch :seconds="timelineItem.activitySeconds" />
  </li>
</template>
