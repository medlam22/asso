// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    if (hamburger) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
}));

// Highlight active menu item based on current URL
const currentLocation = location.href;
const menuItem = document.querySelectorAll('.nav-menu a');
const menuLength = menuItem.length;
for (let i = 0; i < menuLength; i++) {
    if (menuItem[i].href === currentLocation) {
        menuItem[i].className = "nav-link active";
    } else {
        menuItem[i].className = "nav-link";
    }
}

// HERO CANVAS - Network Motif
(function() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  let particles = [];
  
  function resize() {
    w = canvas.width = canvas.parentElement.offsetWidth;
    h = canvas.height = canvas.parentElement.offsetHeight;
    initParticles();
  }
  
  function initParticles() {
    particles = [];
    const numParticles = Math.floor((w * h) / 10000);
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1
      });
    }
  }
  
  resize();
  window.addEventListener('resize', resize);
  
  function draw() {
    ctx.clearRect(0, 0, w, h);
    
    // Update and draw particles
    particles.forEach((p, index) => {
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      
      ctx.fillStyle = index % 3 === 0 ? '#a62c2b' : '#157a6e';
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw lines between close particles
    ctx.lineWidth = 0.6;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 130) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(21, 139, 139, ${1 - dist/130})`;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(draw);
  }
  draw();
})();
