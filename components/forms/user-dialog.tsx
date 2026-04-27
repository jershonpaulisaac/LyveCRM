"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserInput } from "@/lib/types";

const defaultState: UserInput = {
  name: "",
  email: "",
  title: "",
};

export function UserDialog({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: UserInput) => void;
}) {
  const [form, setForm] = useState<UserInput>(defaultState);

  return (
    <Dialog open={open} onClose={onClose} title="Invite user" description="Create a company-level employee account in the mock workspace.">
      <form
        className="grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(form);
          onClose();
        }}
      >
        <label className="space-y-2">
          <span className="text-sm font-medium">Full name</span>
          <Input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Email</span>
          <Input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Title</span>
          <Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
        </label>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create user</Button>
        </div>
      </form>
    </Dialog>
  );
}
