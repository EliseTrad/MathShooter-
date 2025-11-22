class ShieldButton extends Sprite {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.width = 140;
    this.height = 40;
    this.cost = 15;
  }

  update(sprites, keys, mouse) {
    if (mouse && mouse.clicked) {
      if (this.isClicked(mouse.x, mouse.y)) {
        const player = game.sprites.find((sprite) => sprite instanceof Player);
        if (player) {
          player.purchaseShield();
        }
      }
    }
    return false;
  }

  isClicked(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    );
  }

  draw(ctx) {
    const player = game.sprites.find((sprite) => sprite instanceof Player);
    if (!player) return;

    const canAfford = player.stars >= this.cost;
    const hasShield = player.hasShield;

    // Button background
    if (hasShield) {
      ctx.fillStyle = 'rgba(0, 150, 150, 0.5)'; // Disabled when shield active
    } else if (canAfford) {
      ctx.fillStyle = 'rgba(0, 200, 0, 0.8)'; // Green when affordable
    } else {
      ctx.fillStyle = 'rgba(100, 100, 100, 0.5)'; // Gray when can't afford
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Button border
    ctx.strokeStyle = hasShield ? 'cyan' : canAfford ? 'darkgreen' : 'gray';
    ctx.lineWidth = 3;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    // Button text
    ctx.fillStyle = hasShield ? 'white' : canAfford ? 'white' : 'darkgray';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const text = hasShield ? 'Shield Active!' : `Buy Shield (${this.cost}★)`;
    ctx.fillText(text, this.x + this.width / 2, this.y + this.height / 2);
  }
}

class Lives extends Sprite {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.lives = 5;
  }

  update(sprites, keys) {
    return false;
  }

  removeOneLife() {
    this.lives--;
    return this.lives;
  }

  addLife() {
    this.lives++;
    console.log('Life added! Total lives: ' + this.lives);
  }

  draw(ctx) {
    ctx.fillStyle = 'black';
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Lives: ' + this.lives, this.x, this.y);

    // Draw heart icons properly positioned next to the text
    for (let i = 0; i < this.lives; i++) {
      const heartX = this.x + 70 + i * 25; // Start after "Lives: " text
      const heartY = this.y - 12; // Align with text baseline

      // Draw heart shape
      ctx.fillStyle = 'red';
      ctx.fillRect(heartX, heartY, 15, 15); // Main heart body
      ctx.fillRect(heartX - 5, heartY - 5, 5, 5); // Left top bump
      ctx.fillRect(heartX + 15, heartY - 5, 5, 5); // Right top bump
    }
  }
}

class Stars extends Sprite {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.stars = 0;
  }

  updateStars(newStarCount) {
    this.stars = newStarCount;
  }

  update(sprites, keys) {
    return false;
  }

  draw(ctx) {
    ctx.fillStyle = 'black';
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Stars: ' + this.stars, this.x, this.y);

    // Draw star icon properly positioned after text
    ctx.fillStyle = 'gold';
    ctx.beginPath();
    const starX = this.x + 70; // Position after "Stars: " text
    const starY = this.y - 8;
    const spikes = 5;
    const outerRadius = 8;
    const innerRadius = 4;

    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes;
      const x = starX + Math.cos(angle) * radius;
      const y = starY + Math.sin(angle) * radius;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fill();
  }
}

class ShieldConversionButton extends Sprite {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.width = 160;
    this.height = 40;
    this.shieldsRequired = 20;
  }

  update(sprites, keys, mouse) {
    if (mouse && mouse.clicked) {
      if (this.isClicked(mouse.x, mouse.y)) {
        const player = game.sprites.find((sprite) => sprite instanceof Player);
        if (player && player.totalShieldsPurchased >= this.shieldsRequired) {
          player.convertShieldsToLife(sprites);
        }
      }
    }
    return false;
  }

  isClicked(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    );
  }

  draw(ctx) {
    const player = game.sprites.find((sprite) => sprite instanceof Player);
    if (!player || player.totalShieldsPurchased < this.shieldsRequired) return;

    // Button background - purple/gold theme
    ctx.fillStyle = 'rgba(147, 51, 234, 0.9)';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Button border
    ctx.strokeStyle = 'gold';
    ctx.lineWidth = 3;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    // Button text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 13px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      `Convert 20 Shields → +1 Life`,
      this.x + this.width / 2,
      this.y + this.height / 2
    );

    // Shield count indicator
    ctx.font = '10px Arial';
    ctx.fillStyle = 'yellow';
    ctx.fillText(
      `(${player.totalShieldsPurchased} shields purchased)`,
      this.x + this.width / 2,
      this.y + this.height + 12
    );
  }
}

class Lose extends Sprite {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
  }

  update(sprites, keys) {
    return false;
  }

  draw(ctx) {
    // Draw semi-transparent background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

    // Draw game over text centered
    ctx.fillStyle = 'red';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GAME OVER', game.canvas.width / 2, game.canvas.height / 2);

    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(
      'Refresh to play again',
      game.canvas.width / 2,
      game.canvas.height / 2 + 60
    );
  }
}
