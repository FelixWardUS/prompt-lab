#!/usr/bin/env node
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve('.');
const port = Number(process.env.PORT ?? 4173);

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
]);

function safePath(urlPath) {
  const decodedPath = decodeURIComponent(urlPath);
  const requested = decodedPath.endsWith('/') ? `${decodedPath}index.html` : decodedPath;
  const resolved = normalize(join(root, requested));

  if (!resolved.startsWith(root)) {
    return null;
  }

  return resolved;
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (url.pathname === '/') {
    response.writeHead(302, { 'Location': '/web/' });
    response.end();
    return;
  }

  const filePath = safePath(url.pathname);

  if (!filePath) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error('Not a file');

    response.writeHead(200, {
      'Content-Type': mimeTypes.get(extname(filePath)) ?? 'application/octet-stream',
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});

server.listen(port, () => {
  process.stdout.write(`Prompt Lab running at http://localhost:${port}\n`);
});
