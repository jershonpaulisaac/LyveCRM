"use client";

import { useState } from "react";
import { CheckCircle2, Clock3, Plus } from "lucide-react";
import { Customer, Task, User } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { TaskDialog } from "@/components/forms/task-dialog";

function getTaskVariant(status: Task["status"]) {
  if (status === "done") return "success";
  if (status === "in_progress") return "info";
  return "warning";
}

export function TaskList({
  title,
  description,
  tasks,
  customers,
  users,
  canCreate,
  canUpdate,
  onCreate,
  onStatusChange,
}: {
  title: string;
  description: string;
  tasks: Task[];
  customers: Customer[];
  users: User[];
  canCreate: boolean;
  canUpdate: boolean;
  onCreate: (value: { title: string; assignedUserId: string; customerId: string; dueDate: string }) => void;
  onStatusChange: (taskId: string, status: Task["status"]) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 space-y-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          {canCreate ? (
            <Button className="h-10 shrink-0 self-start md:mt-0" onClick={() => setOpen(true)}>
              <Plus className="h-4 w-4" />
              Create task
            </Button>
          ) : null}
        </CardHeader>
        <CardContent className="space-y-3">
          {tasks.map((task) => {
            const customer = customers.find((entry) => entry.id === task.customerId);
            const assignee = users.find((entry) => entry.id === task.assignedUserId);

            return (
              <div key={task.id} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold">{task.title}</div>
                      <Badge variant={getTaskVariant(task.status)}>{task.status.replace("_", " ")}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-[var(--text-secondary)]">
                      <span className="inline-flex items-center gap-1">
                        <Clock3 className="h-3.5 w-3.5" />
                        Due {formatDate(task.dueDate)}
                      </span>
                      <span>{customer?.name ?? "Unknown customer"}</span>
                      <span>{assignee?.name ?? "Unknown owner"}</span>
                    </div>
                  </div>
                  {canUpdate ? (
                    <Select
                      className="min-w-[170px]"
                      value={task.status}
                      onChange={(event) => onStatusChange(task.id, event.target.value as Task["status"])}
                    >
                      <option value="pending">pending</option>
                      <option value="in_progress">in progress</option>
                      <option value="done">done</option>
                    </Select>
                  ) : task.status === "done" ? (
                    <div className="inline-flex items-center gap-2 rounded-full bg-[var(--success)] px-3 py-2 text-sm font-medium text-[#285e37]">
                      <CheckCircle2 className="h-4 w-4" />
                      Completed
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
      <TaskDialog
        key={open ? `${users[0]?.id ?? "none"}-${customers[0]?.id ?? "none"}` : "closed"}
        open={open}
        onClose={() => setOpen(false)}
        users={users}
        customers={customers}
        onSubmit={onCreate}
      />
    </>
  );
}
