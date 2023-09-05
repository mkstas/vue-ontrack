<script setup>
import { nextTick, ref, watchPostEffect } from 'vue';

import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constans';
import {
  isActivityValid,
  isTimelineItemValid,
  isPageValid,
  validateTimelineItems,
  validateSelectOptions,
  validateActivities,
} from '@/validators';

import TimelineItem from '@/components/Timeline/TimelineItem.vue';

const props = defineProps({
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
  currentPage: {
    type: String,
    required: true,
    validator: isPageValid,
  },
});

const emit = defineEmits({
  setTimelineItemActivity(timelineItem, activity) {
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(
      Boolean,
    );
  },
});

const timelineItemRefs = ref([]);

const scrollToCurrentTimleLineItem = () => {
  const currentHour = new Date().getHours();

  if (currentHour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView();
  } else {
    timelineItemRefs.value[currentHour - 1].$el.scrollIntoView();
  }
};

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick();
    scrollToCurrentTimleLineItem();
  }
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
        ref="timelineItemRefs"
        @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
      />
    </ul>
  </div>
</template>
