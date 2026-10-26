import {mkdir,writeFile,readFile} from 'node:fs/promises';
import path from 'node:path';
const origin='https://ingrassiadaniel.it';
const html=await readFile('docs/research/original.html','utf8');
const videos=[...new Set([...html.matchAll(/https:\/\/cdn\.sanity\.io\/[^"\\\s<>]+\.mp4/g)].map(m=>m[0]))];
const jobs=['/portrait.bin','/italy.bin','/noise.jpg','/favicon.ico','/opengraph-image.png','/twitter-image.png','/cookie-policy'].map(url=>({url:origin+url,dest:url==='/cookie-policy'?'public/cookie-policy/index.html':'public'+url}));
videos.forEach((url,i)=>jobs.push({url,dest:`public/videos/project-${i+1}.mp4`}));
for(let i=0;i<jobs.length;i+=4)await Promise.all(jobs.slice(i,i+4).map(async({url,dest})=>{
 const r=await fetch(url); if(!r.ok)throw Error(`${r.status}: ${url}`);
 await mkdir(path.dirname(dest),{recursive:true});const b=Buffer.from(await r.arrayBuffer());await writeFile(dest,b);console.log(dest,b.length);
}));
await writeFile('docs/research/asset-map.json',JSON.stringify(jobs,null,2));
