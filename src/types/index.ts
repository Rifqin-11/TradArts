export interface Instrument {
  id: string;
  name: string;
  description: string;
  region: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  imageUrl: string;
  soundSamples?: string[];
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  views: number;
  category: string;
  relatedInstruments?: string[];
}

export interface Song {
  id: string;
  title: string;
  description: string;
  region: string;
  imageUrl: string;
  instruments: string[];
  audioUrl?: string;
  lyrics?: string;
  sheetMusic?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  achievements?: Achievement[];
  progress?: UserProgress;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconUrl: string;
  dateEarned: string;
}

export interface UserProgress {
  instruments: {
    instrumentId: string;
    progress: number;
    lastPlayed: string;
  }[];
  tutorials: {
    tutorialId: string;
    completed: boolean;
    lastWatched: string;
  }[];
  challenges: {
    challengeId: string;
    completed: boolean;
    score: number;
  }[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'performance' | 'listening';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  timeLimit?: number;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  mediaUrls?: string[];
  likes: number;
  comments: number;
  createdAt: string;
}