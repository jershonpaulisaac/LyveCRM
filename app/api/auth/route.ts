import { NextResponse } from "next/server";
import { createSeedDb } from "@/lib/mock-db";

export async function GET() {
  const db = createSeedDb();
  return NextResponse.json({
    accounts: db.users.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId || null,
      name: user.name,
    })),
  });
}
