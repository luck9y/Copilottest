class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.width = 16;
    this.height = 32;

    this.speed = 60;

    this.walkTime = 0;
    this.walkSpeed = 6; // animation speed
    this.step = 0;      // 0 or 1
    this.moving = false;
  }

  update(dt, input) {
    this.moving = false;

    if (input.right) {
      this.x += this.speed * dt;
      this.moving = true;
    }
    if (input.left) {
      this.x -= this.speed * dt;
      this.moving = true;
    }

    if (this.moving) {
      this.walkTime += dt * this.walkSpeed;
      this.step = Math.floor(this.walkTime) % 2; // 0 or 1
    } else {
      this.step = 0;
      this.walkTime = 0;
    }
  }

  draw(ctx) {
    // BODY COLORS
    const skin = "#f2c29d";
    const shirt = "#000000";
    const jeans = "#2d4f9e";
    const shoes = "#333333";
    const hat = "#000000";

    // HEAD
    ctx.fillStyle = skin;
    ctx.fillRect(this.x, this.y, 16, 8);

    // HAT
    ctx.fillStyle = hat;
    ctx.fillRect(this.x, this.y, 16, 4);

    // SHIRT
    ctx.fillStyle = shirt;
    ctx.fillRect(this.x, this.y + 8, 16, 10);

    // ARMS (animated)
    ctx.fillStyle = skin;
    if (this.step === 0) {
      // step 1
      ctx.fillRect(this.x - 3, this.y + 10, 3, 8); // left arm back
      ctx.fillRect(this.x + 16, this.y + 10, 3, 8); // right arm forward
    } else {
      // step 2
      ctx.fillRect(this.x - 3, this.y + 10, 3, 8); // left arm forward
      ctx.fillRect(this.x + 16, this.y + 10, 3, 8); // right arm back
    }

    // LEGS (animated)
    ctx.fillStyle = jeans;
    if (this.step === 0) {
      ctx.fillRect(this.x, this.y + 18, 7, 14); // left leg forward
      ctx.fillRect(this.x + 9, this.y + 18, 7, 14); // right leg back
    } else {
      ctx.fillRect(this.x, this.y + 18, 7, 14); // left leg back
      ctx.fillRect(this.x + 9, this.y + 18, 7, 14); // right leg forward
    }

    // SHOES
    ctx.fillStyle = shoes;
    ctx.fillRect(this.x, this.y + 30, 7, 4);
    ctx.fillRect(this.x + 9, this.y + 30, 7, 4);
  }
}
