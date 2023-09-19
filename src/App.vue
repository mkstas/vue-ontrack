<script setup>
import { routes, currentPage } from '@/router';

import TheHeader from '@/components/Header/TheHeader.vue';
import TheNav from '@/components/Nav/TheNav.vue';
</script>

<template>
  <TheHeader />

  <main class="flex flex-grow flex-col">
    <KeepAlive>
      <component :is="routes[currentPage]" />
    </KeepAlive>
  </main>

  <TheNav />
</template>
