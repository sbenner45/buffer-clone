import { defineStore } from 'pinia';
import { computed } from 'vue';
import { usePostStore } from './posts';
import type { HashtagAnalytics } from '../types/social';

export const useAnalyticsStore = defineStore('analytics', () => {
  const postStore = usePostStore();

  const hashtagAnalytics = computed(() => {
    const analytics = new Map<string, HashtagAnalytics>();

    postStore.posts.forEach(post => {
      post.hashtags?.forEach(hashtag => {
        if (!analytics.has(hashtag)) {
          analytics.set(hashtag, {
            hashtag,
            usage: 0,
            engagement: 0,
            platforms: {
              twitter: 0,
              instagram: 0,
              linkedin: 0,
              pinterest: 0,
              tiktok: 0
            },
            topPosts: []
          });
        }

        const stats = analytics.get(hashtag)!;
        stats.usage++;
        stats.platforms[post.platform]++;
        
        if (!stats.topPosts.includes(post.id)) {
          stats.topPosts.push(post.id);
        }

        // Simulate engagement metrics
        stats.engagement += Math.floor(Math.random() * 100);
      });
    });

    return Array.from(analytics.values());
  });

  return {
    hashtagAnalytics
  };
});