import { NextRequest, NextResponse } from "next/server";
import { createSeedDb } from "@/lib/mock-db";
import { SessionUser } from "@/lib/types";
import { getScopedSnapshot } from "@/lib/role-system";

function getSessionFromRequest(request: NextRequest): SessionUser {
  return {
    id: request.nextUrl.searchParams.get("userId") ?? "owner_lyve",
    role: (request.nextUrl.searchParams.get("role") as SessionUser["role"]) ?? "platform_owner",
    companyId: request.nextUrl.searchParams.get("companyId"),
    name: request.nextUrl.searchParams.get("name") ?? "API Demo User",
    email: request.nextUrl.searchParams.get("email") ?? "demo@lyvecrm.app",
  };
}

export async function GET(request: NextRequest) {
  const db = createSeedDb();
  const scoped = getScopedSnapshot(db, getSessionFromRequest(request));
  return NextResponse.json({ activity: scoped.activityLogs });
}
