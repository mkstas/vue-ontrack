<script setup>
import { nextTick, ref, watchPostEffect } from 'vue';

import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constans';
import {
  isActivityValid,
  isTimelineItemValid,
  isPageValid,
  isNumber,
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
  updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
    return [isTimelineItemValid(timelineItem), isNumber(activitySeconds)].every(
      Boolean,
    );
  },
  setTimelineItemActivity(timelineItem, activity) {
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(
      Boolean,
    );
  },
});

defineExpose({ scrollToHour });

const timelineItemRefs = ref([]);

function scrollToHour(hour = null, isSmooth = true) {
  hour ??= new Date().getHours();

  const options = {
    behavior: isSmooth ? 'smooth' : 'instant',
  };

  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView(options);
  } else {
    timelineItemRefs.value[hour - 1].$el.scrollIntoView(options);
  }
}

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick();
    scrollToHour(null, false);
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
        @scroll-to-hour="scrollToHour"
        @update-activity-seconds="
          emit('updateTimelineItemActivitySeconds', timelineItem, $event)
        "
      />
    </ul>
  </div>
</template>
