import { Twitter, MessageSquare, Youtube, Newspaper } from 'lucide-react';
import { Platform } from '@/types';

interface PlatformIconProps {
  platform: Platform;
  size?: number;
}

export function PlatformIcon({ platform, size = 20 }: PlatformIconProps) {
  switch (platform) {
    case 'twitter':
      return <Twitter size={size} className="text-blue-500" />;
    case 'reddit':
      return <MessageSquare size={size} className="text-orange-500" />;
    case 'youtube':
      return <Youtube size={size} className="text-red-500" />;
    case 'google-news':
      return <Newspaper size={size} className="text-blue-600" />;
    default:
      return null;
  }
}

export function getPlatformName(platform: Platform): string {
  switch (platform) {
    case 'twitter':
      return 'Twitter/X';
    case 'reddit':
      return 'Reddit';
    case 'youtube':
      return 'YouTube';
    case 'google-news':
      return 'Google News';
    default:
      return platform;
  }
}