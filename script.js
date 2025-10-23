// ===== Helpers & Tiny $ =====
const $ = (sel) => document.querySelector(sel);

// ===== Enhanced Realistic Sound Effects System =====
class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.initAudio();
  }
  initAudio() {
    try { this.audioContext = new (window.AudioContext || window.webkitAudioContext)(); }
    catch { /* Web Audio not supported */ }
  }

  // Realistic button click with multiple frequencies
  playClick(){ 
    this.playTone(1200, 0.05, 'sine', 0.15);
    this.playTone(800, 0.08, 'sine', 0.1, 0.02);
  }

  // Magical unlock sequence with realistic progression
  playUnlock(){ 
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
    notes.forEach((freq, i) => {
      this.playTone(freq, 0.4, 'sine', 0.2, i * 0.12);
      // Add harmonic for richness
      this.playTone(freq * 1.5, 0.3, 'sine', 0.1, i * 0.12 + 0.05);
    });
  }

  // More realistic error sound
  playError(){ 
    this.playTone(150, 0.3, 'sawtooth', 0.25);
    this.playTone(100, 0.2, 'sawtooth', 0.15, 0.1);
  }

  // Rich celebration with chord progression
  playCelebration(){ 
    const chord = [523.25, 659.25, 783.99]; // C major chord
    chord.forEach((freq, i) => {
      this.playTone(freq, 0.6, 'sine', 0.18, i * 0.1);
      this.playTone(freq * 2, 0.4, 'sine', 0.12, i * 0.1 + 0.05); // Octave
    });
  }

  // Realistic firecracker with crackling
  playFirecracker(){ 
    for(let i = 0; i < 5; i++){
      setTimeout(() => {
        // Main pop
        this.playTone(80 + Math.random() * 40, 0.15, 'sawtooth', 0.4);
        // Crackling
        this.playTone(200 + Math.random() * 100, 0.08, 'square', 0.2, 0.02);
        this.playTone(300 + Math.random() * 150, 0.06, 'square', 0.15, 0.04);
      }, i * 80);
    }
  }

  // Magical sparkle with twinkling effect
  playSparkle(){ 
    const baseFreq = 1000 + Math.random() * 800;
    this.playTone(baseFreq, 0.15, 'sine', 0.12);
    this.playTone(baseFreq * 1.5, 0.1, 'sine', 0.08, 0.02);
    this.playTone(baseFreq * 2, 0.08, 'sine', 0.06, 0.04);
  }

  // Realistic balloon pop
  playBalloonPop(){
    this.playTone(60 + Math.random() * 20, 0.2, 'sawtooth', 0.3);
    this.playTone(120 + Math.random() * 40, 0.1, 'square', 0.2, 0.05);
  }

  // Soft whoosh for hover effects
  playWhoosh(){
    this.playTone(400 + Math.random() * 200, 0.1, 'sine', 0.08);
  }

  // Birthday party ambient sound
  playPartyAmbient(){
    const frequencies = [220, 330, 440, 550]; // A3, E4, A4, C#5
    frequencies.forEach((freq, i) => {
      this.playTone(freq, 2, 'sine', 0.05, i * 0.5);
    });
  }

  // Enhanced tone player with more realistic envelope
  playTone(frequency, duration, type = 'sine', volume = 0.1, delay = 0){
    if(!this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    
    // Add subtle filter for more realistic sound
    filter.type = 'lowpass';
    filter.frequency.value = frequency * 3;
    filter.Q.value = 1;
    
    // More realistic envelope
    gainNode.gain.setValueAtTime(0.0001, this.audioContext.currentTime + delay);
    gainNode.gain.exponentialRampToValueAtTime(volume, this.audioContext.currentTime + delay + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(volume * 0.7, this.audioContext.currentTime + delay + duration * 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + delay + duration);
    
    oscillator.connect(filter).connect(gainNode).connect(this.audioContext.destination);
    oscillator.start(this.audioContext.currentTime + delay);
    oscillator.stop(this.audioContext.currentTime + delay + duration);
  }
}
const sounds = new SoundEffects();

// ===== Celebration effects (unchanged) =====
function burstConfetti(){
  if(typeof confetti!=='function') return;
  setTimeout(()=>{ confetti({particleCount:150,spread:60,origin:{y:0.6},colors:['#ff6b6b','#ffd93d','#6bcdfd']}); sounds.playFirecracker(); },0);
  setTimeout(()=>{ confetti({particleCount:120,spread:80,origin:{y:0.8},colors:['#a0e7e5','#b28dff','#96ceb4']}); sounds.playFirecracker(); },200);
  setTimeout(()=>{ confetti({particleCount:100,spread:100,origin:{y:0.7},colors:['#feca57','#ff9ff3','#54a0ff']}); sounds.playFirecracker(); },400);
  const end=Date.now()+5000;(function frame(){
    confetti({particleCount:8,angle:60,spread:55,origin:{x:0},colors:['#ff6b6b','#4ecdc4','#45b7d1','#96ceb4','#feca57']});
    confetti({particleCount:8,angle:120,spread:55,origin:{x:1},colors:['#ff6b6b','#4ecdc4','#45b7d1','#96ceb4','#feca57']});
    confetti({particleCount:6,angle:90,spread:45,origin:{x:0.5},colors:['#ff6b6b','#4ecdc4','#45b7d1','#96ceb4','#feca57']});
    if(Date.now()<end){ sounds.playSparkle(); requestAnimationFrame(frame); }
  })();
}
function spawnBalloons(count=12){
  const layer=$('#balloonLayer'); layer.innerHTML='';
  const colors=['#ff6b6b','#ffd93d','#6bcdfd','#a0e7e5','#b28dff','#96ceb4'];
  for(let i=0;i<count;i++){
    const b=document.createElement('div'); b.className='balloon';
    const hue=colors[Math.floor(Math.random()*colors.length)];
    const left=Math.random()*100, drift=(Math.random()*80-40)+'px', dur=(10+Math.random()*8)+'s';
    b.style.left=left+'vw'; b.style.background=`radial-gradient(circle at 30% 30%, #ffffffaa, ${hue})`;
    b.style.animationDuration=dur; b.style.setProperty('--drift',drift); 
    
    // Add balloon pop sound when balloon reaches top
    setTimeout(() => {
      sounds.playBalloonPop();
    }, (parseFloat(dur) * 1000) - 500);
    
    layer.appendChild(b);
  }
  setTimeout(()=>layer.innerHTML='',12000);
}
async function typeText(el,text,speed=24){ el.textContent=""; el.classList.add('revealing'); el.style.display='block'; for(let i=0;i<text.length;i++){ el.textContent+=text[i]; await new Promise(r=>setTimeout(r,speed)); }}

// ===== New dynamic birthday logic =====
let CURRENT_WISH = '';
let CURRENT_NAME = 'Anil';
let CURRENT_DOB = null; // Date object

function isoToday(){
  const t=new Date(); const m=String(t.getMonth()+1).padStart(2,'0'); const d=String(t.getDate()).padStart(2,'0');
  return `${t.getFullYear()}-${m}-${d}`;
}
function computeAge(dob, today=new Date()){
  let age=today.getFullYear()-dob.getFullYear();
  const hasHad = (today.getMonth()>dob.getMonth()) || (today.getMonth()===dob.getMonth() && today.getDate()>=dob.getDate());
  if(!hasHad) age--;
  return age;
}
function isBirthdayToday(dob,today=new Date()){
  return dob.getDate()===today.getDate() && dob.getMonth()===today.getMonth();
}
function daysUntilNextBirthday(dob,today=new Date()){
  const base=new Date(today.getFullYear(),dob.getMonth(),dob.getDate());
  const next = (base >= stripTime(today)) ? base : new Date(today.getFullYear()+1, dob.getMonth(), dob.getDate());
  return Math.ceil((stripTime(next)-stripTime(today))/86400000);
}
function stripTime(d){ return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }

function replaceNameEverywhere(oldName, newName){
  // Replace text nodes only (no script/style)
  const walker=document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
  let node; while((node=walker.nextNode())){ if(node.nodeValue.includes(oldName)){ node.nodeValue=node.nodeValue.replaceAll(oldName,newName); } }
  // Update title & OG meta too
  document.title = document.title.replaceAll(oldName, newName);
  const metas=[...document.querySelectorAll('meta[property="og:title"],meta[name="description"],meta[property="og:description"]')];
  metas.forEach(m=>{ if(m.content && m.content.includes(oldName)) m.content=m.content.replaceAll(oldName,newName); });
}

function updateHeadlineAndWish(){
  if(!CURRENT_DOB) return;
  const headline = $('#headline');
  const ageLine  = $('#ageLine');
  const age = computeAge(CURRENT_DOB);
  const todayIsBday = isBirthdayToday(CURRENT_DOB);

  if(todayIsBday){
    headline.textContent = `Happy Birthday, ${CURRENT_NAME}! 🎉`;
    CURRENT_WISH = `🎉 Happy Birthday, ${CURRENT_NAME}! You are ${age} today.\nWishing you a year filled with health, joy, and success. 🎂🎈`;
    ageLine.textContent = `Age: ${age}`;
    } else {
    const days = daysUntilNextBirthday(CURRENT_DOB);
    headline.textContent = `Advance Happy Birthday, ${CURRENT_NAME}! 🎉`;
    CURRENT_WISH = `🎉 Advance Happy Birthday, ${CURRENT_NAME}!\nYou are ${age} now — only ${days} day${days===1?'':'s'} to go. Have an amazing year ahead! 🎂🎈`;
    ageLine.textContent = `Age: ${age}  •  Next birthday in ${days} day${days===1?'':'s'}`;
  }
}

function updateMetaForName(){
  document.title = `${isBirthdayToday(CURRENT_DOB) ? 'Happy Birthday' : 'Advance Happy Birthday'} | ${CURRENT_NAME}`;
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc  = document.querySelector('meta[property="og:description"]');
  const desc    = document.querySelector('meta[name="description"]');
  if(ogTitle) ogTitle.content = `Happy Birthday, ${CURRENT_NAME} 🎉`;
  if(ogDesc)  ogDesc.content  = `Open to reveal your surprise wish for ${CURRENT_NAME}.`;
  if(desc)    desc.content    = `A little birthday surprise for ${CURRENT_NAME} — open to reveal your wish!`;
}

// ===== Main handler for the new gate =====
function handleEntry(){
  const name = $('#nameInput')?.value.trim();
  const dob  = $('#dobInput')?.value; // yyyy-mm-dd
  const err  = $('#errorMessage');

  // Validate
  const todayISO = isoToday();
  if(!name || name.length<2){
    err.classList.remove('hidden'); err.textContent='Please enter your name (2+ characters).'; sounds.playError(); return;
  }
  if(!dob){ err.classList.remove('hidden'); err.textContent='Please select your date of birth.'; sounds.playError(); return; }
  if(dob > todayISO){ err.classList.remove('hidden'); err.textContent='Date of birth cannot be in the future.'; sounds.playError(); return; }

  // Proceed
  err.classList.add('hidden');
  sounds.playUnlock();
  CURRENT_NAME = name;
  CURRENT_DOB  = new Date(dob);

  // Replace "Anil" everywhere with the provided name before wiring actions
  replaceNameEverywhere('Anil', CURRENT_NAME);
  updateHeadlineAndWish();
  updateMetaForName();

  // Show page
  $('#detailsForm').classList.add('hidden');
  const page = $('#birthdayPage');
  page.classList.remove('hidden');
  page.setAttribute('aria-hidden','false');
  document.body.classList.add('unlocked');

  // Persist (nice touch)
  try{ localStorage.setItem('hb_name', CURRENT_NAME); localStorage.setItem('hb_dob', dob); }catch{}

  // Small entrance celebration
  burstConfetti(); spawnBalloons(10);
}

// ===== Surprise action (reuses existing buttons/effects) =====
async function showMessage(){
  const msgEl = $('#surpriseMessage');
  const shareRow = $('#shareRow');

  burstConfetti();
  spawnBalloons();
  sounds.playCelebration();

  await typeText(msgEl, CURRENT_WISH || `🎉 Happy Birthday, ${CURRENT_NAME}! Wishing you joy and success. 🎂🎈`, 18);
  shareRow.classList.remove('hidden');

  $('#copyBtn')?.addEventListener('click', () => {
    sounds.playClick();
    navigator.clipboard.writeText(CURRENT_WISH).then(() => {
      $('#copyBtn').textContent = 'Copied!';
      sounds.playCelebration();
      setTimeout(() => ($('#copyBtn').textContent = 'Copy Wish'), 1200);
    });
  }, { once: true });

  $('#shareBtn')?.addEventListener('click', () => {
    sounds.playClick();
    const text = (CURRENT_WISH || '').replace(/\n/g, ' ');
    if (navigator.share) {
      navigator.share({ title: `Happy Birthday, ${CURRENT_NAME}!`, text, url: location.href }).catch(() => {});
    } else {
      const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(wa, '_blank');
    }
  }, { once: true });

  $('#againBtn')?.addEventListener('click', () => {
    sounds.playClick(); burstConfetti(); spawnBalloons(10); sounds.playCelebration();
  });
}

// ===== Wire up =====
document.addEventListener('DOMContentLoaded', () => {
  // Enhanced button sound effects
  document.addEventListener('click', e => { 
    if(e.target.tagName==='BUTTON'){ 
      sounds.playClick(); 
    } 
  });
  
  // Realistic hover effects
  document.addEventListener('mouseover', e => { 
    if(e.target.tagName==='BUTTON'){ 
      sounds.playWhoosh(); 
    } 
  });

  // Input focus sounds
  document.addEventListener('focus', e => {
    if(e.target.tagName === 'INPUT') {
      sounds.playSparkle();
    }
  }, true);

  // Date max = today (prevents future DOB)
  const dob=$('#dobInput'); if(dob){ dob.max = isoToday(); }

  // Enter button
  $('#enterBtn')?.addEventListener('click', handleEntry);

  // Prefill from localStorage (optional convenience)
  try{
    const n=localStorage.getItem('hb_name'), d=localStorage.getItem('hb_dob');
    if(n) $('#nameInput').value=n;
    if(d) $('#dobInput').value=d;
  }catch{}

  // Add subtle party ambient sound on successful entry
  setTimeout(() => {
    if(document.body.classList.contains('unlocked')) {
      sounds.playPartyAmbient();
    }
  }, 2000);
});

// expose for inline HTML onclick
window.showMessage = showMessage;
window.handleEntry = handleEntry;