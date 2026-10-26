import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const types = { '.html': 'text/html; charset=utf-8', '.rsc': 'text/x-component', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.pdf': 'application/pdf', '.bin': 'application/octet-stream' };

export function createServer(root = 'public') {
  const base = path.resolve(root);
  return http.createServer(async (req, res) => {
    try {
      if (!['GET', 'HEAD'].includes(req.method)) {
        res.writeHead(405, { Allow: 'GET, HEAD' }).end();
        return;
      }
      const url = new URL(req.url, 'http://localhost');
      const pathname = decodeURIComponent(url.pathname);
      let file = path.resolve(base, '.' + pathname);
      if (file !== base && !file.startsWith(base + path.sep)) {
        res.writeHead(403).end('Forbidden');
        return;
      }
      let info = await stat(file);
      if (info.isDirectory()) {
        // The captured Flight response preserves Next client-side navigation.
        file = path.join(file, req.headers.rsc === '1' ? 'index.rsc' : 'index.html');
        info = await stat(file);
      }
      const headers = {
        'Content-Type': types[path.extname(file)] || 'application/octet-stream',
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
        Vary: 'RSC, Next-Router-State-Tree, Next-Router-Prefetch',
      };
      let start = 0;
      let end = info.size - 1;
      let status = 200;
      if (req.headers.range) {
        const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
        if (range && (range[1] || range[2])) {
          start = range[1] ? Number(range[1]) : Math.max(0, info.size - Number(range[2]));
          end = range[1] && range[2] ? Math.min(Number(range[2]), end) : end;
        }
        if (!range || (!range[1] && !range[2]) || start > end || start >= info.size) {
          res.writeHead(416, { 'Content-Range': `bytes */${info.size}` }).end();
          return;
        }
        status = 206;
        headers['Content-Range'] = `bytes ${start}-${end}/${info.size}`;
      }
      headers['Content-Length'] = end - start + 1;
      res.writeHead(status, headers);
      if (req.method === 'HEAD') res.end();
      else createReadStream(file, { start, end }).on('error', () => res.destroy()).pipe(res);
    } catch (error) {
      const status = error.code === 'ENOENT' || error.code === 'ENOTDIR' ? 404 : error instanceof URIError ? 400 : 500;
      res.writeHead(status, { 'Content-Type': 'text/plain' }).end(status === 404 ? 'Page not found' : 'Request failed');
    }
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 3000);
  createServer(process.argv[2] || 'public').listen(port, '127.0.0.1', () => {
    console.log(`Portfolio available at http://localhost:${port}`);
  });
}
