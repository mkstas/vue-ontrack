<script setup>
import { inject } from 'vue';
import { TrashIcon } from '@heroicons/vue/24/outline';

import { BUTTON_TYPE_DANGER } from '@/constans';
import { isNumber, isActivityValid, isUndefined } from '@/validators';

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

const emit = defineEmits({
  delete: isUndefined,
  setSecondsToComplete: isNumber,
});

const periodSelectOptions = inject('periodSelectOptions');
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="grow font-mono"
        placeholder="hh:mm"
        :selected="activity.secondsToComplete || null"
        :options="periodSelectOptions"
        @select="emit('setSecondsToComplete', $event || 0)"
      />
      <ActivitySecondsToComplete
        v-if="activity.secondsToComplete"
        :activity="activity"
      />
    </div>
  </li>
</template>
