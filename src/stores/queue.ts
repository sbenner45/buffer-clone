import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { QueueSettings } from '../types/social';

export const useQueueStore = defineStore('queue', () => {
  const queueSettings = ref<QueueSettings[]>([]);

  function updateQueueSettings(settings: QueueSettings) {
    const index = queueSettings.value.findIndex(q => q.platform === settings.platform);
    if (index !== -1) {
      queueSettings.value[index] = settings;
    } else {
      queueSettings.value.push(settings);
    }
  }

  return {
    queueSettings,
    updateQueueSettings
  };
});