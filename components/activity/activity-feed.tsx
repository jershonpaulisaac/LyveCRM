import { ActivityLog } from "@/lib/types";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ActivityFeed({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: ActivityLog[];
}) {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="scrollbar-thin max-h-[420px] space-y-3 overflow-y-auto pr-2">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="animate-rise rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="text-sm font-medium">{item.actorName}</div>
                <Badge variant="info">{item.type.replaceAll("_", " ")}</Badge>
              </div>
              <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
              <p className="mt-2 text-xs text-[var(--text-secondary)]">{formatDateTime(item.timestamp)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
