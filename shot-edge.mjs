// Close-up of the hero -> About boundary, at 2x so the hairline is obvious.
import { chromium } from "playwright";
const out = process.argv[2] ?? "edge.png";
const width = Number(process.argv[3] ?? 1440);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport:{width,height:900}, deviceScaleFactor:2 });
await page.goto("http://localhost:3000",{waitUntil:"networkidle"});
await page.addStyleTag({content:`[data-feedback-ui]{display:none !important}`});
const box = await page.evaluate(()=>{
  const edge=document.querySelector('.squeegee-edge');
  const r=edge.getBoundingClientRect();
  return {x:0,y:r.top+scrollY-14,width:document.documentElement.clientWidth,height:r.height+34};
});
await page.screenshot({path:out, clip:box, fullPage:true});
await browser.close();
console.log(out, JSON.stringify(box));
