<script setup>
import { inject } from 'vue';
import { TrashIcon } from '@heroicons/vue/24/outline';

import { BUTTON_TYPE_DANGER } from '@/constans';
import { isActivityValid } from '@/validators';

import {
  periodSelectOptionsKey,
  setActivitySecondsToCompleteKey,
  deleteActivityKey,
} from '@/keys';

import BaseButton from '../@ui/BaseButton.vue';
import BaseSelect from '../@ui/BaseSelect.vue';
import ActivitySecondsToComplete from './ActivitySecondsToComplete.vue';

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
});

const periodSelectOptions = inject(periodSelectOptionsKey);
const setActivitySecondsToComplete = inject(setActivitySecondsToCompleteKey);
const deleteActivity = inject(deleteActivityKey);
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteActivity(activity)">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="grow font-mono"
        placeholder="hh:mm"
        :options="periodSelectOptions"
        :selected="activity.secondsToComplete || null"
        @select="setActivitySecondsToComplete(activity, $event || 0)"
      />
      <ActivitySecondsToComplete
        v-if="activity.secondsToComplete"
        :activity="activity"
      />
    </div>
  </li>
</template>
