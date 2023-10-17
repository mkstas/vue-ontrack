<script setup>
import { activities } from '@/activities';

import ActivityItem from '@/components/activity/ActivityItem.vue';
import TheActivityForm from '@/components/activity/TheActivityForm.vue';
import TheActivityEmptyState from '@/components/activity/TheActivityEmptyState.vue';
</script>

<template>
  <div class="flex flex-col grow">
    <ul v-if="activities.length > 0" class="divide-y grow">
      <ActivityItem
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
      />
    </ul>
    <TheActivityEmptyState v-else />
    <TheActivityForm />
  </div>
</template>
