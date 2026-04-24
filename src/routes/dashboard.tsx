import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  TrendingDown,
  TrendingUp,
  Activity,
  Users,
  Brain,
  ArrowRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Fairness Dashboard · PerceptionGap AI" },
      {
        name: "description",
        content:
          "Visualize bias scores, perception gap metrics, and AI vs human comparison across demographic groups.",
      },
      { property: "og:title", content: "Fairness Dashboard · PerceptionGap AI" },
      {
        property: "og:description",
        content: "Bias detection charts and AI vs human fairness comparison.",
      },
    ],
  }),
  component: DashboardPage,
});

const biasData = [
  { group: "Female", score: 0.34 },
  { group: "Male", score: 0.18 },
  { group: "Non-binary", score: 0.41 },
  { group: "Age 50+", score: 0.52 },
  { group: "APAC", score: 0.27 },
  { group: "LATAM", score: 0.39 },
];

const compareData = [
  { metric: "Approval rate", AI: 64, Human: 71 },
  { metric: "False positives", AI: 12, Human: 9 },
  { metric: "Group parity", AI: 58, Human: 82 },
  { metric: "Consistency", AI: 91, Human: 74 },
];

const gaugeData = [{ name: "gap", value: 68, fill: "var(--color-primary)" }];

function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">credit_decisions.csv · 12,480 rows</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
            Fairness <span className="text-gradient-primary">dashboard</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full">
            Export report
          </Button>
          <Link to="/results">
            <Button className="rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
              View detailed results
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid gap-5 md:grid-cols-3">
        <div className="glass-card relative overflow-hidden rounded-3xl p-6 shadow-elegant">
          <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-gradient-primary opacity-20 blur-2xl" />
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Activity className="h-3.5 w-3.5" />
            Perception Gap Score
          </div>
          <div className="mt-3 flex items-end gap-3">
            <div className="text-6xl font-bold tracking-tighter text-gradient-primary">68</div>
            <div className="mb-2 text-sm text-muted-foreground">/ 100</div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-destructive">
              <TrendingUp className="h-3.5 w-3.5" />
              +12 vs baseline
            </span>
            <span className="text-muted-foreground">moderate divergence</span>
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 shadow-elegant">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Brain className="h-3.5 w-3.5" />
            AI Approval Rate
          </div>
          <div className="mt-3 text-4xl font-bold">64.2%</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Across 12,480 decisions in the dataset.
          </p>
          <div className="mt-4 flex items-center gap-1 text-sm text-destructive">
            <TrendingDown className="h-4 w-4" />
            7pt below human baseline
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 shadow-elegant">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            Human Approval Rate
          </div>
          <div className="mt-3 text-4xl font-bold">71.4%</div>
          <p className="mt-2 text-sm text-muted-foreground">
            From 248 anonymized human auditors.
          </p>
          <div className="mt-4 flex items-center gap-1 text-sm text-success">
            <TrendingUp className="h-4 w-4" />
            Higher fairness across age groups
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Bias bar chart */}
        <div className="glass-card rounded-3xl p-6 shadow-elegant lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Bias detection by group</h3>
              <p className="text-sm text-muted-foreground">
                Disparate-impact ratio per protected attribute (lower is fairer)
              </p>
            </div>
            <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
              6 groups
            </span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={biasData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="biasGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="group" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: "var(--color-primary-soft)" }}
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="score" fill="url(#biasGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gauge */}
        <div className="glass-card rounded-3xl p-6 shadow-elegant">
          <h3 className="text-lg font-semibold">Gap intensity</h3>
          <p className="text-sm text-muted-foreground">Overall AI–Human divergence</p>
          <div className="relative mt-2 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={gaugeData}
                startAngle={210}
                endAngle={-30}
              >
                <RadialBar background={{ fill: "var(--color-muted)" }} dataKey="value" cornerRadius={20} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold text-gradient-primary">68</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">moderate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="glass-card rounded-3xl p-6 shadow-elegant lg:col-span-2">
          <h3 className="text-lg font-semibold">AI vs Human comparison</h3>
          <p className="text-sm text-muted-foreground">Side-by-side fairness metrics</p>
          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compareData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="metric" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "12px",
                    fontSize: "13px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "12px" }} iconType="circle" />
                <Bar dataKey="AI" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Human" fill="var(--color-chart-3)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-lift">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <Info className="h-3.5 w-3.5" />
            Summary
          </div>
          <h3 className="text-xl font-semibold">What this means</h3>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/90">
            The model behaves <strong>more conservatively than humans</strong> for applicants over
            50 and for non-binary identities. The largest gap (52%) appears in the age 50+ slice,
            suggesting the training data underrepresents senior applicants.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
              Reweight senior cohort during training
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
              Add post-processing parity constraint
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
              Re-audit after retrain
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
