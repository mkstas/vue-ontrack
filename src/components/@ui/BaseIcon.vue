<script setup>
import { isIconValid, isNotEmptyString } from '@/validators';
import { ICONS } from '@/icons';

defineProps({
  name: {
    type: String,
    required: true,
    validator: isIconValid,
  },
  classes: {
    type: String,
    default: 'h-8',
    validator: isNotEmptyString,
  },
});
</script>

<template>
  <component :is="ICONS[name]" :class="classes" />
</template>
