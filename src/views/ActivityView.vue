<script setup>
import { inject } from 'vue';

import ActivityItem from '@/components/Activity/ActivityItem.vue';
import TheActivityForm from '@/components/Activity/TheActivityForm.vue';
import TheActivityEmptyState from '@/components/Activity/TheActivityEmptyState.vue';

const activities = inject('activities');
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
