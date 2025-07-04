"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RiFacebookBoxFill,
  RiInstagramLine,
  RiLinkedinBoxFill,
  RiTwitterXFill,
  RiYoutubeFill,
} from "@remixicon/react";

const platforms = [
  {
    platform: "YouTube",
    icon: <RiYoutubeFill className="text-red-600 w-5 h-5" />,
    followers: "18.3k",
    posts: 5,
    growth: "+4.5%",
    connected: true,
  },
  {
    platform: "Instagram",
    icon: <RiInstagramLine className="text-pink-500 w-5 h-5" />,
    connected: false,
  },
  {
    platform: "Facebook",
    icon: <RiFacebookBoxFill className="text-blue-600 w-5 h-5" />,
    connected: false,
  },
  {
    platform: "Twitter",
    icon: <RiTwitterXFill className="text-black dark:text-white w-5 h-5" />,
    connected: false,
  },
  {
    platform: "LinkedIn",
    icon: <RiLinkedinBoxFill className="text-blue-700 w-5 h-5" />,
    connected: false,
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
      {platforms.map((item, index) => (
        <Card key={index}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {item.icon}
              {item.platform}
            </CardTitle>
            <p
              className={`text-xs font-medium ${
                item.connected ? "text-green-600" : "text-red-500"
              }`}
            >
              [{item.connected ? " connected " : " not-connected "}]
            </p>
          </CardHeader>

          <CardContent>
            {item.connected ? (
              <>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-2xl font-bold">{item.followers}</p>
                  <span className="text-xs text-muted-foreground">
                    {item.growth}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Posts this week: {item.posts}
                </p>
              </>
            ) : (
              <button className="cursor-pointer text-xs text-center text-muted-foreground border border-dashed rounded-md p-3 bg-muted/40">
                🔌 Comming soon. {item.platform}
              </button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
