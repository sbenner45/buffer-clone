<script setup lang="ts">
import { ref } from 'vue';
import type { SocialPlatform } from '../types/social';

const emit = defineEmits<{
  (e: 'update:content', content: string): void;
}>();

const props = defineProps<{
  selectedPlatforms: string[];
  content: string;
}>();

const suggestions = ref([
  'Write more',
  'Rephrase for Facebook',
  'Shorten for Facebook',
  'Expand for Facebook'
]);

const isOpen = ref(false);

function applyAISuggestion(suggestion: string) {
  // In a real implementation, this would call an AI service
  let newContent = props.content;
  
  switch (suggestion) {
    case 'Write more':
      newContent += '\n\nI wrote and sent more emails each week.\n\nI took a course in conversion rate optimization a while ago.';
      break;
    case 'Shorten for Facebook':
      newContent = newContent.split('.')[0] + '.';
      break;
    case 'Expand for Facebook':
      newContent += '\n\nFurthermore, readers come from diverse backgrounds and have different preferences when it comes to reading material. Some may prefer fiction, while others lean towards non-fiction or academic texts.';
      break;
    case 'Rephrase for Facebook':
      newContent = newContent.replace(/readers/g, 'book lovers');
      break;
  }
  
  emit('update:content', newContent);
}

function toggleAssistant() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="relative">
    <button
      @click="toggleAssistant"
      class="flex items-center space-x-1 text-buffer-blue hover:text-buffer-blue-dark"
    >
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <span>AI Assistant</span>
    </button>

    <div
      v-if="isOpen"
      class="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
    >
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-buffer-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span class="font-medium">AI Assistant</span>
          </div>
          <button @click="toggleAssistant" class="text-gray-400 hover:text-gray-600">
            ×
          </button>
        </div>
        <p class="mt-2 text-sm text-gray-600">How can I help with this post?</p>
      </div>

      <div class="p-4 space-y-2">
        <button
          v-for="suggestion in suggestions"
          :key="suggestion"
          @click="applyAISuggestion(suggestion)"
          class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center space-x-2"
        >
          <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>{{ suggestion }}</span>
        </button>
      </div>

      <div class="p-4 bg-gray-50 text-xs text-gray-500 rounded-b-lg">
        Need tips on writing better prompts? <a href="#" class="text-buffer-blue hover:underline">See tips</a>
      </div>
    </div>
  </div>
</template>