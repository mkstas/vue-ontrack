<script setup>
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from '@/constans';
import { ICON_TRASH } from '@/icons';
import { isActivityValid } from '@/validators';

import { updateActivity, deleteActivity } from '@/activities';
import { resetTimelineItemActivity } from '@/timeline-items';

import BaseButton from '../@ui/BaseButton.vue';
import BaseSelect from '../@ui/BaseSelect.vue';
import BaseIcon from '../@ui/BaseIcon.vue';
import ActivitySecondsToComplete from './ActivitySecondsToComplete.vue';

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
});

const deleteAndResetActivity = (activity) => {
  resetTimelineItemActivity(activity);
  deleteActivity(activity);
};
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton
        :type="BUTTON_TYPE_DANGER"
        @click="deleteAndResetActivity(activity)"
      >
        <BaseIcon :name="ICON_TRASH" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="grow font-mono"
        placeholder="hh:mm"
        :options="PERIOD_SELECT_OPTIONS"
        :selected="activity.secondsToComplete || null"
        @select="updateActivity(activity, { secondsToComplete: $event || 0 })"
      />
      <ActivitySecondsToComplete
        v-if="activity.secondsToComplete"
        :activity="activity"
      />
    </div>
  </li>
</template>
