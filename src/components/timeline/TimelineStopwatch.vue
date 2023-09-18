<script setup>
import { ref } from 'vue';
import { ArrowPathIcon, PauseIcon, PlayIcon } from '@heroicons/vue/24/outline';

import {
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_DANGER,
  MILLISECONDS_IN_SECOND,
} from '@/constans';
import { isTimelineItemValid } from '@/validators';
import { formatSeconds, currentHour } from '@/functions';
import { updateTimelineItemActivitySeconds } from '@/timeline-items';

import BaseButton from '../@ui/BaseButton.vue';

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
});

const seconds = ref(props.timelineItem.activitySeconds);
const isRunning = ref(false);

const isStartButtonDisabled = props.timelineItem.hour !== currentHour();

const start = () => {
  isRunning.value = setInterval(() => {
    updateTimelineItemActivitySeconds(props.timelineItem, 1);

    seconds.value++;
  }, MILLISECONDS_IN_SECOND);
};

const stop = () => {
  clearInterval(isRunning.value);

  isRunning.value = false;
};

const reset = () => {
  stop();

  updateTimelineItemActivitySeconds(props.timelineItem, -seconds.value);

  seconds.value = 0;
};
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!seconds" @click="reset">
      <ArrowPathIcon class="h-8" />
    </BaseButton>
    <div
      class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl"
    >
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <PauseIcon class="h-8" />
    </BaseButton>
    <BaseButton
      v-else
      :type="BUTTON_TYPE_SUCCESS"
      :disabled="isStartButtonDisabled"
      @click="start"
    >
      <PlayIcon class="h-8" />
    </BaseButton>
  </div>
</template>
