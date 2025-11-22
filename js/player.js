// Game classes

class Player extends Sprite {
  constructor(x, y, width, height, speed) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.jumpSpeed = 0;
    this.gravity = 0.5;
    this.groundY = y;
    this.isJumping = false;
    this.shootCooldown = 0;
    this.stars = 0;
    this.hasShield = false;
    this.shieldCost = 15;
    this.lifeCost = 40; // Cost to buy extra life
    this.totalShieldsPurchased = 0; // Track total shields bought
    this.shootSound = new SoundManager('assets/sounds/jump.wav');
    this.invincibilityTimer = 0; // Prevent repeated damage
  }

  update(sprites, keys) {
    // Movement
    if (keys['ArrowLeft'] && this.x > 0) {
      this.x -= this.speed;
    }
    if (keys['ArrowRight'] && this.x + this.width < game.canvas.width) {
      this.x += this.speed;
    }

    // Jumping
    if (keys['ArrowUp'] && !this.isJumping) {
      this.jumpSpeed = -12;
      this.isJumping = true;
    }

    // Physics
    this.y += this.jumpSpeed;
    this.jumpSpeed += this.gravity;

    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.jumpSpeed = 0;
      this.isJumping = false;
    }

    // Shooting
    if (keys[' '] && this.shootCooldown <= 0) {
      if (this.shootSound.isReady()) {
        const sfx = new Audio(this.shootSound.audio.src);
        sfx.play();
      }
      sprites.push(
        new Bullet(this.x + this.width / 2 - 2.5, this.y - 10, 5, 10, 8)
      );
      this.shootCooldown = 15;
    }

    // Shield and life purchases now handled by UI buttons

    // Hit obstacles - obstacles stay, player takes damage
    if (this.invincibilityTimer <= 0) {
      sprites.forEach((sprite) => {
        if (sprite instanceof Obstacle && this.isColliding(sprite)) {
          this.takeDamage(sprites);
          this.invincibilityTimer = 60; // 1 second of invincibility
        }
      });
    }

    // Hit falling numbers
    sprites.forEach((sprite) => {
      if (sprite instanceof Number && this.isColliding(sprite)) {
        this.takeDamage(sprites);
        sprite.deleted = true;
      }
    });

    if (this.shootCooldown > 0) {
      this.shootCooldown--;
    }

    if (this.invincibilityTimer > 0) {
      this.invincibilityTimer--;
    }

    return false;
  }

  addStars(count) {
    this.stars += count;
    const starsDisplay = game.sprites.find((sprite) => sprite instanceof Stars);
    if (starsDisplay) {
      starsDisplay.updateStars(this.stars);
    }
  }

  purchaseShield() {
    if (this.stars >= this.shieldCost && !this.hasShield) {
      this.stars -= this.shieldCost;
      this.hasShield = true;
      this.totalShieldsPurchased++;
      const starsDisplay = game.sprites.find(
        (sprite) => sprite instanceof Stars
      );
      if (starsDisplay) {
        starsDisplay.updateStars(this.stars);
      }
      console.log(
        'Shield activated! Total shields purchased: ' +
          this.totalShieldsPurchased
      );
      return true;
    }
    return false;
  }

  convertShieldsToLife(sprites) {
    if (this.totalShieldsPurchased >= 20) {
      this.totalShieldsPurchased -= 20;
      const lives = sprites.find((sprite) => sprite instanceof Lives);
      if (lives) {
        lives.addLife();
        console.log(
          'Converted 20 shields to +1 life! Shields remaining: ' +
            this.totalShieldsPurchased
        );
        return true;
      }
    }
    return false;
  }

  takeDamage(sprites) {
    if (this.hasShield) {
      this.hasShield = false;
      console.log('Shield blocked damage! Shield destroyed.');
    } else {
      const lives = sprites.find((sprite) => sprite instanceof Lives);
      if (lives) {
        lives.removeOneLife();
        if (lives.lives <= 0) {
          sprites.push(new Lose(game.canvas.width / 2, game.canvas.height / 2));
        }
      }
    }
  }

  isColliding(sprite) {
    return (
      this.x < sprite.x + sprite.width &&
      this.x + this.width > sprite.x &&
      this.y < sprite.y + sprite.height &&
      this.y + this.height > sprite.y
    );
  }

  draw(ctx) {
    // Flashing effect during invincibility
    if (
      this.invincibilityTimer > 0 &&
      Math.floor(this.invincibilityTimer / 5) % 2 === 0
    ) {
      ctx.globalAlpha = 0.5;
    }

    ctx.fillStyle = 'blue';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.globalAlpha = 1.0; // Reset alpha

    // Shield glow
    if (this.hasShield) {
      ctx.strokeStyle = 'cyan';
      ctx.lineWidth = 3;
      ctx.strokeRect(this.x - 3, this.y - 3, this.width + 6, this.height + 6);
    }

    // Face
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x + 10, this.y + 10, 5, 5);
    ctx.fillRect(this.x + 25, this.y + 10, 5, 5);

    ctx.fillStyle = 'red';
    ctx.fillRect(this.x + 15, this.y + 25, 10, 3);
  }
}

class Bullet extends Sprite {
  constructor(x, y, width, height, speed) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.color = 'yellow';
    this.deleted = false;
  }

  update(sprites, keys) {
    if (this.deleted) return true;

    this.y -= this.speed;

    if (this.y < 0) {
      return true;
    }

    // Hit numbers
    sprites.forEach((sprite) => {
      if (sprite instanceof Number && this.isColliding(sprite)) {
        sprite.hitByBullet();
        this.deleted = true;
      }
    });

    return this.deleted;
  }

  isColliding(sprite) {
    return (
      this.x < sprite.x + sprite.width &&
      this.x + this.width > sprite.x &&
      this.y < sprite.y + sprite.height &&
      this.y + this.height > sprite.y
    );
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
