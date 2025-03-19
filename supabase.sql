-- Create tables
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  event_id UUID REFERENCES events(id),
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, event_id)
);

CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  achievement_id UUID REFERENCES achievements(id),
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, achievement_id)
);

CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE user_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  activity_id UUID REFERENCES activities(id),
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(user_id, activity_id)
);

-- Insert sample data
INSERT INTO users (name, email) VALUES
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com');

INSERT INTO events (title, description, event_date, location) VALUES
('Annual Conference', 'Our biggest networking event of the year', '2023-11-15 09:00:00', 'Convention Center'),
('Workshop Series', 'Learn new skills', '2023-12-01 14:00:00', 'Training Room A');

INSERT INTO achievements (title, description, points) VALUES
('First Login', 'Completed first login', 100),
('Event Master', 'Attended 5 events', 500);

INSERT INTO activities (title, description, points) VALUES
('Complete Profile', 'Fill out all profile fields', 50),
('Share Post', 'Share your first post', 30);

-- Create some relationships
INSERT INTO event_registrations (user_id, event_id)
SELECT u.id, e.id
FROM users u
CROSS JOIN events e
LIMIT 2;

INSERT INTO user_achievements (user_id, achievement_id)
SELECT u.id, a.id
FROM users u
CROSS JOIN achievements a
LIMIT 2;

INSERT INTO user_activities (user_id, activity_id)
SELECT u.id, a.id
FROM users u
CROSS JOIN activities a
LIMIT 2;