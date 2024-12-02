<script setup lang="ts">
import { format } from 'date-fns';

defineProps<{
  currentDate: Date;
  view: string;
  onViewChange: (view: string) => void;
}>();

const viewOptions = ['Today', 'Week', 'Month'];
</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <div class="flex items-center space-x-4">
      <h2 class="text-lg font-semibold">{{ format(currentDate, 'MMMM yyyy') }}</h2>
      <button class="btn-secondary text-sm">Today</button>
    </div>

    <div class="flex items-center bg-white rounded-lg shadow-sm border">
      <button
        v-for="option in viewOptions"
        :key="option"
        :class="[
          'px-4 py-2 text-sm',
          view === option.toLowerCase()
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-500 hover:text-gray-700'
        ]"
        @click="onViewChange(option.toLowerCase())"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>