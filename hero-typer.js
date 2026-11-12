// Hero typing headline. Types, holds, deletes and retypes the phrases held in the hidden
// "ghost" lines of [data-typer], runs the list once, then settles on the last phrase.
// Decorative only: the h1 has a visually hidden sentence for screen readers and search,
// and the animated line is aria-hidden. The untyped rest of each phrase is drawn in
// transparent text, so line breaks are fixed and nothing jumps while typing. The ghosts
// stack in one grid cell, so the h1 always reserves the height of the longest phrase.
(function(){
  var wrap=document.querySelector('[data-typer]');if(!wrap)return;
  var typed=wrap.querySelector('.typed'),rest=wrap.querySelector('.typed-rest');if(!typed||!rest)return;
  var PREFIX='Let AI ';
  var phrases=Array.prototype.map.call(wrap.querySelectorAll('.typed-ghost'),function(el){var t=el.textContent;return t.indexOf(PREFIX)===0?t.slice(PREFIX.length):t});
  if(phrases.length<2)return;
  var root=document.documentElement,reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduce.matches){var l=phrases[phrases.length-1];typed.textContent=l;rest.textContent='';return}
  var TYPE=50,JITTER=15,COMMA=120,HOLD=2200,FIRST_HOLD=3500,GAP=350,DELETE_MAX=700;
  var last=phrases.length-1,i=0,pos=phrases[0].length,deleting=true,timer=null,visible=true,done=false,started=false;
  function paused(){var saved=false;try{saved=sessionStorage.getItem('motionPaused')==='true'}catch(e){}return root.classList.contains('motion-paused')||saved}
  function blocked(){return paused()||document.hidden||!visible}
  function show(text,upTo){typed.textContent=text.slice(0,upTo);rest.textContent=text.slice(upTo)}
  function finish(){clearTimeout(timer);timer=null;done=true;i=last;show(phrases[last],phrases[last].length);wrap.classList.remove('is-holding');wrap.classList.add('is-done')}
  function tick(){
    timer=null;
    if(paused()){finish();return}
    if(blocked())return;
    var text=phrases[i];
    if(deleting){
      wrap.classList.remove('is-holding');
      pos--;show(text,pos);
      if(pos<=0){deleting=false;i++;timer=setTimeout(tick,GAP);return}
      timer=setTimeout(tick,Math.min(25,DELETE_MAX/text.length));
    }else{
      pos++;show(text,pos);
      if(pos>=text.length){
        if(i===last){finish();return}
        deleting=true;wrap.classList.add('is-holding');timer=setTimeout(tick,HOLD);return
      }
      timer=setTimeout(tick,TYPE+(Math.random()*2-1)*JITTER+(text.charAt(pos-1)===','?COMMA:0));
    }
  }
  function update(){
    if(done||!started)return;
    if(paused()){finish();return}
    if(blocked()){clearTimeout(timer);timer=null;return}
    // Back on screen or in a visible tab: complete the current phrase, hold, then carry on.
    if(!timer){
      if(!deleting){pos=phrases[i].length;show(phrases[i],pos);if(i===last){finish();return}deleting=true}
      wrap.classList.add('is-holding');timer=setTimeout(tick,HOLD);
    }
  }
  if('IntersectionObserver' in window){new IntersectionObserver(function(e){visible=e[0].isIntersecting;update()},{threshold:0}).observe(wrap)}
  document.addEventListener('visibilitychange',update);
  if(reduce.addEventListener)reduce.addEventListener('change',function(e){if(e.matches)finish()});
  new MutationObserver(update).observe(root,{attributes:true,attributeFilter:['class']});
  if(paused()){finish();return}
  wrap.classList.add('is-holding');
  var begin=function(){started=true;if(!done&&!timer&&!blocked())timer=setTimeout(tick,FIRST_HOLD)};
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(begin);else begin();
})();
