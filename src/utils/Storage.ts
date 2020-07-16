export function removeItem(key: string) {
  sessionStorage.removeItem(key);
}

export function getItem(key: string): string | null {
  return sessionStorage.getItem(key);
}

export function setItem(key: string, value: string) {
  sessionStorage.setItem(key, value);
}
