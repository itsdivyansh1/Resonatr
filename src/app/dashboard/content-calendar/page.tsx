"use client";

import { useQuery } from "@tanstack/react-query";
import { EventCalendar, type CalendarEvent } from "@/components/event-calendar";
import { getEvents } from "@/actions/events";

export type EventColor =
  | "sky"
  | "amber"
  | "violet"
  | "rose"
  | "emerald"
  | "orange";

// Extend CalendarEvent to support platform and status
export interface ExtendedEvent extends CalendarEvent {
  platform?: string;
  status?: string;
}

export default function Component() {
  const {
    data: events = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async (): Promise<ExtendedEvent[]> => {
      const data = await getEvents();
      return data.map((event) => ({
        ...event,
        description: event.description ?? "",
        color: (event.color as EventColor) ?? "sky",
        platform: event.platform ?? "instagram",
        status: event.status ?? "scheduled",
      }));
    },
    staleTime: 0, // Always refetch to ensure fresh data
    refetchOnWindowFocus: true, // Refetch when window gains focus
  });

  if (isLoading) return <div className="p-4">Loading your events...</div>;

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading events:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return <EventCalendar events={events as CalendarEvent[]} />;
}
