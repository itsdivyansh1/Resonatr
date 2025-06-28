import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiBookmark3Line } from "@remixicon/react";

const resources = [
  { title: "Hook Writing Guide", type: "PDF", source: "Notion" },
  { title: "Color Grading in Reels", type: "Video", source: "YouTube" },
  { title: "IG Algorithm Update 2024", type: "Article", source: "Medium" },
];

export default function SavedResources() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <RiBookmark3Line className="size-4" />
          Saved Resources
        </CardTitle>
      </CardHeader>
      <CardContent>
        {resources.map((res, idx) => (
          <div
            key={idx}
            className="flex flex-col border border-muted/30 rounded-md px-3 py-2 hover:bg-muted/50 transition-colors text-sm"
          >
            <span className="font-medium">{res.title}</span>
            <span className="text-xs text-muted-foreground">
              {res.type} • {res.source}
            </span>
          </div>
        ))}
        {resources.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-10">
            No resources saved yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
