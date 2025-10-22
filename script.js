// Password gate stays the same
const correctPassword = "Anil@143";

// ===== Helpers =====
const $ = (sel) => document.querySelector(sel);

function checkPassword() {
  const input = $('#passwordInput').value.trim();
  const error = $('#errorMessage');

  if (input === correctPassword) {
    $('.login-container').classList.add('hidden');
    const page = $('#birthdayPage');
    page.classList.remove('hidden');
    page.setAttribute('aria-hidden', 'false');
    // subtle unlock vibe
    document.body.classList.add('unlocked');
  } else {
    error.textContent = "Incorrect password. Please try again.";
  }
}

// The improved, normal best-wishes (now) message
const BEST_WISH = `🎉 Happy Birthday, Anil! 
Sending you my warmest wishes today — may the year ahead overflow with health, joy, and success. 
Have a fantastic day doing the things you love. 🎂🎈`;

// Typewriter reveal
async function typeText(el, text, speed = 24) {
  el.textContent = "";
  el.classList.add('revealing');
  el.style.display = 'block';

  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];
    await new Promise(r => setTimeout(r, speed));
  }
}

// Confetti effects
function burstConfetti() {
  if (typeof confetti !== 'function') return;
  // big burst
  confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } });
  confetti({ particleCount: 90, spread: 110, startVelocity: 50, scalar: 1.1 });
  // gentle sparkles for a few seconds
  const end = Date.now() + 3000;
  (function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// Minimal chime via Web Audio (no mp3 needed)
function playChime() {
  try {
    const actx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99]; // C5 E5 G5
    notes.forEach((freq, i) => {
      const o = actx.createOscillator();
      const g = actx.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, actx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.2, actx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + 0.35);
      o.connect(g).connect(actx.destination);
      o.start(actx.currentTime + i * 0.08);
      o.stop(actx.currentTime + i * 0.08 + 0.4);
    });
  } catch (_) {}
}

// Balloons
function spawnBalloons(count = 12) {
  const layer = $('#balloonLayer');
  layer.innerHTML = '';
  const colors = ['#ff6b6b','#ffd93d','#6bcdfd','#a0e7e5','#b28dff','#96ceb4'];

  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'balloon';
    const hue = colors[Math.floor(Math.random()*colors.length)];
    const left = Math.random() * 100;
    const drift = (Math.random() * 80 - 40) + 'px';
    const dur = (10 + Math.random() * 8) + 's';

    b.style.left = left + 'vw';
    b.style.background = `radial-gradient(circle at 30% 30%, #ffffffaa, ${hue})`;
    b.style.animationDuration = dur;
    b.style.setProperty('--drift', drift);
    layer.appendChild(b);
  }
  // clean after 12s to keep DOM light
  setTimeout(() => layer.innerHTML = '', 12000);
}

// Main action
async function showMessage() {
  const msgEl = $('#surpriseMessage');
  const shareRow = $('#shareRow');

  // Effects
  burstConfetti();
  spawnBalloons();
  playChime();

  // Reveal text
  await typeText(msgEl, BEST_WISH, 18);

  // Actions visible
  shareRow.classList.remove('hidden');

  // Wire buttons once
  $('#copyBtn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(BEST_WISH).then(() => {
      $('#copyBtn').textContent = 'Copied!';
      setTimeout(() => ($('#copyBtn').textContent = 'Copy Wish'), 1200);
    });
  }, { once: true });

  $('#shareBtn')?.addEventListener('click', () => {
    const text = BEST_WISH.replace(/\n/g, ' ');
    if (navigator.share) {
      navigator.share({ title: 'Happy Birthday, Anil!', text, url: location.href }).catch(() => {});
    } else {
      const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(wa, '_blank');
    }
  }, { once: true });

  $('#againBtn')?.addEventListener('click', () => {
    burstConfetti();
    spawnBalloons(10);
  }, { once: false });
}

// expose for onclick in HTML
window.checkPassword = checkPassword;
window.showMessage = showMessage;