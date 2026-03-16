import { SocialMediaPost } from '@/types';

export const mockPosts: SocialMediaPost[] = [
  // Twitter/X Posts
  {
    id: '1',
    platform: 'twitter',
    title: 'BrightChamps is revolutionizing education!',
    content: 'Just enrolled my kid in @BrightChamps coding classes. Amazing curriculum and teachers! #coding #education #kids',
    author: '@techparent123',
    authorAvatar: '👨‍💻',
    timestamp: '2024-03-15T10:30:00Z',
    engagement: {
      likes: 127,
      shares: 23,
      comments: 18
    },
    url: 'https://twitter.com/example/status/1'
  },
  {
    id: '2',
    platform: 'twitter',
    title: 'BrightChamps funding news',
    content: 'BrightChamps raises $63M Series C to expand globally. Proud to see an Indian edtech company scaling internationally! 🇮🇳',
    author: '@startupindia',
    authorAvatar: '🚀',
    timestamp: '2024-03-14T15:45:00Z',
    engagement: {
      likes: 892,
      shares: 156,
      comments: 67
    },
    url: 'https://twitter.com/example/status/2'
  },

  // Reddit Posts
  {
    id: '3',
    platform: 'reddit',
    title: 'Has anyone tried BrightChamps for their kids?',
    content: 'My 8-year-old is interested in coding and I came across BrightChamps. Their curriculum looks comprehensive but wanted to get some real parent reviews before investing.',
    author: 'u/concernedparent2024',
    timestamp: '2024-03-13T09:20:00Z',
    engagement: {
      comments: 45,
      likes: 23
    },
    url: 'https://reddit.com/r/parenting/example1'
  },
  {
    id: '4',
    platform: 'reddit',
    title: 'BrightChamps vs other coding platforms for kids',
    content: 'Detailed comparison between BrightChamps, Code.org, and Scratch Jr. Here\'s my experience after trying all three with my twins...',
    author: 'u/codingdad',
    timestamp: '2024-03-12T14:15:00Z',
    engagement: {
      comments: 78,
      likes: 156
    },
    url: 'https://reddit.com/r/learnprogramming/example2'
  },

  // YouTube Posts
  {
    id: '5',
    platform: 'youtube',
    title: 'BrightChamps Review: Is It Worth the Investment?',
    content: 'A detailed review of BrightChamps online coding classes for kids. I share my honest opinion after 6 months of classes.',
    author: 'TechReview Family',
    authorAvatar: '📱',
    timestamp: '2024-03-11T18:00:00Z',
    engagement: {
      views: 12450,
      likes: 234,
      comments: 67
    },
    url: 'https://youtube.com/watch?v=example1',
    thumbnail: 'https://via.placeholder.com/320x180'
  },
  {
    id: '6',
    platform: 'youtube',
    title: 'My Kid Built Their First Game with BrightChamps!',
    content: 'Watch my 10-year-old daughter showcase the amazing game she built during her BrightChamps coding course. So proud!',
    author: 'ProudMomMoments',
    authorAvatar: '👩‍👧',
    timestamp: '2024-03-10T12:30:00Z',
    engagement: {
      views: 8920,
      likes: 445,
      comments: 89
    },
    url: 'https://youtube.com/watch?v=example2',
    thumbnail: 'https://via.placeholder.com/320x180'
  },

  // Google News Posts
  {
    id: '7',
    platform: 'google-news',
    title: 'BrightChamps Expands to 30 Countries with New Funding',
    content: 'Singapore-based edtech startup BrightChamps announced its expansion to 30 countries following a successful Series C funding round of $63 million.',
    author: 'TechCrunch',
    timestamp: '2024-03-09T08:45:00Z',
    engagement: {},
    url: 'https://techcrunch.com/brightchamps-expansion'
  },
  {
    id: '8',
    platform: 'google-news',
    title: 'The Rise of Coding Education for Children in India',
    content: 'How companies like BrightChamps are making coding accessible to children across India and beyond, creating a new generation of digital natives.',
    author: 'The Economic Times',
    timestamp: '2024-03-08T11:20:00Z',
    engagement: {},
    url: 'https://economictimes.com/coding-education-india'
  },
  {
    id: '9',
    platform: 'google-news',
    title: 'BrightChamps Partners with Schools for Coding Curriculum',
    content: 'BrightChamps announces strategic partnerships with 500+ schools to integrate coding education into regular curriculum.',
    author: 'EdTech Magazine',
    timestamp: '2024-03-07T16:10:00Z',
    engagement: {},
    url: 'https://edtechmagazine.com/brightchamps-schools'
  }
];