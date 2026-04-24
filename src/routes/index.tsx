import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import {
  UploadCloud,
  FileSpreadsheet,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Scale,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Upload Dataset · PerceptionGap AI" },
      {
        name: "description",
        content:
          "Upload a CSV dataset to scan for hidden bias in AI decisions and benchmark against human fairness.",
      },
      { property: "og:title", content: "Upload Dataset · PerceptionGap AI" },
      {
        property: "og:description",
        content: "Drop a CSV and let PerceptionGap AI analyze fairness across demographic slices.",
      },
    ],
  }),
  component: UploadPage,
});

const SAMPLE_ROWS = [
  { id: "A-1042", age: 34, gender: "Female", region: "EU-W", score: 0.78, decision: "Approve" },
  { id: "A-1043", age: 51, gender: "Male", region: "NA-E", score: 0.41, decision: "Reject" },
  { id: "A-1044", age: 27, gender: "Non-binary", region: "APAC", score: 0.66, decision: "Approve" },
  { id: "A-1045", age: 62, gender: "Female", region: "EU-S", score: 0.32, decision: "Reject" },
  { id: "A-1046", age: 45, gender: "Male", region: "LATAM", score: 0.71, decision: "Approve" },
];

function UploadPage() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File | null) => {
    if (file) setFileName(file.name);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files?.[0] ?? null);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0] ?? null);
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      {/* Hero */}
      <section className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-4 py-1.5 text-xs font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          Fairness audit, in seconds
        </span>
        <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Detect bias in <span className="text-gradient-primary">AI decisions</span>
          <br className="hidden md:block" /> measure the gap with humans.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
          Upload a decision log and PerceptionGap AI surfaces hidden disparities, explains the
          reasoning, and benchmarks model behavior against human fairness.
        </p>
      </section>

      {/* Upload Card */}
      <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass-card rounded-3xl p-8 shadow-elegant">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Upload your dataset</h2>
              <p className="text-sm text-muted-foreground">
                CSV file · up to 50MB · headers required
              </p>
            </div>
            <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-info-soft text-info md:flex">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-14 text-center transition-all ${
              dragActive
                ? "border-primary bg-primary-soft"
                : "border-border bg-muted/40 hover:border-primary/50 hover:bg-primary-soft/40"
            }`}
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow transition-transform group-hover:scale-105">
              <UploadCloud className="h-7 w-7 text-primary-foreground" />
            </div>
            <p className="text-base font-medium">
              {fileName ? (
                <span className="inline-flex items-center gap-2 text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  {fileName}
                </span>
              ) : (
                <>
                  Drop your CSV here, or{" "}
                  <span className="text-primary underline-offset-4 hover:underline">browse</span>
                </>
              )}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              We support comma, semicolon, and tab-delimited files.
            </p>
            <input
              ref={inputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={onChange}
              className="hidden"
            />
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              By uploading you agree the data is anonymized and audit-safe.
            </p>
            <Button
              size="lg"
              onClick={() => navigate({ to: "/dashboard" })}
              className="bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95"
            >
              Analyze data
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Side: features */}
        <div className="grid gap-4">
          <FeatureCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Bias scanner"
            text="Statistical parity, equal opportunity, and disparate impact across slices."
            tone="primary"
          />
          <FeatureCard
            icon={<Scale className="h-5 w-5" />}
            title="Human benchmark"
            text="Compare AI decisions against crowd-sourced human fairness baselines."
            tone="accent"
          />
          <FeatureCard
            icon={<Sparkles className="h-5 w-5" />}
            title="Explainable AI"
            text="Plain-English reasoning so you know which features drove each call."
            tone="info"
          />
        </div>
      </section>

      {/* Preview Table */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h3 className="text-lg font-semibold">Dataset preview</h3>
            <p className="text-sm text-muted-foreground">
              First 5 rows of <span className="font-medium text-foreground">credit_decisions.csv</span>
            </p>
          </div>
          <Link to="/dashboard" className="text-sm font-medium text-primary hover:underline">
            View full analysis →
          </Link>
        </div>

        <div className="glass-card overflow-hidden rounded-2xl shadow-elegant">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Applicant</th>
                  <th className="px-5 py-3 font-medium">Age</th>
                  <th className="px-5 py-3 font-medium">Gender</th>
                  <th className="px-5 py-3 font-medium">Region</th>
                  <th className="px-5 py-3 font-medium">Model score</th>
                  <th className="px-5 py-3 font-medium">Decision</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_ROWS.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-border/60 transition-colors hover:bg-primary-soft/30"
                  >
                    <td className="px-5 py-3 font-mono text-xs">{row.id}</td>
                    <td className="px-5 py-3">{row.age}</td>
                    <td className="px-5 py-3">{row.gender}</td>
                    <td className="px-5 py-3">{row.region}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-gradient-primary"
                            style={{ width: `${row.score * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {row.score.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          row.decision === "Approve"
                            ? "bg-accent-soft text-accent-foreground"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {row.decision}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  text,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  tone: "primary" | "accent" | "info";
}) {
  const toneClass =
    tone === "primary"
      ? "bg-primary-soft text-primary"
      : tone === "accent"
        ? "bg-accent-soft text-accent-foreground"
        : "bg-info-soft text-info";
  return (
    <div className="glass-card rounded-2xl p-5 shadow-sm transition-shadow hover:shadow-elegant">
      <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${toneClass}`}>
        {icon}
      </div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
