import { readFile } from 'fs/promises';

const distHtml = await readFile('dist/index.html', 'utf8');
console.log('dist/index.html includes id="my-work":', distHtml.includes('id="my-work"'));
console.log('dist/index.html includes Beeskilled:', distHtml.includes('Beeskilled'));
console.log('dist/index.html includes SkillNexis:', distHtml.includes('SkillNexis'));
