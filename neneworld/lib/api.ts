// Tiny fetch helper for public, key-free APIs: timeout + optional in-memory cache.
const cache = new Map<string, { t: number; v: unknown }>();

export async function getJson<T = any>(url: string, ttlMs = 0): Promise<T> {
  const hit = cache.get(url);
  if (ttlMs > 0 && hit && Date.now() - hit.t < ttlMs) return hit.v as T;

  const res = await fetch(url, {
    headers: { accept: "application/json", "user-agent": "NeneWorld/1.0 (NeneUI demo)" },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} (${new URL(url).host})`);

  const v = (await res.json()) as T; // res.json() ignores content-type (adviceslip sends text/html)
  if (ttlMs > 0) cache.set(url, { t: Date.now(), v });
  return v;
}

export type Result<T> = { ok: true; data: T } | { ok: false; error: string };

export async function safe<T>(p: Promise<T>): Promise<Result<T>> {
  try {
    return { ok: true, data: await p };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? String(e) };
  }
}

export const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
export const pick = <T>(a: T[]) => a[rand(0, a.length - 1)]!;
export const shuffle = <T>(a: T[]) => [...a].sort(() => Math.random() - 0.5);
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const stripHtml = (s: string) => s.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
