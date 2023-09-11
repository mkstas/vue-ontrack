<script setup>
import { inject, nextTick, ref, watchPostEffect } from 'vue';

import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constans';
import {
  isActivityValid,
  isTimelineItemValid,
  isPageValid,
  validateSelectOptions,
  validateActivities,
} from '@/validators';

import TimelineItem from '@/components/Timeline/TimelineItem.vue';

const props = defineProps({
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

defineExpose({ scrollToHour });

const timelineItems = inject('timelineItems');

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
      />
    </ul>
  </div>
</template>
