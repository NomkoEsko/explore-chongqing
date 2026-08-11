const POSITION_PREFIX = "explore-chongqing:list-scroll";
const RESTORE_PREFIX = "explore-chongqing:list-scroll-restore";

function storage() {
  if (typeof window === "undefined") return null;

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function positionKey(pathname) {
  return `${POSITION_PREFIX}:${pathname}`;
}

function restoreKey(pathname) {
  return `${RESTORE_PREFIX}:${pathname}`;
}

function readSavedScroll(pathname) {
  const session = storage();
  if (!session) return null;

  const value = Number.parseInt(session.getItem(positionKey(pathname)) || "", 10);
  return Number.isFinite(value) ? Math.max(0, value) : null;
}

export function saveListScrollPosition(pathname) {
  const session = storage();
  if (!session) return;

  const scrollY = Math.max(0, Math.round(window.scrollY || document.documentElement.scrollTop || 0));
  session.setItem(positionKey(pathname), String(scrollY));
}

export function requestListScrollRestore(pathname) {
  const session = storage();
  if (!session) return;

  session.setItem(restoreKey(pathname), "1");
}

export function consumeListScrollRestore(pathname, { allowSavedPosition = false } = {}) {
  const session = storage();
  if (!session) return null;

  const key = restoreKey(pathname);
  const requested = session.getItem(key) === "1";
  if (requested) {
    session.removeItem(key);
  }

  if (!requested && !allowSavedPosition) return null;

  const savedScroll = readSavedScroll(pathname);
  if (savedScroll !== null) return savedScroll;

  return requested ? 0 : null;
}
