export type Platform = 'twitter' | 'reddit' | 'youtube' | 'google-news';

export interface SocialMediaPost {
  id: string;
  platform: Platform;
  title: string;
  content: string;
  author: string;
  authorAvatar?: string;
  timestamp: string;
  engagement: {
    likes?: number;
    shares?: number;
    comments?: number;
    views?: number;
  };
  url: string;
  thumbnail?: string;
}