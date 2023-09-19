import { ref } from 'vue';

import { PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS } from '@/constans';
import { isPageValid } from '@/validators';

import TimelineView from '@/views/TimelineView.vue';
import ActivityView from '@/views/ActivityView.vue';
import ProgressView from '@/views/ProgressView.vue';

export const routes = {
  [PAGE_TIMELINE]: TimelineView,
  [PAGE_ACTIVITIES]: ActivityView,
  [PAGE_PROGRESS]: ProgressView,
};

const normalizePageHash = () => {
  const page = window.location.hash.slice(1);

  if (isPageValid(page)) {
    return page;
  }

  window.location.hash = PAGE_TIMELINE;

  return PAGE_TIMELINE;
};

export const currentPage = ref(normalizePageHash());

export const navigate = (page) => {
  document.body.scrollIntoView();

  currentPage.value = page;
};
