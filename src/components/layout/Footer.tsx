import { LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 border border-primary/20">
            <LayoutGrid className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="font-medium">
            Apex<span className="text-foreground">ERP</span> — Built for modern
            inventory management
          </span>
        </div>

        {/* Copyright & Technical Details */}
        <p className="text-xs text-muted-foreground/80 tracking-tight">
          © {new Date().getFullYear()} ApexERP Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
