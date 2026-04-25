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
          <img src="/logo.png" alt="PerceptionGap Logo" className="h-10 w-auto" />
          <div className="leading-tight">
            <div className="font-display text-lg font-bold tracking-tight text-foreground">
              PerceptionGap
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/60 p-1 shadow-sm backdrop-blur md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true }}
              className="group relative px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary"
            >
              {item.label}
              <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 group-data-[status=active]:w-5" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <div className="flex items-center gap-2 rounded-full border border-success/20 bg-success/5 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-success">
              System Online
            </span>
          </div>

          <div className="h-4 w-px bg-border/60" />

          <button className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
            Sign in
          </button>

          <Link
            to="/"
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:shadow-md"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
