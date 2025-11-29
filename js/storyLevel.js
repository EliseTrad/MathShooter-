/**
 * Story screen level
 */
class StoryLevel extends Level {
  constructor(game) {
    super(game);
  }

  initialize() {
    this.game.isPaused = false;
    this.game.sprites = [];

    const title = new TextSprite(
      this.game.canvas.width / 2,
      100,
      'The Story',
      36,
      '#9370DB'
    );
    this.game.addSprite(title);

    const storyText = [
      'Once upon a time, there was a girl named Ellie who loved math more than anything in the world.',
      '',
      'While other kids found numbers boring, Ellie saw magic in every equation and puzzle.',
      'She dreamed of sharing this joy with everyone.',
      '',
      'One day, Ellie had a brilliant idea:',
      '"What if learning math could be an adventure?"',
      '',
      'After countless hours of hard work and dedication,',
      'she created Math Shooter+ a game where',
      'numbers come alive and learning feels like play!',
      '',
      "Now it's your turn to experience Ellie's vision.",
      'Make her proud by mastering each level! Show the world that math can be fun!',
    ];

    let yPos = 160;
    storyText.forEach((line) => {
      if (line !== '') {
        const text = new TextSprite(
          this.game.canvas.width / 2,
          yPos,
          line,
          20,
          '#FF69B4'
        );
        this.game.addSprite(text);
      }
      yPos += 30;
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
