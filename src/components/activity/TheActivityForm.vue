<script setup>
import { nextTick, ref } from 'vue';

import { ICON_PLUS } from '@/icons';
import { id } from '@/functions';

import { createActivity } from '@/activities';

import BaseButton from '../@ui/BaseButton.vue';
import BaseIcon from '../@ui/BaseIcon.vue';

const name = ref('');

const submit = async () => {
  createActivity({
    id: id(),
    name: name.value,
    secondsToComplete: 0,
  });

  name.value = '';

  await nextTick();

  window.scrollTo(0, document.body.scrollHeight);
};
</script>

<template>
  <form
    @submit.prevent="submit"
    class="sticky bottom-[57px] w-full flex gap-2 border-t bg-white p-4"
  >
    <input
      type="text"
      v-model="name"
      class="w-full rounded border px-4 text-xl"
      placeholder="Activity name"
    />
    <BaseButton :disabled="name.trim() === ''">
      <BaseIcon :name="ICON_PLUS" />
    </BaseButton>
  </form>
</template>
