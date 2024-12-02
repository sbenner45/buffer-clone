<script setup lang="ts">
import { computed } from 'vue';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, parseISO } from 'date-fns';
import type { SocialPost } from '../../types/social';
import CalendarPost from './CalendarPost.vue';

const props = defineProps<{
  currentDate: Date;
  posts: SocialPost[];
}>();

const weekDays = computed(() => {
  const start = startOfWeek(props.currentDate, { weekStartsOn: 0 });
  const end = endOfWeek(props.currentDate, { weekStartsOn: 0 });
  
  return eachDayOfInterval({ start, end }).map(date => ({
    date,
    dayName: format(date, 'EEEE'),
    dayNumber: format(date, 'd'),
  }));
});

const timeSlots = computed(() => {
  return Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 || 12;
    const ampm = i < 12 ? 'AM' : 'PM';
    return `${hour} ${ampm}`;
  });
});

const postsForTimeSlot = (day: Date, timeSlot: string) => {
  return props.posts.filter(post => {
    const postDate = new Date(post.scheduledTime);
    const postHour = postDate.getHours();
    const slotHour = timeSlot.includes('PM') 
      ? (parseInt(timeSlot) % 12) + 12 
      : parseInt(timeSlot);
    
    return isSameDay(postDate, day) && postHour === slotHour;
  });
};
</script>

<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="grid grid-cols-7 border-b">
      <div
        v-for="day in weekDays"
        :key="day.date.toISOString()"
        class="p-4 border-r last:border-r-0"
      >
        <div class="text-sm font-medium">{{ day.dayName }}</div>
        <div class="text-2xl font-bold mt-1">{{ day.dayNumber }}</div>
      </div>
    </div>

    <div class="grid grid-cols-7 divide-x h-[600px] overflow-y-auto">
      <div
        v-for="day in weekDays"
        :key="day.date.toISOString()"
        class="relative"
      >
        <div
          v-for="time in timeSlots"
          :key="time"
          class="h-20 border-b p-1"
        >
          <div class="text-xs text-gray-500">{{ time }}</div>
          <div class="space-y-1">
            <CalendarPost
              v-for="post in postsForTimeSlot(day.date, time)"
              :key="post.id"
              :post="post"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>