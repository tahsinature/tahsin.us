import { useEffect } from "react";

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `Tahsin - ${title}` : "Tahsin";
    return () => {
      document.title = "Tahsin";
    };
  }, [title]);
}
