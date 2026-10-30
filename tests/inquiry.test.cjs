const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('site.js', 'utf8');
function setup(fetchResult) {
  const button = {disabled:false,innerHTML:'문의 보내기'};
  const error = {hidden:true};
  const progress = {hidden:true};
  const message = {value:''};
  const nodes = {'#contact-message':message,'#stage-status':{hidden:true},'#stage-title':{},'#stage-description':{},'#stage-preparation':{}};
  const choices = ['idea','build','existing','operate'].map(value=>({value,checked:false,addEventListener(t,fn){this.change=fn;}}));
  const continuation = {addEventListener(t,fn){this.click=fn;}};
  let submit, destination, calls=0, valid=true;
  const form = {action:'https://api.web3forms.com/submit',reportValidity:()=>valid,
    querySelector:s=>({'button[type="submit"]':button,'.form-error':error,'.form-progress':progress}[s]),
    addEventListener:(t,fn)=>submit=fn,setAttribute(){},removeAttribute(){}};
  const context = {document:{querySelector:s=>s==='.form'?form:s==='.stage-continue'?continuation:nodes[s],querySelectorAll:()=>choices},
    fetch:async()=>{calls++;return fetchResult();},FormData:class{},AbortController,
    setTimeout,clearTimeout,window:{location:{assign:path=>destination=path}}};
  vm.runInNewContext(source,context);
  return {button,error,progress,message,nodes,choices,continuation,submit:()=>submit({preventDefault(){}}),get destination(){return destination;},get calls(){return calls;},invalidate(){valid=false;}};
}
test('only a successful HTTP response with explicit success navigates',async()=>{
  const s=setup(()=>({ok:true,json:async()=>({success:true})}));await s.submit();assert.equal(s.destination,'/thanks.html');assert.equal(s.button.disabled,true);
});
for (const [name,result] of Object.entries({http:()=>({ok:false,json:async()=>({success:true})}),api:()=>({ok:true,json:async()=>({success:false})}),malformed:()=>({ok:true,json:async()=>{throw Error('invalid JSON')}}),network:()=>{throw Error('network')}})) {
  test(`${name} failure preserves message and permits retry`,async()=>{
    const s=setup(result);s.message.value='고객이 작성한 내용';await s.submit();assert.equal(s.message.value,'고객이 작성한 내용');assert.equal(s.error.hidden,false);assert.equal(s.button.disabled,false);assert.equal(s.progress.hidden,true);assert.equal(s.destination,undefined);
  });
}
test('duplicate submit while request is pending does not send twice',async()=>{
  let finish;const s=setup(()=>new Promise(r=>finish=r));const first=s.submit();await s.submit();assert.equal(s.calls,1);finish({ok:true,json:async()=>({success:true})});await first;
});
test('invalid form never sends',async()=>{const s=setup(()=>{});s.invalidate();await s.submit();assert.equal(s.calls,0)});
test('all project stages change guidance and prefill without overwriting a draft',()=>{
  const s=setup(()=>{});
  for(const radio of s.choices){radio.checked=true;radio.change();assert.ok(s.nodes['#stage-title'].textContent);s.message.value='';s.continuation.click();assert.ok(s.message.value.length>10);s.message.value='나의 기존 문의';s.continuation.click();assert.equal(s.message.value,'나의 기존 문의');}
});
