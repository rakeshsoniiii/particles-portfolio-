import {readFile,readdir} from 'node:fs/promises';
for(const f of await readdir('public/_next/static/chunks')){
 if(!f.endsWith('.js'))continue;
 const s=await readFile('public/_next/static/chunks/'+f,'utf8');
 const urls=[...new Set([...s.matchAll(/["'`]([^"'`\n]{1,200}\.(?:png|jpg|jpeg|webp|avif|mp4|webm|glb|gltf|bin|json|woff2|svg)(?:\?[^"'`\n]*)?)["'`]/g)].map(m=>m[1]))];
 console.log(f,JSON.stringify(urls));
}
