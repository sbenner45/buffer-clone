<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useChannelStore } from '../stores/channels';
import type { SocialPlatform } from '../types/social';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const router = useRouter();
const channelStore = useChannelStore();
const selectedPlatform = ref<SocialPlatform | null>(null);

const platforms: { id: SocialPlatform; name: string; description: string }[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Page or Group'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Business or Creator accounts'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    description: 'Profile'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Page or Profile'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    description: 'Business account'
  }
];

const categories = [
  { name: 'All Channels', platforms },
  { name: 'For Small Businesses', platforms: platforms.slice(0, 3) },
  { name: 'For Creators', platforms: platforms.slice(2) },
  { name: 'For E-commerce', platforms: [platforms[0], platforms[1]] }
];

const activeCategory = ref('All Channels');

function connectChannel(platform: SocialPlatform) {
  channelStore.connectChannel(platform);
  router.push(`/settings/channels/${platform}/settings`);
  emit('close');
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">Connect your channels</h2>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p class="text-gray-600 mb-6">
          Looking for step-by-step instructions? Visit our Help Center to read our
          <a href="#" class="text-buffer-blue hover:underline">Getting Started</a>
          guides and learn about supported channel types.
        </p>

        <div class="border-b mb-6">
          <nav class="flex space-x-8">
            <button
              v-for="category in categories"
              :key="category.name"
              @click="activeCategory = category.name"
              :class="[
                'pb-4 text-sm font-medium border-b-2 -mb-px',
                activeCategory === category.name
                  ? 'border-buffer-blue text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ category.name }}
            </button>
          </nav>
        </div>

        <div class="grid gap-4">
          <div
            v-for="platform in categories.find(c => c.name === activeCategory)?.platforms"
            :key="platform.id"
            class="flex items-center justify-between p-4 bg-white border rounded-lg hover:border-gray-300 transition-colors"
          >
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <span class="text-xl">{{ platform.name[0] }}</span>
              </div>
              <div>
                <h3 class="text-lg font-medium">{{ platform.name }}</h3>
                <p class="text-sm text-gray-500">{{ platform.description }}</p>
              </div>
            </div>

            <div class="flex items-center space-x-2">
              <button
                @click="connectChannel(platform.id)"
                class="btn-primary"
              >
                Connect
              </button>
              <button class="text-gray-400 hover:text-gray-600">
                <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>