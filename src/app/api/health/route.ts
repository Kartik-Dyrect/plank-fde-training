import { connection } from "next/server";
import { env } from "@/lib/env";

export async function GET() {
  // Read config at request time, not at build time.
  await connection();

  return Response.json({
    status: "ok",
    environment: env.deploymentEnv,
    commit: env.commitSha,
  });
}
