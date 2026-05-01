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
      : { ...defaultState, assignedUserId: users[0]?.id ?? "" }
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={customer ? "Edit customer" : "Add customer"}
      description="Capture lead details, ownership, and follow-up context."
    >
      <form
        data-testid="customer-form"
        className="grid gap-4 md:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(form);
          onClose();
        }}
      >
        {/* NAME */}
        <label className="space-y-2">
          <span className="text-sm font-medium">Name</span>
          <Input
            data-testid="customer-name"
            value={form.name}
            onChange={(event) =>
              setForm({ ...form, name: event.target.value })
            }
            required
          />
        </label>

        {/* EMAIL */}
        <label className="space-y-2">
          <span className="text-sm font-medium">Email</span>
          <Input
            data-testid="customer-email"
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
            required
          />
        </label>

        {/* PHONE */}
        <label className="space-y-2">
          <span className="text-sm font-medium">Phone</span>
          <Input
            data-testid="customer-phone"
            value={form.phone}
            onChange={(event) =>
              setForm({ ...form, phone: event.target.value })
            }
            required
          />
        </label>

        {/* STATUS */}
        <label className="space-y-2">
          <span className="text-sm font-medium">Status</span>
          <Select
            data-testid="customer-status"
            value={form.status}
            onChange={(event) =>
              setForm({
                ...form,
                status: event.target.value as CustomerInput["status"],
              })
            }
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Converted</option>
            <option>Lost</option>
          </Select>
        </label>

        {/* ASSIGNED USER */}
        <label className="space-y-2">
          <span className="text-sm font-medium">Assigned user</span>
          <Select
            data-testid="customer-assigned-user"
            value={form.assignedUserId}
            onChange={(event) =>
              setForm({ ...form, assignedUserId: event.target.value })
            }
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
        </label>

        {/* FOLLOW-UP DATE */}
        <label className="space-y-2">
          <span className="text-sm font-medium">Follow-up date</span>
          <Input
            data-testid="customer-followup-date"
            type="date"
            value={form.followUpDate}
            onChange={(event) =>
              setForm({ ...form, followUpDate: event.target.value })
            }
            required
          />
        </label>

        {/* NOTES */}
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium">Notes</span>
          <Textarea
            data-testid="customer-notes"
            value={form.notes}
            onChange={(event) =>
              setForm({ ...form, notes: event.target.value })
            }
          />
        </label>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 md:col-span-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" data-testid="customer-submit">
            {customer ? "Save changes" : "Create customer"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}