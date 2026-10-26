import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer } from '../server.mjs';
import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

// A malformed client chunk can return HTTP 200 but prevent the entire page mounting.
for (const file of readdirSync('public/_next/static/chunks').filter(file => file.endsWith('.js'))) {
  const result = spawnSync(process.execPath, ['--check', `public/_next/static/chunks/${file}`], { encoding: 'utf8' });
  assert.equal(result.status, 0, `${file}: ${result.stderr?.slice(-300)}`);
}

const server = createServer();
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
try {
  const routes = JSON.parse(await readFile('docs/research/routes.json', 'utf8'));
  for (const route of routes) {
    const page = await fetch(base + route);
    assert.equal(page.status, 200, route);
    const html = await page.text();
    assert.match(html, /<!DOCTYPE html>/i);
    assert.ok(!html.includes('cdn.sanity.io/files/'), 'Video must be local');
    const assets = [...new Set([...html.matchAll(/(?:src|href)="(\/_next\/[^"<>]+)"/g)].map(m => m[1]))];
    for (const asset of assets) assert.equal((await fetch(base + asset, { method: 'HEAD' })).status, 200, asset);
    const flight = await fetch(base + route + '?_rsc=check', { headers: { RSC: '1' } });
    assert.match(flight.headers.get('content-type'), /text\/x-component/);
    assert.ok((await flight.text()).length > 1000);
  }
  for (const asset of ['/portrait.bin', '/india.bin', '/assets/MY.png', '/assets/RESUME.pdf', '/noise.jpg', '/assets/projects/Evil%20twin%20attack.MP4', '/assets/projects/Ransomware%20attack.MP4', '/assets/projects/Digital%20Forensics%20Case%20B4DM755..MP4']) {
    assert.equal((await fetch(base + asset, { method: 'HEAD' })).status, 200, asset);
  }
  const resume = await fetch(base + '/assets/RESUME.pdf');
  assert.equal(resume.headers.get('content-type'), 'application/pdf');
  const projects = JSON.parse(await readFile('public/assets/projects.json', 'utf8'));
  assert.equal(projects.length, 8);
  assert.deepEqual(projects.map(project => project.slug), ['nla-engine', 'cyber-cell-cdr', 'ghostnet', 'ip-changer', 'get-location', 'wireless-security-lab', 'ransomware-homelab', 'digital-forensics-case-b4dm755']);
  for (const project of projects) assert.equal((await fetch(base + project.image)).status, 200);
  const home = await (await fetch(base)).text();
  assert.ok(home.includes('Harpinder Singh'));
  assert.ok(home.includes('harpindersinghhs8696@gmail.com'));
  assert.ok(!home.includes('Daniel Ingrassia'));
  const partial = await fetch(base + '/assets/projects/Ransomware%20attack.MP4', { headers: { Range: 'bytes=0-63' } });
  assert.equal(partial.status, 206);
  assert.equal((await partial.arrayBuffer()).byteLength, 64);
  assert.equal((await fetch(base + '/assets/projects/Ransomware%20attack.MP4', { headers: { Range: 'bytes=999999999-' } })).status, 416);
  assert.equal((await fetch(base + '/missing-page')).status, 404);
  assert.equal((await fetch(base + '/%2e%2e%5cpackage.json')).status, 403);
  assert.equal((await fetch(base + '/', { method: 'POST' })).status, 405);
  console.log(`PASS: ${routes.length} HTML routes and Flight payloads, page dependencies, particle data, lab videos, byte ranges, missing routes and path/method protection.`);
} finally {
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
