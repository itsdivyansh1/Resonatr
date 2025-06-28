"use client";

import { JSX, useEffect, useState } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import {
  RiYoutubeFill,
  RiInstagramLine,
  RiTwitterXFill,
  RiLightbulbFlashLine,
  RiLinkedinFill,
  RiFacebookBoxFill,
} from "@remixicon/react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getIdeas } from "@/actions/idea";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type Idea = {
  id: string;
  title: string;
  platform: string;
  stage: string;
  description: string;
  createdAt: Date;
};

const platformMap: Record<string, { icon: JSX.Element; color: string }> = {
  YouTube: {
    icon: <RiYoutubeFill className="text-red-600 w-5 h-5" />,
    color: "bg-red-600/10 text-red-600",
  },
  Instagram: {
    icon: <RiInstagramLine className="text-pink-500 w-5 h-5" />,
    color: "bg-pink-500/10 text-pink-500",
  },
  Twitter: {
    icon: <RiTwitterXFill className="text-white w-5 h-5" />,
    color: "bg-white/10 text-white",
  },
  LinkedIn: {
    icon: <RiLinkedinFill className="text-blue-500 w-5 h-5" />,
    color: "bg-white/10 text-white",
  },

  Facebook: {
    icon: <RiFacebookBoxFill className="text-blue-500 w-5 h-5" />,
    color: "bg-white/10 text-white",
  },

  Unknown: {
    icon: <RiLightbulbFlashLine className="text-muted w-5 h-5" />,
    color: "bg-muted text-muted-foreground",
  },
};

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIdeas() {
      try {
        const res = await getIdeas();

        const formatted: Idea[] = res
          .map((r) => ({
            id: r.id,
            title: r.title,
            platform: r.platform ?? "Unknown",
            stage: r.stage ?? "Idea",
            description: r.description ?? "",
            createdAt:
              r.createdAt instanceof Date
                ? r.createdAt
                : parseISO(String(r.createdAt)),
          }))
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Most recent first

        setIdeas(formatted);
      } catch (err) {
        console.error("Failed to fetch ideas", err);
      } finally {
        setLoading(false);
      }
    }

    fetchIdeas();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <RiLightbulbFlashLine className="size-5 text-yellow-500" />
          Your Ideas
        </h1>
        <Link href="/dashboard/ideas/new">
          <Button variant="default">+ New Idea</Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-4 h-full flex flex-col gap-4">
              <Skeleton className="w-3/5 h-4" />
              <Skeleton className="w-1/4 h-3" />
              <Skeleton className="w-full h-[60px] rounded-md" />
            </Card>
          ))}
        </div>
      ) : ideas.length === 0 ? (
        <div className="border border-dashed p-6 rounded-lg text-center text-muted-foreground bg-muted/30">
          You haven’t added any ideas yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => {
            const platformMeta =
              platformMap[idea.platform] || platformMap.Unknown;

            return (
              <Link key={idea.id} href={`/dashboard/ideas/${idea.id}`}>
                <Card className="group p-4 flex flex-col justify-between h-full transition-all hover:shadow-lg hover:border-foreground/10 hover:bg-muted/40 border border-muted/40 cursor-pointer">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {platformMeta.icon}
                        <h3 className="text-base font-semibold line-clamp-1">
                          {idea.title}
                        </h3>
                      </div>
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-medium capitalize",
                          "bg-muted text-muted-foreground"
                        )}
                      >
                        {idea.stage}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Created on {format(idea.createdAt, "dd MMM yyyy")}
                    </p>

                    <div
                      className="text-sm text-muted-foreground line-clamp-4 prose prose-sm prose-invert"
                      dangerouslySetInnerHTML={{
                        __html: idea.description,
                      }}
                    />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
