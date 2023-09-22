<script setup>
import { watch } from 'vue';

import {
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  BUTTON_TYPE_DANGER,
} from '@/constans';
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/icons';
import { isTimelineItemValid } from '@/validators';
import { formatSeconds, currentHour } from '@/functions';
import { updateTimelineItem } from '@/timeline-items';

import { useStopwatch } from '@/composables/stopwatch';

import BaseButton from '../@ui/BaseButton.vue';
import BaseIcon from '../@ui/BaseIcon.vue';

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
});

const updateTimelineItemActivitySeconds = () => {
  updateTimelineItem(props.timelineItem, {
    activitySeconds: seconds.value,
  });
};

const { seconds, isRunning, start, stop, reset } = useStopwatch(
  props.timelineItem.activitySeconds,
  updateTimelineItemActivitySeconds,
);

watch(() => props.timelineItem.activityId, updateTimelineItemActivitySeconds);
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
      :disabled="props.timelineItem.hour !== currentHour()"
      @click="start"
    >
      <BaseIcon :name="ICON_PLAY" />
    </BaseButton>
  </div>
</template>
