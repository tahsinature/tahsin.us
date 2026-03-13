import { AlertTriangle } from "lucide-react";

interface Props {
  message: string;
  warnings?: string[];
}

export default function DirectiveErrorDisplay({ message, warnings }: Props) {
  const allMessages = [message, ...(warnings ?? [])];

  return (
    <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-lg border border-amber-500/30 bg-amber-500/5 my-4 text-sm">
      <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
      <div className="space-y-0.5 min-w-0">
        {allMessages.map((msg, i) => (
          <p key={i} className="text-amber-700 dark:text-amber-400 leading-snug">{msg}</p>
        ))}
      </div>
    </div>
  );
}

export function DirectiveWarnings({ warnings }: { warnings: string[] }) {
  if (warnings.length === 0) return null;
  return (
    <div className="flex items-start gap-2 px-3 py-2 rounded-md border border-amber-500/20 bg-amber-500/5 mb-2 text-xs">
      <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
      <div className="space-y-0.5 min-w-0">
        {warnings.map((msg, i) => (
          <p key={i} className="text-amber-600 dark:text-amber-400/80 leading-snug">{msg}</p>
        ))}
      </div>
    </div>
  );
}
