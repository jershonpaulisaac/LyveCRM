"use client";

import { useState } from "react";
import { Mail, Plus, ShieldCheck, UserRound } from "lucide-react";
import { User } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/table";
import { UserDialog } from "@/components/forms/user-dialog";

export function UserTable({
  users,
  canManage,
  onCreate,
}: {
  users: User[];
  canManage: boolean;
  onCreate: (value: { name: string; email: string; title: string }) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card className="animate-fade-in">
        <CardHeader className="gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <CardTitle>Team access</CardTitle>
            <CardDescription>Company-level user management stays isolated to this tenant.</CardDescription>
          </div>
          {canManage ? (
            <Button onClick={() => setOpen(true)}>
              <Plus className="h-4 w-4" />
              Invite user
            </Button>
          ) : null}
        </CardHeader>
        <CardContent className="overflow-x-auto pt-0">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
                <TableHeaderCell>Title</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-[var(--surface)] p-2">
                        <UserRound className="h-4 w-4 text-[var(--text-secondary)]" />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-[var(--text-secondary)]">{user.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "company_admin" ? "info" : "neutral"}>
                      <span className="inline-flex items-center gap-1">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {user.role.replace("_", " ")}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>{user.title}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-2 text-[var(--text-secondary)]">
                      <Mail className="h-3.5 w-3.5" />
                      {user.email}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <UserDialog
        key={open ? "open" : "closed"}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(value) => {
          onCreate(value);
          setOpen(false);
        }}
      />
    </>
  );
}
