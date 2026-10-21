import {readdir,readFile} from 'node:fs/promises';import {createHash} from 'node:crypto';import assert from 'node:assert/strict';
const base=process.env.PUBLIC_URL||'https://girianshiido.github.io/sign-strike/';
async function files(d){const a=[];for(const f of await readdir(d,{withFileTypes:true})){const p=`${d}/${f.name}`;if(f.isDirectory())a.push(...await files(p));else if(f.name!=='.nojekyll')a.push(p);}return a;}
const hash=b=>createHash('sha256').update(b).digest('hex');for(const p of await files('docs')){const rel=p.slice(5),r=await fetch(new URL(rel,base),{cache:'no-store'});assert.equal(r.status,200,rel);assert.equal(hash(Buffer.from(await r.arrayBuffer())),hash(await readFile(p)),`${rel}: public file differs`);console.log(`OK ${rel}`);}
console.log('Tous les fichiers publics correspondent à la version locale.');
