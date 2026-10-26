import {readFile} from 'node:fs/promises';
const s=await readFile('public/_next/static/chunks/1stl4ykwpf_a2.js','utf8');
for(const term of ['portrait.bin','italy.bin','https:','works','projects','fetch(']){
 let i=-1;let n=0;while((i=s.indexOf(term,i+1))>=0 && n++<14)console.log(term,s.slice(Math.max(0,i-150),i+350));
}
const h=await readFile('docs/research/original.html','utf8');console.log('scripts', [...h.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n').slice(-7500));
