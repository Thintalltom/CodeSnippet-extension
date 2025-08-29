import { createClient } from '@supabase/supabase-js';

const chromeStorage = {
  getItem: (key: string) =>
    new Promise<string | null>((resolve) => {
      chrome.storage.local.get([key], (result) => {
        resolve(result[key] ?? null);
      });
    }),
  setItem: (key: string, value: string) =>
    new Promise<void>((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => resolve());
    }),
  removeItem: (key: string) =>
    new Promise<void>((resolve) => {
      chrome.storage.local.remove([key], () => resolve());
    }),
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    storage: chromeStorage,
    autoRefreshToken: true,
  },
});

// export default supabase