<script setup lang="ts">
import type { SocialPost } from '../../types/social';

defineProps<{
  post: SocialPost;
}>();
</script>

<template>
  <div 
    class="mt-1 p-2 bg-blue-50 border border-blue-200 rounded text-sm cursor-pointer hover:bg-blue-100 transition-colors"
  >
    <div class="flex items-center gap-2">
      <div class="w-4 h-4 rounded-full" :class="{
        'bg-blue-400': post.platform === 'twitter',
        'bg-pink-400': post.platform === 'instagram',
        'bg-blue-600': post.platform === 'linkedin'
      }"></div>
      <span class="truncate">{{ post.content }}</span>
    </div>
  </div>
</template>