<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useQueueStore } from '../../stores/queue';
import { useChannelStore } from '../../stores/channels';
import type { QueueSettings, SocialPlatform } from '../../types/social';

const route = useRoute();
const queueStore = useQueueStore();
const channelStore = useChannelStore();
const activeTab = ref('general');

const platform = computed(() => route.params.platform as SocialPlatform);
const platformConfig = computed(() => channelStore.getPlatformConfig(platform.value));

const timezone = ref(Intl.DateTimeFormat().resolvedOptions().timeZone);
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const defaultTime = '13:30';

// Channel specific settings
const autoSchedule = ref(true);
const defaultHashtags = ref<string[]>([]);

interface DaySchedule {
  enabled: boolean;
  times: string[];
}

const schedule = ref<Record<string, DaySchedule>>(
  Object.fromEntries(
    days.map(day => [
      day,
      {
        enabled: true,
        times: [defaultTime]
      }
    ])
  )
);

function addPostingTime(day: string) {
  schedule.value[day].times.push(defaultTime);
}

function removePostingTime(day: string, index: number) {
  schedule.value[day].times.splice(index, 1);
}

function saveSchedule() {
  const settings: QueueSettings = {
    platform: platform.value,
    times: days.flatMap(day => 
      schedule.value[day].enabled ? schedule.value[day].times : []
    ),
    timezone: timezone.value
  };
  queueStore.updateQueueSettings(settings);
}

function connectChannel() {
  channelStore.connectChannel(platform.value);
}

function addHashtag(hashtag: string) {
  if (hashtag && !defaultHashtags.value.includes(hashtag)) {
    defaultHashtags.value.push(hashtag);
  }
}

function removeHashtag(hashtag: string) {
  defaultHashtags.value = defaultHashtags.value.filter(h => h !== hashtag);
}
</script>

<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-6 py-4 border-b border-gray-200">
      <h2 class="text-lg font-medium text-gray-900">Channel Settings</h2>
    </div>

    <div class="p-6">
      <nav class="flex space-x-4 mb-6 border-b">
        <button 
          v-for="tab in ['general', 'posting schedule']"
          :key="tab"
          :class="[
            'px-3 py-2 text-sm font-medium border-b-2 -mb-px',
            activeTab === tab
              ? 'border-buffer-blue text-buffer-blue'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
          @click="activeTab = tab"
        >
          {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
        </button>
      </nav>

      <!-- General Settings -->
      <div v-if="activeTab === 'general'" class="space-y-6">
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">{{ platformConfig.name }}</h3>
              <p class="text-sm text-gray-500">Not connected</p>
            </div>
            <button 
              @click="connectChannel"
              class="btn-primary"
            >
              Connect Account
            </button>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">Channel Settings</h3>
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                v-model="autoSchedule"
                class="rounded border-gray-300 text-buffer-blue focus:ring-buffer-blue"
              >
              <span class="text-sm text-gray-700">Enable auto-scheduling</span>
            </label>
          </div>

          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">Default Hashtags</h3>
            <div class="space-y-2">
              <div class="flex gap-2">
                <input
                  type="text"
                  placeholder="Add hashtag"
                  class="flex-1 input"
                  @keyup.enter="addHashtag($event.target.value)"
                >
                <button 
                  class="btn-secondary"
                  @click="addHashtag($event.target.previousElementSibling.value)"
                >
                  Add
                </button>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="hashtag in defaultHashtags"
                  :key="hashtag"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  #{{ hashtag }}
                  <button
                    type="button"
                    class="ml-1 text-gray-400 hover:text-gray-600"
                    @click="removeHashtag(hashtag)"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-2">Platform Limits</h3>
            <div class="bg-gray-50 p-4 rounded-lg space-y-2">
              <p class="text-sm text-gray-600">
                Character limit: {{ platformConfig.characterLimit }}
              </p>
              <p class="text-sm text-gray-600">
                Supported media: {{ platformConfig.mediaTypes.join(', ') }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Posting Schedule -->
      <div v-else-if="activeTab === 'posting schedule'" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Timezone</label>
          <p class="text-sm text-gray-500 mb-2">
            Used for scheduling queue for this channel
          </p>
          <select
            v-model="timezone"
            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-buffer-blue focus:border-buffer-blue sm:text-sm rounded-md"
          >
            <option :value="Intl.DateTimeFormat().resolvedOptions().timeZone">
              {{ Intl.DateTimeFormat().resolvedOptions().timeZone }}
            </option>
          </select>
        </div>

        <div>
          <div class="flex justify-between items-center mb-4">
            <div>
              <h3 class="text-sm font-medium text-gray-700">Posting times</h3>
              <p class="text-sm text-gray-500">
                Your posting times tells Buffer when to send out posts in your Queue.
              </p>
            </div>
            <button 
              class="text-sm text-buffer-blue hover:text-buffer-blue-dark"
            >
              Clear All times
            </button>
          </div>

          <div class="grid grid-cols-7 gap-4">
            <div
              v-for="day in days"
              :key="day"
              class="border rounded-lg p-4"
            >
              <div class="flex justify-between items-center mb-4">
                <span class="text-sm font-medium">{{ day }}</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="schedule[day].enabled"
                    class="sr-only peer"
                  >
                  <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-buffer-blue"></div>
                </label>
              </div>

              <div v-if="schedule[day].enabled" class="space-y-2">
                <div
                  v-for="(time, index) in schedule[day].times"
                  :key="index"
                  class="flex items-center gap-2"
                >
                  <input
                    type="time"
                    v-model="schedule[day].times[index]"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buffer-blue focus:border-buffer-blue sm:text-sm"
                  >
                  <button
                    @click="removePostingTime(day, index)"
                    class="text-red-600 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
                <button
                  @click="addPostingTime(day)"
                  class="text-sm text-buffer-blue hover:text-buffer-blue-dark"
                >
                  + Add posting time
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <button
            @click="saveSchedule"
            class="btn-primary"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>