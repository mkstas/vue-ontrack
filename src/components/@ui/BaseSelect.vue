<script setup>
import { computed } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

import { BUTTON_TYPE_NEUTRAL } from '@/constans';
import { validateSelectOptions, isUndefinedOrNull, isNumberOrNull } from '@/validators';

import BaseButton from './BaseButton.vue';

const props = defineProps({
  selected: Number,
  options: {
    type: Array,
    required: true,
    validator: validateSelectOptions,
  },
  placeholder: {
    type: String,
    required: true,
  },
});

const emit = defineEmits({
  select: isNumberOrNull,
});

const isNotSelected = computed(() => {
  return isUndefinedOrNull(props.selected);
});
</script>

<template>
  <div class="flex gap-2">
    <BaseButton :type="BUTTON_TYPE_NEUTRAL" @click="emit('select', null)">
      <XMarkIcon class="h-8" />
    </BaseButton>
    <select
      class="w-full truncate rounded bg-gray-100 py-1 px-2 text-2xl"
      @change="emit('select', +$event.target.value)"
    >
      <option :selected="isNotSelected" value="" disabled>
        {{ placeholder }}
      </option>
      <option
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :selected="value === selected"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>
