/**
 * Pause Menu - Main pause screen with navigation buttons
 */
class PauseMenuLevel extends Level {
  constructor(game) {
    super(game);
  }

  initialize() {
    this.game.isPaused = true;
    this.game.sprites = [];

    // Semi-transparent background
    const overlay = new OverlaySprite();
    this.game.addSprite(overlay);

    // Menu title
    const title = new TextSprite(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 - 150,
      'Game Paused',
      42,
      '#FF69B4'
    );
    this.game.addSprite(title);

    // Subtitle with keyboard hints
    const subtitle = new TextSprite(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 - 100,
      'Press C to Continue or ESC to pause again',
      16,
      '#FFD700'
    );
    this.game.addSprite(subtitle);

    const buttonWidth = 200;
    const buttonHeight = 45;
    const buttonSpacing = 55;
    const startY = this.game.canvas.height / 2 - 20;

    // Continue button
    const continueButton = new Button(
      (this.game.canvas.width - buttonWidth) / 2,
      startY,
      buttonWidth,
      buttonHeight,
      'Continue (C)',
      () => this.game.resumeGame()
    );
    this.game.addSprite(continueButton);

    // Reset button directly reset without confirmation
    const resetButton = new Button(
      (this.game.canvas.width - buttonWidth) / 2,
      startY + buttonSpacing,
      buttonWidth,
      buttonHeight,
      'Reset Level',
      () => this.game.resetGame()
    );
    this.game.addSprite(resetButton);

    // Main Menu button
    const menuButton = new Button(
      (this.game.canvas.width - buttonWidth) / 2,
      startY + buttonSpacing * 2,
      buttonWidth,
      buttonHeight,
      'Main Menu',
      () => this.game.changeLevel(9)
    );
    this.game.addSprite(menuButton);
  }
}

/**
 * Reset confirmation screen
 */
class ResetConfirmLevel extends Level {
  constructor(game) {
    super(game);
  }

  initialize() {
    this.game.isPaused = false;
    this.game.sprites = [];

    // Semi-transparent background
    const overlay = new OverlaySprite();
    this.game.addSprite(overlay);

    // Title
    const title = new TextSprite(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 - 80,
      'Reset Level?',
      32,
      '#BA55D3'
    );
    this.game.addSprite(title);

    const message = new TextSprite(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 - 30,
      'This will restart the current level',
      18,
      '#FFB6C1'
    );
    this.game.addSprite(message);

    const buttonWidth = 140;
    const buttonHeight = 40;
    const buttonSpacing = 20;
    const startX = this.game.canvas.width / 2 - buttonWidth - buttonSpacing / 2;
    const yPos = this.game.canvas.height / 2 + 30;

    // Confirm button
    const confirmButton = new Button(
      startX,
      yPos,
      buttonWidth,
      buttonHeight,
      'Yes, Reset',
      () => this.game.resetGame()
    );
    this.game.addSprite(confirmButton);

    // Back button
    const backButton = new Button(
      startX + buttonWidth + buttonSpacing,
      yPos,
      buttonWidth,
      buttonHeight,
      'Back',
      () => this.game.changeLevel(7)
    );
    this.game.addSprite(backButton);
  }
}

/**
 * Main menu confirmation screen
 */
class MainMenuConfirmLevel extends Level {
  constructor(game) {
    super(game);
  }

  initialize() {
    this.game.isPaused = false;
    this.game.sprites = [];

    // Semi-transparent background
    const overlay = new OverlaySprite();
    this.game.addSprite(overlay);

    // Title
    const title = new TextSprite(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 - 80,
      'Return to Main Menu?',
      32,
      '#BA55D3'
    );
    this.game.addSprite(title);

    const message = new TextSprite(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 - 30,
      'Your progress will be lost',
      18,
      '#FFD700'
    );
    this.game.addSprite(message);

    const buttonWidth = 140;
    const buttonHeight = 40;
    const buttonSpacing = 20;
    const startX = this.game.canvas.width / 2 - buttonWidth - buttonSpacing / 2;
    const yPos = this.game.canvas.height / 2 + 30;

    // Confirm button
    const confirmButton = new Button(
      startX,
      yPos,
      buttonWidth,
      buttonHeight,
      'Yes, Quit',
      () => {
        this.game.isPaused = false;
        this.game.pausedSprites = [];
        this.game.changeLevel(0);
      }
    );
    this.game.addSprite(confirmButton);

    // Back button
    const backButton = new Button(
      startX + buttonWidth + buttonSpacing,
      yPos,
      buttonWidth,
      buttonHeight,
      'Back',
      () => this.game.changeLevel(7)
    );
    this.game.addSprite(backButton);
  }
}

// Overlay sprite for pause menu background
class OverlaySprite extends Sprite {
  constructor() {
    super();
  }

  update() {
    return false;
  }

  draw(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
