import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
const origin='https://ingrassiadaniel.it';
const routes=['/','/cookie-policy','/projects/michael-london','/projects/fratelli-simonetti','/projects/stephen-young','/projects/lea-winery'];
const assets=new Set();
for(const route of routes){
 for(const rsc of [false,true]){
 const r=await fetch(origin+route,{headers:rsc?{RSC:'1'}:{}});if(!r.ok)throw Error(`${r.status}: ${route}`);
 const text=await r.text();const dest=path.join('public',route,rsc?'index.rsc':'index.html');await mkdir(path.dirname(dest),{recursive:true});await writeFile(dest,text);console.log(dest,text.length,r.headers.get('content-type'));
 for(const m of text.matchAll(/\/_next\/static\/[^"\\\s<>]+\.(?:js|css|woff2)/g))assets.add(m[0]);
 }
}
const done=new Set();
while(assets.size){const batch=[...assets].slice(0,4);batch.forEach(x=>assets.delete(x));await Promise.all(batch.map(async url=>{
 if(done.has(url))return;done.add(url);
 const r=await fetch(origin+url);if(!r.ok)throw Error(`${r.status}: ${url}`);const buf=Buffer.from(await r.arrayBuffer());const dest=path.join('public',url);await mkdir(path.dirname(dest),{recursive:true});await writeFile(dest,buf);
 if(/\.(js|css)$/.test(url)){
 const text=buf.toString();for(const m of text.matchAll(/(?:["'`(])((?:\/?_next\/static\/|static\/chunks\/|\.\.\/media\/)[^"'`\s)]+\.(?:js|css|woff2))/g)){
 const p=m[1].startsWith('static/')?'/_next/'+m[1]:m[1].startsWith('../')?path.posix.normalize(path.posix.dirname(url)+'/'+m[1]):m[1];if(!done.has(p))assets.add(p);
 }}console.log(url,buf.length);
}));}
await writeFile('docs/research/routes.json',JSON.stringify(routes,null,2));
