import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type {
  UserWithDetails,
  Achievement,
  Event,
  Activity,
  LeaderboardEntry,
} from "@/types/user";

export function useUser() {
  const [user, setUser] = useState<UserWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        // Fetch a user (for demo purposes, we'll fetch the first user)
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", String("6cbde2f1-e06d-4750-8b1f-6ada61a7e1e7"))
          .single();

        if (userError) throw userError;

        // Fetch user's achievements
        const { data: achievementsData, error: achievementsError } =
          await supabase
            .from("user_achievements")
            .select(
              `
            achievement_id,
            progress,
            achievements(id, title, description, points)
          `,
            )
            .eq("user_id", userData.id);

        if (achievementsError) throw achievementsError;

        // Fetch user's events
        const { data: eventsData, error: eventsError } = await supabase
          .from("event_registrations")
          .select(
            `
            events(id, title, description, event_date, location)
          `,
          )
          .eq("user_id", userData.id);

        if (eventsError) throw eventsError;

        // Fetch user's activities
        const { data: activitiesData, error: activitiesError } = await supabase
          .from("user_activities")
          .select(
            `
            completed_at,
            activities(id, title, category, description, points)
          `,
          )
          .eq("user_id", userData.id);

        if (activitiesError) throw activitiesError;

        // Fetch user's leaderboard position
        const { data: leaderboardData, error: leaderboardError } =
          await supabase
            .from("user_leaderboard")
            .select("rank, score")
            .eq("user_id", userData.id)
            .single();

        if (leaderboardError && leaderboardError.code !== "PGRST116")
          throw leaderboardError;

        // Calculate total points from achievements and activities
        let totalPoints = 0;

        // Add points from achievements
        achievementsData?.forEach((item) => {
          if (item.achievements) {
            totalPoints += (item.achievements.points * item.progress) / 100;
          }
        });

        // Add points from activities
        activitiesData?.forEach((item) => {
          if (item.activities) {
            totalPoints += item.activities.points;
          }
        });

        // Format achievements
        const achievements: Achievement[] =
          achievementsData?.map((item) => ({
            id: item.achievements.id,
            name: item.achievements.name,
            description: item.achievements.description,
            points: item.achievements.points,
            progress: item.progress,
          })) || [];

        // Format events
        const events: Event[] =
          eventsData?.map((item) => ({
            id: item.events.id,
            name: item.events.name,
            description: item.events.description,
            date: item.events.date,
            location: item.events.location,
          })) || [];

        // Format activities
        const activities: Activity[] =
          activitiesData?.map((item) => ({
            id: item.activities.id,
            name: item.activities.name,
            category: item.activities.category,
            description: item.activities.description,
            points: item.activities.points,
            completed_at: item.completed_at,
          })) || [];

        // Combine all data
        const userWithDetails: UserWithDetails = {
          ...userData,
          achievements,
          events,
          activities,
          leaderboard_position: leaderboardData?.rank || 0,
          total_points: totalPoints,
        };

        setUser(userWithDetails);
      } catch (e) {
        console.error("Error fetching user data:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading, error };
}

export function useLeaderboard(eventId?: string) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        let query = supabase
          .from("user_leaderboard")
          .select(
            `
            user_id,
            score,
            rank,
            users(name, avatar_url)
          `,
          )
          .order("rank", { ascending: true });

        // If eventId is provided, filter by that event's leaderboard
        if (eventId) {
          const { data: leaderboardId } = await supabase
            .from("leaderboard")
            .select("id")
            .eq("event_id", eventId)
            .single();

          if (leaderboardId) {
            query = query.eq("leaderboard_id", leaderboardId.id);
          }
        }

        const { data, error: leaderboardError } = await query;

        if (leaderboardError) throw leaderboardError;

        const formattedLeaderboard: LeaderboardEntry[] =
          data?.map((entry) => ({
            user_id: entry.user_id,
            user_name: entry.users.name,
            avatar_url: entry.users.avatar_url,
            score: entry.score,
            rank: entry.rank,
          })) || [];

        setLeaderboard(formattedLeaderboard);
      } catch (e) {
        console.error("Error fetching leaderboard:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, [eventId]);

  return { leaderboard, loading, error };
}

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const { data, error: eventsError } = await supabase
          .from("events")
          .select("*")
          .order("date", { ascending: true });

        if (eventsError) throw eventsError;

        setEvents(data || []);
      } catch (e) {
        console.error("Error fetching events:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return { events, loading, error };
}

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const { data, error: activitiesError } = await supabase
          .from("activities")
          .select("*");

        if (activitiesError) throw activitiesError;

        setActivities(data || []);
      } catch (e) {
        console.error("Error fetching activities:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, []);

  return { activities, loading, error };
}
