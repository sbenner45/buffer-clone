<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '../../stores/posts';
import { useChannelStore } from '../../stores/channels';
import { format } from 'date-fns';

const route = useRoute();
const postStore = usePostStore();
const channelStore = useChannelStore();

const tabs = [
  { name: 'Queue', count: 6 },
  { name: 'Drafts', count: 0 },
  { name: 'Approvals', count: 0 },
  { name: 'Sent', count: 91 }
];

const activeTab = ref('Sent');
const selectedDate = ref(new Date());

const channelId = computed(() => route.params.channelId as string);
const channel = computed(() => channelStore.channels.find(c => c.id === channelId.value));

const posts = computed(() => {
  return postStore.posts.filter(post => {
    const matchesStatus = activeTab.value.toLowerCase() === post.status;
    const matchesDate = format(post.scheduledTime, 'yyyy-MM-dd') === format(selectedDate.value, 'yyyy-MM-dd');
    return matchesStatus && matchesDate;
  });
});

function formatPostDate(date: Date) {
  return format(date, 'MMM dd, h:mm a');
}
</script>

<template>
  <div class="bg-white shadow rounded-lg">
    <!-- Channel Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <span class="text-xl">{{ channel?.platform[0].toUpperCase() }}</span>
        </div>
        <div>
          <h2 class="text-xl font-semibold">{{ channel?.name }}</h2>
          <p class="text-sm text-gray-500">{{ channel?.handle }}</p>
        </div>
        <span class="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Beta</span>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="flex">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          @click="activeTab = tab.name"
          :class="[
            'px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap',
            activeTab === tab.name
              ? 'border-buffer-blue text-buffer-blue'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          {{ tab.name }}
          <span 
            :class="[
              'ml-2 rounded-full text-xs px-2 py-0.5',
              activeTab === tab.name
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600'
            ]"
          >
            {{ tab.count }}
          </span>
        </button>
      </nav>
    </div>

    <!-- Post List -->
    <div class="divide-y divide-gray-200">
      <div v-for="date in ['Thursday 29 August', 'Wednesday 28 August']" :key="date" class="p-6">
        <h3 class="text-sm font-medium text-gray-900 mb-4">{{ date }}</h3>
        
        <div class="space-y-6">
          <div
            v-for="post in posts"
            :key="post.id"
            class="bg-white border rounded-lg p-4"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 rounded-full bg-gray-200"></div>
                <div>
                  <p class="text-sm font-medium">{{ channel?.name }}</p>
                  <p class="text-xs text-gray-500">{{ formatPostDate(post.scheduledTime) }}</p>
                </div>
              </div>
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
            </div>

            <p class="text-sm text-gray-900 mb-4">{{ post.content }}</p>

            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-6">
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span class="text-sm text-gray-500">16</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span class="text-sm text-gray-500">20</span>
                </div>
              </div>

              <div class="flex items-center space-x-2">
                <button class="text-sm text-gray-500 hover:text-gray-700">View Post</button>
                <button class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="mt-4 text-xs text-gray-500">
              You created this 5 days ago
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>