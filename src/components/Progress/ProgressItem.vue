<script setup>
import { computed } from 'vue';

import { isActivityValid } from '@/validators';
import { getProgressColorClass, formatSeconds } from '@/functions';
import { calculateActivityCompletionPercentage } from '@/activities';
import { calculateTrackedActivitySeconds } from '@/timeline-items';

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
});

const percentage = computed(() =>
  calculateActivityCompletionPercentage(
    props.activity,
    calculateTrackedActivitySeconds(props.activity),
  ),
);
</script>

<template>
  <li class="flex flex-col gap-1 p-4">
    <div class="truncate text-xl">{{ activity.name }}</div>
    <div class="flex h-5 overflow-hidden rounded bg-neutral-200">
      <div
        :class="getProgressColorClass(percentage)"
        :style="`width: ${percentage}%`"
      ></div>
    </div>
    <div class="flex justify-between font-mono text-sm">
      <span>{{ percentage }}%</span>
      <span
        >{{ formatSeconds(calculateTrackedActivitySeconds(activity)) }} /
        {{ formatSeconds(activity.secondsToComplete) }}</span
      >
    </div>
  </li>
</template>
