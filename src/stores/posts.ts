import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { SocialPost } from '../types/social';

export const usePostStore = defineStore('posts', () => {
  const posts = ref<SocialPost[]>([
    {
      id: '1',
      content: 'Here\'s what I do when I\'m feeling lazy about content creation...',
      platform: 'twitter',
      scheduledTime: new Date('2024-09-04T16:00:00'),
      status: 'scheduled'
    },
    {
      id: '2',
      content: 'The best writers aren\'t just creators. They\'re curators.',
      platform: 'linkedin',
      scheduledTime: new Date('2024-09-04T16:00:00'),
      status: 'scheduled'
    },
    {
      id: '3',
      content: 'Stop overthinking your content strategy. Before...',
      platform: 'instagram',
      scheduledTime: new Date('2024-09-04T18:00:00'),
      status: 'scheduled'
    }
  ]);

  function addPost(post: SocialPost) {
    posts.value.push(post);
  }

  function updatePost(id: string, updatedPost: Partial<SocialPost>) {
    const index = posts.value.findIndex(post => post.id === id);
    if (index !== -1) {
      posts.value[index] = { ...posts.value[index], ...updatedPost };
    }
  }

  return {
    posts,
    addPost,
    updatePost
  };
});