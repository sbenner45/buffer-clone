<script setup lang="ts">
import { ref } from 'vue';
import { useQueueStore } from '../stores/queue';
import type { QueueSettings, SocialPlatform } from '../types/social';

const queueStore = useQueueStore();
const selectedPlatform = ref<SocialPlatform>('twitter');
const times = ref<string[]>(['09:00', '12:00', '15:00']);
const timezone = ref(Intl.DateTimeFormat().resolvedOptions().timeZone);

function saveQueueSettings() {
  const settings: QueueSettings = {
    platform: selectedPlatform.value,
    times: times.value,
    timezone: timezone.value
  };
  queueStore.updateQueueSettings(settings);
}
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Queue Settings</h2>
    
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Platform</label>
        <select
          v-model="selectedPlatform"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="twitter">Twitter</option>
          <option value="instagram">Instagram</option>
          <option value="linkedin">LinkedIn</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700">Posting Times</label>
        <div class="mt-1 space-y-2">
          <div
            v-for="(time, index) in times"
            :key="index"
            class="flex gap-2"
          >
            <input
              type="time"
              v-model="times[index]"
              class="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              @click="times.splice(index, 1)"
              class="text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
          <button
            @click="times.push('12:00')"
            class="text-blue-600 hover:text-blue-700"
          >
            Add Time
          </button>
        </div>
      </div>
      
      <button
        @click="saveQueueSettings"
        class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Save Queue Settings
      </button>
    </div>
  </div>
</template>