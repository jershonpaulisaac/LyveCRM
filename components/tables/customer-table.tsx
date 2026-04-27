"use client";

import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Customer, CustomerInput, User } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/table";
import { CustomerDialog } from "@/components/forms/customer-dialog";

function getStatusVariant(status: Customer["status"]) {
  if (status === "Converted") return "success";
  if (status === "Lost") return "danger";
  if (status === "Contacted") return "info";
  return "warning";
}

export function CustomerTable({
  title,
  description,
  customers,
  users,
  canManage,
  onCreate,
  onUpdate,
  onDelete,
}: {
  title: string;
  description: string;
  customers: Customer[];
  users: User[];
  canManage: boolean;
  onCreate: (value: CustomerInput) => void;
  onUpdate: (customerId: string, value: Partial<CustomerInput>) => void;
  onDelete?: (customerId: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [editing, setEditing] = useState<Customer | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    return customers.filter((customer) => {
      const matchesQuery =
        customer.name.toLowerCase().includes(query.toLowerCase()) ||
        customer.email.toLowerCase().includes(query.toLowerCase()) ||
        customer.phone.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "all" || customer.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [customers, query, status]);

  return (
    <>
      <Card className="animate-fade-in">
        <CardHeader className="gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative min-w-[220px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
              <Input className="pl-9" placeholder="Search customers" value={query} onChange={(event) => setQuery(event.target.value)} />
            </div>
            <Select className="min-w-[160px]" value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="all">All statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Converted">Converted</option>
              <option value="Lost">Lost</option>
            </Select>
            {canManage ? (
              <Button
                onClick={() => {
                  setEditing(undefined);
                  setOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
                Add customer
              </Button>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto pt-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Customer</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Owner</TableHeaderCell>
                <TableHeaderCell>Follow-up</TableHeaderCell>
                <TableHeaderCell>Notes</TableHeaderCell>
                {canManage ? <TableHeaderCell className="text-right">Actions</TableHeaderCell> : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((customer) => {
                const owner = users.find((user) => user.id === customer.assignedUserId);
                return (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-xs text-[var(--text-secondary)]">{customer.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(customer.status)}>{customer.status}</Badge>
                    </TableCell>
                    <TableCell>{owner?.name ?? "Unassigned"}</TableCell>
                    <TableCell>{formatDate(customer.followUpDate)}</TableCell>
                    <TableCell className="max-w-[260px] text-[var(--text-secondary)]">{customer.notes}</TableCell>
                    {canManage ? (
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            className="h-9 px-3"
                            onClick={() => {
                              setEditing(customer);
                              setOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          {onDelete ? (
                            <Button variant="ghost" className="h-9 px-3 text-[#b42318]" onClick={() => onDelete(customer.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          ) : null}
                        </div>
                      </TableCell>
                    ) : null}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <CustomerDialog
        key={`${editing?.id ?? "new"}-${open ? "open" : "closed"}`}
        open={open}
        onClose={() => setOpen(false)}
        users={users}
        customer={editing}
        onSubmit={(value) => {
          if (editing) {
            onUpdate(editing.id, value);
            return;
          }
          onCreate(value);
        }}
      />
    </>
  );
}
