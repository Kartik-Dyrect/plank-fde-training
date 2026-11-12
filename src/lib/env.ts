// The only module that reads process.env. Everything else imports from here.

export type DeploymentEnv = "production" | "preview" | "development";

function parseDeploymentEnv(value: string | undefined): DeploymentEnv {
  if (value === "production" || value === "preview") return value;
  return "development";
}

export const env = {
  deploymentEnv: parseDeploymentEnv(
    process.env.VERCEL_ENV ?? process.env.APP_ENV,
  ),
  commitSha: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
  region: process.env.VERCEL_REGION ?? null,
} as const;
