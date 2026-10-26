import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const origin = 'https://ingrassiadaniel.it';
const html = await readFile('docs/research/original.html','utf8');
const seen = new Set();
const queue = [...html.matchAll(/(?:src|href)="([^"<>]+)"/g)].map(m=>m[1]).filter(s=>s.startsWith('/_next/'));
while(queue.length){
 const batch = queue.splice(0,4).filter(s=>!seen.has(s));
 await Promise.all(batch.map(async url=>{
 seen.add(url);
 const r=await fetch(origin+url); if(!r.ok) throw new Error(`${r.status} ${url}`);
 const buf=Buffer.from(await r.arrayBuffer());
 const dest=path.join('public',url.split('?')[0]); await mkdir(path.dirname(dest),{recursive:true}); await writeFile(dest,buf);
 console.log(url,buf.length);
 if(/\.(js|css)$/.test(url)) {
 const text=buf.toString();
 for(const m of text.matchAll(/["'`](\/?_next\/static\/[^"'`\s]+|\/?static\/chunks\/[^"'`\s]+)["'`]/g)) {const p=m[1].startsWith('static/')?'/_next/'+m[1]:m[1];if(!seen.has(p))queue.push(p);}
 }
 }));
}
await writeFile('docs/research/downloaded.json',JSON.stringify([...seen],null,2));
