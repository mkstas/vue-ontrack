<script setup>
import { PAGE_TIMELINE } from '@/constans';

import { navigate, currentPage } from '@/router';

import { scrollToCurrentHour } from '@/timeline-items';

const handleClick = () => {
  currentPage.value === PAGE_TIMELINE
    ? scrollToCurrentHour(true)
    : navigate(PAGE_TIMELINE);
};
</script>

<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="handleClick">
    <img src="@/assets/img/logo.png" alt="Logo" class="h-9" />
  </a>
</template>
