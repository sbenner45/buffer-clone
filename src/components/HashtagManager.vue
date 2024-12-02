<script setup lang="ts">
import { ref } from 'vue';

const hashtags = ref<string[]>([]);
const newHashtag = ref('');

function addHashtag() {
  if (newHashtag.value && !hashtags.value.includes(newHashtag.value)) {
    hashtags.value.push(newHashtag.value);
    newHashtag.value = '';
  }
}

function removeHashtag(hashtag: string) {
  hashtags.value = hashtags.value.filter(h => h !== hashtag);
}

defineExpose({
  hashtags
});
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2">
      <input
        v-model="newHashtag"
        type="text"
        placeholder="Add hashtag"
        class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        @keyup.enter="addHashtag"
      />
      <button
        @click="addHashtag"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Add
      </button>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <span
        v-for="hashtag in hashtags"
        :key="hashtag"
        class="px-2 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1"
      >
        #{{ hashtag }}
        <button
          @click="removeHashtag(hashtag)"
          class="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </span>
    </div>
  </div>
</template>