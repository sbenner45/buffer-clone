<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps<{
  showSettings: boolean;
}>();

const settingsItems = [
  { name: 'Account', icon: 'user' },
  { name: 'Billing', icon: 'credit-card' },
  { name: 'Channels', icon: 'collection' },
  { name: 'Organization', icon: 'office-building' }
];
</script>

<template>
  <aside
    v-show="showSettings"
    class="w-64 bg-white border-r border-gray-200 min-h-screen"
  >
    <div class="h-16 flex items-center px-4 border-b border-gray-200">
      <h2 class="text-lg font-medium text-gray-900">Settings</h2>
    </div>
    
    <nav class="mt-5 px-2 space-y-1">
      <RouterLink
        v-for="item in settingsItems"
        :key="item.name"
        :to="`/settings/${item.name.toLowerCase()}`"
        class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        active-class="bg-gray-100 text-gray-900"
      >
        {{ item.name }}
      </RouterLink>
    </nav>
  </aside>
</template>