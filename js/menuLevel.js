// MenuLevel class
class MenuLevel extends Level {
  constructor(game) {
    super(game);
  }

  initialize() {
    // Add title
    const title = new TextSprite(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 - 100,
      'Math Shooter+',
      48,
      'blue'
    );
    this.game.addSprite(title);

    // Add subtitle
    const subtitle = new TextSprite(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 - 50,
      'Shoot the correct answers!',
      24,
      'black'
    );
    this.game.addSprite(subtitle);

    // Add start game button
    const startButton = new Button(
      (this.game.canvas.width - 200) / 2,
      this.game.canvas.height / 2 + 20,
      200,
      50,
      'Start Game',
      () => {
        this.game.changeLevel(1);
      }
    );
    this.game.addSprite(startButton);

    // Add instructions
    const instructions = new TextSprite(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 + 120,
      'Use Arrow Keys to Move, Up Arrow to jump, Space to Shoot',
      18,
      'gray'
    );
    this.game.addSprite(instructions);
  }
}
