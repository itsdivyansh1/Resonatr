"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RiInstagramLine,
  RiLightbulbLine,
  RiTwitterXFill,
  RiYoutubeFill,
} from "@remixicon/react";
import { useQuery } from "@tanstack/react-query";
import { getRecentIdeas } from "@/actions/idea";
import { JSX } from "react";
import { parseISO } from "date-fns";
import Link from "next/link";

const platformIcons: Record<string, JSX.Element> = {
  YouTube: <RiYoutubeFill className="w-4 h-4 text-red-600" />,
  Instagram: <RiInstagramLine className="w-4 h-4 text-pink-500" />,
  Twitter: <RiTwitterXFill className="w-4 h-4 text-black dark:text-white" />,
};

export default function RecentContentIdeas() {
  const {
    data: ideas = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recent-ideas"],
    queryFn: async () => {
      const res = await getRecentIdeas(4);
      return res
        .map((r) => ({
          id: r.id,
          title: r.title,
          platform: r.platform ?? "Unknown",
          createdAt:
            r.createdAt instanceof Date
              ? r.createdAt
              : parseISO(String(r.createdAt)),
        }))
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <RiLightbulbLine className="size-4" /> Recent Content Ideas
        </CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : isError ? (
          <p className="text-sm text-red-500">Failed to load ideas.</p>
        ) : ideas?.length > 0 ? (
          <div>
            {ideas.map((idea: any) => (
              <Link key={idea.id} href={`/dashboard/ideas/${idea.id}`}>
                <div className="flex items-center justify-between text-sm border border-muted/30 rounded-md px-3 py-2 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    {platformIcons[idea.platform] ?? (
                      <RiLightbulbLine className="w-4 h-4" />
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium">{idea.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {idea.platform}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground text-center py-10">
            <RiLightbulbLine className="mx-auto mb-2 w-6 h-6 text-muted" />
            <p className="mb-1">No content ideas yet.</p>
            <p className="text-xs">Start by adding your first idea!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
