<script setup>
import { nextTick, ref, watchPostEffect } from 'vue';

import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constans';
import { currentHour } from '@/functions';

import { currentPage } from '@/router';
import { timelineItems } from '@/timeline-items';

import TimelineItem from '@/components/Timeline/TimelineItem.vue';

defineExpose({ scrollToHour });

const timelineItemRefs = ref([]);

function scrollToHour(hour = null, isSmooth = true) {
  hour ??= currentHour();

  const options = {
    behavior: isSmooth ? 'smooth' : 'instant',
  };

  const element =
    hour === MIDNIGHT_HOUR
      ? document.body
      : timelineItemRefs.value[hour - 1].$el;

  element.scrollIntoView(options);
}

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
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
        ref="timelineItemRefs"
        @scroll-to-hour="scrollToHour(timelineItem.hour)"
      />
    </ul>
  </div>
</template>
