import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@/types/user";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*, achievements(*)")
          .single();

        if (userError) throw userError;
        setUser(userData);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading, error };
}
