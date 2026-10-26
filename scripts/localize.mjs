import {readdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
const map=JSON.parse(await readFile('docs/research/asset-map.json','utf8'));
const replacements=map.filter(a=>a.url.includes('cdn.sanity.io')).map(a=>[a.url,'/'+a.dest.replace(/^public\//,'')]);
replacements.push(['https://static.cloudflareinsights.com/beacon.min.js','/analytics-disabled.js']);
async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){
 const p=path.join(dir,e.name);if(e.isDirectory()){await walk(p);continue;}
 if(!/\.(html|rsc|js)$/.test(p))continue;
 let s=await readFile(p,'utf8');for(const [a,b] of replacements)s=s.replaceAll(a,b);
 // Keep metadata and external project destinations intact; localize navigation to this copied site.
 s=s.replaceAll('https://ingrassiadaniel.it/','/');
 await writeFile(p,s);
}}
await walk('public');
await writeFile('public/analytics-disabled.js','/* Analytics intentionally disabled in this local reproduction. */\n');
console.log('Localized videos, internal links, and analytics.');
