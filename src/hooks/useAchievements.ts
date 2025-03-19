import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Achievement } from "@/types/user";

export function useAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const { data, error: achievementsError } = await supabase
          .from("achievements")
          .select("*");

        if (achievementsError) throw achievementsError;

        const formattedAchievements: Achievement[] =
          data?.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            points: item.points,
            progress: 0,
          })) || [];

        setAchievements(formattedAchievements);
      } catch (e) {
        console.error("Error fetching achievements:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAchievements();
  }, []);

  return { achievements, loading, error };
}

export function useUserAchievements(userId: string) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchUserAchievements() {
      try {
        const { data, error: achievementsError } = await supabase
          .from("user_achievements")
          .select(
            `
            achievement_id,
            progress,
            achievements(id, name, description, points)
          `,
          )
          .eq("user_id", userId);

        if (achievementsError) throw achievementsError;

        // Format achievements
        const formattedAchievements: Achievement[] =
          data?.map((item) => ({
            id: item.achievements.id,
            name: item.achievements.name,
            description: item.achievements.description,
            points: item.achievements.points,
            progress: item.progress,
          })) || [];

        setAchievements(formattedAchievements);
      } catch (e) {
        console.error("Error fetching user achievements:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserAchievements();
  }, [userId]);

  return { achievements, loading, error };
}
