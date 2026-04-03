// Initialize Icons
lucide.createIcons();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Canvas logic for the Hero Chart
const canvas = document.getElementById('heroChartCanvas');
const ctx = canvas.getContext('2d');

// Adjust canvas resolution for high DPI displays
function resizeCanvas() {
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * 2;
  canvas.height = rect.height * 2;
  ctx.scale(2, 2);
  drawChart();
}

window.addEventListener('resize', resizeCanvas);

// Chart data points
let dataPoints = [];
const numPoints = 50;

function initData() {
  let val = 64200;
  for (let i = 0; i < numPoints; i++) {
    val += (Math.random() - 0.45) * 100;
    dataPoints.push(val);
  }
}

function drawChart() {
  const rect = canvas.parentElement.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  ctx.clearRect(0, 0, width, height);

  const min = Math.min(...dataPoints) - 50;
  const max = Math.max(...dataPoints) + 50;
  const range = max - min;

  // Draw gradient fill
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)'); // Success green
  gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

  ctx.beginPath();
  ctx.moveTo(0, height);

  const stepX = width / (numPoints - 1);
  
  for (let i = 0; i < numPoints; i++) {
    const x = i * stepX;
    const y = height - ((dataPoints[i] - min) / range) * height;
    ctx.lineTo(x, y);
  }

  ctx.lineTo(width, height);
  ctx.fillStyle = gradient;
  ctx.fill();

  // Draw line
  ctx.beginPath();
  for (let i = 0; i < numPoints; i++) {
    const x = i * stepX;
    const y = height - ((dataPoints[i] - min) / range) * height;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.strokeStyle = '#10B981'; // Success green
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Draw glowing dot at the end
  const lastX = width;
  const lastY = height - ((dataPoints[numPoints-1] - min) / range) * height;
  
  ctx.beginPath();
  ctx.arc(lastX, lastY, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#10B981';
  ctx.stroke();
}

// Simulate real-time data updates
function animateChart() {
  const lastVal = dataPoints[dataPoints.length - 1];
  const newVal = lastVal + (Math.random() - 0.48) * 80;
  
  dataPoints.shift();
  dataPoints.push(newVal);
  drawChart();
}

// Initialize
setTimeout(() => {
  initData();
  resizeCanvas();
  setInterval(animateChart, 1500); // Update every 1.5s
}, 100);

// Wallet items interaction (dummy toggle)
document.querySelectorAll('.wallet-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.wallet-item .status-dot').forEach(dot => dot.classList.remove('active'));
    item.querySelector('.status-dot').classList.add('active');
  });
});
