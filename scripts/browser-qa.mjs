import assert from 'node:assert/strict';
import {mkdir,writeFile,mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {existsSync} from 'node:fs';
import {join} from 'node:path';
import {createServer} from 'vite';
import {chromium} from 'playwright';
const url=process.env.QA_URL||'http://127.0.0.1:5198/';
const dataServer=await createServer({server:{middlewareMode:true,hmr:false},appType:'custom'});
const {campaign,generated}=await dataServer.ssrLoadModule('/src/levels/catalog.ts');
const {fmt}=await dataServer.ssrLoadModule('/src/math/exact.ts');
const {solution}=await dataServer.ssrLoadModule('/src/math/engine.ts');
await dataServer.close();
const profile=await mkdtemp(join(tmpdir(),'sign-strike-qa-'));
const context=await chromium.launchPersistentContext(profile,{headless:true,executablePath:process.env.CHROME_PATH||(existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')?'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome':undefined),viewport:{width:390,height:844},hasTouch:true,deviceScaleFactor:1,reducedMotion:'reduce'});
const page=await context.newPage();const errors=[],results=[];page.on('pageerror',e=>errors.push(e.message));
await mkdir('test-results',{recursive:true});
async function geometry(label,core=false){const info=await page.evaluate(()=>({width:innerWidth,height:innerHeight,scroll:document.documentElement.scrollWidth,buttons:[...document.querySelectorAll('.toolbar button')].map(b=>{const r=b.getBoundingClientRect();return {bottom:r.bottom,left:r.left,right:r.right,text:b.textContent};})}));assert.ok(info.scroll<=info.width+1,`${label}: horizontal overflow ${JSON.stringify(info)}`);if(core)for(const b of info.buttons)assert.ok(b.bottom<=info.height+1&&b.left>=0&&b.right<=info.width+1,`${label}: core action outside viewport ${JSON.stringify(b)}`);results.push({label,...info});}
async function click(action){const dialog=page.locator(`dialog[open] [data-action="${action}"]`);if(await dialog.count())await dialog.first().click();else await page.locator(`[data-action="${action}"]:visible`).first().click();}
async function solve(l,{screenshot=false}={}){const a=l.analysis;
 for(const c of a.critical){await page.locator('#cut-value').fill(fmt(c.v));await page.locator('#cut-kind').selectOption(c.forbidden?'pole':'zero');await page.locator('#cut-form button').click();}
 if(l.world===3&&a.delta)await page.locator('#scanner').fill(fmt(a.delta));
 await click('nextphase');
 for(let i=0;i<a.signs.length;i++){const b=page.locator(`#axis [data-action="region"][data-index="${i}"]`);await b.click();if(a.signs[i]<0)await b.click();}
 await click('nextphase');
 for(let i=0;i<a.intervals.length;i++)if(a.intervals[i])await page.locator(`#axis [data-action="region"][data-index="${i}"]`).click();
 for(let i=0;i<a.points.length;i++)if(a.points[i])await page.locator(`#axis [data-action="cut"][data-index="${i}"]`).click();
 assert.equal(await page.locator('#set-preview').textContent(),solution(a),`${l.id}: player set`);
 if(screenshot)await page.screenshot({path:`test-results/${l.id}.png`,fullPage:true});
 await click('nextphase');await page.getByRole('heading',{name:l.boss?'Boss neutralisé !':'SIGN STRIKE !',exact:true}).waitFor();
 assert.equal(await page.locator('dialog .stars').getAttribute('aria-label'),'3 étoiles',`${l.id}: accuracy`);
}
try{
 await page.goto(url);await geometry('home 390');await page.screenshot({path:'test-results/home-mobile.png',fullPage:true});
 await page.setViewportSize({width:1280,height:850});await geometry('home desktop');await page.screenshot({path:'test-results/home-desktop.png',fullPage:true});
 await page.setViewportSize({width:320,height:568});await click('campaign');await geometry('world map 320');await page.locator('[data-id="w1-1"]').click();await geometry('cutting 320x568',true);await page.screenshot({path:'test-results/play-320.png',fullPage:true});
 // A wrong root must be diagnosed before downstream signs. Undo and redo preserve edits.
 await page.locator('#axis [data-action="tick"][data-value="2"]').click();await click('undo');assert.equal(await page.locator('#axis .cut').count(),0);await click('redo');assert.equal(await page.locator('#axis .cut').count(),1);
 await click('nextphase');await click('nextphase');await click('nextphase');await page.getByText('La coupure 2 n’est ni un zéro ni une valeur interdite.',{exact:false}).waitFor();await click('correct');
 await page.locator('#axis .cut').click();await page.locator('#cut-value').fill('-2');await page.locator('#cut-form button').click();
 await page.reload();await click('resume');assert.equal(await page.locator('#axis .cut').count(),1);assert.match(await page.locator('#axis .cut').getAttribute('aria-label'),/-2/);
 await click('pause');await click('replay');assert.equal(await page.locator('#axis .cut').count(),0);
 // Complete every campaign mission through the real controls, with progressive unlocking.
 for(let i=0;i<campaign.length;i++){
   const l=campaign[i];if(i%20===0)console.log(`UI campaign world ${l.world+1}`);
   if(i===20)await page.setViewportSize({width:390,height:844});
   if(i===40)await page.setViewportSize({width:768,height:1024});
   if(i===60)await page.setViewportSize({width:1024,height:768});
   if(i===80)await page.setViewportSize({width:1280,height:850});
   if(i===100)await page.setViewportSize({width:320,height:568});
   await solve(l,{screenshot:[0,19,41,61,80,119].includes(i)});
   if(i<119)await click('next');
 }
 await click('next');await geometry('achievements completed');assert.ok((await page.locator('.badge.earned').count())>=7);
 await click('home');await page.reload();assert.match(await page.locator('.home-bottom h3').innerText(),/120 \/ 120/);
 const progress=await page.evaluate(()=>JSON.parse(localStorage.getItem('sign-strike-save-v1')));assert.equal(Object.keys(progress.stars).length,120);assert.equal(progress.unlocked,119);assert.equal(progress.stars['w6-20'],3);assert.equal(progress.xp,36000);
 // Training is available independently of campaign locks and gives fresh seeded content.
 await click('training');await page.locator('[data-action="train"][data-world="4"]').click();const training=await page.evaluate(()=>JSON.parse(localStorage.getItem('sign-strike-save-v1')).active);await solve(generated(4,training.seed));await click('next');await click('pause');await click('exit');
 // Arcade pause does not consume time; hints pause the timer too.
 await click('arcade');await click('beginarcade');await click('pause');const paused=await page.locator('dialog').innerText();await page.waitForTimeout(1200);assert.equal(await page.locator('dialog').innerText(),paused);await click('close');await click('hint');await page.waitForTimeout(1200);assert.equal(await page.locator('dialog h2').innerText(),'Indice 1 / 3');await click('close');await click('pause');await click('exit');
 await click('daily');const daily=await page.evaluate(()=>JSON.parse(localStorage.getItem('sign-strike-save-v1')).active);await click('pause');await click('exit');await click('daily');const daily2=await page.evaluate(()=>JSON.parse(localStorage.getItem('sign-strike-save-v1')).active);assert.equal(daily.seed,daily2.seed);await click('pause');await click('exit');
 // Small widths, orientation changes, all secondary screens and settings.
 for(const [width,height]of [[320,568],[390,844],[768,1024],[1024,768],[1280,850]]){await page.setViewportSize({width,height});for(const name of ['settings','achievements','training','campaign']){await click(name);await geometry(`${name} ${width}`);await click('home');}}
 await click('settings');await page.locator('[data-setting="contrast"]').check();await page.locator('[data-setting="motion"]').uncheck();await page.reload();await click('settings');assert.equal(await page.locator('[data-setting="contrast"]').isChecked(),true);assert.equal(await page.locator('[data-setting="motion"]').isChecked(),false);await click('home');
 assert.deepEqual(errors,[],'browser exceptions');
 await writeFile('test-results/browser-report.json',JSON.stringify({campaign:120,viewports:5,progress:progress.xp,errors,checks:results},null,2));console.log('PASS: 120 campaign missions, resume, correction, undo/redo, training, arcade, daily, settings and viewports.');
}finally{await context.close();await rm(profile,{recursive:true,force:true});}
