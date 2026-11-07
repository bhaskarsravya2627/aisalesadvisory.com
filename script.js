const menuButton=document.querySelector('.menu-toggle'),mobileMenu=document.querySelector('.mobile-menu');if(menuButton&&mobileMenu)menuButton.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuButton.setAttribute('aria-expanded',open);menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');mobileMenu.setAttribute('aria-hidden',!open)});
if(menuButton&&mobileMenu)document.addEventListener('keydown',event=>{if(event.key==='Escape'&&mobileMenu.classList.contains('open')){mobileMenu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');mobileMenu.setAttribute('aria-hidden','true');menuButton.focus()}});
if(menuButton&&mobileMenu)mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{mobileMenu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');mobileMenu.setAttribute('aria-hidden','true')}));
document.querySelectorAll('.nav-solutions').forEach(nav=>{
  const toggle=nav.querySelector('.nav-dropdown-toggle');if(!toggle)return;
  const open=()=>{nav.classList.remove('is-dismissed');nav.classList.add('is-open');toggle.setAttribute('aria-expanded','true')};
  const close=()=>{nav.classList.remove('is-open');nav.classList.add('is-dismissed');toggle.setAttribute('aria-expanded','false')};
  toggle.addEventListener('click',()=>{if(toggle.getAttribute('aria-expanded')==='true')close();else open()});
  nav.addEventListener('pointerenter',()=>{nav.classList.remove('is-dismissed');toggle.setAttribute('aria-expanded','true')});
  nav.addEventListener('pointerleave',()=>{if(!nav.contains(document.activeElement)){nav.classList.remove('is-open','is-dismissed');toggle.setAttribute('aria-expanded','false')}});
  nav.addEventListener('focusin',event=>{if(event.target!==toggle&&!nav.classList.contains('is-dismissed'))toggle.setAttribute('aria-expanded','true')});
  nav.addEventListener('focusout',event=>{if(!nav.contains(event.relatedTarget)&&!nav.matches(':hover')){nav.classList.remove('is-open','is-dismissed');toggle.setAttribute('aria-expanded','false')}});
  nav.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();toggle.focus();close()}});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!nav.contains(document.activeElement)&&nav.matches(':hover'))close()});
  document.addEventListener('click',event=>{if(!nav.contains(event.target))close()});
});
if(!document.querySelector('link[rel="icon"]')){const favicon=document.createElement('link');favicon.rel='icon';favicon.type='image/svg+xml';favicon.href='favicon.svg';document.head.appendChild(favicon)}
if ('IntersectionObserver' in window) { const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el)); }
const cases={dispatch:{sectors:['FIELD SERVICES','CONSTRUCTION','PROPERTY MAINTENANCE'],tag:'INCOMING CALLS · JOB ENQUIRIES',metric:'Help customers while they are ready to book',title:'Turn an urgent enquiry into the right next action.',body:'Understand the job, check urgency and take the details needed to book a visit or pass the request to the right person.',list:['Job details and urgency','Service-area and availability checks','Booking or help from your team']},quotes:{sectors:['HOME IMPROVEMENT','B2B SERVICES','AUTOMOTIVE'],tag:'FOLLOW-UP CALLS · OPEN QUOTES',metric:'Recover revenue already in the pipeline',title:'Give every open quote a timely, consistent follow-up.',body:'Contact prospects with the right context, identify questions or objections and reconnect sales-ready customers with the right person.',list:['Quote-specific context','Customer questions and interest','Updated records and follow-up tasks']},payments:{sectors:['CONSTRUCTION','MANUFACTURING','LOGISTICS','PROFESSIONAL SERVICES'],tag:'FOLLOW-UP CALLS · PAYMENTS',metric:'Resolve delays without losing the relationship',title:'Turn payment chasing into a managed workflow.',body:'Establish why an invoice is delayed, record the agreed next step and route disputes or sensitive conversations to your team.',list:['Invoice-aware conversations','Agreed payment steps and questions','Updated records and help from your team']},maintenance:{sectors:['PROPERTY MANAGERS','HOUSING PROVIDERS','FACILITIES TEAMS'],tag:'INCOMING CALLS · MAINTENANCE',metric:'Route the right response sooner',title:'Resolve the request before it becomes an escalation.',body:'Gather the details required to assess an issue, apply urgency and safety rules, and coordinate the appropriate next action.',list:['Urgency and safety screening','New requests and customer updates','The right contractor or person']}};
document.querySelectorAll('.use-tab').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.use-tab').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});button.classList.add('active');button.setAttribute('aria-pressed','true');const item=cases[button.dataset.case];document.querySelector('#caseSectors').innerHTML=item.sectors.map(x=>`<span>${x}</span>`).join('');document.querySelector('#caseTag').textContent=item.tag;document.querySelector('#caseMetric').textContent=item.metric;document.querySelector('#caseTitle').textContent=item.title;document.querySelector('#caseBody').textContent=item.body;document.querySelector('#caseList').innerHTML=item.list.map(x=>`<li>${x}</li>`).join('')}));

// A visitor can pause decorative movement independently of system settings.
const motionFooter=document.querySelector('.footer-bottom');
if(motionFooter){
  const control=document.createElement('button');control.type='button';control.className='motion-toggle';
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  let saved=false;try{saved=sessionStorage.getItem('motionPaused')==='true'}catch{}
  let paused=preference.matches||saved;
  const update=()=>{document.documentElement.classList.toggle('motion-paused',paused);control.textContent=paused?'Animations paused':'Pause animations';control.setAttribute('aria-pressed',String(paused))};
  control.addEventListener('click',()=>{paused=!paused;try{sessionStorage.setItem('motionPaused',String(paused))}catch{}update()});
  preference.addEventListener?.('change',event=>{paused=event.matches;update()});
  update();motionFooter.appendChild(control);
}
