"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RiFlowChart,
  RiLightbulbFlashLine,
  RiFileList2Line,
  RiVideoAddLine,
  RiUploadCloud2Line,
} from "@remixicon/react";
import clsx from "clsx";

const workflowStatus = [
  {
    stage: "Idea",
    count: 12,
    icon: <RiLightbulbFlashLine className="text-yellow-400 size-4" />,
  },
  {
    stage: "Script",
    count: 8,
    icon: <RiFileList2Line className="text-blue-500 size-4" />,
  },
  {
    stage: "Shoot",
    count: 4,
    icon: <RiVideoAddLine className="text-purple-500 size-4" />,
  },
  {
    stage: "Publish",
    count: 15,
    icon: <RiUploadCloud2Line className="text-emerald-500 size-4" />,
  },
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

      <CardContent className="grid grid-cols-2 sm:grid-cols-4 ">
        {workflowStatus.map((stage, idx) => (
          <div
            key={idx}
            onClick={() =>
              router.push(`/vault?stage=${stage.stage.toLowerCase()}`)
            }
            className={clsx(
              "cursor-pointer rounded-md border border-muted/30 p-4 group transition-all",
              "hover:bg-muted/40 hover:shadow-sm"
            )}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                {stage.icon}
                <span className="text-sm font-medium">{stage.stage}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {stage.count}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
