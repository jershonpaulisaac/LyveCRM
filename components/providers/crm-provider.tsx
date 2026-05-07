"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  addCompanyUser,
  addCustomer,
  addTask,
  createSeedDb,
  deleteCustomer,
  deleteUser,
  simulateRealtimeUpdate,
  updateCustomer,
  updateTaskStatus,
} from "@/lib/mock-db";
import { clearStoredSession, storeSession } from "@/lib/auth";
import { emitDataChanged, subscribeToDataChanges } from "@/lib/event-system";
import { getScopedSnapshot } from "@/lib/role-system";
import { MockDb, SessionUser, CustomerInput, TaskInput, UserInput, TaskStatus } from "@/lib/types";

interface CRMContextValue {
  db: MockDb;
  session: SessionUser | null;
  ready: boolean;
  login: (email: string, remember?: boolean) => SessionUser;
  logout: () => void;
  scoped: ReturnType<typeof getScopedSnapshot> | null;
  createCustomer: (input: CustomerInput) => void;
  editCustomer: (customerId: string, input: Partial<CustomerInput>) => void;
  removeCustomer: (customerId: string) => void;
  createTask: (input: TaskInput) => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  createUser: (input: UserInput) => void;
  removeUser: (userId: string) => void;
  resetDemo: () => void;
}

const DB_KEY = "lyvecrm-db";
const SESSION_KEY = "lyvecrm-session";
const SERVER_DB_RAW = JSON.stringify(createSeedDb());
const SERVER_SESSION_RAW = "";

const CRMContext = createContext<CRMContextValue | null>(null);

function readDb(): MockDb {
  if (typeof window === "undefined") return createSeedDb();
  const raw = window.localStorage.getItem(DB_KEY);
  return raw ? (JSON.parse(raw) as MockDb) : createSeedDb();
}

function writeDb(db: MockDb) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DB_KEY, JSON.stringify(db));
  emitDataChanged();
}

function subscribeHydration(callback: () => void) {
  const timer = window.setTimeout(callback, 0);
  return () => window.clearTimeout(timer);
}

const getHydrationSnapshot = () => true;
const getHydrationServerSnapshot = () => false;

function getDbRawSnapshot() {
  if (typeof window === "undefined") return SERVER_DB_RAW;
  return window.localStorage.getItem(DB_KEY) ?? SERVER_DB_RAW;
}

function getSessionRawSnapshot() {
  if (typeof window === "undefined") return SERVER_SESSION_RAW;
  return window.localStorage.getItem(SESSION_KEY) ?? window.sessionStorage.getItem(SESSION_KEY) ?? SERVER_SESSION_RAW;
}

function subscribeDb(callback: () => void) {
  return subscribeToDataChanges(callback);
}

function subscribeSession(callback: () => void) {
  return subscribeToDataChanges(callback);
}

export function CRMProvider({ children }: { children: ReactNode }) {
  const ready = useSyncExternalStore(subscribeHydration, getHydrationSnapshot, getHydrationServerSnapshot);
  const dbRaw = useSyncExternalStore(subscribeDb, getDbRawSnapshot, () => SERVER_DB_RAW);
  const sessionRaw = useSyncExternalStore(subscribeSession, getSessionRawSnapshot, () => SERVER_SESSION_RAW);
  const db = ready ? (JSON.parse(dbRaw) as MockDb) : createSeedDb();
  const session = ready && sessionRaw ? (JSON.parse(sessionRaw) as SessionUser) : null;

  useEffect(() => {
    if (!ready || !session) return;

    const timer = window.setInterval(() => {
      const next = structuredClone(readDb());
      simulateRealtimeUpdate(next);
      writeDb(next);
    }, 14000);

    return () => window.clearInterval(timer);
  }, [ready, session]);

  const scoped = session ? getScopedSnapshot(db, session) : null;

  const mutate = (updater: (draft: MockDb, activeSession: SessionUser) => void) => {
    if (!session) return;
    const next = structuredClone(readDb());
    updater(next, session);
    writeDb(next);
  };

  const value: CRMContextValue = {
    db,
    session,
    ready,
    login: (email, remember = true) => {
      const user = db.users.find((entry) => entry.email.toLowerCase() === email.trim().toLowerCase());
      if (!user) {
        throw new Error("No demo account matches that email.");
      }

      const nextSession: SessionUser = {
        id: user.id,
        role: user.role,
        companyId: user.companyId || null,
        name: user.name,
        email: user.email,
      };

      storeSession(nextSession, remember);
      emitDataChanged();
      return nextSession;
    },
    logout: () => {
      clearStoredSession();
      emitDataChanged();
    },
    scoped,
    createCustomer: (input) => mutate((draft, activeSession) => void addCustomer(draft, activeSession, input)),
    editCustomer: (customerId, input) => mutate((draft, activeSession) => void updateCustomer(draft, activeSession, customerId, input)),
    removeCustomer: (customerId) => mutate((draft, activeSession) => void deleteCustomer(draft, activeSession, customerId)),
    createTask: (input) => mutate((draft, activeSession) => void addTask(draft, activeSession, input)),
    changeTaskStatus: (taskId, status) =>
      mutate((draft, activeSession) => void updateTaskStatus(draft, activeSession, taskId, status)),
    createUser: (input) => mutate((draft, activeSession) => void addCompanyUser(draft, activeSession, input)),
    removeUser: (userId) => mutate((draft, activeSession) => void deleteUser(draft, activeSession, userId)),
    resetDemo: () => {
      const next = createSeedDb();
      if (typeof window !== "undefined") {
        clearStoredSession();
        window.localStorage.setItem(DB_KEY, JSON.stringify(next));
      }
      emitDataChanged();
    },
  };

  return <CRMContext.Provider value={value}>{children}</CRMContext.Provider>;
}

export function useCRM() {
  const context = useContext(CRMContext);
  if (!context) throw new Error("useCRM must be used inside CRMProvider.");
  return context;
}
