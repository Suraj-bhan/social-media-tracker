import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AIAnalytics, AnalysisStatus, PostMood } from '@/types';
import {
  Brain,
  Loader2,
  CheckCircle,
  AlertCircle,
  Smile,
  Frown,
  Meh,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIAnalyticsIndicatorProps {
  analytics?: AIAnalytics;
  onAnalyze?: () => void;
  className?: string;
  compact?: boolean; // New prop for simplified display
}

const getMoodIcon = (mood: PostMood) => {
  switch (mood) {
    case 'positive':
      return <Smile className="w-3 h-3 text-green-600" />;
    case 'negative':
      return <Frown className="w-3 h-3 text-red-600" />;
    case 'neutral':
      return <Meh className="w-3 h-3 text-gray-600" />;
    case 'mixed':
      return <TrendingUp className="w-3 h-3 text-orange-600" />;
    default:
      return <Minus className="w-3 h-3 text-gray-400" />;
  }
};

const getMoodColor = (mood: PostMood) => {
  switch (mood) {
    case 'positive':
      return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300';
    case 'negative':
      return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300';
    case 'neutral':
      return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950 dark:text-gray-300';
    case 'mixed':
      return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300';
    default:
      return 'bg-gray-50 text-gray-600 border-gray-200';
  }
};

const getStatusColor = (status: AnalysisStatus) => {
  switch (status) {
    case 'completed':
      return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300';
    case 'in-progress':
      return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300';
    case 'not-checked':
      return 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-950 dark:text-gray-400';
    default:
      return 'bg-gray-50 text-gray-600 border-gray-200';
  }
};

const getStatusIcon = (status: AnalysisStatus) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-3 h-3" />;
    case 'in-progress':
      return <Loader2 className="w-3 h-3 animate-spin" />;
    case 'not-checked':
      return <AlertCircle className="w-3 h-3" />;
    default:
      return <Brain className="w-3 h-3" />;
  }
};

const formatSentimentScore = (score: number) => {
  if (score > 0.5) return `+${(score * 100).toFixed(0)}%`;
  if (score < -0.5) return `${(score * 100).toFixed(0)}%`;
  return 'Neutral';
};

export function AIAnalyticsIndicator({ analytics, onAnalyze, className, compact = false }: AIAnalyticsIndicatorProps) {
  // Compact mode - show only final verdict
  if (compact) {
    if (!analytics) {
      return (
        <Badge variant="outline" className={cn("text-xs", getStatusColor('not-checked'), className)}>
          <AlertCircle className="w-3 h-3 mr-1" />
          Not Started
        </Badge>
      );
    }

    const { status, mood } = analytics;

    if (status === 'in-progress') {
      return (
        <Badge variant="outline" className={cn("text-xs", getStatusColor('in-progress'), className)}>
          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          In Progress
        </Badge>
      );
    }

    if (status === 'completed') {
      return (
        <Badge variant="outline" className={cn("text-xs", getMoodColor(mood), className)}>
          {getMoodIcon(mood)}
          <span className="ml-1 capitalize">{mood}</span>
        </Badge>
      );
    }

    return (
      <Badge variant="outline" className={cn("text-xs", getStatusColor('not-checked'), className)}>
        <AlertCircle className="w-3 h-3 mr-1" />
        Pending
      </Badge>
    );
  }

  // Full mode - show all details (for modal)
  if (!analytics) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Badge variant="outline" className="text-xs">
          <Brain className="w-3 h-3 mr-1" />
          Not Analyzed
        </Badge>
        {onAnalyze && (
          <Button variant="ghost" size="sm" onClick={onAnalyze} className="h-6 px-2 text-xs">
            <Zap className="w-3 h-3 mr-1" />
            Analyze
          </Button>
        )}
      </div>
    );
  }

  const { status, mood, sentimentScore, confidence } = analytics;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Status Badge */}
      <Badge
        variant="outline"
        className={cn("text-xs", getStatusColor(status))}
      >
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">
          {status === 'not-checked' ? 'Pending' : status}
        </span>
      </Badge>

      {/* Mood Badge - only show when completed */}
      {status === 'completed' && (
        <Badge
          variant="outline"
          className={cn("text-xs", getMoodColor(mood))}
        >
          {getMoodIcon(mood)}
          <span className="ml-1 capitalize">{mood}</span>
        </Badge>
      )}

      {/* Sentiment Score - only show when completed */}
      {status === 'completed' && (
        <Badge variant="secondary" className="text-xs">
          {formatSentimentScore(sentimentScore)}
        </Badge>
      )}

      {/* Confidence - only show when completed */}
      {status === 'completed' && confidence > 0.8 && (
        <Badge variant="outline" className="text-xs text-green-600 border-green-200">
          {(confidence * 100).toFixed(0)}% confident
        </Badge>
      )}
    </div>
  );
}