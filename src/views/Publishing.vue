<script setup lang="ts">
import { ref } from 'vue';
import PostComposer from '../components/PostComposer.vue';
import ContentCalendar from '../components/ContentCalendar.vue';
import ChannelList from '../components/ChannelList.vue';
import { useChannelStore } from '../stores/channels';

const view = ref<'calendar' | 'list'>('calendar');
const currentDate = ref(new Date());
const viewOptions = ref(['Today', 'Week', 'Month']);
const selectedView = ref('Week');
const showComposer = ref(false);
const channelStore = useChannelStore();

function openComposer() {
  showComposer.value = true;
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center space-x-4">
        <h1 class="text-xl font-semibold">All Channels</h1>
        <span class="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Beta</span>
      </div>

      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <button class="btn-secondary">
            Share Feedback
          </button>
          <div class="flex items-center bg-white rounded-lg shadow-sm border">
            <button
              v-for="option in ['List', 'Calendar']"
              :key="option"
              :class="[
                'px-4 py-2 text-sm font-medium',
                view === option.toLowerCase()
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              ]"
              @click="view = option.toLowerCase() as 'list' | 'calendar'"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <button class="btn-primary" @click="openComposer">+ New Post</button>
      </div>
    </div>

    <div class="flex gap-6">
      <div class="w-64 flex-shrink-0">
        <ChannelList />
      </div>

      <div class="flex-1">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-4">
            <div class="flex items-center bg-white rounded-lg shadow-sm border">
              <button
                v-for="option in viewOptions"
                :key="option"
                :class="[
                  'px-4 py-2 text-sm',
                  selectedView === option
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                ]"
                @click="selectedView = option"
              >
                {{ option }}
              </button>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-500">All Posts</span>
              <span class="text-sm text-gray-500">Channels</span>
              <span class="text-sm text-gray-500">Tags</span>
              <span class="text-sm text-gray-500">Dublin</span>
            </div>
          </div>
        </div>

        <ContentCalendar
          v-if="view === 'calendar'"
          :current-date="currentDate"
          :view="selectedView.toLowerCase()"
          @update:view="selectedView = $event"
        />
        <div v-else class="bg-white rounded-lg shadow p-4">
          <p class="text-gray-500">List view coming soon...</p>
        </div>
      </div>
    </div>

    <PostComposer
      v-if="showComposer"
      @close="showComposer = false"
    />
  </div>
</template>