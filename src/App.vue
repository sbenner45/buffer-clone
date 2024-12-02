<script setup lang="ts">
import { ref } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import SideNavigation from './components/SideNavigation.vue';
import TopNavigation from './components/TopNavigation.vue';

const router = useRouter();
const showSettings = ref(false);

function toggleSettings() {
  showSettings.value = !showSettings.value;
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <TopNavigation @toggle-settings="toggleSettings" />
    
    <div class="flex">
      <SideNavigation :show-settings="showSettings" />
      
      <main class="flex-1 px-6 py-8">
        <div class="max-w-7xl mx-auto">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>