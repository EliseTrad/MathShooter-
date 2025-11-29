class ShieldButton extends Sprite {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.width = 140;
    this.height = 40;
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

    const cost = player.shieldCost; // Use player's dynamic shield cost
    const canAfford = player.stars >= cost;
    const hasShield = player.hasShield;

    // Button background
    if (hasShield) {
      ctx.fillStyle = 'rgba(194, 86, 170, 0.5)';
    } else if (canAfford) {
      ctx.fillStyle = 'rgba(49, 8, 40, 0.8)';
    } else {
      ctx.fillStyle = 'rgba(212, 23, 149, 0.5)';
    }
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Button border
    ctx.strokeStyle = hasShield
      ? '#580758ff'
      : canAfford
      ? '#aa0c63ff'
      : '#D8BFD8';
    ctx.lineWidth = 3;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    // Button text
    ctx.fillStyle = hasShield ? 'white' : canAfford ? 'white' : 'darkgray';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const text = hasShield ? 'Shield Active!' : `Buy Shield (${cost})`;
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
  }

  draw(ctx) {
    ctx.fillStyle = '#FF1493';
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Lives: ' + this.lives, this.x, this.y);

    for (let i = 0; i < this.lives; i++) {
      const heartX = this.x + 70 + i * 25;
      const heartY = this.y - 12;

      ctx.fillStyle = '#FF69B4';
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
    ctx.fillStyle = '#FF1493';
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Stars: ' + this.stars, this.x, this.y);

    ctx.fillStyle = '#FFD700';
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
    this.shieldsRequired = SHIELDS_FOR_LIFE_CONVERSION;
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
    ctx.fillStyle = 'rgba(255, 182, 193, 0.9)';
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

    // Stop background music
    const bgMusic = game.sprites.find(
      (sprite) => sprite instanceof BackgroundMusic
    );
    if (bgMusic && bgMusic.sound && bgMusic.sound.audio) {
      bgMusic.sound.audio.pause();
      bgMusic.sound.audio.currentTime = 0;
    }

    // Play lose sound effect
    this.loseSound = new Audio('assets/sounds/YouLoseSoundEffect.mp3');
    this.loseSound.play();
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

class Win extends Sprite {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;

    // Stop background music
    const bgMusic = game.sprites.find(
      (sprite) => sprite instanceof BackgroundMusic
    );
    if (bgMusic && bgMusic.sound && bgMusic.sound.audio) {
      bgMusic.sound.audio.pause();
      bgMusic.sound.audio.currentTime = 0;
    }

    // Play win sound effect
    this.winSound = new Audio('assets/sounds/YouWinSoundEffect.mp3');
    this.winSound.play();
  }

  update(sprites, keys) {
    return false;
  }

  draw(ctx) {
    // Draw semi-transparent background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);

    // Draw victory text centered
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      'YOU WIN!',
      game.canvas.width / 2,
      game.canvas.height / 2 - 80
    );

    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText(
      'Congratulations! You completed all levels!',
      game.canvas.width / 2,
      game.canvas.height / 2 - 20
    );

    // Display exact scores for each level
    ctx.fillStyle = '#90EE90';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(
      'Your Scores:',
      game.canvas.width / 2,
      game.canvas.height / 2 + 20
    );

    ctx.fillStyle = 'white';
    ctx.font = '18px Arial';
    ctx.fillText(
      'You got 5 answers right in Level 1',
      game.canvas.width / 2,
      game.canvas.height / 2 + 50
    );
    ctx.fillText(
      'You got 10 answers right in Level 2',
      game.canvas.width / 2,
      game.canvas.height / 2 + 80
    );
    ctx.fillText(
      'You got 15 answers right in Level 3',
      game.canvas.width / 2,
      game.canvas.height / 2 + 110
    );

    ctx.fillStyle = '#FFD700';
    ctx.font = '18px Arial';
    ctx.fillText(
      'Refresh to play again',
      game.canvas.width / 2,
      game.canvas.height / 2 + 160
    );
  }
}
