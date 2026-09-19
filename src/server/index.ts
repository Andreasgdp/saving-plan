import { serve } from "bun";
import fs from "node:fs";
import path from "node:path";

const port = Number(process.env.PORT) || 3000;
const dataDir = path.resolve(process.cwd(), "data");
const dataFile = path.resolve(dataDir, "plan.json");
const distDir = path.resolve(process.cwd(), "dist");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log(`Starting Saving Plan server on http://localhost:${port}`);

serve({
  port,
  async fetch(req: Request) {
    const url = new URL(req.url);

    // API endpoints
    if (url.pathname === "/api/plan") {
      if (req.method === "GET") {
        if (fs.existsSync(dataFile)) {
          const content = fs.readFileSync(dataFile, "utf-8");
          return new Response(content, {
            headers: { "Content-Type": "application/json" },
          });
        }
        return new Response(JSON.stringify({ exists: false }), {
          headers: { "Content-Type": "application/json" },
        });
      }

      if (req.method === "POST") {
        try {
          const body: unknown = await req.json();
          fs.writeFileSync(dataFile, JSON.stringify(body, null, 2), "utf-8");
          return new Response(
            JSON.stringify({ success: true, savedAt: new Date().toISOString() }),
            { headers: { "Content-Type": "application/json" } }
          );
        } catch (err) {
          const message = err instanceof Error ? err.message : "Invalid JSON";
          return new Response(JSON.stringify({ error: message }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }
      }
    }

    // Serve static frontend files if built
    if (fs.existsSync(distDir)) {
      let filePath = path.join(distDir, url.pathname === "/" ? "index.html" : url.pathname);
      if (!fs.existsSync(filePath)) {
        filePath = path.join(distDir, "index.html");
      }
      const file = Bun.file(filePath);
      return new Response(file);
    }

    return new Response(
      "Frontend not built yet. Run `bun run dev` for development or `bun run build` before starting production server.",
      { status: 200, headers: { "Content-Type": "text/plain" } }
    );
  },
});
