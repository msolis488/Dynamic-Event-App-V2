-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT DEFAULT 'Attendee',
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  leaderboard_position INTEGER DEFAULT 0
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  unlocked BOOLEAN DEFAULT false
);

-- Insert demo user
INSERT INTO users (id, name, avatar_url, role, points, level, leaderboard_position)
VALUES (
  '123e4567-e89b-12d3-a456-426614174000',
  'Sarah Johnson',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
  'Attendee',
  1250,
  4,
  12
);

-- Insert achievements for demo user
INSERT INTO achievements (user_id, name, description, progress, unlocked)
VALUES 
  ('123e4567-e89b-12d3-a456-426614174000', 'Networking Pro', 'Connect with 10 attendees', 70, false),
  ('123e4567-e89b-12d3-a456-426614174000', 'Session Master', 'Attend 5 sessions', 100, true),
  ('123e4567-e89b-12d3-a456-426614174000', 'Early Bird', 'Check in to 3 morning events', 66, false);