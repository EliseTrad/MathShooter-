// Main Menu Level
class MenuLevel extends Level {
  constructor(game) {
    super(game);
  }

  initialize() {
    this.game.isPaused = false;
    this.game.sprites = [];

    // Title
    const title = new TextSprite(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 - 150,
      'Math Shooter+',
      48,
      '#9370DB'
    );
    this.game.addSprite(title);

    // Subtitle
    const subtitle = new TextSprite(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 - 100,
      'Shoot the correct answers!',
      24,
      '#FF69B4'
    );
    this.game.addSprite(subtitle);

    // Menu buttons
    const buttonWidth = 220;
    const buttonHeight = 45;
    const buttonSpacing = 55;
    const startY = this.game.canvas.height / 2 - 20;

    const startButton = new Button(
      (this.game.canvas.width - buttonWidth) / 2,
      startY,
      buttonWidth,
      buttonHeight,
      'Start Game',
      () => this.game.changeLevel(4)
    );
    this.game.addSprite(startButton);

    const howToPlayButton = new Button(
      (this.game.canvas.width - buttonWidth) / 2,
      startY + buttonSpacing,
      buttonWidth,
      buttonHeight,
      'How to Play',
      () => this.game.changeLevel(1)
    );
    this.game.addSprite(howToPlayButton);

    const storyButton = new Button(
      (this.game.canvas.width - buttonWidth) / 2,
      startY + buttonSpacing * 2,
      buttonWidth,
      buttonHeight,
      'Story',
      () => this.game.changeLevel(2)
    );
    this.game.addSprite(storyButton);

    const keysButton = new Button(
      (this.game.canvas.width - buttonWidth) / 2,
      startY + buttonSpacing * 3,
      buttonWidth,
      buttonHeight,
      'Controls',
      () => this.game.changeLevel(3)
    );
    this.game.addSprite(keysButton);
  }
}
