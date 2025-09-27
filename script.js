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
  setTimeout(stopMatrix,8000); // parar automáticamente después de 8 segundos
}

function stopMatrix(){
  clearInterval(matrixInterval);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  canvas.style.display='none';
  // limpiar dinos al iniciar lluvia
  const dinosaursContainer = document.getElementById('dinosaurs');
  dinosaursContainer.innerHTML = '';
}

matrixBtn.addEventListener('click',()=>{
  if(!active){ startMatrix(); active=true; }
  else { stopMatrix(); active=false; }
});
