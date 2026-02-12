export const dynamic = "force-dynamic";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL;
  const dbUrlBracket = process.env["DATABASE_URL"];

  // Find any env vars that might contain the database URL
  const dbRelated = Object.keys(process.env).filter(
    (k) =>
      k.includes("DATABASE") ||
      k.includes("POSTGRES") ||
      k.includes("NEON") ||
      k.includes("DB_")
  );

  return Response.json({
    DATABASE_URL_exists: !!dbUrl,
    DATABASE_URL_bracket_exists: !!dbUrlBracket,
    DATABASE_URL_prefix: dbUrl ? dbUrl.substring(0, 40) + "..." : "NOT SET",
    database_related_env_vars: dbRelated,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    VERCEL_ENV: process.env.VERCEL_ENV,
  });
}
