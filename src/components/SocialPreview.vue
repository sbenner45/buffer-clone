<script setup lang="ts">
import { computed } from 'vue';
import type { SocialPost } from '../types/social';

const props = defineProps<{
  post: SocialPost;
}>();

const previewClass = computed(() => ({
  'twitter': 'bg-blue-50 border-blue-200',
  'instagram': 'bg-pink-50 border-pink-200',
  'linkedin': 'bg-blue-50 border-blue-200'
}[props.post.platform]));
</script>

<template>
  <div :class="['border rounded-lg p-4', previewClass]">
    <div class="flex items-center gap-2 mb-2">
      <div class="w-10 h-10 rounded-full bg-gray-200"></div>
      <div>
        <p class="font-semibold">Your Name</p>
        <p class="text-sm text-gray-500">@username</p>
      </div>
    </div>
    
    <p class="text-gray-900 mb-2">{{ post.content }}</p>
    
    <div v-if="post.media?.length" class="mb-2 grid grid-cols-2 gap-2">
      <img
        v-for="(media, index) in post.media"
        :key="index"
        :src="media"
        class="w-full h-40 object-cover rounded-lg"
      />
    </div>
    
    <div v-if="post.hashtags?.length" class="text-blue-600 text-sm space-x-1">
      <span v-for="hashtag in post.hashtags" :key="hashtag">
        #{{ hashtag }}
      </span>
    </div>
  </div>
</template>