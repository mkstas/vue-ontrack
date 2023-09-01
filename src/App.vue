<script setup>
import { ref } from 'vue';
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from './constans';

import TheHeader from './components/header/TheHeader.vue';
import TheNav from './components/nav/TheNav.vue';

import TimelineView from './views/TimelineView.vue';
import ActivitiesView from './views/ActivitiesView.vue';
import ProgressView from './views/ProgressView.vue';

const normalizePageHash = () => {
  const hash = window.location.hash.slice(1);

  if ([PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE].includes(hash)) {
    return hash;
  }

  window.location.hash = PAGE_TIMELINE;

  return PAGE_TIMELINE;
};

const currentPage = ref(normalizePageHash());
</script>

<template>
  <TheHeader />

  <main class="flex flex-grow flex-col">
    <TimelineView v-show="currentPage === PAGE_TIMELINE" />
    <ActivitiesView v-show="currentPage === PAGE_ACTIVITIES" />
    <ProgressView v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav :current-page="currentPage" @navigate="currentPage = $event" />
</template>
