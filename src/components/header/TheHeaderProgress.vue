<script setup>
import { PAGE_PROGRESS, HUNDRED_PERCENT } from '@/constans';
import { ICON_CHECK_CIRCLE } from '@/icons';
import { useTotalProgress } from '@/composables/totalProgress';

import { navigate } from '@/router';

import BaseIcon from '../@ui/BaseIcon.vue';

const { colorClass, percentage } = useTotalProgress();
</script>

<template>
  <a
    :href="`#${PAGE_PROGRESS}`"
    class="text-sm"
    @click="navigate(PAGE_PROGRESS)"
  >
    <div v-if="percentage < HUNDRED_PERCENT" class="flex items-center gap-1">
      <div>
        Progress: <span class="font-mono">{{ percentage }}%</span>
      </div>
      <div :class="`h-3 w-3 rounded-full ${colorClass}`"></div>
    </div>
    <div v-else class="flex items-center gap-1">
      <div>Day complete!</div>
      <BaseIcon :name="ICON_CHECK_CIRCLE" class="h-7 text-green-500" />
    </div>
  </a>
</template>
