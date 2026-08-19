import { Project } from './types';

// Using open source/public domain video samples for preview URLs
const SAMPLE_PREVIEW = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export const projects: Project[] = [
  {
    id: '1',
    title: 'Neon Genesis',
    category: 'Commercial',
    roles: ['Cinematography', 'Direction'],
    format: 'Short-form',
    imageUrl: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&fit=crop&q=80',
    video: {
      url: 'https://vimeo.com/9011932',
      provider: 'vimeo',
      previewUrl: SAMPLE_PREVIEW
    },
    featured: true,
    year: '2025',
    client: 'Cyberdyne Systems',
    description: 'A high-octane commercial pushing the boundaries of neo-noir lighting and high-speed motion control cinematography. Shot on ARRI Alexa Mini LF.',
    published: true,
    tags: ['Neo-noir', 'Action', 'VFX'],
    order: 0
  },
  {
    id: '2',
    title: 'The Void',
    category: 'Short Film',
    roles: ['Direction', 'Video Editing'],
    format: 'Long-form',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80',
    video: {
      url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
      provider: 'youtube',
      previewUrl: SAMPLE_PREVIEW
    },
    year: '2024',
    description: 'An atmospheric dive into isolation. This piece focuses heavily on post-production pacing, leveraging aggressive cuts and ambient soundscapes to build tension.',
    published: true,
    tags: ['Sci-Fi', 'Atmospheric', 'Indie'],
    order: 1
  },
  {
    id: '3',
    title: 'Crimson Tide',
    category: 'Music Video',
    roles: ['Cinematography', 'Color Grading'],
    format: 'Short-form',
    imageUrl: 'https://images.unsplash.com/photo-1535016120720-40c746a6580c?auto=format&fit=crop&q=80',
    video: {
      url: 'https://vimeo.com/1084537',
      provider: 'vimeo',
      previewUrl: SAMPLE_PREVIEW
    },
    featured: true,
    year: '2024',
    client: 'The Midnight',
    description: 'A visually striking music video heavily reliant on deep reds and stark contrast. Executed entirely with practical lighting setups and in-camera effects.',
    published: true,
    tags: ['Synthwave', 'Neon', 'Practical Effects'],
    order: 2
  },
  {
    id: '4',
    title: 'Echoes',
    category: 'Documentary',
    roles: ['Cinematography', 'Direction'],
    format: 'Long-form',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80',
    video: {
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      provider: 'direct',
      previewUrl: SAMPLE_PREVIEW
    },
    year: '2023',
    description: 'A sprawling 40-minute documentary exploring brutalist architecture. Required extensive Steadicam work and natural light management across various European locations.',
    published: true,
    tags: ['Architecture', 'Steadicam', 'Travel'],
    order: 3
  },
  {
    id: '5',
    title: 'Urban Decay',
    category: 'Fashion',
    roles: ['Video Editing', 'Sound Design'],
    format: 'Short-form',
    imageUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487bc2a?auto=format&fit=crop&q=80',
    video: {
      url: 'https://vimeo.com/22439234',
      provider: 'vimeo',
      previewUrl: SAMPLE_PREVIEW
    },
    year: '2023',
    client: 'Vogue',
    description: 'Rapid, kinetic editing brings this streetwear editorial to life. Syncopated rhythms and analog film overlays give the piece a raw, tactile feel.',
    published: true,
    tags: ['Streetwear', 'Analog', 'Kinetic'],
    order: 4
  },
  {
    id: '6',
    title: 'Solitude',
    category: 'Weddings',
    roles: ['Cinematography', 'Video Editing'],
    format: 'Long-form',
    imageUrl: 'https://images.unsplash.com/photo-1518131672697-613becd4fab5?auto=format&fit=crop&q=80',
    video: {
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      provider: 'youtube',
      previewUrl: SAMPLE_PREVIEW
    },
    year: '2023',
    description: 'A deeply personal visual poem. Features a combination of drone photography, macro lens setups, and meticulous rhythmic editing.',
    published: true,
    tags: ['Drone', 'Macro', 'Abstract'],
    order: 5
  }
];
