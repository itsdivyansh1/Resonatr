import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RiInstagramLine,
  RiLightbulbLine,
  RiTwitterXFill,
  RiYoutubeFill,
} from "@remixicon/react";
import { JSX } from "react";

type Idea = {
  title: string;
  platform: string;
  icon: JSX.Element;
  updated: string;
};

const ideas: Idea[] = [
  {
    title: "Morning routine behind the scenes",
    platform: "YouTube",
    icon: <RiYoutubeFill className="w-4 h-4 text-red-600" />,
    updated: "2 days ago",
  },
  {
    title: "5 tips for fast editing",
    platform: "Instagram",
    icon: <RiInstagramLine className="w-4 h-4 text-pink-500" />,
    updated: "3 hours ago",
  },
  {
    title: "Content burnout rant",
    platform: "Twitter",
    icon: <RiTwitterXFill className="w-4 h-4 text-black dark:text-white" />,
    updated: "Just now",
  },
];

export default function RecentContentIdeas() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <RiLightbulbLine className="size-4" /> Recent Content Ideas
        </CardTitle>
      </CardHeader>

      <CardContent>
        {ideas.length > 0 ? (
          <div>
            {ideas.map((idea, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-sm border border-muted/30 rounded-md px-3 py-2 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {idea.icon}
                  <div className="flex flex-col">
                    <span className="font-medium">{idea.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {idea.platform} • {idea.updated}
                    </span>
                  </div>
                </div>
              </div>
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
