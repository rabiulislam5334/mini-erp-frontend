import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  label?: string;
}

export function Loader({ className, label }: LoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12",
        className,
      )}
    >
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
}

export function FullPageLoader({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Loader label={label} />
    </div>
  );
}
