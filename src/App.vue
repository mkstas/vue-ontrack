<script setup>
import { provide, readonly } from 'vue';

import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constans';
import { generatePeriodSelectOptions } from '@/functions';
import { currentPage, timelineRef } from '@/router';
import * as keys from '@/keys';

import {
  activitySelectOptions,
  createActivity,
  deleteActivity,
  setActivitySecondsToComplete,
} from '@/activities';

import {
  setTimelineItemActivity,
  updateTimelineItemActivitySeconds,
  resetTimelineItemActivity,
} from '@/timeline-items';

import TheHeader from '@/components/Header/TheHeader.vue';
import TheNav from '@/components/Nav/TheNav.vue';

import TimelineView from '@/views/TimelineView.vue';
import ActivityView from '@/views/ActivityView.vue';
import ProgressView from '@/views/ProgressView.vue';

provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions));
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()));

provide(
  keys.updateTimelineItemActivitySecondsKey,
  updateTimelineItemActivitySeconds,
);
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity);
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete);
provide(keys.createActivityKey, createActivity);
provide(keys.deleteActivityKey, (activity) => {
  resetTimelineItemActivity(activity);
  deleteActivity(activity);
});
</script>

<template>
  <TheHeader />

  <main class="flex flex-grow flex-col">
    <TimelineView v-show="currentPage === PAGE_TIMELINE" ref="timelineRef" />
    <ActivityView v-show="currentPage === PAGE_ACTIVITIES" />
    <ProgressView v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav />
</template>
