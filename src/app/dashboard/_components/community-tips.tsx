import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiChatSmile2Line } from "@remixicon/react";

type Tip = {
  message: string;
  by: string;
};

// Retrieve the tips from the database
const tips: Tip[] = [
  // {
  //   message: "💡 Try posting Reels between 9AM–11AM for best engagement.",
  //   by: "creatorinsights.ai",
  // },
];

export default function CommunityTips() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <RiChatSmile2Line className="size-4" />
          Community Highlights & Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="text-sm border border-muted/30 rounded-md px-3 py-2 hover:bg-muted/50 transition-colors"
          >
            <p>{tip.message}</p>
            <p className="text-xs text-muted-foreground mt-1">— {tip.by}</p>
          </div>
        ))}
        {/* @ts-ignore */}
        {tips.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-10">
            No tips available right now.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
