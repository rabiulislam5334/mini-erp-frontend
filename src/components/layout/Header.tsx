import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuthStore } from "@/store/authStore";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-sans text-base font-semibold tracking-tight transition-opacity hover:opacity-90"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <LayoutGrid className="h-4 w-4 text-primary" />
          </div>
          <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Apex ERP
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {!isAuthenticated && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
          )}
          <Button
            size="sm"
            className="shadow-sm font-medium transition-all duration-200 active:scale-95"
            onClick={() => navigate(isAuthenticated ? "/dashboard" : "/login")}
          >
            {isAuthenticated ? "Go to dashboard" : "Get started"}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? (
            <X className="h-5 w-5 animate-in fade-in zoom-in-75 duration-150" />
          ) : (
            <Menu className="h-5 w-5 animate-in fade-in zoom-in-75 duration-150" />
          )}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {open && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg px-4 pb-6 pt-3 animate-in slide-in-from-top-4 duration-200 ease-out">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-2.5 border-t border-border/40 pt-4">
            <div className="flex items-center justify-between px-3">
              <span className="text-sm text-muted-foreground">Appearance</span>
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-2 mt-1">
              {!isAuthenticated && (
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                >
                  Log in
                </Button>
              )}
              <Button
                className="flex-1"
                onClick={() => {
                  navigate(isAuthenticated ? "/dashboard" : "/login");
                  setOpen(false);
                }}
              >
                {isAuthenticated ? "Dashboard" : "Get started"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
