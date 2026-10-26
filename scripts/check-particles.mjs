import {readFile,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
for(const name of ['portrait','india']){
 const b=await readFile(`public/${name}.bin`);assert.equal(b.toString('ascii',0,4),'PPT1');assert.equal(b.readUInt32LE(4),44000);assert.equal(b.length,352012);
 const scale=b.readFloatLE(8);assert.ok(scale>0&&Number.isFinite(scale));
 let dots='';for(let i=12;i<b.length;i+=8){const x=b.readInt16LE(i)*scale,y=b.readInt16LE(i+2)*scale,l=b[i+6]/255;assert.ok(Math.abs(x)<2&&Math.abs(y)<2);if(i%16===12)dots+=`<circle cx="${(300+x*260).toFixed(2)}" cy="${(310-y*260).toFixed(2)}" r=".65" fill="hsl(${190+y*80+x*50} 70% 82%)" opacity="${(.2+.7*l).toFixed(2)}"/>`;}
 await writeFile(`docs/research/${name}-particle-preview.svg`,`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" fill="#222124"/>${dots}</svg>`);
}
assert.deepEqual(await readFile('public/assets/RESUME.pdf'),await readFile('dist/assets/RESUME.pdf'));
assert.deepEqual(await readFile('public/assets/MY.png'),await readFile('dist/assets/MY.png'));
console.log('PASS: particle format, 44k points per shape, finite coordinates, original photo and resume preserved.');
