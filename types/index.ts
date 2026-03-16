export type Platform = 'twitter' | 'reddit' | 'youtube' | 'google-news';

export type AnalysisStatus = 'not-checked' | 'in-progress' | 'completed';
export type PostMood = 'positive' | 'negative' | 'neutral' | 'mixed';
export type SentimentScore = number; // -1 to 1 range

export interface AIAnalytics {
  status: AnalysisStatus;
  mood: PostMood;
  sentimentScore: SentimentScore;
  confidence: number; // 0 to 1
  keywords: string[];
  emotions: {
    joy: number;
    anger: number;
    fear: number;
    sadness: number;
    surprise: number;
    trust: number;
  };
  topics: string[];
  toxicity: number; // 0 to 1
  spam: number; // 0 to 1
}

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
  aiAnalytics?: AIAnalytics;
}