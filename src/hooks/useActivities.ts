import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Activity } from "@/types/user";

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

export function useUserActivities(userId: string) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchUserActivities() {
      try {
        const { data, error: activitiesError } = await supabase
          .from("user_activities")
          .select(
            `
            completed_at,
            activities(id, name, category, description, points)
          `,
          )
          .eq("user_id", userId);

        if (activitiesError) throw activitiesError;

        // Format activities
        const formattedActivities: Activity[] =
          data?.map((item) => ({
            id: item.activities.id,
            name: item.activities.name,
            category: item.activities.category,
            description: item.activities.description,
            points: item.activities.points,
            completed_at: item.completed_at,
          })) || [];

        setActivities(formattedActivities);
      } catch (e) {
        console.error("Error fetching user activities:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserActivities();
  }, [userId]);

  return { activities, loading, error };
}

export function completeActivity(userId: string, activityId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function complete() {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: completionError } = await supabase
        .from("user_activities")
        .insert({
          user_id: userId,
          activity_id: activityId,
        });

      if (completionError) throw completionError;

      setSuccess(true);
    } catch (e) {
      console.error("Error completing activity:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { complete, loading, error, success };
}
