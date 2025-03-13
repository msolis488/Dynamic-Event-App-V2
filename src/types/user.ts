export interface User {
  id: string;
  name: string;
  avatar_url: string;
  role: string;
  points: number;
  level: number;
  leaderboard_position: number;
  achievements: {
    id: string;
    name: string;
    description: string;
    progress: number;
    unlocked: boolean;
  }[];
}
