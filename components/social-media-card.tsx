import { SocialMediaPost } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { PlatformIcon, getPlatformName } from './platform-icon';
import { Heart, MessageCircle, Share2, Eye, Clock, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';

interface SocialMediaCardProps {
  post: SocialMediaPost;
  onClick?: () => void;
  viewType?: 'grid' | 'list';
}

export function SocialMediaCard({ post, onClick, viewType = 'grid' }: SocialMediaCardProps) {
  const timeAgo = formatDistanceToNow(new Date(post.timestamp), { addSuffix: true });

  if (viewType === 'list') {
    return (
      <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group" onClick={onClick}>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="w-fit">
                  <PlatformIcon platform={post.platform} size={14} />
                  <span className="ml-1 text-xs">{getPlatformName(post.platform)}</span>
                </Badge>
              </div>
              <Avatar className="w-10 h-10">
                <AvatarFallback className="text-sm">
                  {post.authorAvatar || post.author.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    by {post.author}
                  </p>
                </div>
                <div className="flex items-center text-xs text-muted-foreground ml-4">
                  <Clock size={12} className="mr-1" />
                  {timeAgo}
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {post.content}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  {post.engagement.likes && (
                    <div className="flex items-center">
                      <Heart size={14} className="mr-1 text-red-500" />
                      <span>{post.engagement.likes.toLocaleString()}</span>
                    </div>
                  )}
                  {post.engagement.comments && (
                    <div className="flex items-center">
                      <MessageCircle size={14} className="mr-1 text-blue-500" />
                      <span>{post.engagement.comments.toLocaleString()}</span>
                    </div>
                  )}
                  {post.engagement.shares && (
                    <div className="flex items-center">
                      <Share2 size={14} className="mr-1 text-green-500" />
                      <span>{post.engagement.shares.toLocaleString()}</span>
                    </div>
                  )}
                  {post.engagement.views && (
                    <div className="flex items-center">
                      <Eye size={14} className="mr-1 text-purple-500" />
                      <span>{post.engagement.views.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={14} />
                </Button>
              </div>
            </div>

            {post.thumbnail && (
              <div className="flex-shrink-0 ml-4">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-24 h-24 object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer group border-0 shadow-md relative" onClick={onClick}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="w-fit border-0 bg-muted/50">
            <PlatformIcon platform={post.platform} size={14} />
            <span className="ml-1 text-xs">{getPlatformName(post.platform)}</span>
          </Badge>
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock size={12} className="mr-1" />
            {timeAgo}
          </div>
        </div>
        <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors leading-5">
          {post.title}
        </h3>
      </CardHeader>

      <CardContent className="pt-0">
        {post.thumbnail && (
          <div className="mb-4">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-36 object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
              loading="lazy"
            />
          </div>
        )}

        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
          {post.content}
        </p>

        <Separator className="mb-4" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs">
                {post.authorAvatar || post.author.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium text-muted-foreground truncate max-w-20">
              {post.author}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            {post.engagement.likes && (
              <div className="flex items-center text-muted-foreground hover:text-red-500 transition-colors">
                <Heart size={12} className="mr-1" />
                <span>{post.engagement.likes}</span>
              </div>
            )}
            {post.engagement.comments && (
              <div className="flex items-center text-muted-foreground hover:text-blue-500 transition-colors">
                <MessageCircle size={12} className="mr-1" />
                <span>{post.engagement.comments}</span>
              </div>
            )}
            {post.engagement.shares && (
              <div className="flex items-center text-muted-foreground hover:text-green-500 transition-colors">
                <Share2 size={12} className="mr-1" />
                <span>{post.engagement.shares}</span>
              </div>
            )}
            {post.engagement.views && (
              <div className="flex items-center text-muted-foreground hover:text-purple-500 transition-colors">
                <Eye size={12} className="mr-1" />
                <span>{post.engagement.views.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ExternalLink size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}