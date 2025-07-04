"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecentEventsAroundToday } from "@/actions/events";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RiCalendar2Fill,
  RiInstagramLine,
  RiYoutubeFill,
  RiTwitterXFill,
} from "@remixicon/react";
import { JSX } from "react";

// Full event type returned from server
type RawEvent = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  start: Date;
  end: Date;
  color: string;
  platform: string;
  status: string; // not narrowed
  createdAt: Date;
  updatedAt: Date;
};

// Narrowed type used in UI
type ScheduledPost = {
  id: string;
  title: string;
  platform: string;
  status: "scheduled" | "posted" | "missed";
};

// Icons for each platform
const platformIcons: Record<string, JSX.Element> = {
  Instagram: <RiInstagramLine className="w-4 h-4 text-pink-500" />,
  YouTube: <RiYoutubeFill className="w-4 h-4 text-red-600" />,
  Twitter: <RiTwitterXFill className="w-4 h-4 text-black dark:text-white" />,
};

// Status badge styles
const statusColors: Record<ScheduledPost["status"], string> = {
  scheduled: "bg-blue-500 dark:bg-blue-500/50 text-white",
  posted: "bg-green-600 dark:bg-green-600/50 text-white",
  missed: "bg-red-500 dark:bg-red-500/50 text-white",
};

export default function ContentCalendarPreview() {
  const {
    data: rawEvents,
    isLoading,
    isError,
  } = useQuery<RawEvent[]>({
    queryKey: ["recent-events"],
    queryFn: getRecentEventsAroundToday,
  });

  // Safely convert raw data to ScheduledPost[]
  const scheduledPosts: ScheduledPost[] = (rawEvents ?? [])
    .filter((e) => ["scheduled", "posted", "missed"].includes(e.status))
    .map((e) => ({
      id: e.id,
      title: e.title,
      platform: e.platform,
      status: e.status as ScheduledPost["status"],
    }));

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <RiCalendar2Fill className="size-4" /> Content Calendar Overview
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">Today: {today}</p>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : isError ? (
          <p className="text-sm text-red-500">Failed to load events.</p>
        ) : scheduledPosts.length > 0 ? (
          <div className="space-y-2">
            {scheduledPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between text-sm border border-muted/30 rounded-md px-3 py-2 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {platformIcons[post.platform] ?? (
                    <RiCalendar2Fill className="w-4 h-4 text-muted" />
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium">{post.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {post.platform}
                    </span>
                  </div>
                </div>
                <Badge
                  className={`text-xs font-medium capitalize ${statusColors[post.status]}`}
                >
                  {post.status}
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground text-center py-10">
            <RiCalendar2Fill className="mx-auto mb-2 w-6 h-6 text-muted" />
            <p className="mb-1">No posts scheduled around today.</p>
            <p className="text-xs">
              Create or update your schedule to see it here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
