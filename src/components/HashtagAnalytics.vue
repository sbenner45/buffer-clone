<script setup lang="ts">
import { computed } from 'vue';
import { useAnalyticsStore } from '../stores/analytics';

const analyticsStore = useAnalyticsStore();

const sortedHashtags = computed(() => {
  return [...analyticsStore.hashtagAnalytics]
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, 10);
});

const platformColors = {
  twitter: 'bg-blue-100',
  instagram: 'bg-pink-100',
  linkedin: 'bg-blue-200',
  pinterest: 'bg-red-100',
  tiktok: 'bg-gray-100'
};
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Top Performing Hashtags</h2>
    
    <div class="space-y-4">
      <div
        v-for="hashtag in sortedHashtags"
        :key="hashtag.hashtag"
        class="p-4 bg-gray-50 rounded-lg"
      >
        <div class="flex justify-between items-center mb-2">
          <span class="font-medium text-lg">#{{ hashtag.hashtag }}</span>
          <span class="text-sm text-gray-500">
            Used {{ hashtag.usage }} times
          </span>
        </div>
        
        <div class="flex gap-2 mb-2">
          <span
            v-for="(count, platform) in hashtag.platforms"
            :key="platform"
            v-show="count > 0"
            :class="[platformColors[platform], 'px-2 py-1 rounded text-sm']"
          >
            {{ platform }}: {{ count }}
          </span>
        </div>
        
        <div class="flex items-center gap-2">
          <div class="flex-1 bg-gray-200 rounded-full h-2">
            <div
              class="bg-blue-600 rounded-full h-2"
              :style="{ width: `${(hashtag.engagement / 1000) * 100}%` }"
            ></div>
          </div>
          <span class="text-sm text-gray-600">
            {{ hashtag.engagement }} engagements
          </span>
        </div>
      </div>
    </div>
  </div>
</template>