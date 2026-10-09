// In-memory favorites (swap for a DB when you want persistence).
export interface Fav { kind: "pokemon" | "art"; id: string; name: string }
export const favorites = new Map<string, Fav>();

export function toggleFav(f: Fav): boolean {
  const key = `${f.kind}:${f.id}`;
  if (favorites.has(key)) { favorites.delete(key); return false; }
  favorites.set(key, f);
  return true;
}
export const isFav = (kind: string, id: string) => favorites.has(`${kind}:${id}`);
