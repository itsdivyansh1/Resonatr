"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiFlashlightLine } from "@remixicon/react";

const actions = [
  { label: "New Idea", onClick: () => console.log("Open Idea Modal") },
  { label: "Schedule Post", onClick: () => console.log("Go to Calendar") },
  {
    label: "Upload Resource",
    onClick: () => console.log("Open Resource Modal"),
  },
];

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <RiFlashlightLine className="size-4" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {actions.map((action, idx) => (
          <Button
            key={idx}
            size="sm"
            variant="secondary"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
