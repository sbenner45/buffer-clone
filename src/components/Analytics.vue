<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { AnalyticsData } from '../types/social';

const analyticsData = ref<AnalyticsData[]>([]);

onMounted(() => {
  // Simulated analytics data
  analyticsData.value = [
    {
      engagement: 245,
      clicks: 123,
      impressions: 1500,
      date: new Date()
    }
  ];
});
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-xl font-semibold mb-4">Analytics Overview</h2>
    
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="metric in ['Engagement', 'Clicks', 'Impressions']"
        :key="metric"
        class="p-4 bg-gray-50 rounded-lg"
      >
        <h3 class="text-sm text-gray-600">{{ metric }}</h3>
        <p class="text-2xl font-bold">
          {{ analyticsData[0]?.[metric.toLowerCase() as keyof AnalyticsData] || 0 }}
        </p>
      </div>
    </div>
  </div>
</template>