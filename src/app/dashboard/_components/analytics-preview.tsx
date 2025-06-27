import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const summary = {
  title: "New Followers",
  total: 26864,
  growth: "+6.1%",
  legend: [
    { label: "Viral Content", color: "bg-chart-4" },
    { label: "Collaborations", color: "bg-chart-1" },
    { label: "Consistency", color: "bg-chart-6" },
  ],
};

const barSegments = [
  { width: "38%", color: "bg-chart-4" },
  { width: "26%", color: "bg-chart-1" },
  { width: "18%", color: "bg-chart-6" },
  { width: "18%", color: "bg-chart-3" },
];

const reasons = [
  {
    label: "Went viral on Instagram Reels",
    value: 10234,
    color: "bg-chart-4",
  },
  {
    label: "Collaborated with a top creator",
    value: 6972,
    color: "bg-chart-1",
  },
  {
    label: "Posted daily last week",
    value: 4827,
    color: "bg-chart-6",
  },
  {
    label: "Covered a trending news topic",
    value: 4831,
    color: "bg-chart-3",
  },
];

export default function AnalyticsPreview() {
  return (
    <Card className="gap-5">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5">
            <CardTitle>{summary.title}</CardTitle>
            <div className="flex items-start gap-2">
              <div className="font-semibold text-2xl">
                {summary.total.toLocaleString()}
              </div>
              <Badge className="mt-1.5 bg-emerald-500/24 text-emerald-500 border-none">
                {summary.growth}
              </Badge>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {summary.legend.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  aria-hidden="true"
                  className={`size-1.5 shrink-0 rounded-xs ${item.color}`}
                ></div>
                <div className="text-[13px]/3 text-muted-foreground/50">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {/* Stacked Progress Bar */}
        <div className="flex gap-1 h-5">
          {barSegments.map((seg, i) => (
            <div
              key={i}
              className={`${seg.color} h-full`}
              style={{ width: seg.width }}
            ></div>
          ))}
        </div>

        {/* List of reasons */}
        <div>
          <div className="text-[13px]/3 text-muted-foreground/50 mb-3">
            Reason for follower growth
          </div>
          <ul className="text-sm divide-y divide-border">
            {reasons.map((reason, i) => (
              <li key={i} className="py-2 flex items-center gap-2">
                <span
                  className={`size-2 shrink-0 rounded-full ${reason.color}`}
                  aria-hidden="true"
                ></span>
                <span className="grow text-muted-foreground">
                  {reason.label}
                </span>
                <span className="text-[13px]/3 font-medium text-foreground/70">
                  {reason.value.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
