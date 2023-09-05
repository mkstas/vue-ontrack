<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline';

import { PERIOD_SELECT_OPTIONS, BUTTON_TYPE_DANGER } from '@/constans';
import { isNumber, isActivityValid, isUndefined } from '@/validators';

import BaseButton from '../@ui/BaseButton.vue';
import BaseSelect from '../@ui/BaseSelect.vue';

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
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="emit('delete')">
        <TrashIcon class="h-8" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div>
      <BaseSelect
        class="font-mono"
        placeholder="hh:mm"
        :selected="activity.secondsToComplete || null"
        :options="PERIOD_SELECT_OPTIONS"
        @select="emit('setSecondsToComplete', $event || 0)"
      />
    </div>
  </li>
</template>
