"use strict";
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const instances = [];
  function setupDeviceLoop(figure) {
    const devices=[figure.querySelector('.lift-console'),figure.querySelector('.lift-app')];
    const base=new URL('/assets/pmp/',location.origin);
    // Follow the core workflow before returning to assignment preparation.
    const scenes=[
      [['hwpx-upload','HWPX 시험 등록'],['student-attempt','학생 시험 응시']],
      [['hwpx-review','등록한 시험 문항 확인'],['student-attempt','학생 시험 응시']],
      [['teacher-attempt','선생님 콘솔의 학생 응시 상세'],['student-result','학생 시험 결과']],
      [['teacher-attempt','선생님 콘솔의 학생 응시 상세'],['student-review','학생 오답노트']]
    ];
    let active=0,timer=0,visible=false,hovered=false,busy=false;
    const mayPlay=()=>visible&&!document.hidden&&!hovered&&!reduced.matches&&
      document.documentElement.dataset.motion!=='off'&&!figure.contains(document.activeElement)&&!document.querySelector('dialog[open]');
    const url=file=>new URL(file+'.webp',base).href;
    const cache=new Map();
    const pending=new Set();
    function settle(){for(const finish of [...pending])finish()}
    function preload(file){
      if(!cache.has(file)){
        const img=new Image();img.src=url(file);
        cache.set(file,img.decode().then(()=>img).catch(error=>{cache.delete(file);throw error}));
      }
      return cache.get(file);
    }
    function schedule(){clearTimeout(timer);timer=0;if(!mayPlay())settle();else if(!busy)timer=setTimeout(advance,4500)}
    async function advance(){
      timer=0;if(!mayPlay()||busy)return;busy=true;
      const next=(active+1)%scenes.length;
      try{
        await Promise.all(scenes[next].map(([file])=>preload(file)));
        if(!mayPlay())return;
        await Promise.all(devices.map(async(device,i)=>{
          const [file,label]=scenes[next][i],screen=device.querySelector('.device-screen'),original=screen.querySelector('img');
          if(original.src===url(file))return;
          const incoming=original.cloneNode();incoming.src=url(file);incoming.alt='';incoming.classList.add('device-next');incoming.setAttribute('aria-hidden','true');screen.append(incoming);
          const animation=incoming.animate([{opacity:0},{opacity:1}],{duration:400,easing:'cubic-bezier(.23,1,.32,1)',fill:'forwards'});
          // Commit synchronously when inspection starts, so the original-image
          // link always matches the settled screen, including mid-crossfade clicks.
          await new Promise(resolve=>{
            const finish=()=>{
              original.src=url(file);original.alt=label;device.href=url(file);device.dataset.imageTitle=label;device.setAttribute('aria-label',label+' 크게 보기');
              pending.delete(finish);animation.onfinish=null;animation.cancel();incoming.remove();resolve();
            };
            pending.add(finish);animation.onfinish=finish;
          });
        }));
        active=next;figure.dataset.screenIndex=String(active);
      }catch(error){console.warn('Screen preview retained:',error.message)}
      finally{busy=false;schedule()}
    }
    figure.dataset.screenIndex='0';
    figure.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;schedule()}});
    figure.addEventListener('pointerleave',()=>{hovered=false;schedule()});
    figure.addEventListener('pointerdown',settle);
    figure.addEventListener('focusin',schedule);
    figure.addEventListener('focusout',()=>queueMicrotask(schedule));
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting&&entries[0].intersectionRatio>=.15;schedule()},{threshold:.15}).observe(figure);
    instances.push({sync:schedule,resetPointer:()=>{}});
  }
  document.querySelectorAll('.motion-figure[data-variant="a"]').forEach(setupDeviceLoop);
  function syncAll(){instances.forEach(i=>{i.resetPointer();i.sync()})}
  reduced.addEventListener('change',syncAll);
  document.addEventListener('visibilitychange',syncAll);
  document.addEventListener('keydown',()=>instances.forEach(i=>i.resetPointer()));
  document.addEventListener('click',event=>{if(event.target.closest('[data-image-view]'))queueMicrotask(syncAll)},true);
  document.querySelectorAll('dialog').forEach(d=>d.addEventListener('close',syncAll));
  new MutationObserver(syncAll).observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});
})();
