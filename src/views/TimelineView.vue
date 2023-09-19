<script setup>
import { nextTick, watchPostEffect } from 'vue';

import { PAGE_TIMELINE } from '@/constans';

import { currentPage } from '@/router';

import {
  timelineItems,
  timelineItemRefs,
  scrollToHour,
  scrollToCurrentHour,
} from '@/timeline-items';

import TimelineItem from '@/components/Timeline/TimelineItem.vue';

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
    await nextTick();
    scrollToCurrentHour(false);
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
