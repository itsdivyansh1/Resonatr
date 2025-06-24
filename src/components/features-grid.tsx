"use client";

import { BarChart3, ShieldCheck, BookText, Settings2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  { icon: BarChart3, label: "Analytics" },
  { icon: ShieldCheck, label: "Security" },
  { icon: Settings2, label: "Automation" },
  { icon: BookText, label: "Knowledge" },
  { icon: ShieldCheck, label: "Compliance" },
  { icon: BarChart3, label: "Growth" },
  { icon: Settings2, label: "Settings" },
  { icon: BookText, label: "Docs" },
];

export default function FeaturesGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 overflow-hidden">
      {features.map((feature, idx) => (
        <Card
          key={idx}
          className="h-50 grid place-items-center hover:bg-muted/40"
        >
          <CardContent>
            <feature.icon className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
          </CardContent>
          <span
            className={cn(
              "absolute inset-x-0 bottom-0 h-0.5 bg-cyan-400 rounded-full opacity-0 scale-x-75 group-hover:opacity-100 group-hover:scale-x-100 transition-transform duration-300"
            )}
          />
        </Card>
      ))}
    </div>
  );
}
