import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  ArrowLeft,
  ShieldAlert,
  Scale,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Bias Results · PerceptionGap AI" },
      {
        name: "description",
        content:
          "Detailed bias verdict with AI reasoning and concrete suggestions to improve fairness.",
      },
      { property: "og:title", content: "Bias Results · PerceptionGap AI" },
      {
        property: "og:description",
        content: "AI explanation and fairness improvement recommendations.",
      },
    ],
  }),
  component: ResultsPage,
});

const reasoningPoints = [
  {
    feature: "Age",
    impact: "High",
    note: "Applicants over 50 receive a 22% lower approval rate, despite similar credit profiles.",
  },
  {
    feature: "Region",
    impact: "Medium",
    note: "LATAM and APAC scores skew 14% lower because of underrepresentation in training data.",
  },
  {
    feature: "Gender",
    impact: "Low",
    note: "Slight gap (4%) between male and female applicants — within acceptable threshold.",
  },
];

const suggestions = [
  {
    icon: <Scale className="h-5 w-5" />,
    title: "Rebalance training set",
    text: "Add ~3,200 senior-applicant samples to close the representation gap.",
    tag: "Data",
  },
  {
    icon: <Brain className="h-5 w-5" />,
    title: "Apply parity post-processing",
    text: "Equalized-odds calibration would reduce divergence by an estimated 18 points.",
    tag: "Model",
  },
  {
    icon: <ShieldAlert className="h-5 w-5" />,
    title: "Add a human-in-the-loop check",
    text: "Route borderline decisions (score 0.45–0.55) to a reviewer for the next quarter.",
    tag: "Process",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Re-audit with PerceptionGap",
    text: "Schedule an automatic re-run after each retrain to track gap evolution.",
    tag: "Monitoring",
  },
];

function ResultsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* Top */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <Button variant="outline" className="rounded-full">
          Download PDF
        </Button>
      </div>

      {/* Verdict */}
      <section className="glass-card relative overflow-hidden rounded-3xl p-8 shadow-lift md:p-10">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-destructive/20 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-destructive/10 text-destructive shadow-inner">
            <AlertTriangle className="h-12 w-12" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Audit verdict
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
              Bias detected: <span className="text-destructive">Yes</span>
            </h1>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              The model exhibits a <strong className="text-foreground">moderate</strong> perception
              gap of <strong className="text-foreground">68 / 100</strong> compared to human
              auditors, primarily affecting senior applicants and underrepresented regions.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Tag tone="destructive">Age bias</Tag>
              <Tag tone="warning">Regional skew</Tag>
              <Tag tone="success">Gender parity OK</Tag>
            </div>
          </div>
        </div>
      </section>

      {/* Reasoning */}
      <section className="mt-6 grid gap-5 lg:grid-cols-3">
        <div className="glass-card rounded-3xl p-6 shadow-elegant lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">AI reasoning</h2>
              <p className="text-sm text-muted-foreground">
                Why the model deviated from human fairness
              </p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-foreground/90">
            Using SHAP attributions across 12,480 decisions, PerceptionGap identified three
            features driving the divergence between model output and human judgment. The pattern
            is consistent across cross-validation folds and is unlikely to be sampling noise.
          </p>

          <div className="mt-5 space-y-3">
            {reasoningPoints.map((p) => (
              <div
                key={p.feature}
                className="flex items-start gap-4 rounded-2xl border border-border/70 bg-background/60 p-4"
              >
                <div className="min-w-[80px] text-sm font-semibold">{p.feature}</div>
                <ImpactBadge level={p.impact} />
                <p className="text-sm text-muted-foreground">{p.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6 shadow-elegant">
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent-foreground">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold">What's working</h2>
          </div>
          <ul className="space-y-3 text-sm">
            {[
              "Strong consistency across repeated decisions (91%)",
              "No leakage from sensitive proxies (zip code, surname)",
              "Calibration is well-aligned for the 25–45 cohort",
              "Performance metric stable over 6-month window",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-success" />
                <span className="text-foreground/90">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Suggestions */}
      <section className="mt-8">
        <div className="mb-5 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-accent text-accent-foreground">
            <Lightbulb className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Suggestions to improve fairness</h2>
            <p className="text-sm text-muted-foreground">
              Ranked by estimated reduction in perception gap
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {suggestions.map((s, i) => (
            <div
              key={s.title}
              className="group glass-card relative overflow-hidden rounded-2xl p-6 shadow-elegant transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  {s.icon}
                </div>
                <span className="text-xs font-mono text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <h3 className="text-base font-semibold">{s.title}</h3>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  {s.tag}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-10 overflow-hidden rounded-3xl bg-gradient-primary p-8 text-center text-primary-foreground shadow-lift md:p-12">
        <h3 className="text-2xl font-bold md:text-3xl">Ready to retrain and re-audit?</h3>
        <p className="mx-auto mt-2 max-w-xl text-primary-foreground/90">
          Apply these recommendations and PerceptionGap will track the gap closing in real time.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/">
            <Button size="lg" variant="secondary" className="rounded-full">
              Upload new dataset
            </Button>
          </Link>
          <Button
            size="lg"
            className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Schedule re-audit
          </Button>
        </div>
      </section>
    </main>
  );
}

function Tag({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "destructive" | "warning" | "success";
}) {
  const cls =
    tone === "destructive"
      ? "bg-destructive/10 text-destructive"
      : tone === "warning"
        ? "bg-warning/15 text-foreground"
        : "bg-accent-soft text-accent-foreground";
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${cls}`}>{children}</span>
  );
}

function ImpactBadge({ level }: { level: string }) {
  const cls =
    level === "High"
      ? "bg-destructive/10 text-destructive"
      : level === "Medium"
        ? "bg-warning/20 text-foreground"
        : "bg-accent-soft text-accent-foreground";
  return (
    <span
      className={`inline-flex h-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}
    >
      {level}
    </span>
  );
}
