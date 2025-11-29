/**
 * How to Play screen level
 */
class HowToPlayLevel extends Level {
  constructor(game) {
    super(game);
  }

  initialize() {
    this.game.isPaused = false;
    this.game.sprites = [];

    const title = new TextSprite(
      this.game.canvas.width / 2,
      100,
      'How to Play',
      36,
      '#9370DB'
    );
    this.game.addSprite(title);

    const instructions = [
      'OBJECTIVE: Shoot falling numbers that match the equation',
      'SCORING: Earn 1 star for each correct answer',
      'LEVELS: Complete 5, 10, then 15 correct answers to advance',
      'SHIELDS: Buy protection with stars (costs vary by level)',
      'OBSTACLES: Missed correct answers become moving obstacles (Level 2+)',
      'LIVES: Start with 5 lives, lose 1 for wrong answers or collisions',
      'WIN: Complete all 3 levels by reaching target correct answers',
    ];

    let yPos = 180;
    instructions.forEach((instruction) => {
      const text = new TextSprite(
        this.game.canvas.width / 2,
        yPos,
        instruction,
        18,
        '#FF1493'
      );
      this.game.addSprite(text);
      yPos += 35;
    });

    const backButton = new Button(
      50,
      this.game.canvas.height - 80,
      120,
      40,
      'Back to Menu',
      () => this.game.changeLevel(0)
    );
    this.game.addSprite(backButton);
  }
}
