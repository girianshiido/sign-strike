import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {existsSync} from 'node:fs';
import {mkdir,writeFile,mkdtemp,rm,readFile} from 'node:fs/promises';
import {join} from 'node:path';import {tmpdir} from 'node:os';
const url=process.env.QA_URL||'http://127.0.0.1:5199/';const profile=await mkdtemp(join(tmpdir(),'sign-strike-pwa-'));
const context=await chromium.launchPersistentContext(profile,{headless:true,executablePath:process.env.CHROME_PATH||(existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')?'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome':undefined),viewport:{width:320,height:568},hasTouch:true,deviceScaleFactor:1});
const page=await context.newPage(),errors=[],report={url,errors};page.on('pageerror',e=>errors.push(e.message));await mkdir('test-results',{recursive:true});
try{
 await page.goto(url);await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);const cache=await page.evaluate(async()=>{const names=await caches.keys(),data=await caches.open(names.find(k=>k.startsWith('sign-strike-')));return {names,assets:(await data.keys()).map(r=>new URL(r.url).pathname)};});assert.ok(cache.assets.length>=8);report.cache=cache;
 const manifest=await page.evaluate(async()=>{const url=document.querySelector('link[rel=manifest]').href;return (await fetch(url)).json();});assert.equal(manifest.name,'Sign Strike — La guerre des signes');assert.equal(manifest.icons.length,2);report.manifest=manifest;
 const cdp=await context.newCDPSession(page);const install=await cdp.send('Page.getInstallabilityErrors');assert.deepEqual(install.installabilityErrors,[]);report.installability=install;
 await page.locator('[data-action="campaign"]').click();await page.locator('[data-id="w1-1"]').click();
 const core=await page.evaluate(()=>{const r=document.querySelector('#nextphase').getBoundingClientRect();return {height:innerHeight,bottom:r.bottom,scrollWidth:document.documentElement.scrollWidth,width:innerWidth};});assert.ok(core.bottom<=core.height&&core.scrollWidth<=core.width);report.core=core;
 await page.locator('#cut-value').fill('-2');await page.locator('#cut-form button').click();await page.locator('#nextphase').click();
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:6});const timings=[];for(let i=0;i<24;i++){const t=performance.now();await page.locator('#axis [data-action=region][data-index="0"]').click();timings.push(performance.now()-t);}await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});report.throttled={rate:6,clicks:24,median:timings.sort((a,b)=>a-b)[12],max:Math.max(...timings)};
 // Fix signs after the click series and complete an offline mission.
 await page.locator('#axis [data-action=region][data-index="0"]').click();await page.locator('#axis [data-action=region][data-index="0"]').click();await page.locator('#axis [data-action=region][data-index="1"]').click();
 await context.setOffline(true);await page.reload();await page.locator('[data-action="resume"]').click();await page.locator('#nextphase').click();await page.locator('#axis [data-action=region][data-index="1"]').click();await page.locator('#nextphase').click();await page.getByRole('heading',{name:'SIGN STRIKE !',exact:true}).waitFor();assert.match(await page.locator('dialog').innerText(),/300 XP/);await page.screenshot({path:'test-results/offline-victory.png',fullPage:true});report.offlineVictory=true;
 await page.locator('[data-action="next"]').click();await page.locator('[data-action="pause"]').click();const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('sign-strike-save-v1')).active);await page.waitForTimeout(1100);const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('sign-strike-save-v1')).active);assert.equal(after.elapsed,before.elapsed);report.pause=true;
 await context.setOffline(false);assert.deepEqual(errors,[]);await writeFile('test-results/pwa-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await context.close();await rm(profile,{recursive:true,force:true});}
