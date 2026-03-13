import { createContext, useContext, useMemo } from "react";
import type { Photo } from "@/data/photography";

export const ImageViewerContext = createContext<{
  photos: Photo[];
  open: (index: number) => void;
}>({ photos: [], open: () => {} });

export const FileResolverContext = createContext<{
  resolvedUrls: Map<string, { url: string | null; name?: string }>;
  isResolving: boolean;
}>({ resolvedUrls: new Map(), isResolving: false });

export function isFileUri(src: string): boolean {
  return src.startsWith("file://");
}

export function extractBlockId(fileUri: string): string | null {
  if (!fileUri.startsWith("file://")) return null;
  try {
    const decoded = decodeURIComponent(fileUri.replace("file://", ""));
    const json = JSON.parse(decoded);
    return json?.permissionRecord?.id?.replace(/-/g, "") ?? null;
  } catch {
    return null;
  }
}

/** Hook to resolve a file:// URI via the FileResolverContext */
export function useResolvedSrc(src: string) {
  const { resolvedUrls, isResolving } = useContext(FileResolverContext);
  return useMemo(() => {
    if (!isFileUri(src)) return { url: src, loading: false, failed: false };
    const blockId = extractBlockId(src);
    if (!blockId) return { url: undefined, loading: false, failed: true };
    const resolved = resolvedUrls.get(blockId);
    if (!resolved) return { url: undefined, loading: isResolving, failed: !isResolving };
    return { url: resolved.url ?? undefined, name: resolved.name, loading: false, failed: !resolved.url };
  }, [src, resolvedUrls, isResolving]);
}
