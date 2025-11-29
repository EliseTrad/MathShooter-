/**
 * @fileoverview Sprite classes for Math Shooter+ game
 * Contains UI elements, animations, and interactive components
 */

/**
 * Displays static text on the canvas
 * @class TextSprite
 * @extends Sprite
 */
class TextSprite extends Sprite {
  /**
   * Creates a text display sprite
   * @param {number} x - X position in pixels
   * @param {number} y - Y position in pixels
   * @param {string} text - Text content to display
   * @param {number} [fontSize=24] - Font size in pixels
   * @param {string} [color='black'] - Text color (CSS color value)
   */
  constructor(x, y, text, fontSize = 24, color = 'black') {
    super();
    this.x = x;
    this.y = y;
    this.text = text;
    this.fontSize = fontSize;
    this.color = color;
  }

  /**
   * Updates text sprite (no animation needed)
   * @returns {boolean} false - never remove text sprites automatically
   */
  update() {
    return false;
  }

  /**
   * Renders text to canvas
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.font = this.fontSize + 'px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, this.x, this.y);
  }
}

/**
 * Interactive button with hover states and click handling
 * @class Button
 * @extends Sprite
 */
class Button extends Sprite {
  /**
   * Creates a clickable button
   * @param {number} x - X position in pixels
   * @param {number} y - Y position in pixels
   * @param {number} width - Button width in pixels
   * @param {number} height - Button height in pixels
   * @param {string} text - Button label text
   * @param {Function} onClick - Callback function when button is clicked
   */
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

  /**
   * Handles mouse hover detection and click events
   * @param {Array} sprites - Current game sprites (unused)
   * @param {Object} keys - Keyboard input state (unused)
   * @param {Object} mouse - Mouse input state with x, y, clicked properties
   * @returns {boolean} false - buttons persist until manually removed
   */
  update(sprites, keys, mouse) {
    this.isHovered =
      mouse.x >= this.x &&
      mouse.x <= this.x + this.width &&
      mouse.y >= this.y &&
      mouse.y <= this.y + this.height;

    if (this.isHovered && mouse.clicked) {
      if (this.onClick) {
        this.onClick();
      }
      mouse.clicked = false; // Prevent multiple triggers
    }

    return false;
  }

  /**
   * Renders button with hover state visual feedback
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  draw(ctx) {
    ctx.fillStyle = this.isHovered ? '#FF69B4' : '#FF1493';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.strokeStyle = '#FF1493';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2);
  }
}

/**
 * Simple audio wrapper for individual sound playback
 * @class SoundManager
 */
class SoundManager {
  /**
   * Creates a sound wrapper for a single audio file
   * @param {string} url - Path to audio file
   * @param {Object} options - Configuration options
   * @param {boolean} options.loop - Whether to loop the audio
   */
  constructor(url, { loop = false } = {}) {
    /** @type {HTMLAudioElement} The wrapped audio element */
    this.audio = new Audio(url);
    this.audio.loop = loop;
  }

  /**
   * Checks if audio is ready to play
   * @returns {boolean} true if audio has loaded enough data to play
   */
  isReady() {
    return this.audio.readyState >= 2;
  }

  /**
   * Starts audio playback
   */
  play() {
    this.audio.play();
  }

  /**
   * Stops audio and resets to beginning
   */
  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}

/**
 * Advanced sprite animation system with playback controls
 * @class AnimatedSprite
 * @extends Sprite
 */
class AnimatedSprite extends Sprite {
  /**
   * Creates an animated sprite with playback controls
   * @param {string} imagePath - Path to sprite sheet image
   * @param {number} x - X position in pixels
   * @param {number} y - Y position in pixels
   * @param {number} spriteWidth - Total width of sprite sheet
   * @param {number} spriteHeight - Height of sprite sheet
   * @param {number} frameCount - Number of animation frames
   * @param {number} animSpeed - Frames between animation updates (default: 5)
   */
  constructor(
    imagePath,
    x,
    y,
    spriteWidth,
    spriteHeight,
    frameCount,
    animSpeed = 5
  ) {
    super(x, y, spriteWidth / frameCount, spriteHeight);

    /** @type {HTMLImageElement} Sprite sheet image */
    this.spritesheet = new Image();
    this.spritesheet.src = imagePath;

    /** @type {number} Total sprite sheet width */
    this.spriteWidth = spriteWidth;
    /** @type {number} Sprite sheet height */
    this.spriteHeight = spriteHeight;
    /** @type {number} Number of animation frames */
    this.frameCount = frameCount;
    /** @type {number} Width of each frame */
    this.frameWidth = spriteWidth / frameCount;

    /** @type {number} Current frame index (0-based) */
    this.currentFrame = 0;
    /** @type {number} Animation speed (higher = slower) */
    this.animationSpeed = animSpeed;
    /** @type {number} Frame timing counter */
    this.animationCounter = 0;
    /** @type {boolean} Whether animation is currently playing */
    this.isPlaying = true;
    /** @type {boolean} Whether animation loops when complete */
    this.loop = true;
  }

  /**
   * Updates animation frame progression with playback controls
   * @param {Array} sprites - Current game sprites (unused)
   * @param {Object} keys - Keyboard input state (unused)
   * @returns {boolean} false - animated sprites persist until manually removed
   */
  update(sprites, keys) {
    if (this.isPlaying) {
      this.animationCounter++;
      if (this.animationCounter >= this.animationSpeed) {
        this.animationCounter = 0;
        this.currentFrame++;

        if (this.currentFrame >= this.frameCount) {
          if (this.loop) {
            this.currentFrame = 0;
          } else {
            this.currentFrame = this.frameCount - 1;
            this.isPlaying = false;
          }
        }
      }
    }
    return false;
  }

  /**
   * Renders current animation frame with visibility check
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  draw(ctx) {
    if (!this.visible) return;

    ctx.drawImage(
      this.spritesheet,
      this.currentFrame * this.frameWidth,
      0,
      this.frameWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.frameWidth,
      this.spriteHeight
    );
  }

  /**
   * Starts animation playback
   */
  play() {
    this.isPlaying = true;
  }

  /**
   * Pauses animation playback
   */
  pause() {
    this.isPlaying = false;
  }

  /**
   * Stops animation and resets to first frame
   */
  stop() {
    this.isPlaying = false;
    this.currentFrame = 0;
  }
}

/**
 * Animated campfire with girly pink/purple color effects
 * @class CampfireAnimation
 * @extends AnimatedSprite
 */
class CampfireAnimation extends AnimatedSprite {
  /**
   * Creates a campfire animation with predefined girly styling
   * @param {number} x - X position in pixels
   * @param {number} y - Y position in pixels
   */
  constructor(x, y) {
    super('assets/CampFireFinished.png', x, y, 320, 64, 4, 15);

    this.x = x;
    this.y = y;
    this.visible = true;
    this.active = true;
  }

  /**
   * Updates campfire animation using parent class logic
   * @param {Array} sprites - Current game sprites
   * @param {Object} keys - Keyboard input state
   * @returns {boolean} false - campfire persists until manually removed
   */
  update(sprites, keys) {
    return super.update(sprites, keys);
  }

  /**
   * Renders campfire with girly pink/purple color blend effects
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  draw(ctx) {
    if (!this.visible) return;

    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = 'rgba(255, 182, 193, 0.8)';
    super.draw(ctx);
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = 'rgba(255, 20, 147, 0.4)';
    ctx.fillRect(this.x, this.y, this.frameWidth, this.spriteHeight);
    ctx.globalCompositeOperation = 'soft-light';
    ctx.fillStyle = 'rgba(186, 85, 211, 0.3)';
    ctx.fillRect(this.x, this.y, this.frameWidth, this.spriteHeight);
    ctx.restore();
  }
}

/**
 * Background music controller triggered by spacebar
 * @class BackgroundMusic
 * @extends Sprite
 */
class BackgroundMusic extends Sprite {
  /**
   * Creates a background music controller
   */
  constructor() {
    super();
    /** @type {SoundManager} Audio wrapper for background music */
    this.sound = new SoundManager('assets/sounds/background.mp3', {
      loop: true,
    });
    /** @type {boolean} Whether music playback has been initiated */
    this.started = false;
  }

  /**
   * Handles spacebar trigger for music playback
   * @param {Array} sprites - Current game sprites (unused)
   * @param {Object} keys - Keyboard input state
   * @returns {boolean} false - background music persists throughout game
   */
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

  /**
   * No visual rendering for background music
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context (unused)
   */
  draw(ctx) {}
}
