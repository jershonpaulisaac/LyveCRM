const EVENT_NAME = "lyvecrm:db-updated";

export function emitDataChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function subscribeToDataChanges(listener: () => void) {
  if (typeof window === "undefined") return () => undefined;

  const handler = () => listener();
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
