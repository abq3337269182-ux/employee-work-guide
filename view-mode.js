(()=>{
 const root=document.documentElement,key='company-guide-view';
 const valid=v=>v==='mobile'||v==='desktop';
 let mode=new URLSearchParams(location.search).get('view');
 if(!valid(mode)){try{mode=localStorage.getItem(key);}catch{}}
 if(!valid(mode))mode=matchMedia('(max-width:800px)').matches?'mobile':'desktop';
 root.dataset.view=mode;
 document.addEventListener('DOMContentLoaded',()=>{
  const buttons=[...document.querySelectorAll('[data-view]')].filter(e=>e.tagName==='BUTTON');
  function sync(){buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===mode)));document.querySelector('.view-status').textContent=mode==='mobile'?'当前：手机版':'当前：电脑版';}
  function remember(){try{localStorage.setItem(key,mode);}catch{}const u=new URL(location.href);u.searchParams.set('view',mode);history.replaceState(null,'',u);}
  buttons.forEach(b=>b.addEventListener('click',()=>{
   const candidates=[...document.querySelectorAll('main h1, main h2, main h3, main p, main dt, main dd')].filter(e=>!e.closest('[hidden]'));
   const edge=document.querySelector('.view-toolbar').getBoundingClientRect().bottom;
   const anchor=candidates.find(e=>e.getBoundingClientRect().bottom>edge),top=anchor?.getBoundingClientRect().top;
   mode=b.dataset.view;root.dataset.view=mode;remember();sync();
   requestAnimationFrame(()=>{if(anchor){const delta=anchor.getBoundingClientRect().top-top;const previous=root.style.scrollBehavior;root.style.scrollBehavior='auto';window.scrollBy(0,delta);root.style.scrollBehavior=previous;}});
  }));
  document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.getAttribute('href').startsWith('#'))return;const u=new URL(a.href);if(u.protocol===location.protocol&&u.pathname.endsWith('.html')){u.searchParams.set('view',mode);a.href=u.href;}});
  sync();
 });
})();
