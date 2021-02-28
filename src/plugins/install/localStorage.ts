export const instance = {
  getItem(key: string): string | null {
    return window.localStorage.getItem(key);
  },

  setItem(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  },

  clear(): void {
    window.localStorage.clear();
  },

  removeItem(key: string): void {
    window.localStorage.removeItem(key);
  },
};
