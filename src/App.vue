<script setup>
import { ref, provide, readonly } from 'vue';

import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constans';
import {
  generateTimelineItems,
  generatePeriodSelectOptions,
} from '@/functions';
import { currentPage, timelineRef } from '@/router';
import * as keys from '@/keys';

import {
  activities,
  activitySelectOptions,
  createActivity,
  deleteActivity,
  setActivitySecondsToComplete,
} from '@/activities';

import TheHeader from '@/components/Header/TheHeader.vue';
import TheNav from '@/components/Nav/TheNav.vue';

import TimelineView from '@/views/TimelineView.vue';
import ActivityView from '@/views/ActivityView.vue';
import ProgressView from '@/views/ProgressView.vue';

const timelineItems = ref(generateTimelineItems(activities));

const setTimelineItemActivity = (timelineItem, activityId) => {
  timelineItem.activityId = activityId;
};

const updateTimelineItemActivitySeconds = (timelineItem, activitySeconds) => {
  timelineItem.activitySeconds += activitySeconds;
};

provide(keys.activitiesKey, activities.value);
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions));
provide(keys.timelineItemsKey, timelineItems);
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()));

provide(
  keys.updateTimelineItemActivitySecondsKey,
  updateTimelineItemActivitySeconds,
);
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity);
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete);
provide(keys.createActivityKey, createActivity);
provide(keys.deleteActivityKey, deleteActivity);
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
