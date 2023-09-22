import { ref } from 'vue';

import { MILLISECONDS_IN_SECOND } from '@/constans';

export const useStopwatch = (initialSeconds, handleSecondsChange) => {
  const seconds = ref(initialSeconds);
  const isRunning = ref(false);
  const temp = 120;

  const start = () => {
    isRunning.value = setInterval(() => {
      seconds.value += temp;

      handleSecondsChange();
    }, MILLISECONDS_IN_SECOND);
  };

  const stop = () => {
    clearInterval(isRunning.value);

    isRunning.value = false;
  };

  const reset = () => {
    stop();

    seconds.value = 0;

    handleSecondsChange();
  };

  return {
    seconds,
    isRunning,
    start,
    stop,
    reset,
  };
};
