import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const projects=JSON.parse(await readFile('public/assets/projects.json','utf8'));
assert.equal(projects.length,7);
assert.deepEqual(projects.map(p=>p.slug),['nla-engine','cyber-cell-cdr','ghostnet','ip-changer','get-location','wireless-security-lab','ransomware-homelab']);
for(const p of projects){assert.ok(p.href.startsWith('https://'));const img=await readFile('public'+p.image);assert.ok(img.length > 1000);}
for(const file of ['public/index.html','public/index.rsc']){const s=await readFile(file,'utf8');assert.ok(!s.includes('Daniel Ingrassia'));for(const p of projects)assert.ok(s.includes(p.slug),p.slug);}
const js=await readFile('public/_next/static/chunks/1tzay28hfjym9.js','utf8');assert.ok(js.includes('href:e.href'));assert.ok(js.includes('src:e.image') || js.includes('e.video'));assert.ok(!js.includes('href:`/projects/${e.slug}`'));
console.log('PASS: seven ordered projects, artwork, homepage payloads, external links and identity.');
