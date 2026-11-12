import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { env } from "@/lib/env";

export const metadata: Metadata = { title: "Settings" };

const rows = [
  { label: "Environment", value: env.deploymentEnv },
  { label: "Commit", value: env.commitSha?.slice(0, 7) ?? "local build" },
  { label: "Region", value: env.region ?? "n/a" },
];

export default function SettingsPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Deployment</CardTitle>
          <CardDescription>
            Where this version of WorkBot is running.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-[8rem_1fr] gap-y-3 text-sm">
            {rows.map(({ label, value }) => (
              <div key={label} className="contents">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="font-mono">{value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </main>
  );
}
