'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SocialMediaCard } from './social-media-card';
import { PlatformIcon, getPlatformName } from './platform-icon';
import { ThemeToggle } from './theme-toggle';
import { AdvancedDateFilter, AdvancedDateFilterValue } from './advanced-date-filter';
import { mockPosts } from '@/lib/mock-data';
import { Platform, SocialMediaPost } from '@/types';
import { Search, Filter, LayoutGrid, List, TrendingUp, Clock, BarChart3, X, CalendarDays } from 'lucide-react';
import { isWithinInterval, parseISO, startOfDay, endOfDay, subDays } from 'date-fns';

const platforms: Platform[] = ['twitter', 'reddit', 'youtube', 'google-news'];

type SortOption = 'recent' | 'popular' | 'engagement';
type ViewType = 'grid' | 'list';

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('BrightChamps');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(platforms);
  const [posts] = useState<SocialMediaPost[]>(mockPosts);
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [dateFilter, setDateFilter] = useState<AdvancedDateFilterValue>({
    from: undefined,
    to: undefined,
    timeRange: 'all-day'
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const filteredPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      const matchesSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPlatform = selectedPlatforms.length === 0 ||
        selectedPlatforms.includes(post.platform);

      // Date filtering
      const matchesDate = (() => {
        if (!dateFilter.from || !dateFilter.to) return true;

        try {
          const postDate = parseISO(post.timestamp);
          return isWithinInterval(postDate, {
            start: dateFilter.from,
            end: dateFilter.to,
          });
        } catch {
          return true; // If date parsing fails, include the post
        }
      })();

      return matchesSearch && matchesPlatform && matchesDate;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'popular':
          const aTotal = (a.engagement.likes || 0) + (a.engagement.shares || 0);
          const bTotal = (b.engagement.likes || 0) + (b.engagement.shares || 0);
          return bTotal - aTotal;
        case 'engagement':
          const aEng = (a.engagement.comments || 0);
          const bEng = (b.engagement.comments || 0);
          return bEng - aEng;
        default:
          return 0;
      }
    });

    return filtered;
  }, [posts, searchQuery, selectedPlatforms, sortBy, dateFilter]);

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleCardClick = (post: SocialMediaPost) => {
    // TODO: Handle card click behavior - will be implemented later
    console.log('Card clicked:', post);
  };

  const platformStats = useMemo(() => {
    return platforms.map(platform => {
      const count = filteredPosts.filter(post => post.platform === platform).length;
      const totalEngagement = filteredPosts
        .filter(post => post.platform === platform)
        .reduce((sum, post) => {
          return sum + (post.engagement.likes || 0) + (post.engagement.comments || 0) + (post.engagement.shares || 0);
        }, 0);
      return { platform, count, totalEngagement };
    });
  }, [filteredPosts]);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 sm:px-8 py-4 max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Social Media Tracker</h1>
              <p className="text-sm text-muted-foreground">
                Monitor brand mentions and engagement across platforms
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant={viewType === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('grid')}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewType === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search mentions, keywords, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="w-[140px] min-w-0">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Recent
                    </div>
                  </SelectItem>
                  <SelectItem value="popular">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Popular
                    </div>
                  </SelectItem>
                  <SelectItem value="engagement">
                    <div className="flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Engagement
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={showAdvancedFilters ? 'bg-accent' : ''}
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Platform Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-muted-foreground mr-2">Platforms:</span>
            {platforms.map((platform) => (
              <Badge
                key={platform}
                variant={selectedPlatforms.includes(platform) ? 'default' : 'outline'}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => togglePlatform(platform)}
              >
                <PlatformIcon platform={platform} size={14} />
                <span className="ml-1">{getPlatformName(platform)}</span>
              </Badge>
            ))}
            {selectedPlatforms.length < platforms.length && (
              <Badge
                variant="secondary"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedPlatforms(platforms)}
              >
                Select All
              </Badge>
            )}
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="mt-4 p-4 border rounded-lg bg-card shadow-sm max-w-full overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                <Badge variant="secondary">
                  {filteredPosts.length} results
                </Badge>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <label className="text-sm font-medium mb-2 block">Date & Time Filter</label>
                  <AdvancedDateFilter
                    value={dateFilter}
                    onChange={setDateFilter}
                    className="w-full"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Quick Actions</label>
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setDateFilter({
                          from: undefined,
                          to: undefined,
                          timeRange: 'all-day'
                        });
                        setSelectedPlatforms(platforms);
                        setSearchQuery('BrightChamps');
                      }}
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear All
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAdvancedFilters(false)}
                    >
                      Hide Filters
                    </Button>
                  </div>
                </div>
              </div>

              {/* Active Filters Summary */}
              {(dateFilter.from || dateFilter.to) && (
                <div className="mt-3 pt-3 border-t">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-medium text-muted-foreground">Active Filters:</span>
                    {dateFilter.preset && (
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="w-3 h-3" />
                        {dateFilter.preset === 'today' && 'Today'}
                        {dateFilter.preset === 'week' && 'Last 7 days'}
                        {dateFilter.preset === 'month' && 'Last 30 days'}
                        {dateFilter.preset === '3months' && 'Last 3 months'}
                        <X
                          className="w-3 h-3 cursor-pointer hover:bg-muted-foreground/20 rounded"
                          onClick={() => setDateFilter({
                            from: undefined,
                            to: undefined,
                            timeRange: 'all-day'
                          })}
                        />
                      </Badge>
                    )}
                    {!dateFilter.preset && dateFilter.from && (
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="w-3 h-3" />
                        Custom Date Range
                        <X
                          className="w-3 h-3 cursor-pointer hover:bg-muted-foreground/20 rounded"
                          onClick={() => setDateFilter({
                            from: undefined,
                            to: undefined,
                            timeRange: 'all-day'
                          })}
                        />
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 sm:px-8 py-6 max-w-7xl overflow-hidden">
        {/* Quick Date Filters */}
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <span className="text-sm font-medium text-muted-foreground mr-2">Quick filters:</span>
          <Button
            variant={dateFilter.preset === 'today' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateFilter({
              from: startOfDay(new Date()),
              to: endOfDay(new Date()),
              preset: 'today',
              timeRange: 'all-day'
            })}
          >
            Today
          </Button>
          <Button
            variant={dateFilter.preset === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setDateFilter({
                from: startOfDay(subDays(new Date(), 6)),
                to: endOfDay(new Date()),
                preset: 'week',
                timeRange: 'all-day'
              });
            }}
          >
            This Week
          </Button>
          <Button
            variant={dateFilter.preset === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setDateFilter({
                from: startOfDay(subDays(new Date(), 29)),
                to: endOfDay(new Date()),
                preset: 'month',
                timeRange: 'all-day'
              });
            }}
          >
            This Month
          </Button>
          {(dateFilter.from || dateFilter.to) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDateFilter({
                from: undefined,
                to: undefined,
                timeRange: 'all-day'
              })}
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="posts">Posts ({filteredPosts.length})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredPosts.length} results for <span className="font-medium">"{searchQuery}"</span>
                </p>
                {(dateFilter.from || selectedPlatforms.length < platforms.length) && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>•</span>
                    <span>
                      {dateFilter.preset && `${
                        dateFilter.preset === 'today' ? 'Today' :
                        dateFilter.preset === 'week' ? 'Last 7 days' :
                        dateFilter.preset === 'month' ? 'Last 30 days' :
                        dateFilter.preset === '3months' ? 'Last 3 months' : 'Custom range'
                      }`}
                      {selectedPlatforms.length < platforms.length && ` • ${selectedPlatforms.length} platform${selectedPlatforms.length > 1 ? 's' : ''}`}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                Sorted by {sortBy}
              </div>
            </div>

            {/* Posts Grid/List */}
            <div className={
              viewType === 'grid'
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                : "space-y-4"
            }>
              {filteredPosts.map((post) => (
                <SocialMediaCard
                  key={post.id}
                  post={post}
                  onClick={() => handleCardClick(post)}
                  viewType={viewType}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <Card className="mt-8">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-xl mb-2">No posts found</CardTitle>
                  <CardDescription className="text-center max-w-sm">
                    Try adjusting your search query or platform filters to find more content.
                  </CardDescription>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformStats.map((stat) => (
                <Card key={stat.platform}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {getPlatformName(stat.platform)}
                    </CardTitle>
                    <PlatformIcon platform={stat.platform} size={16} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.count}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.totalEngagement} total interactions
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}