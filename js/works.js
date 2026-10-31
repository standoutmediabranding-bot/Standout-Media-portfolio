/* =====================================================================
   STANDOUT MEDIA - EDITING PORTFOLIO DATA
   This is the only file you edit to add videos.

   SHOWREEL: link for the big player under the hero ("" = placeholder).

   Each work item:
     cat    : category key (see CATEGORIES below)
     orient : "v" vertical (9:16) or "h" horizontal (16:9)
     url    : YouTube / Shorts / Google Drive link. "" = placeholder.
     title  : name of the video
     client : client name (or "Personal brand", "Startup" when not shown)
     result : one line result shown on the card (optional)
     thumb  : cover image path, e.g. "images/name.jpg" (needed for Drive
              links and thumbnails. YouTube links get one automatically)

   Divya's profile screenshot: set  profile: "images/divya-profile.jpg"
   in the "creator" category below (leave "" to show the placeholder).

   tone = block colour: "white", "dark" or "green".
   ===================================================================== */

const SHOWREEL = '';

const CATEGORIES = [
  { key: 'creator', layout: 'case', tone: 'white', label: 'Creator Growth', title: 'From zero to 30K in 2&nbsp;months',
    desc: 'Divya, a creator from Sri Lanka, started with nothing. We edited every video and her page grew fast.',
    profile: 'images/divya-profile.webp', profileAlt: "Divya's Instagram profile",
    stats: [{ n: '10K', t: 'followers within the first 8 videos' }, { n: '30K', t: 'followers in 2 months' }] },
  { key: 'personal', layout: 'v4', tone: 'dark', label: 'Personal Branding', title: 'Edits that build a name',
    desc: 'Videos for personal brands that turned attention into followers and authority.',
    stats: [{ n: '100M+', t: 'views across personal brands' }] },
  { key: 'podcast', layout: 'podcast', tone: 'green', label: 'Podcast Clips', title: 'Two campaigns, millions&nbsp;of&nbsp;views',
    desc: 'We worked with Epaphra, host of The Third Lane Podcast, on two podcast campaigns that pulled serious traction.',
    person: { name: 'Epaphra', show: 'The Third Lane Podcast', handle: '@thethirdlanepodcast', photo: 'images/epaphra.jpg', proof: 'images/epaphra-profile-hd.webp' },
    stats: [{ n: '7.5M', t: 'views from 16 podcast clips' }, { n: '30K', t: 'followers gained' }] },
  { key: 'reels', layout: 'v4', tone: 'white', label: 'Creator Edits', title: 'Edits creators post every day',
    desc: 'Vertical 9:16 edits made for Reels, Shorts and TikTok, with hooks, captions and pacing built for the scroll.' },
  { key: 'talking', layout: 'v4', tone: 'dark', label: 'Talking Head', title: 'Clean edits for people on camera',
    desc: 'Fast pacing, clear captions and sound that keeps the voice front and centre.' },
  { key: 'youtube', layout: 'feature', tone: 'white', label: 'YouTube Long Form', title: 'Long videos that keep people watching',
    desc: 'Story first edits with pacing, sound design and retention in mind.' },
  { key: 'ai', layout: 'duo', tone: 'dark', label: 'AI Commercials', title: 'Films that went into investor pitches',
    desc: 'AI commercial films built to sell an idea. Two startups used ours in their funding pitch.',
    stats: [{ n: '2', t: 'startups pitched investors with these films' }] },
  { key: 'saas', layout: 'duo', tone: 'white', label: 'SaaS Animation', title: 'Software, explained in motion',
    desc: 'Animated product videos made for fundraising and business representation.',
    stats: [{ n: '1', t: 'for startup fundraising' }, { n: '1', t: 'for Venzo Tech' }] },
  { key: 'thumb', layout: 'thumbs', tone: 'green', label: 'Thumbnails', title: 'Thumbnails made to earn the click',
    desc: 'Designed in Photoshop and matched to your brand.' }
];

const WORKS = [
  // Creator growth (Divya)
  { cat: 'creator', orient: 'v', url: 'https://youtube.com/shorts/fQPg3L5La9o', title: 'Divya reel 01', client: 'Divya', result: 'Video 1 of 8' },
  { cat: 'creator', orient: 'v', url: 'https://youtube.com/shorts/nU8MHfI0Ruc', title: 'Divya reel 02', client: 'Divya', result: 'Best performing reel' },

  // Personal branding
  { cat: 'personal', orient: 'v', url: 'https://youtube.com/shorts/eHH0jiuvz64', title: 'Personal brand reel 01', client: 'Personal brand', result: '' },
  { cat: 'personal', orient: 'v', url: 'https://youtube.com/shorts/FdMK5Woccdk', title: 'Personal brand reel 02', client: 'Personal brand', result: '' },
  { cat: 'personal', orient: 'v', url: 'https://youtube.com/shorts/udMTU3XouGk', title: 'Personal brand reel 03', client: 'Personal brand', result: '' },
  { cat: 'personal', orient: 'v', url: 'https://youtube.com/shorts/prSLMd0QAC8', title: 'Personal brand reel 04', client: 'Personal brand', result: '' },

  // Podcast clips (Epaphra, The Third Lane Podcast)
  { cat: 'podcast', orient: 'v', url: 'https://youtube.com/shorts/PtzltHnwEws', title: 'Epaphra clip 01', client: 'Epaphra', result: '' },
  { cat: 'podcast', orient: 'v', url: 'https://youtube.com/shorts/aBzOqxIVE_E', title: 'Epaphra clip 02', client: 'Epaphra', result: '' },
  { cat: 'podcast', orient: 'v', url: 'https://youtube.com/shorts/gyTGWSXvRK4?feature=share', title: 'Epaphra clip 03', client: 'Epaphra', result: '' },
  { cat: 'podcast', orient: 'v', url: 'https://youtube.com/shorts/8xZT4J1rnBw?feature=share', title: 'Epaphra clip 04', client: 'Epaphra', result: '' },

  // Creator edits (9:16)
  { cat: 'reels', orient: 'v', url: 'https://youtube.com/shorts/eYJhhNdNhas', title: 'Creator edit 01', client: 'Creator', result: '' },
  { cat: 'reels', orient: 'v', url: 'https://youtube.com/shorts/2FEaZmOsFbw', title: 'Creator edit 02', client: 'Creator', result: '' },
  { cat: 'reels', orient: 'v', url: 'https://youtube.com/shorts/ijzWqRV9VOk', title: 'Creator edit 03', client: 'Creator', result: '' },
  { cat: 'reels', orient: 'v', url: 'https://youtube.com/shorts/ctNW2QenM9Y', title: 'Creator edit 04', client: 'Creator', result: '' },

  // Talking head
  { cat: 'talking', orient: 'v', url: 'https://youtube.com/shorts/s1nHSVetMZ0', title: 'Talking head 01', client: 'Client', result: '' },
  { cat: 'talking', orient: 'v', url: 'https://youtube.com/shorts/Yy1kW9sAfRw', title: 'Talking head 02', client: 'Client', result: '' },
  { cat: 'talking', orient: 'v', url: 'https://youtube.com/shorts/zc-RneyZbOo', title: 'Talking head 03', client: 'Client', result: '' },
  { cat: 'talking', orient: 'v', url: 'https://youtube.com/shorts/CCxyusiNyEc', title: 'Talking head 04', client: 'Client', result: '' },

  // YouTube long form (first one is shown large)
  { cat: 'youtube', orient: 'h', url: 'https://youtu.be/a0yBoTOsVSE', title: 'Long form video 01', client: 'YouTube', result: '' },
  { cat: 'youtube', orient: 'h', url: 'https://youtu.be/ob5HCWLm9hE', title: 'Long form video 02', client: 'YouTube', result: '' },
  { cat: 'youtube', orient: 'h', url: 'https://youtu.be/4ApLipkuTug', title: 'Long form video 03', client: 'YouTube', result: '' },

  // AI commercials
  { cat: 'ai', orient: 'h', url: 'https://youtu.be/P6_uKHSqwVI', title: 'AI commercial 01', client: 'Startup', result: 'Used in a funding pitch' },
  { cat: 'ai', orient: 'h', url: 'https://youtu.be/BuZvwbGLLxo', title: 'AI commercial 02', client: 'Startup', result: 'Used in a funding pitch' },

  // SaaS animation (two side by side)
  { cat: 'saas', orient: 'h', url: 'https://youtu.be/khYvkxPBQn8', title: 'SaaS animation: Venzo Tech', client: 'Venzo Tech', result: 'Business representation video' },
  { cat: 'saas', orient: 'h', url: 'https://youtu.be/8VFioUJdM9Y', title: 'SaaS animation 02', client: 'Startup', result: 'Made for fundraising' },

  // Thumbnails (set thumb: "images/x.jpg")
  { cat: 'thumb', orient: 'h', url: '', thumb: 'images/thumb-01.jpg', title: 'Thumbnail 01', client: 'YouTube', result: '' },
  { cat: 'thumb', orient: 'h', url: '', thumb: 'images/thumb-02.jpg', title: 'Thumbnail 02', client: 'YouTube', result: '' }
];
