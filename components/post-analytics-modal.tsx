'use client'

import { SocialMediaPost } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlatformIcon, getPlatformName } from './platform-icon';
import { AIAnalyticsIndicator } from './ai-analytics-indicator';
import {
  Brain,
  TrendingUp,
  Users,
  MessageCircle,
  Heart,
  Share2,
  Eye,
  AlertTriangle,
  Shield,
  Target,
  Tag,
  Clock,
  ExternalLink
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';

interface PostAnalyticsModalProps {
  post: SocialMediaPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmotionBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="capitalize">{label}</span>
      <span className="text-muted-foreground">{Math.round(value * 100)}%</span>
    </div>
    <Progress value={value * 100} className="h-2" />
  </div>
);

const MetricCard = ({ icon: Icon, label, value, description }: {
  icon: any;
  label: string;
  value: string | number;
  description?: string;
}) => (
  <Card>
    <CardHeader className="pb-2">
      <div className="flex items-center space-x-2">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
    </CardContent>
  </Card>
);

export function PostAnalyticsModal({ post, open, onOpenChange }: PostAnalyticsModalProps) {
  if (!post) return null;

  const { aiAnalytics } = post;
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <PlatformIcon platform={post.platform} size={20} />
                <Badge variant="outline">{getPlatformName(post.platform)}</Badge>
                <Badge variant="secondary" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {timeAgo}
                </Badge>
              </div>
              <DialogTitle className="text-xl">{post.title}</DialogTitle>
              <DialogDescription className="mt-2">
                By {post.author} • AI-powered content analysis
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Post Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Post Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">{post.content}</p>

              {/* Engagement Metrics */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                {post.engagement.likes && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Heart className="w-4 h-4 mr-1 text-red-500" />
                    {post.engagement.likes.toLocaleString()}
                  </div>
                )}
                {post.engagement.comments && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MessageCircle className="w-4 h-4 mr-1 text-blue-500" />
                    {post.engagement.comments.toLocaleString()}
                  </div>
                )}
                {post.engagement.shares && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Share2 className="w-4 h-4 mr-1 text-green-500" />
                    {post.engagement.shares.toLocaleString()}
                  </div>
                )}
                {post.engagement.views && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Eye className="w-4 h-4 mr-1 text-purple-500" />
                    {post.engagement.views.toLocaleString()}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* AI Analytics Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                AI Analysis Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AIAnalyticsIndicator analytics={aiAnalytics} />

              {!aiAnalytics && (
                <div className="mt-4 p-4 border border-dashed rounded-lg text-center">
                  <Brain className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-3">
                    This post hasn't been analyzed yet
                  </p>
                  <Button size="sm">
                    <Brain className="w-4 h-4 mr-2" />
                    Start Analysis
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Detailed Analytics - only show if analysis is completed */}
          {aiAnalytics && aiAnalytics.status === 'completed' && (
            <Tabs defaultValue="sentiment" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
                <TabsTrigger value="emotions">Emotions</TabsTrigger>
                <TabsTrigger value="topics">Topics</TabsTrigger>
                <TabsTrigger value="safety">Safety</TabsTrigger>
              </TabsList>

              <TabsContent value="sentiment" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <MetricCard
                    icon={TrendingUp}
                    label="Sentiment Score"
                    value={aiAnalytics.sentimentScore > 0 ? `+${(aiAnalytics.sentimentScore * 100).toFixed(0)}%` : `${(aiAnalytics.sentimentScore * 100).toFixed(0)}%`}
                    description={`${aiAnalytics.mood} sentiment detected`}
                  />
                  <MetricCard
                    icon={Target}
                    label="Confidence"
                    value={`${(aiAnalytics.confidence * 100).toFixed(0)}%`}
                    description="Analysis reliability"
                  />
                  <MetricCard
                    icon={Users}
                    label="Mood"
                    value={aiAnalytics.mood}
                    description="Overall emotional tone"
                  />
                </div>
              </TabsContent>

              <TabsContent value="emotions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Emotional Analysis</CardTitle>
                    <DialogDescription>
                      Breakdown of detected emotions in this post
                    </DialogDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <EmotionBar label="joy" value={aiAnalytics.emotions.joy} color="green" />
                    <EmotionBar label="trust" value={aiAnalytics.emotions.trust} color="blue" />
                    <EmotionBar label="surprise" value={aiAnalytics.emotions.surprise} color="yellow" />
                    <EmotionBar label="anger" value={aiAnalytics.emotions.anger} color="red" />
                    <EmotionBar label="sadness" value={aiAnalytics.emotions.sadness} color="purple" />
                    <EmotionBar label="fear" value={aiAnalytics.emotions.fear} color="orange" />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="topics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Tag className="w-4 h-4 mr-2" />
                        Keywords
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {aiAnalytics.keywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Topics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {aiAnalytics.topics.map((topic, index) => (
                          <Badge key={index} variant="outline">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="safety" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MetricCard
                    icon={Shield}
                    label="Toxicity Level"
                    value={`${(aiAnalytics.toxicity * 100).toFixed(1)}%`}
                    description={aiAnalytics.toxicity < 0.3 ? "Safe content" : "May need review"}
                  />
                  <MetricCard
                    icon={AlertTriangle}
                    label="Spam Score"
                    value={`${(aiAnalytics.spam * 100).toFixed(1)}%`}
                    description={aiAnalytics.spam < 0.5 ? "Legitimate content" : "Possible spam"}
                  />
                </div>
              </TabsContent>
            </Tabs>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={post.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Original
                </a>
              </Button>
              {aiAnalytics && aiAnalytics.status !== 'completed' && (
                <Button size="sm">
                  <Brain className="w-4 h-4 mr-2" />
                  {aiAnalytics.status === 'in-progress' ? 'Re-analyze' : 'Analyze Now'}
                </Button>
              )}
            </div>
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}