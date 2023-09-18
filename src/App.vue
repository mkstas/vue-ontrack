<script setup>
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constans';
import { currentPage, timelineRef } from '@/router';

import TheHeader from '@/components/Header/TheHeader.vue';
import TheNav from '@/components/Nav/TheNav.vue';

import TimelineView from '@/views/TimelineView.vue';
import ActivityView from '@/views/ActivityView.vue';
import ProgressView from '@/views/ProgressView.vue';
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
