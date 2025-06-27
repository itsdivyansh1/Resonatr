import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RiCalendar2Fill,
  RiInstagramLine,
  RiTwitterXFill,
  RiYoutubeFill,
} from "@remixicon/react";
import { JSX } from "react";

type ScheduledPost = {
  title: string;
  platform: string;
  icon: JSX.Element;
  status: "scheduled" | "posted" | "missed";
};

const scheduledPosts: ScheduledPost[] = [
  {
    title: "Instagram Reel: Quick Tips",
    platform: "Instagram",
    icon: <RiInstagramLine className="w-4 h-4 text-pink-500" />,
    status: "scheduled",
  },
  {
    title: "DevLog #3: Editing Workflow",
    platform: "YouTube",
    icon: <RiYoutubeFill className="w-4 h-4 text-red-600" />,
    status: "posted",
  },
  {
    title: "Thread: Creator Growth Tips",
    platform: "Twitter",
    icon: <RiTwitterXFill className="w-4 h-4 text-black dark:text-white" />,
    status: "missed",
  },
];

const statusColors: Record<ScheduledPost["status"], string> = {
  scheduled: "bg-blue-500 dark:bg-blue-500/50 text-white",
  posted: "bg-green-600 dark:bg-green-600/50 text-white",
  missed: "bg-red-500 dark:bg-red-500/50 text-white",
};

export default function ContentCalendarPreview() {
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
        {scheduledPosts.length > 0 ? (
          <div>
            {scheduledPosts.map((post, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-sm border border-muted/30 rounded-md px-3 py-2 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {post.icon}
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
            <p className="mb-1">No posts scheduled for today.</p>
            <p className="text-xs">Schedule your next post to see it here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
