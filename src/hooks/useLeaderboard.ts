import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { LeaderboardEntry } from "@/types/user";

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

export function getUserRank(userId: string, eventId?: string) {
  const [rank, setRank] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchUserRank() {
      try {
        let query = supabase
          .from("user_leaderboard")
          .select("rank, score")
          .eq("user_id", userId);

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

        const { data, error: rankError } = await query.single();

        if (rankError && rankError.code !== "PGRST116") throw rankError;

        if (data) {
          setRank(data.rank);
          setScore(data.score);
        }
      } catch (e) {
        console.error("Error fetching user rank:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserRank();
  }, [userId, eventId]);

  return { rank, score, loading, error };
}
