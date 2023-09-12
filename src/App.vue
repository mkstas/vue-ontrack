<script setup>
import { ref, computed, provide } from 'vue';

import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constans';
import {
  generateTimelineItems,
  generateActivities,
  generateActivitySelectOptions,
  generatePeriodSelectOptions,
} from '@/functions';

import { currentPage, navigate, timelineRef } from '@/router';

import TheHeader from '@/components/Header/TheHeader.vue';
import TheNav from '@/components/Nav/TheNav.vue';

import TimelineView from '@/views/TimelineView.vue';
import ActivityView from '@/views/ActivityView.vue';
import ProgressView from '@/views/ProgressView.vue';

const activities = ref(generateActivities());
const timelineItems = ref(generateTimelineItems(activities));

const activitySelectOptions = computed(() =>
  generateActivitySelectOptions(activities.value),
);

const createActivity = (activity) => {
  activities.value.push(activity);
};

const deleteActivity = (activity) => {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null;
      timelineItem.activitySeconds = 0;
    }
  });

  activities.value.splice(activities.value.indexOf(activity), 1);
};

const setTimelineItemActivity = (timelineItem, activityId) => {
  timelineItem.activityId = activityId;
};

const updateTimelineItemActivitySeconds = (timelineItem, activitySeconds) => {
  timelineItem.activitySeconds += activitySeconds;
};

const setActivitySecondsToComplete = (activity, secondsToComplete) => {
  activity.secondsToComplete = secondsToComplete;
};

provide('activities', activities.value);
provide('activitySelectOptions', activitySelectOptions.value);
provide('timelineItems', timelineItems.value);
provide('periodSelectOptions', generatePeriodSelectOptions());
provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds);
provide('setTimelineItemActivity', setTimelineItemActivity);
provide('setActivitySecondsToComplete', setActivitySecondsToComplete);
provide('createActivity', createActivity);
provide('deleteActivity', deleteActivity);
</script>

<template>
  <TheHeader @navigate="navigate" />

  <main class="flex flex-grow flex-col">
    <TimelineView
      v-show="currentPage === PAGE_TIMELINE"
      :current-page="currentPage"
      ref="timelineRef"
    />
    <ActivityView v-show="currentPage === PAGE_ACTIVITIES" />
    <ProgressView v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav :current-page="currentPage" @navigate="navigate" />
</template>
