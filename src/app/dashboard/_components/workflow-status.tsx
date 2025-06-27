"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiFlowChart } from "@remixicon/react";

const workflowStatus = [
  { stage: "Idea", count: 12 },
  { stage: "Script", count: 8 },
  { stage: "Shoot", count: 4 },
  { stage: "Publish", count: 15 },
];

export default function WorkflowStatus() {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <RiFlowChart className="size-4" /> Workflow Status
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {workflowStatus.map((stage, idx) => (
          <div
            key={idx}
            onClick={() =>
              router.push(`/vault?stage=${stage.stage.toLowerCase()}`)
            }
            className="cursor-pointer rounded-md border border-muted/30 p-3 text-center hover:bg-muted/50 transition-colors"
          >
            <p className="text-sm font-medium">{stage.stage}</p>
            <p className="text-2xl font-bold">{stage.count}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
