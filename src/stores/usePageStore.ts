import { create } from "zustand";

interface PageCache {
  markdown: string;
  fetchedAt: number;
}

interface PageState {
  cache: Record<string, PageCache>;
  fetching: Map<string, Promise<string>>;

  /** Fetch a page by URL. Returns cached data if fresh, deduplicates in-flight requests. */
  fetchPage: (url: string) => Promise<string>;

  /** Prefetch a page (fire-and-forget). */
  prefetch: (url: string) => void;
}

const STALE_MS = 25 * 60 * 1000;

export const usePageStore = create<PageState>((set, get) => ({
  cache: {},
  fetching: new Map(),

  fetchPage: async (url: string) => {
    const { cache, fetching } = get();

    // Return cached if fresh
    const cached = cache[url];
    if (cached && Date.now() - cached.fetchedAt < STALE_MS) {
      return cached.markdown;
    }

    // Deduplicate in-flight requests
    const existing = fetching.get(url);
    if (existing) return existing;

    const promise = fetch(url)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Failed to fetch");
        const markdown = data.markdown as string;

        const newFetching = new Map(get().fetching);
        newFetching.delete(url);
        set({
          cache: { ...get().cache, [url]: { markdown, fetchedAt: Date.now() } },
          fetching: newFetching,
        });

        return markdown;
      })
      .catch((err) => {
        const newFetching = new Map(get().fetching);
        newFetching.delete(url);
        set({ fetching: newFetching });
        throw err;
      });

    set({ fetching: new Map(fetching).set(url, promise) });
    return promise;
  },

  prefetch: (url: string) => {
    get().fetchPage(url).catch(() => {});
  },
}));
