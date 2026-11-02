const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
const source=fs.readFileSync('assets/language.js','utf8');
async function run({choice=null,overseas=true,path='/',hash='#work',fail=false}={}) {
 let target=null,selected=choice,handler;const links=[{hreflang:'ko',addEventListener:(_,fn)=>handler=fn}];
 const ctx={document:{querySelectorAll:()=>links},localStorage:{getItem:()=>selected,setItem:(_,v)=>selected=v},location:{pathname:path,search:'?ref=test',hash,replace:x=>target=x},fetch:()=>fail?Promise.reject(new Error()):Promise.resolve({ok:true,json:()=>Promise.resolve({overseas})})};
 vm.runInNewContext(source,ctx); await new Promise(resolve=>setImmediate(resolve));return {target,handler,getChoice:()=>selected};
}
test('overseas visitors reach the corresponding English page, preserving query and fragment',async()=>{assert.equal((await run({path:'/work/pmp.html'})).target,'/en/work/pmp.html?ref=test#work')});
test('Korean visitors, explicit choices and failed lookups never redirect',async()=>{for(const opts of [{overseas:false},{choice:'ko'},{fail:true},{path:'/en/'}])assert.equal((await run(opts)).target,null)});
test('a saved English preference is honored',async()=>{assert.equal((await run({choice:'en'})).target,'/en/?ref=test#work')});
test('language selection is remembered',async()=>{const result=await run({overseas:false});result.handler();assert.equal(result.getChoice(),'ko')});
