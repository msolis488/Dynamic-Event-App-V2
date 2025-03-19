export interface User {
  id: string;
  name: string;
  avatar_url: string;
  role: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  points: number;
  progress: number;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
}

export interface Activity {
  id: string;
  name: string;
  category: string;
  description: string;
  points: number;
  completed_at: string;
}

export interface LeaderboardEntry {
  user_id: string;
  user_name: string;
  avatar_url: string;
  score: number;
  rank: number;
}

export interface UserWithDetails extends User {
  achievements: Achievement[];
  events: Event[];
  activities: Activity[];
  leaderboard_position: number;
  total_points: number;
}
