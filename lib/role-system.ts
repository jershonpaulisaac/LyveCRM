import { MockDb, SessionUser } from "@/lib/types";
import {
  getVisibleActivity,
  getVisibleCompanies,
  getVisibleCustomers,
  getVisibleTasks,
  getVisibleUsers,
} from "@/lib/mock-db";

export function getScopedSnapshot(db: MockDb, session: SessionUser) {
  return {
    companies: getVisibleCompanies(db, session),
    users: getVisibleUsers(db, session),
    customers: getVisibleCustomers(db, session),
    tasks: getVisibleTasks(db, session),
    activityLogs: getVisibleActivity(db, session),
  };
}
