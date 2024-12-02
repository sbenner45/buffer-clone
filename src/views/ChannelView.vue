<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useChannelStore } from '../stores/channels';
import { usePostStore } from '../stores/posts';
import { format } from 'date-fns';

const route = useRoute();
const channelStore = useChannelStore();
const postStore = usePostStore();

const tabs = [
  { name: 'Queue', count: 6 },
  { name: 'Drafts', count: 0 },
  { name: 'Approvals', count: 0 },
  { name: 'Sent', count: 91 }
];

const activeTab = ref('Sent');
const channelId = computed(() => route.params.channelId as string);
const channel = computed(() => 
  channelStore.channels.find(c => c.id === channelId.value)
);

const posts = computed(() => {
  return postStore.posts.filter(post => {
    const status = activeTab.value.toLowerCase();
    return post.status === status;
  });
});

function formatDate(date: Date) {
  return format(date, 'MMMM dd');
}

function formatTime(date: Date) {
  return format(date, 'h:mm a');
}

const groupedPosts = computed(() => {
  const groups = new Map();
  
  posts.value.forEach(post => {
    const date = formatDate(new Date(post.scheduledTime));
    if (!groups.has(date)) {
      groups.set(date, []);
    }
    groups.get(date).push(post);
  });
  
  return groups;
});
</script>

<template>
  <div class="bg-white shadow rounded-lg">
    <!-- Channel Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <img 
                v-if="channel?.avatar"
                :src="channel.avatar"
                :alt="channel?.name"
                class="w-full h-full rounded-full"
              />
              <span v-else class="text-xl">{{ channel?.name[0] }}</span>
            </div>
            <div>
              <h2 class="text-lg font-medium">{{ channel?.name }}</h2>
              <p class="text-sm text-gray-500">{{ channel?.handle }}</p>
            </div>
          </div>
          <span class="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Beta</span>
        </div>
        
        <div class="flex items-center space-x-3">
          <button class="btn-secondary text-sm">Share Feedback</button>
          <div class="flex rounded-lg border border-gray-200 overflow-hidden">
            <button class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">List</button>
            <button class="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 border-l">Calendar</button>
          </div>
          <button class="btn-primary">+ New Post</button>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="flex px-6">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          @click="activeTab = tab.name"
          :class="[
            'px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap -mb-px',
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
      <template v-for="[date, datePosts] in groupedPosts" :key="date">
        <div class="p-6">
          <h3 class="text-sm font-medium text-gray-900 mb-4">{{ date }}</h3>
          
          <div class="space-y-4">
            <div
              v-for="post in datePosts"
              :key="post.id"
              class="bg-white border rounded-lg p-4"
            >
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center space-x-2">
                  <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span class="text-sm">{{ channel?.name[0] }}</span>
                  </div>
                  <div>
                    <p class="text-sm font-medium">{{ channel?.name }}</p>
                    <p class="text-xs text-gray-500">{{ formatTime(new Date(post.scheduledTime)) }}</p>
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
                  <button class="text-sm text-buffer-blue hover:text-buffer-blue-dark">View Post</button>
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
      </template>
    </div>
  </div>
</template>