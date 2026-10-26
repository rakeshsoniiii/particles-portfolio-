import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
const manifest = [];
async function walk(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, item.name);
    if (item.isDirectory()) await walk(file);
    else {
      const bytes = await readFile(file);
      manifest.push({ path: path.relative('dist', file).replaceAll('\\', '/'), bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
    }
  }
}
await walk('dist');
await writeFile('docs/research/build-manifest.json', JSON.stringify(manifest, null, 2));
console.log(`Built ${manifest.length} files (${(manifest.reduce((sum, f) => sum + f.bytes, 0) / 1024 / 1024).toFixed(1)} MB) into dist/.`);
