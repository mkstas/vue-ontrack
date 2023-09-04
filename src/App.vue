<script setup>
import { ref, computed } from 'vue';

import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constans';
import {
  normalizePageHash,
  generateTimelineItems,
  generateActivities,
  generateActivitySelectOptions,
} from '@/functions';

import TheHeader from '@/components/Header/TheHeader.vue';
import TheNav from '@/components/Nav/TheNav.vue';

import TimelineView from '@/views/TimelineView.vue';
import ActivitiesView from '@/views/ActivitiesView.vue';
import ProgressView from '@/views/ProgressView.vue';

const currentPage = ref(normalizePageHash());

const timelineItems = ref(generateTimelineItems());

const activities = ref(generateActivities());

const activitySelectOptions = computed(() =>
  generateActivitySelectOptions(activities.value),
);

const goTo = (page) => {
  currentPage.value = page;
};

const createActivity = (activity) => {
  activities.value.push(activity);
};

const deleteActivity = (activity) => {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null;
    }
  });

  activities.value.splice(activities.value.indexOf(activity), 1);
};

const setTimelineItemActivity = ({ timelineItem, activity }) => {
  timelineItem.activityId = activity?.id || null;
};

const setActivitySecondsToComplete = (activity, secondsToComplete) => {
  activity.secondsToComplete = secondsToComplete;
};
</script>

<template>
  <TheHeader @navigate="goTo($event)" />

  <main class="flex flex-grow flex-col">
    <TimelineView
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activities="activities"
      :activity-select-options="activitySelectOptions"
      @set-timeline-item-activity="setTimelineItemActivity"
    />
    <ActivitiesView
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
      @create-activity="createActivity"
      @delete-activity="deleteActivity"
      @set-activity-seconds-to-complete="setActivitySecondsToComplete"
    />
    <ProgressView v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
