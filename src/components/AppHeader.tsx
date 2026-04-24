import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

const navItems = [
  { to: "/" as const, label: "Upload" },
  { to: "/dashboard" as const, label: "Dashboard" },
  { to: "/results" as const, label: "Results" },
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-semibold">PerceptionGap</div>
            <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              AI Fairness Lab
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/60 p-1 shadow-sm backdrop-blur md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true }}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-gradient-primary data-[status=active]:text-primary-foreground data-[status=active]:shadow-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
            <span className="text-xs font-medium text-foreground">Model online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
