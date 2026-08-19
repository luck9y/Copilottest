class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.width = 16;
    this.height = 32;

    this.speed = 60;

    this.walkTime = 0;
    this.walkSpeed = 6;
    this.step = 0;
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
      this.step = Math.floor(this.walkTime) % 2;
    } else {
      this.step = 0;
      this.walkTime = 0;
    }
  }

  draw(ctx) {
    const skin = "#f2c29d";
    const shirt = "#000000";
    const jeans = "#2d4f9e";
    const shoes = "#333333";
    const hat = "#000000";

    ctx.fillStyle = skin;
    ctx.fillRect(this.x, this.y, 16, 8);

    ctx.fillStyle = hat;
    ctx.fillRect(this.x, this.y, 16, 4);

    ctx.fillStyle = shirt;
    ctx.fillRect(this.x, this.y + 8, 16, 10);

    ctx.fillStyle = skin;
    if (this.step === 0) {
      ctx.fillRect(this.x - 3, this.y + 10, 3, 8);
      ctx.fillRect(this.x + 16, this.y + 10, 3, 8);
    } else {
      ctx.fillRect(this.x - 3, this.y + 10, 3, 8);
      ctx.fillRect(this.x + 16, this.y + 10, 3, 8);
    }

    ctx.fillStyle = jeans;
    if (this.step === 0) {
      ctx.fillRect(this.x, this.y + 18, 7, 14);
      ctx.fillRect(this.x + 9, this.y + 18, 7, 14);
    } else {
      ctx.fillRect(this.x, this.y + 18, 7, 14);
      ctx.fillRect(this.x + 9, this.y + 18, 7, 14);
    }

    ctx.fillStyle = shoes;
    ctx.fillRect(this.x, this.y + 30, 7, 4);
    ctx.fillRect(this.x + 9, this.y + 30, 7, 4);
  }
}
