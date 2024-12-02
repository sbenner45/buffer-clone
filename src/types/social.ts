export interface SocialPost {
  id: string;
  content: string;
  platform: SocialPlatform;
  scheduledTime: Date;
  media?: string[];
  status: 'draft' | 'scheduled' | 'published';
  hashtags?: string[];
}

export type SocialPlatform = 'twitter' | 'instagram' | 'linkedin' | 'pinterest' | 'tiktok' | 'facebook';

export interface AnalyticsData {
  engagement: number;
  clicks: number;
  impressions: number;
  date: Date;
}

export interface QueueSettings {
  platform: SocialPlatform;
  times: string[];
  timezone: string;
}

export interface HashtagAnalytics {
  hashtag: string;
  usage: number;
  engagement: number;
  platforms: Record<SocialPlatform, number>;
  topPosts: string[];
}

export interface ChannelSettings {
  id: string;
  platform: SocialPlatform;
  name: string;
  handle: string;
  avatar?: string;
  isConnected: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  settings: {
    autoSchedule: boolean;
    defaultHashtags: string[];
    characterLimit?: number;
    mediaTypes: ('image' | 'video' | 'link')[];
  };
}