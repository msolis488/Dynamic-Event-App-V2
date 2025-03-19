import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Event } from "@/types/user";

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

export function useUserEvents(userId: string) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchUserEvents() {
      try {
        const { data, error: eventsError } = await supabase
          .from("event_registrations")
          .select(
            `
            events(id, name, description, date, location)
          `,
          )
          .eq("user_id", userId);

        if (eventsError) throw eventsError;

        // Format events
        const formattedEvents: Event[] =
          data?.map((item) => ({
            id: item.events.id,
            name: item.events.name,
            description: item.events.description,
            date: item.events.date,
            location: item.events.location,
          })) || [];

        setEvents(formattedEvents);
      } catch (e) {
        console.error("Error fetching user events:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserEvents();
  }, [userId]);

  return { events, loading, error };
}

export function registerForEvent(userId: string, eventId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function register() {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: registrationError } = await supabase
        .from("event_registrations")
        .insert({
          user_id: userId,
          event_id: eventId,
        });

      if (registrationError) throw registrationError;

      setSuccess(true);
    } catch (e) {
      console.error("Error registering for event:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return { register, loading, error, success };
}
