<script setup>
import { ref } from 'vue';

import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constans';
import {
  normalizePageHash,
  generateTimelineItems,
  generateActivitySelectOptions,
} from '@/functions';

import TheHeader from '@/components/header/TheHeader.vue';
import TheNav from '@/components/nav/TheNav.vue';

import TimelineView from '@/views/TimelineView.vue';
import ActivitiesView from '@/views/ActivitiesView.vue';
import ProgressView from '@/views/ProgressView.vue';

const currentPage = ref(normalizePageHash());

const timelineItems = generateTimelineItems();

const activities = ref(['Coding', 'Reading', 'Training']);

const activitySelectOptions = generateActivitySelectOptions(activities.value);

const goTo = (page) => {
  currentPage.value = page;
};

const createActivity = (activity) => {
  activities.value.push(activity);
};

const deleteActivity = (activity) => {
  activities.value.splice(activities.value.indexOf(activity), 1);
};
</script>

<template>
  <TheHeader @navigate="goTo($event)" />

  <main class="flex flex-grow flex-col">
    <TimelineView
      v-show="currentPage === PAGE_TIMELINE"
      :timeline-items="timelineItems"
      :activity-select-options="activitySelectOptions"
    />
    <ActivitiesView
      v-show="currentPage === PAGE_ACTIVITIES"
      :activities="activities"
      @create-activity="createActivity"
      @delete-activity="deleteActivity"
    />
    <ProgressView v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)" />
</template>
