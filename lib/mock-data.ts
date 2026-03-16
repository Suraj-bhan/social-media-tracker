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
    timestamp: '2026-03-16T10:30:00Z', // Today
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
    timestamp: '2026-03-15T15:45:00Z', // Yesterday
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
    timestamp: '2026-03-14T09:20:00Z', // 2 days ago
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
    timestamp: '2026-03-13T14:15:00Z', // 3 days ago
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
    timestamp: '2026-03-12T18:00:00Z', // 4 days ago - This week
    engagement: {
      views: 12450,
      likes: 234,
      comments: 67
    },
    url: 'https://youtube.com/watch?v=example1',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=320&h=180&fit=crop&crop=center'
  },
  {
    id: '6',
    platform: 'youtube',
    title: 'My Kid Built Their First Game with BrightChamps!',
    content: 'Watch my 10-year-old daughter showcase the amazing game she built during her BrightChamps coding course. So proud!',
    author: 'ProudMomMoments',
    authorAvatar: '👩‍👧',
    timestamp: '2026-03-11T12:30:00Z', // 5 days ago - This week
    engagement: {
      views: 8920,
      likes: 445,
      comments: 89
    },
    url: 'https://youtube.com/watch?v=example2',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=320&h=180&fit=crop&crop=center'
  },

  {
    id: '7',
    platform: 'youtube',
    title: 'BrightChamps Kids Coding Bootcamp - Week 1 Results',
    content: 'Amazing progress from our 8-year-old in the BrightChamps coding bootcamp! Here\'s what they learned in just one week.',
    author: 'CodeKidsFamily',
    authorAvatar: '👨‍👩‍👧‍👦',
    timestamp: '2026-03-10T16:20:00Z', // 6 days ago - This week
    engagement: {
      views: 5680,
      likes: 178,
      comments: 45
    },
    url: 'https://youtube.com/watch?v=example3',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=320&h=180&fit=crop&crop=center'
  },

  // Google News Posts
  {
    id: '8',
    platform: 'google-news',
    title: 'BrightChamps Expands to 30 Countries with New Funding',
    content: 'Singapore-based edtech startup BrightChamps announced its expansion to 30 countries following a successful Series C funding round of $63 million.',
    author: 'TechCrunch',
    timestamp: '2026-03-09T08:45:00Z', // Last week
    engagement: {},
    url: 'https://techcrunch.com/brightchamps-expansion'
  },
  {
    id: '9',
    platform: 'google-news',
    title: 'The Rise of Coding Education for Children in India',
    content: 'How companies like BrightChamps are making coding accessible to children across India and beyond, creating a new generation of digital natives.',
    author: 'The Economic Times',
    timestamp: '2026-03-08T11:20:00Z', // Last week
    engagement: {},
    url: 'https://economictimes.com/coding-education-india'
  },
  {
    id: '10',
    platform: 'google-news',
    title: 'BrightChamps Partners with Schools for Coding Curriculum',
    content: 'BrightChamps announces strategic partnerships with 500+ schools to integrate coding education into regular curriculum.',
    author: 'EdTech Magazine',
    timestamp: '2026-03-07T16:10:00Z', // Last week
    engagement: {},
    url: 'https://edtechmagazine.com/brightchamps-schools'
  },

  // More Twitter/X Posts
  {
    id: '11',
    platform: 'twitter',
    title: 'BrightChamps scholarship program launched',
    content: 'Excited to announce our new scholarship program! 500 underprivileged kids will get free coding classes this year 🎓 #EducationForAll #BrightChamps',
    author: '@brightchamps_official',
    authorAvatar: '🌟',
    timestamp: '2026-03-06T14:30:00Z', // Last week
    engagement: {
      likes: 1250,
      shares: 340,
      comments: 89
    },
    url: 'https://twitter.com/brightchamps/status/3'
  },
  {
    id: '12',
    platform: 'twitter',
    title: 'Weekend coding challenge winner',
    content: 'Congratulations to 12-year-old Sarah from @BrightChamps weekend coding challenge! Her AI pet game is incredible 🤖🐕 #YoungCoder #ProudMoment',
    author: '@codinghero',
    authorAvatar: '🏆',
    timestamp: '2026-03-05T09:15:00Z', // Last week
    engagement: {
      likes: 567,
      shares: 123,
      comments: 45
    },
    url: 'https://twitter.com/example/status/4'
  },
  {
    id: '13',
    platform: 'twitter',
    title: 'Parent testimonial thread',
    content: '🧵 Thread: Why we chose @BrightChamps over other coding platforms for our twins. 6 months later, here are the results... (1/8)',
    author: '@techfamilymom',
    authorAvatar: '👩‍💻',
    timestamp: '2026-02-28T19:45:00Z', // This month
    engagement: {
      likes: 789,
      shares: 234,
      comments: 67
    },
    url: 'https://twitter.com/example/status/5'
  },
  {
    id: '14',
    platform: 'twitter',
    title: 'BrightChamps Halloween coding contest',
    content: 'Our Halloween coding contest was spooky fun! 🎃 Kids created ghost games, vampire calculators, and zombie websites. Creativity level: MAXIMUM! 👻',
    author: '@brightchamps_events',
    authorAvatar: '🎃',
    timestamp: '2026-02-15T18:00:00Z', // This month
    engagement: {
      likes: 445,
      shares: 89,
      comments: 67
    },
    url: 'https://twitter.com/brightchamps/halloween-contest'
  },
  {
    id: '15',
    platform: 'twitter',
    title: 'BrightChamps achieves 1M students milestone',
    content: '🎉 We did it! 1 MILLION students have learned to code with BrightChamps! Thank you to every parent, teacher, and amazing kid who made this possible! 🚀',
    author: '@brightchamps_ceo',
    authorAvatar: '🎯',
    timestamp: '2026-01-28T12:00:00Z', // Last 3 months
    engagement: {
      likes: 3420,
      shares: 567,
      comments: 234
    },
    url: 'https://twitter.com/brightchamps/1m-milestone'
  },

  // More Reddit Posts
  {
    id: '15',
    platform: 'reddit',
    title: 'BrightChamps vs WhiteHat Jr vs Vedantu - Honest comparison',
    content: 'After spending $3000+ on all three platforms with my kids, here\'s my detailed breakdown of curriculum, teaching quality, pricing, and results...',
    author: 'u/honestparentreview',
    timestamp: '2024-03-03T11:30:00Z',
    engagement: {
      comments: 156,
      likes: 289
    },
    url: 'https://reddit.com/r/Parenting/coding-platforms-comparison'
  },
  {
    id: '16',
    platform: 'reddit',
    title: 'My daughter created her first mobile app at age 10!',
    content: 'Thanks to BrightChamps, my daughter just published her first app on the Play Store! It\'s a simple calculator but I\'m so proud. Here\'s her journey from zero to published developer...',
    author: 'u/prouddad2024',
    timestamp: '2024-03-02T16:20:00Z',
    engagement: {
      comments: 92,
      likes: 456
    },
    url: 'https://reddit.com/r/learnprogramming/daughter-first-app'
  },
  {
    id: '17',
    platform: 'reddit',
    title: 'BrightChamps teacher quality - hit or miss?',
    content: 'We\'ve had 3 different teachers in 6 months. First one was amazing, second was okay, third is struggling with English. Anyone else experiencing inconsistent teaching quality?',
    author: 'u/concernedmom2024',
    timestamp: '2024-03-01T13:45:00Z',
    engagement: {
      comments: 78,
      likes: 123
    },
    url: 'https://reddit.com/r/india/brightchamps-teacher-quality'
  },
  {
    id: '18',
    platform: 'reddit',
    title: 'BrightChamps discount codes - March 2024',
    content: 'PSA: Found some working BrightChamps discount codes for new enrollments. Saved me $300! Sharing them here for other parents. Use code REDDIT25 for 25% off!',
    author: 'u/savvyparent',
    timestamp: '2024-02-22T20:30:00Z',
    engagement: {
      comments: 134,
      likes: 567
    },
    url: 'https://reddit.com/r/deals/brightchamps-discounts'
  },
  {
    id: '19',
    platform: 'reddit',
    title: 'Is BrightChamps worth it for a 6-year-old?',
    content: 'Thinking about enrolling my 6-year-old in BrightChamps but not sure if she\'s too young. What\'s been your experience with very young kids? How do they handle screen time?',
    author: 'u/newparent2024',
    timestamp: '2024-02-18T10:15:00Z',
    engagement: {
      comments: 89,
      likes: 167
    },
    url: 'https://reddit.com/r/Parenting/brightchamps-young-kids'
  },

  // More YouTube Posts
  {
    id: '20',
    platform: 'youtube',
    title: '5 Things I Wish I Knew Before Starting BrightChamps',
    content: 'Thinking about enrolling your kid in BrightChamps? Here are 5 important things to consider first, from a parent who\'s been through the whole journey!',
    author: 'Smart Parenting Tips',
    authorAvatar: '🎓',
    timestamp: '2024-02-29T10:00:00Z',
    engagement: {
      views: 15680,
      likes: 892,
      comments: 156
    },
    url: 'https://youtube.com/watch?v=brightchamps-tips',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=320&h=180&fit=crop&crop=center'
  },
  {
    id: '21',
    platform: 'youtube',
    title: 'BrightChamps Student Showcase - Amazing Projects!',
    content: 'Check out these incredible projects created by BrightChamps students aged 6-16. From games to websites to mobile apps - the creativity is off the charts!',
    author: 'Young Coders Channel',
    authorAvatar: '🚀',
    timestamp: '2024-02-28T15:30:00Z',
    engagement: {
      views: 23450,
      likes: 1123,
      comments: 234
    },
    url: 'https://youtube.com/watch?v=student-showcase',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=320&h=180&fit=crop&crop=center'
  },
  {
    id: '22',
    platform: 'youtube',
    title: 'Day in the Life: BrightChamps Online Class Experience',
    content: 'Follow along as we document a typical BrightChamps online coding class. See how interactive and engaging virtual learning can be for kids!',
    author: 'EduVlog Family',
    authorAvatar: '📚',
    timestamp: '2024-02-27T08:15:00Z',
    engagement: {
      views: 9870,
      likes: 567,
      comments: 78
    },
    url: 'https://youtube.com/watch?v=day-in-life',
    thumbnail: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=320&h=180&fit=crop&crop=center'
  },
  {
    id: '23',
    platform: 'youtube',
    title: 'BrightChamps vs Traditional Coding Classes - Honest Review',
    content: 'I enrolled my twins in both online BrightChamps and local coding classes. Here\'s my honest comparison after 6 months - which delivered better results?',
    author: 'Parent Comparison Hub',
    authorAvatar: '⚖️',
    timestamp: '2024-02-21T14:00:00Z',
    engagement: {
      views: 18920,
      likes: 756,
      comments: 134
    },
    url: 'https://youtube.com/watch?v=brightchamps-vs-local',
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=320&h=180&fit=crop&crop=center'
  },
  {
    id: '24',
    platform: 'youtube',
    title: 'BrightChamps Graduation Ceremony 2024 - So Emotional!',
    content: 'Attended my son\'s BrightChamps graduation ceremony and I\'m not crying, you\'re crying! Watch these amazing kids present their final projects.',
    author: 'Milestone Moments',
    authorAvatar: '🎓',
    timestamp: '2024-02-15T16:45:00Z',
    engagement: {
      views: 12340,
      likes: 890,
      comments: 156
    },
    url: 'https://youtube.com/watch?v=graduation-ceremony',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=320&h=180&fit=crop&crop=center'
  },

  // More Google News Posts
  {
    id: '25',
    platform: 'google-news',
    title: 'BrightChamps Wins EdTech Innovation Award 2024',
    content: 'Singapore-based coding education platform BrightChamps has been recognized with the prestigious EdTech Innovation Award for its adaptive learning methodology and global impact.',
    author: 'EdTech News Daily',
    timestamp: '2024-02-26T12:00:00Z',
    engagement: {},
    url: 'https://edtechnews.com/brightchamps-innovation-award'
  },
  {
    id: '26',
    platform: 'google-news',
    title: 'Study Shows Coding Education Improves Math Scores by 23%',
    content: 'New research involving 1,000 students from BrightChamps programs demonstrates significant improvement in mathematics performance after 6 months of coding education.',
    author: 'Education Research Journal',
    timestamp: '2024-02-25T14:30:00Z',
    engagement: {},
    url: 'https://educationresearch.com/coding-math-correlation'
  },
  {
    id: '27',
    platform: 'google-news',
    title: 'BrightChamps CEO Interview: Future of Kids Coding Education',
    content: 'In an exclusive interview, BrightChamps CEO discusses the company\'s vision for making coding education accessible to every child globally and upcoming AI integration.',
    author: 'Startup India Today',
    timestamp: '2024-02-24T11:45:00Z',
    engagement: {},
    url: 'https://startupindia.com/brightchamps-ceo-interview'
  },
  {
    id: '28',
    platform: 'google-news',
    title: 'BrightChamps Launches AI-Powered Personalized Learning',
    content: 'EdTech giant BrightChamps introduces revolutionary AI system that adapts teaching methods to each child\'s learning style, promising 40% faster skill acquisition.',
    author: 'Tech Innovation Weekly',
    timestamp: '2024-02-20T09:30:00Z',
    engagement: {},
    url: 'https://techinnovation.com/brightchamps-ai-learning'
  },
  {
    id: '29',
    platform: 'google-news',
    title: 'Global Coding Skills Gap: How Companies Like BrightChamps Are Helping',
    content: 'As demand for tech talent grows, early coding education platforms like BrightChamps are playing a crucial role in preparing the next generation of developers.',
    author: 'Fortune Education',
    timestamp: '2024-02-18T13:15:00Z',
    engagement: {},
    url: 'https://fortune.com/education/coding-skills-gap'
  },

  // Additional diverse content
  {
    id: '30',
    platform: 'twitter',
    title: 'BrightChamps student wins national coding competition',
    content: 'BREAKING: 11-year-old Alex from our BrightChamps family just won the National Junior Coding Championship! 🏆 Proud teacher moment! #BrightChampsPride',
    author: '@teacher_sarah_bc',
    authorAvatar: '👩‍🏫',
    timestamp: '2024-02-17T20:30:00Z',
    engagement: {
      likes: 2340,
      shares: 456,
      comments: 123
    },
    url: 'https://twitter.com/brightchamps/national-winner'
  },
  {
    id: '31',
    platform: 'reddit',
    title: 'BrightChamps helped my autistic son find his passion',
    content: 'My 9-year-old with autism struggled in traditional learning environments. BrightChamps\' patient teachers and visual approach helped him discover his love for coding. He\'s thriving now!',
    author: 'u/specialneedsmom',
    timestamp: '2024-02-16T14:20:00Z',
    engagement: {
      comments: 67,
      likes: 345
    },
    url: 'https://reddit.com/r/autism/brightchamps-success-story'
  },
  {
    id: '32',
    platform: 'youtube',
    title: 'BrightChamps Price Breakdown - Is It Worth the Cost?',
    content: 'Detailed analysis of BrightChamps pricing, hidden costs, and value comparison with competitors. Plus tips on how to get the best deals!',
    author: 'Budget Parent Reviews',
    authorAvatar: '💰',
    timestamp: '2024-02-14T11:00:00Z',
    engagement: {
      views: 28750,
      likes: 1234,
      comments: 289
    },
    url: 'https://youtube.com/watch?v=brightchamps-pricing',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=320&h=180&fit=crop&crop=center'
  }
];