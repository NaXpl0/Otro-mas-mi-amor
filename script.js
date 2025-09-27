const card = document.getElementById('card');
const openBtn = document.getElementById('openBtn');
const surpriseBtn = document.getElementById('surpriseBtn');
const inside = document.getElementById('inside');
const message = document.getElementById('message');
const confetti = document.getElementById('confetti');
const petals = document.getElementById('petals');
const dinosaursContainer = document.getElementById('dinosaurs');
const heartPath = document.getElementById('heartPath');

function revealLines(){
  const lines = Array.from(message.querySelectorAll('p'));
  lines.forEach((p,i)=>{ 
    p.style.opacity=0; 
    p.style.transform='translateY(10px)'; 
    setTimeout(()=>{ 
      p.style.transition='all 420ms cubic-bezier(.16,.9,.28,1)'; 
      p.style.opacity=1; 
      p.style.transform='none'; 
    }, 220*i); 
  });
}

openBtn.addEventListener('click', ()=>{
  card.classList.remove('closed');
  card.classList.add('reveal');
  heartPulse();
  revealLines();
});

function heartPulse(){
  heartPath.animate([
    { transform: 'scale(0.96)' },
    { transform: 'scale(1)' },
    { transform: 'scale(0.96)' }
  ],{ duration:900, iterations:Infinity, easing:'cubic-bezier(.2,.8,.2,1)'});
}

function sparkleHeart(){
  heartPath.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.08)' },
    { transform: 'scale(1)' }
  ],{ duration:450, iterations:3, easing:'ease-out'});
}

function launchConfetti(){
  for(let i=0;i<28;i++){
    const el = document.createElement('div');
    el.className='dot';
    el.style.left = Math.random()*100+'%';
    el.style.top = '-10%';
    el.style.background = `hsl(${Math.random()*40+330}deg ${70+Math.random()*20}% ${60+Math.random()*10}%)`;
    confetti.appendChild(el);
    const dur = 1800 + Math.random()*900;
    el.animate([
      { transform: `translateY(0) rotate(${Math.random()*360}deg)`, opacity:1 },
      { transform: `translateY(${120+Math.random()*360}px) rotate(${Math.random()*720}deg)`, opacity:0 }
    ],{ duration:dur, easing:'cubic-bezier(.22,.9,.36,1)' });
    setTimeout(()=>el.remove(), dur+80);
  }
}

function dropPetals(){
  for(let i=0;i<10;i++){
    const p = document.createElement('div');
    p.className='petal';
    p.style.left = (Math.random()*80+10)+'%';
    p.style.top = '-6%';
    p.style.background = `linear-gradient(180deg, rgba(255,92,138,0.98), rgba(255,179,198,0.96))`;
    p.style.transform = `rotate(${Math.random()*360}deg)`;
    petals.appendChild(p);
    const dur = 2200 + Math.random()*1600;
    p.animate([
      { transform: `translateY(0) rotate(${Math.random()*90}deg)`, opacity:1 },
      { transform: `translateY(${380+Math.random()*420}px) rotate(${Math.random()*720}deg)`, opacity:0.08 }
    ],{ duration:dur, easing:'linear' });
    setTimeout(()=>p.remove(), dur+120);
  }
}

// Lluvia estilo Matrix romántica
const matrixBtn = document.getElementById('matrixBtn');
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
let matrixInterval;
let active = false;

function startMatrix(){
  canvas.style.display = 'block';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const letters = ['❤','TE AMO','❤','TE AMO'];
  const fontSize = 20;
  const columns = canvas.width / fontSize;
  const drops = [];

  for(let x=0;x<columns;x++) drops[x] = 1;

  function draw(){
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = `hsl(${Math.random()*30+330},80%,70%)`;
    ctx.font = fontSize + 'px Monospace';
    for(let i=0;i<drops.length;i++){
      const text = letters[Math.floor(Math.random()*letters.length)];
      ctx.fillText(text,i*fontSize,drops[i]*fontSize);
      if(drops[i]*fontSize>canvas.height && Math.random()>0.975) drops[i]=0;
      drops[i]++;
    }
  }
  matrixInterval = setInterval(draw,60);
}

function stopMatrix(){
  clearInterval(matrixInterval);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  canvas.style.display='none';
  // limpiar dinos al iniciar lluvia
  dinosaursContainer.innerHTML = '';
}

matrixBtn.addEventListener('click',()=>{
  if(!active){ startMatrix(); active=true; }
  else { stopMatrix(); active=false; }
});

window.addEventListener('resize',()=>{
  if(active){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

window.addEventListener('load', ()=>{
  setTimeout(()=>{ card.classList.remove('closed'); revealLines(); heartPulse(); setTimeout(()=>card.classList.add('closed'),1600); },600);
});

// Dinos locos
surpriseBtn.addEventListener('click', ()=>{
  const dino = document.createElement('div');
  dino.className = 'dino';
  dino.style.bottom = Math.random()*60 + 'px';
  dino.style.left = Math.random()*80 + 'vw';
  dino.style.animationDuration = (5 + Math.random()*5) + 's';
  // dirección aleatoria
  if(Math.random() > 0.5) dino.style.transform = 'scaleX(-1)';
  dino.textContent = '🦖';
  dinosaursContainer.appendChild(dino);
});
