<script setup>
import {
  isNull,
  isTimelineItemValid,
  isActivityValid,
  validateSelectOptions,
  validateActivities,
} from '@/validators';

import BaseSelect from '../@ui/BaseSelect.vue';
import TimelineHour from './TimelineHour.vue';

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
  selectActivity(activity) {
    return isNull(activity) || isActivityValid(activity);
  },
});

const selectActivity = (id) => {
  emit(
    'selectActivity',
    props.activities.find((activity) => activity.id === id) || null,
  );
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
  </li>
</template>
