/**
 * @fileoverview Core game engine for Math Shooter+ educational game
 *
 * This file contains the main game class that manages the game loop,
 * sprite rendering, input handling, and level transitions. It provides
 * the foundation for the entire game system.
 *
 * @author Math Shooter+ Team
 * @version 1.0.0
 */

/**
 * Base class for all game objects and visual elements
 * @class Sprite
 */
class Sprite {
  /** Creates a basic sprite */
  constructor() {}

  /**
   * Updates sprite state each frame
   * @param {Array} sprites - All current game sprites
   * @param {Object} keys - Keyboard input state
   * @param {Object} mouse - Mouse input state with x, y, clicked properties
   * @returns {boolean} true if sprite should be removed, false to persist
   */
  update(sprites, keys, mouse) {
    return false;
  }

  /**
   * Renders sprite to canvas
   * @param {CanvasRenderingContext2D} ctx - Canvas rendering context
   */
  draw(ctx) {}
}

/**
 * Main game engine managing sprites, input, and level progression
 * @class Game
 */
class Game {
  /**
   * Initializes the game engine with canvas, input handlers, and game state
   */
  constructor() {
    /** @type {HTMLCanvasElement} Main game canvas element */
    this.canvas = document.getElementById('canvas');
    /** @type {CanvasRenderingContext2D} Canvas 2D rendering context */
    this.ctx = this.canvas.getContext('2d');
    /** @type {Array<Sprite>} All active game sprites */
    this.sprites = [];
    /** @type {Object} Current keyboard key states */
    this.keys = {};
    /** @type {number} Index of currently active level */
    this.currentLevelIndex = 0;
    /** @type {Array} Collection of game levels */
    this.levels = [];
    /** @type {Object} Mouse input state with x, y coordinates and clicked flag */
    this.mouse = { x: 0, y: 0, clicked: false };
    /** @type {boolean} Game pause state */
    this.isPaused = false;
    /** @type {Array} Sprites to restore after menu closes */
    this.pausedSprites = [];
    /** @type {number} Level index to restore after menu closes */
    this.pausedLevel = undefined;
    this.bindKeyboardEvents();
    this.bindMouseEvents();
  }

  /**
   * Adds a sprite to the active game sprites list
   * @param {Sprite} sprite - Sprite to add to the game
   */
  addSprite(sprite) {
    this.sprites.push(sprite);
  }

  /**
   * Updates all game sprites and handles sprite lifecycle
   * Sprites returning true from update() are removed from the game
   */
  update() {
    if (
      this.keys['Escape'] &&
      this.currentLevelIndex >= 4 &&
      this.currentLevelIndex <= 6
    ) {
      this.showInGameMenu();
      this.keys['Escape'] = false;
    }

    if (this.keys['p'] || this.keys['P']) {
      if (this.currentLevelIndex >= 4 && this.currentLevelIndex <= 6) {
        this.showInGameMenu();
      }
      this.keys['p'] = false;
      this.keys['P'] = false;
    }

    if (this.keys['c'] || this.keys['C']) {
      if (this.pausedLevel !== undefined && this.pausedSprites.length > 0) {
        this.resumeGame();
      }
      this.keys['c'] = false;
      this.keys['C'] = false;
    }

    let updatedSprites = [];
    for (let sprite of this.sprites) {
      if (!sprite.update(this.sprites, this.keys, this.mouse)) {
        updatedSprites.push(sprite);
      }
    }
    this.sprites = updatedSprites;

    this.mouse.clicked = false;

    if (this.pendingLevelIndex !== null) {
      this.setLevel(this.pendingLevelIndex);
      this.pendingLevelIndex = null;

      if (this.pendingSprites) {
        this.sprites = this.pendingSprites;
        this.pendingSprites = null;
      }

      if (this.isResetting) {
        this.isResetting = false;
      }
    }
  }

  /**
   * Renders all sprites to the canvas
   * Clears the canvas and redraws all active sprites
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.sprites.forEach((sprite) => sprite.draw(this.ctx));
  }

  /**
   * Main game loop using requestAnimationFrame
   * Continuously updates and draws the game at 60 FPS
   */
  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }

  /**
   * Registers a new level with the game engine
   * @param {Object} level - Level object with initialize() method
   */
  addLevel(level) {
    this.levels.push(level);

    if (this.levels.length === 1) {
      this.setLevel(0);
    }
  }

  /**
   * Switches to specified level index
   * @param {number} index - Index of level to activate
   */
  setLevel(index) {
    if (index >= 0 && index < this.levels.length) {
      this.sprites = [];
      this.currentLevelIndex = index;
      this.levels[index].initialize();
    }
  }

  /**
   * Queues a level change for next frame (prevents mid-update level switching)
   * @param {number} index - Index of level to switch to
   */
  changeLevel(index) {
    this.pendingLevelIndex = index;
  }

  /**
   * Advances to the next level in sequence
   */
  nextLevel() {
    this.setLevel(this.currentLevelIndex + 1);
  }

  /**
   * Returns to the previous level in sequence
   */
  previousLevel() {
    this.setLevel(this.currentLevelIndex - 1);
  }

  /**
   * Sets up keyboard input event listeners
   * Tracks key press and release states in this.keys object
   */
  bindKeyboardEvents() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    });
  }

  /**
   * Sets up mouse input event listeners
   * Tracks mouse position and click states relative to canvas
   */
  bindMouseEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.canvas.addEventListener('mousedown', () => {
      this.mouse.down = true;
      this.mouse.clicked = true; // Tracks single clicks
    });

    this.canvas.addEventListener('mouseup', () => {
      this.mouse.down = false;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.down = false;
    });
  }
}

/**
 * Base class for game levels providing common initialization pattern
 * @class Level
 */
class Level {
  /**
   * Creates a level instance linked to the game engine
   * @param {Game} game - Reference to main game engine
   */
  constructor(game) {
    /** @type {Game} Reference to main game engine for sprite management */
    this.game = game;
  }

  /**
   * Override this method to set up level-specific sprites and game state
   * Called when level becomes active
   */
  initialize() {}
}

// Add pause and menu management methods to Game prototype
Game.prototype.showInGameMenu = function () {
  this.pausedSprites = [...this.sprites];
  this.pausedLevel = this.currentLevelIndex;
  this.changeLevel(7);
};

Game.prototype.resumeGame = function () {
  this.isPaused = false;
  if (this.pausedLevel !== undefined && this.pausedSprites.length > 0) {
    const levelToRestore = this.pausedLevel;
    const spritesToRestore = [...this.pausedSprites];
    this.pausedLevel = undefined;
    this.pausedSprites = [];

    this.pendingLevelIndex = levelToRestore;
    this.pendingSprites = spritesToRestore;
  }
};

Game.prototype.resetGame = function () {
  this.isPaused = false;
  const currentLevel =
    this.pausedLevel !== undefined ? this.pausedLevel : this.currentLevelIndex;
  this.pausedSprites = [];
  this.pausedLevel = undefined;

  this.isResetting = true;
  this.changeLevel(currentLevel);
};
