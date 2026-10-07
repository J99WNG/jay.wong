import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.cwd(), 'out');
const port = Number(process.env.PORT ?? 4173);
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.riv': 'application/octet-stream',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.wasm': 'application/wasm',
  '.woff2': 'font/woff2',
};

function resolveRequestPath(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const normalizedPath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, '');
  let filePath = join(root, normalizedPath);

  if (filePath === root || decodedPath.endsWith('/')) {
    filePath = join(filePath, 'index.html');
  } else if (!extname(filePath) && existsSync(`${filePath}.html`)) {
    filePath = `${filePath}.html`;
  }

  return filePath.startsWith(root) ? filePath : null;
}

createServer((request, response) => {
  const requestUrl = new URL(request.url ?? '/', `http://${request.headers.host}`);
  const filePath = resolveRequestPath(requestUrl.pathname);

  if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  response.writeHead(200, {
    'Content-Type': mimeTypes[extname(filePath)] ?? 'application/octet-stream',
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
}).listen(port, '127.0.0.1', () => {
  console.log(`Serving the static export at http://127.0.0.1:${port}`);
});
