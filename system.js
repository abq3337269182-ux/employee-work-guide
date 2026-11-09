'use strict';
const articles=[...document.querySelectorAll('article')],links=[...document.querySelectorAll('nav a')];
function current(id){for(const link of links){if(link.hash==='#'+id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}}
function locate(){current(location.hash.slice(1)||articles[0]?.id);}
const input=document.getElementById('search'),result=document.getElementById('result');
function search(){const words=input.value.trim().split(/\s+/).filter(Boolean);let count=0;for(const article of articles){article.hidden=!words.every(w=>article.textContent.includes(w));if(!article.hidden)count++;}result.textContent=words.length?'找到 '+count+' 个主题。':'';document.getElementById('empty').hidden=count>0;const first=articles.find(a=>!a.hidden);current(first?.id);}
if(input){document.getElementById('search-form').addEventListener('submit',e=>{e.preventDefault();search();});document.getElementById('clear').addEventListener('click',()=>{input.value='';search();input.focus();});}
links.forEach(link=>link.addEventListener('click',()=>{if(input){input.value='';search();}current(link.hash.slice(1));}));
addEventListener('hashchange',locate);locate();
const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting&&!e.target.hidden).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(visible)current(visible.target.id);},{rootMargin:'0px 0px -65% 0px',threshold:0});articles.forEach(article=>observer.observe(article));
