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
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="animate-rise rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <div className="mb-1 flex items-center justify-between gap-2">
                <div className="text-sm font-medium">{item.actorName}</div>
                <Badge variant="info">{item.type.replaceAll("_", " ")}</Badge>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">{item.description}</p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">{formatDateTime(item.timestamp)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
