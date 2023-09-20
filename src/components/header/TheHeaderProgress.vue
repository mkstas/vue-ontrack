<script setup>
import { PAGE_PROGRESS } from '@/constans';
import { ICON_CHECK_CIRCLE } from '@/icons';

import { navigate } from '@/router';

import BaseIcon from '../@ui/BaseIcon.vue';
</script>

<template>
  <a
    :href="`#${PAGE_PROGRESS}`"
    class="text-sm"
    @click="navigate(PAGE_PROGRESS)"
  >
    <div v-if="true" class="flex items-center gap-1">
      <div>Day complete!</div>
      <BaseIcon :name="ICON_CHECK_CIRCLE" class="h-7 text-green-500" />
    </div>
    <div v-else class="flex items-center gap-1">
      <div>Progress: <span class="font-mono">20%</span></div>
      <div class="h-3 w-3 rounded-full bg-red-500"></div>
    </div>
  </a>
</template>
