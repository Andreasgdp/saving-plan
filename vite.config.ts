import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function localPersistencePlugin(): Plugin {
  const dataDir = path.resolve(process.cwd(), 'data');
  const dataFile = path.resolve(dataDir, 'plan.json');

  return {
    name: 'local-persistence-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }

        if (req.url === '/api/plan' && req.method === 'GET') {
          if (fs.existsSync(dataFile)) {
            try {
              const content = fs.readFileSync(dataFile, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(content);
              return;
            } catch (err) {
              console.error('Failed to read plan.json', err);
            }
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ exists: false }));
          return;
        }

        if (req.url === '/api/plan' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const parsed: unknown = JSON.parse(body);
              fs.writeFileSync(dataFile, JSON.stringify(parsed, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, savedAt: new Date().toISOString() }));
            } catch (err) {
              const errorMessage = err instanceof Error ? err.message : 'Invalid JSON';
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: errorMessage }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), localPersistencePlugin()],
  server: {
    port: 3000,
    host: true,
  }
});
