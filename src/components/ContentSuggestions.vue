<script setup lang="ts">
import { ref } from 'vue';
import { useAIService } from '../services/ai';

const suggestions = ref<string[]>([]);
const loading = ref(false);
const aiService = useAIService();

const emit = defineEmits<{
  (e: 'select', content: string): void;
}>();

async function generateSuggestions(topic: string) {
  loading.value = true;
  try {
    suggestions.value = await aiService.generateSuggestions(topic);
  } catch (error) {
    console.error('Failed to generate suggestions:', error);
  } finally {
    loading.value = false;
  }
}

function selectSuggestion(content: string) {
  emit('select', content);
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2">
      <input
        type="text"
        placeholder="Enter a topic for suggestions"
        class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        @keyup.enter="generateSuggestions($event.target.value)"
      />
      <button
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        :disabled="loading"
      >
        {{ loading ? 'Generating...' : 'Get Ideas' }}
      </button>
    </div>

    <div class="space-y-2">
      <div
        v-for="(suggestion, index) in suggestions"
        :key="index"
        class="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
        @click="selectSuggestion(suggestion)"
      >
        {{ suggestion }}
      </div>
    </div>
  </div>
</template>