<script setup>
import { ref, watch } from 'vue';

import {
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_DANGER,
  MILLISECONDS_IN_SECOND,
} from '@/constans';
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/icons';
import { isTimelineItemValid } from '@/validators';
import { formatSeconds, currentHour } from '@/functions';
import { updateTimelineItem } from '@/timeline-items';

import BaseButton from '../@ui/BaseButton.vue';
import BaseIcon from '../@ui/BaseIcon.vue';

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
});

const seconds = ref(props.timelineItem.activitySeconds);
const isRunning = ref(false);
const temp = 120;

const isStartButtonDisabled = props.timelineItem.hour !== currentHour();

const start = () => {
  isRunning.value = setInterval(() => {
    updateTimelineItem(props.timelineItem, {
      activitySeconds: props.timelineItem.activitySeconds + temp,
    });

    seconds.value++;
  }, MILLISECONDS_IN_SECOND);
};

const stop = () => {
  clearInterval(isRunning.value);

  isRunning.value = false;
};

const reset = () => {
  stop();

  updateTimelineItem(props.timelineItem, {
    activitySeconds: props.timelineItem.activitySeconds - seconds.value * temp,
  });

  seconds.value = 0;
};

watch(
  () => props.timelineItem.activityId,
  () => {
    updateTimelineItem(props.timelineItem, {
      activitySeconds: seconds.value * temp,
    });
  },
);
</script>

<template>
  <div class="flex w-full gap-2">
    <BaseButton :type="BUTTON_TYPE_DANGER" :disabled="!seconds" @click="reset">
      <BaseIcon :name="ICON_ARROW_PATH" />
    </BaseButton>
    <div
      class="flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl"
    >
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton v-if="isRunning" :type="BUTTON_TYPE_WARNING" @click="stop">
      <BaseIcon :name="ICON_PAUSE" />
    </BaseButton>
    <BaseButton
      v-else
      :type="BUTTON_TYPE_SUCCESS"
      :disabled="isStartButtonDisabled"
      @click="start"
    >
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>
