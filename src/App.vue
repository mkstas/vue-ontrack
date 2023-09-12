<script setup>
import { ref, computed, provide } from 'vue';

import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constans';
import {
  normalizePageHash,
  generateTimelineItems,
  generateActivities,
  generateActivitySelectOptions,
  generatePeriodSelectOptions,
} from '@/functions';

import TheHeader from '@/components/Header/TheHeader.vue';
import TheNav from '@/components/Nav/TheNav.vue';

import TimelineView from '@/views/TimelineView.vue';
import ActivityView from '@/views/ActivityView.vue';
import ProgressView from '@/views/ProgressView.vue';

const currentPage = ref(normalizePageHash());
const activities = ref(generateActivities());
const timelineItems = ref(generateTimelineItems(activities));
const timeline = ref();

const activitySelectOptions = computed(() =>
  generateActivitySelectOptions(activities.value),
);

const goTo = (page) => {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timeline.value.scrollToHour();
  }

  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView();
  }

  currentPage.value = page;
};

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
</script>

<template>
  <TheHeader @navigate="goTo($event)" />

  <main class="flex flex-grow flex-col">
    <TimelineView
      v-show="currentPage === PAGE_TIMELINE"
      :activities="activities"
      :current-page="currentPage"
      ref="timeline"
    />
    <ActivityView
      v-show="currentPage === PAGE_ACTIVITIES"
      @create-activity="createActivity"
      @delete-activity="deleteActivity"
    />
    <ProgressView v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
