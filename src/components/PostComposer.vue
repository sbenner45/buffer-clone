<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePostStore } from '../stores/posts';
import { useChannelStore } from '../stores/channels';
import type { SocialPlatform, SocialPost } from '../types/social';
import AIAssistant from './AIAssistant.vue';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const content = ref('');
const selectedChannels = ref<string[]>([]);
const postType = ref<'post' | 'reel' | 'story'>('post');
const mediaFiles = ref<File[]>([]);
const tags = ref<string[]>([]);
const postStore = usePostStore();
const channelStore = useChannelStore();
const showAIAssistant = ref(false);

const channels = computed(() => channelStore.channels);

const characterLimits = {
  twitter: 280,
  facebook: 63206,
  instagram: 2200,
  linkedin: 3000,
  tiktok: 2200
};

const remainingCharacters = computed(() => {
  if (!selectedChannels.value.length) return null;
  const selectedPlatforms = channels.value
    .filter(c => selectedChannels.value.includes(c.id))
    .map(c => c.platform);
  
  const minLimit = Math.min(...selectedPlatforms.map(p => characterLimits[p]));
  return minLimit - content.value.length;
});

function toggleChannel(channelId: string) {
  const index = selectedChannels.value.indexOf(channelId);
  if (index === -1) {
    selectedChannels.value.push(channelId);
  } else {
    selectedChannels.value.splice(index, 1);
  }
}

function deselectAllChannels() {
  selectedChannels.value = [];
}

function handleFileUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    mediaFiles.value = Array.from(input.files);
  }
}

function addTag(tag: string) {
  if (tag && !tags.value.includes(tag)) {
    tags.value.push(tag);
  }
}

function createPost() {
  selectedChannels.value.forEach(channelId => {
    const post: SocialPost = {
      id: crypto.randomUUID(),
      content: content.value,
      platform: channels.value.find(c => c.id === channelId)?.platform || 'twitter',
      scheduledTime: new Date(),
      status: 'draft',
      hashtags: tags.value
    };
    postStore.addPost(post);
  });
  emit('close');
}

function toggleAIAssistant() {
  showAIAssistant.value = !showAIAssistant.value;
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-5xl flex">
      <!-- AI Assistant Panel -->
      <div v-if="showAIAssistant" class="w-80 border-r border-gray-200 p-4">
        <AIAssistant
          :selected-platforms="selectedChannels"
          :content="content"
          @update:content="content = $event"
        />
      </div>

      <!-- Post Editor -->
      <div class="flex-1 flex flex-col h-[80vh]">
        <div class="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-lg font-semibold">Create Post</h2>
          <div class="flex items-center space-x-2">
            <button @click="toggleAIAssistant" class="btn-secondary">
              <span class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                AI Assistant
              </span>
            </button>
            <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div class="p-4 flex-1 overflow-y-auto">
          <!-- Channel Selection -->
          <div class="mb-4">
            <button 
              @click="deselectAllChannels"
              class="text-sm text-gray-600 hover:text-gray-900 mb-2"
            >
              Deselect All Channels
            </button>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="channel in channels"
                :key="channel.id"
                @click="toggleChannel(channel.id)"
                :class="[
                  'flex items-center space-x-2 p-2 rounded-full border',
                  selectedChannels.includes(channel.id)
                    ? 'border-buffer-blue bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                ]"
              >
                <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  {{ channel.platform[0].toUpperCase() }}
                </div>
                <span v-if="selectedChannels.includes(channel.id)" class="text-buffer-blue">✓</span>
              </button>
            </div>
          </div>

          <!-- Post Type Selection -->
          <div class="mb-4 flex space-x-4">
            <label 
              v-for="type in ['Post', 'Reel', 'Story']"
              :key="type"
              class="flex items-center space-x-2"
            >
              <input
                type="radio"
                :value="type.toLowerCase()"
                v-model="postType"
                class="text-buffer-blue focus:ring-buffer-blue"
              >
              <span class="text-sm text-gray-700">{{ type }}</span>
            </label>
          </div>

          <!-- Content Editor -->
          <div class="mb-4">
            <textarea
              v-model="content"
              class="w-full p-4 border rounded-lg resize-none h-40"
              placeholder="What would you like to share?"
            ></textarea>
            <div class="flex justify-between items-center mt-2">
              <div class="flex items-center space-x-4">
                <button class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                <button class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </button>
              </div>
              <span 
                :class="[
                  'text-sm',
                  remainingCharacters && remainingCharacters < 20 ? 'text-red-500' : 'text-gray-500'
                ]"
              >
                {{ remainingCharacters }} characters remaining
              </span>
            </div>
          </div>

          <!-- Media Upload -->
          <div class="mb-4">
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 cursor-pointer"
              @click="$refs.fileInput.click()"
            >
              <input
                type="file"
                ref="fileInput"
                class="hidden"
                multiple
                @change="handleFileUpload"
              >
              <p class="text-sm text-gray-600">Drag & drop or select a file</p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="p-4 border-t border-gray-200 flex justify-between">
          <div class="flex space-x-2">
            <button class="btn-secondary">Add Tags</button>
          </div>
          <div class="flex space-x-2">
            <button class="btn-secondary">Save as Draft</button>
            <button
              @click="createPost"
              class="btn-primary"
              :disabled="!selectedChannels.length || !content"
            >
              Add to Queue
            </button>
          </div>
        </div>
      </div>

      <!-- Preview Panel -->
      <div class="w-96 border-l border-gray-200 p-4">
        <h3 class="text-lg font-semibold mb-4">Preview</h3>
        <div class="bg-gray-50 rounded-lg p-4 h-[calc(100%-2rem)] overflow-y-auto">
          <template v-if="selectedChannels.length === 0">
            <p class="text-sm text-gray-500 text-center">
              Select a channel to see preview
            </p>
          </template>
          <template v-else>
            <div
              v-for="channelId in selectedChannels"
              :key="channelId"
              class="mb-4 last:mb-0"
            >
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                  {{ channels.find(c => c.id === channelId)?.platform[0].toUpperCase() }}
                </div>
                <span class="text-sm font-medium">
                  {{ channels.find(c => c.id === channelId)?.platform }}
                </span>
              </div>
              <div class="bg-white rounded border p-4">
                <p class="text-sm">{{ content }}</p>
                <div v-if="mediaFiles.length" class="mt-2 grid grid-cols-2 gap-2">
                  <div
                    v-for="(file, index) in mediaFiles"
                    :key="index"
                    class="aspect-square bg-gray-100 rounded flex items-center justify-center"
                  >
                    <span class="text-xs text-gray-500">Media {{ index + 1 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>