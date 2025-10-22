// Password gate stays the same
const correctPassword = "Anil@143";

// ===== Helpers =====
const $ = (sel) => document.querySelector(sel);

// Enhanced Sound Effects System
class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.initAudio();
  }

  initAudio() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.log('Web Audio not supported');
    }
  }

  // Button click sound
  playClick() {
    this.playTone(800, 0.1, 'sine', 0.1);
  }

  // Success unlock sound
  playUnlock() {
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      this.playTone(freq, 0.3, 'sine', 0.15, i * 0.1);
    });
  }

  // Error sound
  playError() {
    this.playTone(200, 0.5, 'sawtooth', 0.2);
  }

  // Celebration chime
  playCelebration() {
    const notes = [523.25, 659.25, 783.99]; // C5 E5 G5
    notes.forEach((freq, i) => {
      this.playTone(freq, 0.4, 'sine', 0.2, i * 0.08);
    });
  }

  // Firecracker pop sound
  playFirecracker() {
    // Multiple quick pops
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.playTone(150 + Math.random() * 100, 0.2, 'sawtooth', 0.3);
      }, i * 50);
    }
  }

  // Sparkle sound
  playSparkle() {
    this.playTone(1000 + Math.random() * 500, 0.1, 'sine', 0.1);
  }

  // Generic tone player
  playTone(frequency, duration, type = 'sine', volume = 0.1, delay = 0) {
    if (!this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    
    gainNode.gain.setValueAtTime(0.0001, this.audioContext.currentTime + delay);
    gainNode.gain.exponentialRampToValueAtTime(volume, this.audioContext.currentTime + delay + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + delay + duration);
    
    oscillator.connect(gainNode).connect(this.audioContext.destination);
    oscillator.start(this.audioContext.currentTime + delay);
    oscillator.stop(this.audioContext.currentTime + delay + duration);
  }
}

const sounds = new SoundEffects();

function checkPassword() {
  const input = $('#passwordInput').value.trim();
  const error = $('#errorMessage');

  if (input === correctPassword) {
    sounds.playUnlock();
    $('.login-container').classList.add('hidden');
    const page = $('#birthdayPage');
    page.classList.remove('hidden');
    page.setAttribute('aria-hidden', 'false');
    // subtle unlock vibe
    document.body.classList.add('unlocked');
  } else {
    sounds.playError();
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

// Enhanced Confetti and Firecracker effects
function burstConfetti() {
  if (typeof confetti !== 'function') return;
  
  // Multiple firecracker bursts
  setTimeout(() => {
    confetti({ particleCount: 150, spread: 60, origin: { y: 0.6 }, colors: ['#ff6b6b', '#ffd93d', '#6bcdfd'] });
    sounds.playFirecracker();
  }, 0);
  
  setTimeout(() => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.8 }, colors: ['#a0e7e5', '#b28dff', '#96ceb4'] });
    sounds.playFirecracker();
  }, 200);
  
  setTimeout(() => {
    confetti({ particleCount: 100, spread: 100, origin: { y: 0.7 }, colors: ['#feca57', '#ff9ff3', '#54a0ff'] });
    sounds.playFirecracker();
  }, 400);

  // Enhanced sparkles for longer duration
  const end = Date.now() + 5000;
  (function frame() {
    confetti({ 
      particleCount: 8, 
      angle: 60, 
      spread: 55, 
      origin: { x: 0 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']
    });
    confetti({ 
      particleCount: 8, 
      angle: 120, 
      spread: 55, 
      origin: { x: 1 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']
    });
    confetti({ 
      particleCount: 6, 
      angle: 90, 
      spread: 45, 
      origin: { x: 0.5 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']
    });
    
    if (Date.now() < end) {
      sounds.playSparkle();
      requestAnimationFrame(frame);
    }
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

  // Enhanced effects with sounds
  burstConfetti();
  spawnBalloons();
  sounds.playCelebration();

  // Reveal text
  await typeText(msgEl, BEST_WISH, 18);

  // Actions visible
  shareRow.classList.remove('hidden');

  // Wire buttons with sound effects
  $('#copyBtn')?.addEventListener('click', () => {
    sounds.playClick();
    navigator.clipboard.writeText(BEST_WISH).then(() => {
      $('#copyBtn').textContent = 'Copied!';
      sounds.playCelebration();
      setTimeout(() => ($('#copyBtn').textContent = 'Copy Wish'), 1200);
    });
  }, { once: true });

  $('#shareBtn')?.addEventListener('click', () => {
    sounds.playClick();
    const text = BEST_WISH.replace(/\n/g, ' ');
    if (navigator.share) {
      navigator.share({ title: 'Happy Birthday, Anil!', text, url: location.href }).catch(() => {});
    } else {
      const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(wa, '_blank');
    }
  }, { once: true });

  $('#againBtn')?.addEventListener('click', () => {
    sounds.playClick();
    burstConfetti();
    spawnBalloons(10);
    sounds.playCelebration();
  }, { once: false });
}

// Add sound effects to all buttons
document.addEventListener('DOMContentLoaded', () => {
  // Add click sounds to all buttons
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      sounds.playClick();
    }
  });

  // Add hover sound to buttons
  document.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'BUTTON') {
      sounds.playSparkle();
    }
  });

  // Add sound to password input focus
  $('#passwordInput')?.addEventListener('focus', () => {
    sounds.playSparkle();
  });
});

// expose for onclick in HTML
window.checkPassword = checkPassword;
window.showMessage = showMessage;