import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ChannelSettings, SocialPlatform } from '../types/social';

export const useChannelStore = defineStore('channels', () => {
  const channels = ref<ChannelSettings[]>([
    { 
      id: '1',
      name: 'bryanjcollins',
      handle: '@bryanjcollins',
      platform: 'twitter',
      isConnected: true,
      settings: {
        autoSchedule: true,
        defaultHashtags: [],
        mediaTypes: ['image', 'video', 'link']
      }
    },
    {
      id: '2',
      name: 'becomeawritertoday',
      handle: '@becomeawritertoday',
      platform: 'instagram',
      isConnected: true,
      settings: {
        autoSchedule: true,
        defaultHashtags: [],
        mediaTypes: ['image', 'video']
      }
    },
    {
      id: '3',
      name: 'Become a Writer Today',
      handle: '@becomeawritertoday',
      platform: 'facebook',
      isConnected: true,
      settings: {
        autoSchedule: true,
        defaultHashtags: [],
        mediaTypes: ['image', 'video', 'link']
      }
    }
  ]);

  const platformConfigs = {
    twitter: {
      name: 'Twitter',
      characterLimit: 280,
      mediaTypes: ['image', 'video', 'link'],
      authUrl: 'https://api.twitter.com/oauth/authorize'
    },
    facebook: {
      name: 'Facebook',
      characterLimit: 63206,
      mediaTypes: ['image', 'video', 'link'],
      authUrl: 'https://www.facebook.com/v12.0/dialog/oauth'
    },
    instagram: {
      name: 'Instagram',
      characterLimit: 2200,
      mediaTypes: ['image', 'video'],
      authUrl: 'https://api.instagram.com/oauth/authorize'
    },
    linkedin: {
      name: 'LinkedIn',
      characterLimit: 3000,
      mediaTypes: ['image', 'video', 'link'],
      authUrl: 'https://www.linkedin.com/oauth/v2/authorization'
    },
    tiktok: {
      name: 'TikTok',
      characterLimit: 2200,
      mediaTypes: ['video'],
      authUrl: 'https://www.tiktok.com/auth/authorize/'
    }
  };

  function getPlatformConfig(platform: SocialPlatform) {
    return platformConfigs[platform];
  }

  function addChannel(channel: ChannelSettings) {
    channels.value.push(channel);
  }

  function updateChannelSettings(channelId: string, settings: Partial<ChannelSettings>) {
    const index = channels.value.findIndex(c => c.id === channelId);
    if (index !== -1) {
      channels.value[index] = { ...channels.value[index], ...settings };
    }
  }

  function connectChannel(platform: SocialPlatform) {
    const config = platformConfigs[platform];
    // In a real implementation, this would handle OAuth flow
    window.open(config.authUrl, 'Connect Channel', 'width=600,height=600');
  }

  return {
    channels,
    getPlatformConfig,
    addChannel,
    updateChannelSettings,
    connectChannel
  };
});