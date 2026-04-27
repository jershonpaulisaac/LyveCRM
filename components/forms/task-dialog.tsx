"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Customer, TaskInput, User } from "@/lib/types";

const defaultState: TaskInput = {
  title: "",
  assignedUserId: "",
  customerId: "",
  dueDate: "",
};

export function TaskDialog({
  open,
  onClose,
  users,
  customers,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  users: User[];
  customers: Customer[];
  onSubmit: (value: TaskInput) => void;
}) {
  const [form, setForm] = useState<TaskInput>(() => ({
      ...defaultState,
      assignedUserId: users[0]?.id ?? "",
      customerId: customers[0]?.id ?? "",
    }));

  return (
    <Dialog open={open} onClose={onClose} title="Create task" description="Assign a follow-up and keep the pipeline moving.">
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(form);
          onClose();
        }}
      >
        <label className="space-y-2">
          <span className="text-sm font-medium">Task title</span>
          <Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Assign to</span>
          <Select value={form.assignedUserId} onChange={(event) => setForm({ ...form, assignedUserId: event.target.value })}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Customer</span>
          <Select value={form.customerId} onChange={(event) => setForm({ ...form, customerId: event.target.value })}>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </Select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Due date</span>
          <Input type="date" value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} required />
        </label>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create task</Button>
        </div>
      </form>
    </Dialog>
  );
}
