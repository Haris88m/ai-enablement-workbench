'use strict';
document.documentElement.classList.add('enhanced');
const panels=[...document.querySelectorAll('.section-panel')];
function section(id){
  const all=id==='all';
  panels.forEach(p=>p.classList.toggle('js-hidden',!all&&p.id!==id));
  document.querySelectorAll('[data-section]').forEach(a=>{if(a.dataset.section===id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  document.getElementById('view-all').setAttribute('aria-pressed',String(all));
}
document.querySelectorAll('[data-section]').forEach(a=>a.addEventListener('click',()=>section(a.dataset.section)));
function viewAll(){section('all');document.querySelectorAll('details').forEach(d=>d.open=true);document.querySelectorAll('[data-sim-step]').forEach(s=>s.hidden=false);}
document.getElementById('view-all').addEventListener('click',()=>{viewAll();history.replaceState(null,'','#all');});
function initial(){const id=location.hash.slice(1);if(id==='all')viewAll();else section(id==='day1'||id.startsWith('epoch')?'day1':'built');}
window.addEventListener('hashchange',()=>{if(['#built','#day1','#all','#epoch','#epoch/listen'].includes(location.hash))initial();});
initial();
const names=['runs','saved','adopt','build','maint'];
const fields=Object.fromEntries(names.map(n=>[n,document.getElementById('ev-'+n)]));
function calc(){
 const v=Object.fromEntries(names.map(n=>[n,Number(fields[n].value)]));
 const net=v.runs*12*v.saved*v.adopt-v.build-12*v.maint;
 document.getElementById('val-runs').textContent=v.runs+' runs';
 document.getElementById('val-saved').textContent=v.saved.toFixed(2)+' hours';
 document.getElementById('val-adopt').textContent=Math.round(v.adopt*100)+'%';
 document.getElementById('val-build').textContent=v.build+' hours';
 document.getElementById('val-maint').textContent=v.maint.toFixed(1)+' hours';
 document.getElementById('ev-net').textContent=(net>=0?'+':'')+net.toFixed(1)+' hours';
 const verdict=net<0?'The estimate is negative. Reduce effort or use a simpler process before considering a build.':net<25?'A small positive time estimate. Explore a template or coaching and check whether other costs erase the benefit.':net<120?'A positive time estimate. Compare a lightweight implementation with a reusable template.':'A useful candidate for a bounded pilot. Check these assumptions with the task owner.';
 document.getElementById('ev-verdict').textContent=verdict;
 document.querySelector('.formula').textContent=`${v.runs} × 12 × ${v.saved} × ${v.adopt} − ${v.build} − 12 × ${v.maint} = ${net.toFixed(1)} hours`;
}
document.getElementById('ev-form').addEventListener('input',calc);
document.getElementById('ev-form').addEventListener('reset',()=>setTimeout(calc,0));
document.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>{const values=b.dataset.preset==='useful'?[50,.75,.85,16,1.5]:[12,.5,.4,30,3];names.forEach((n,i)=>fields[n].value=values[i]);calc();}));
calc();
let sim=0;
const steps=[...document.querySelectorAll('[data-sim-step]')];
function renderSim(){steps.forEach((s,i)=>s.hidden=i!==sim);document.getElementById('sim-prev').disabled=sim===0;document.getElementById('sim-next').disabled=sim===steps.length-1;document.getElementById('sim-position').textContent=`${sim+1} of ${steps.length}`;}
document.getElementById('sim-prev').addEventListener('click',()=>{sim=Math.max(0,sim-1);renderSim();});
document.getElementById('sim-next').addEventListener('click',()=>{sim=Math.min(steps.length-1,sim+1);renderSim();});
document.getElementById('sim-reset').addEventListener('click',()=>{sim=0;renderSim();});
renderSim();
if(location.hash==='#all')viewAll();
let beforePrint=[];
window.addEventListener('beforeprint',()=>{beforePrint=[...document.querySelectorAll('details')].map(d=>[d,d.open]);beforePrint.forEach(([d])=>d.open=true);});
window.addEventListener('afterprint',()=>beforePrint.forEach(([d,open])=>d.open=open));
