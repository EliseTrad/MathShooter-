// TextSprite for displaying text
class TextSprite extends Sprite {
  constructor(x, y, text, fontSize = 24, color = 'black') {
    super();
    this.x = x;
    this.y = y;
    this.text = text;
    this.fontSize = fontSize;
    this.color = color;
  }

  update() {
    return false;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.font = this.fontSize + 'px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(this.text, this.x, this.y);
  }
}

// Button class for menu navigation
class Button extends Sprite {
  constructor(x, y, width, height, text, onClick) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.onClick = onClick;
    this.isHovered = false;
  }

  update(sprites, keys, mouse) {
    // Check if mouse is over button
    this.isHovered =
      mouse.x >= this.x &&
      mouse.x <= this.x + this.width &&
      mouse.y >= this.y &&
      mouse.y <= this.y + this.height;

    // Check for click
    if (this.isHovered && mouse.clicked) {
      this.onClick();
      mouse.clicked = false; // Prevent multiple triggers
    }

    return false;
  }

  draw(ctx) {
    // Button background
    ctx.fillStyle = this.isHovered ? '#4CAF50' : '#2196F3';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Button border
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    // Button text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
  }
}

// Sound and music utilities

class SoundManager {
  constructor(url, { loop = false } = {}) {
    this.audio = new Audio(url);
    this.audio.loop = loop;
  }

  isReady() {
    return this.audio.readyState >= 2;
  }

  play() {
    this.audio.play();
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}

class BackgroundMusic extends Sprite {
  constructor() {
    super();
    this.sound = new SoundManager('assets/sounds/background.wav', {
      loop: true,
    });
    this.started = false;
  }

  update(sprites, keys) {
    if (keys[' ']) {
      this.started = true;
    }

    if (this.started && this.sound.isReady()) {
      this.sound.play();
      this.started = true;
    }
    return false;
  }

  draw(ctx) {}
}
