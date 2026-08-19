const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// World settings
const WORLD = {
  width: canvas.width,
  height: canvas.height,
  gravity: 0.6
};

// Player settings (Mario-like size: ~16x32 pixels, scaled up a bit)
const player = {
  x: 100,
  y: WORLD.height - 80,
  width: 32,   // scaled version of 16px
  height: 64,  // scaled version of 32px
  vx: 0,
  vy: 0,
  speed: 4,
  jumpStrength: -12,
  onGround: false
};

const keys = {
  left: false,
  right: false,
  jump: false
};

function handleInput() {
  player.vx = 0;

  if (keys.left) {
    player.vx = -player.speed;
  }
  if (keys.right) {
    player.vx = player.speed;
  }
  if (keys.jump && player.onGround) {
    player.vy = player.jumpStrength;
    player.onGround = false;
  }
}

function applyPhysics() {
  player.vy += WORLD.gravity;
  player.x += player.vx;
  player.y += player.vy;

  // Simple ground collision
  const groundY = WORLD.height - 16; // ground line
  if (player.y + player.height >= groundY) {
    player.y = groundY - player.height;
    player.vy = 0;
    player.onGround = true;
  }
}

function draw() {
  // Clear screen
  ctx.fillStyle = '#4ec0ca'; // sky blue
  ctx.fillRect(0, 0, WORLD.width, WORLD.height);

  // Ground
  ctx.fillStyle = '#3b2f1b';
  ctx.fillRect(0, WORLD.height - 16, WORLD.width, 16);

  // Player (placeholder rectangle, Mario-sized)
  ctx.fillStyle = '#ffcc00';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
  handleInput();
  applyPhysics();
  draw();
  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') keys.left = true;
  if (e.code === 'ArrowRight') keys.right = true;
  if (e.code === 'Space' || e.code === 'ArrowUp') keys.jump = true;
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowLeft') keys.left = false;
  if (e.code === 'ArrowRight') keys.right = false;
  if (e.code === 'Space' || e.code === 'ArrowUp') keys.jump = false;
});

gameLoop();
