"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Customer, CustomerInput, User } from "@/lib/types";

const defaultState: CustomerInput = {
  name: "",
  email: "",
  phone: "",
  status: "New",
  followUpDate: "",
  notes: "",
  assignedUserId: "",
};

export function CustomerDialog({
  open,
  onClose,
  users,
  customer,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  users: User[];
  customer?: Customer;
  onSubmit: (value: CustomerInput) => void;
}) {
  const [form, setForm] = useState<CustomerInput>(() =>
    customer
      ? {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          status: customer.status,
          followUpDate: customer.followUpDate,
          notes: customer.notes,
          assignedUserId: customer.assignedUserId,
        }
      : { ...defaultState, assignedUserId: users[0]?.id ?? "" },
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={customer ? "Edit customer" : "Add customer"}
      description="Capture lead details, ownership, and follow-up context."
    >
      <form
        className="grid gap-4 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(form);
          onClose();
        }}
      >
        <label className="space-y-2">
          <span className="text-sm font-medium">Name</span>
          <Input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Email</span>
          <Input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Phone</span>
          <Input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} required />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Status</span>
          <Select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as CustomerInput["status"] })}>
            <option>New</option>
            <option>Contacted</option>
            <option>Converted</option>
            <option>Lost</option>
          </Select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Assigned user</span>
          <Select value={form.assignedUserId} onChange={(event) => setForm({ ...form, assignedUserId: event.target.value })}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium">Follow-up date</span>
          <Input type="date" value={form.followUpDate} onChange={(event) => setForm({ ...form, followUpDate: event.target.value })} required />
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium">Notes</span>
          <Textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
        </label>
        <div className="flex justify-end gap-3 md:col-span-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{customer ? "Save changes" : "Create customer"}</Button>
        </div>
      </form>
    </Dialog>
  );
}
