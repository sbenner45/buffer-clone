<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePostStore } from '../stores/posts';
import CalendarHeader from './calendar/CalendarHeader.vue';
import CalendarGrid from './calendar/CalendarGrid.vue';

const props = defineProps<{
  currentDate: Date;
  view: string;
}>();

const emit = defineEmits<{
  (e: 'update:view', view: string): void;
}>();

const postStore = usePostStore();

function handleViewChange(newView: string) {
  emit('update:view', newView);
}
</script>

<template>
  <div class="space-y-4">
    <CalendarHeader
      :current-date="currentDate"
      :view="view"
      :on-view-change="handleViewChange"
    />
    <CalendarGrid
      :current-date="currentDate"
      :posts="postStore.posts"
    />
  </div>
</template>