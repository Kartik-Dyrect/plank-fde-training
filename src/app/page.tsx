import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Automate workflows",
    description:
      "Turn repeatable team processes into workflows that run themselves.",
  },
  {
    title: "Keep humans in the loop",
    description:
      "Route approvals and exceptions to the right person at the right time.",
  },
  {
    title: "See what is running",
    description: "Check deployment health and settings at a glance.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center gap-16 px-6 py-24">
      <section className="flex flex-col items-start gap-6">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          WorkBot
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          The enterprise workflow platform that handles the busywork, so your
          team can focus on the work that matters.
        </p>
        <div className="flex gap-3">
          <Link href="/settings" className={buttonVariants({ size: "lg" })}>
            View settings
          </Link>
          <Link
            href="/api/health"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Health check
          </Link>
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title}>
            <CardHeader>
              <CardTitle>{f.title}</CardTitle>
              <CardDescription>{f.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </main>
  );
}
