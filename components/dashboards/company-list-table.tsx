import { Company, User } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/table";

export function CompanyListTable({ companies, users }: { companies: Company[]; users: User[] }) {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Company portfolio</CardTitle>
        <CardDescription>Platform-level oversight across each tenant company.</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto pt-0">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Company</TableHeaderCell>
              <TableHeaderCell>Admin</TableHeaderCell>
              <TableHeaderCell>Industry</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => {
              const admin = users.find((user) => user.id === company.adminId);
              return (
                <TableRow key={company.id}>
                  <TableCell>
                    <div className="font-medium">{company.name}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{company.id}</div>
                  </TableCell>
                  <TableCell>{admin?.name ?? "No admin assigned"}</TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell>
                    <Badge variant={company.status === "active" ? "success" : "danger"}>{company.status}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
