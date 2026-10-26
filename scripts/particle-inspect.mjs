import {readFile,writeFile} from 'node:fs/promises';
const s=await readFile('public/_next/static/chunks/1stl4ykwpf_a2.js','utf8');
for(const term of ['getInt16','new DataView','uColor','gl_FragColor','setAttribute','positions','luma']){let at=s.indexOf(term);console.log(term,s.slice(Math.max(0,at-350),at+900));}
