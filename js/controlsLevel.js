/**
 * Controls screen level
 */
class ControlsLevel extends Level {
  constructor(game) {
    super(game);
  }

  initialize() {
    this.game.isPaused = false;
    this.game.sprites = [];

    const title = new TextSprite(
      this.game.canvas.width / 2,
      100,
      'Game Controls',
      36,
      '#9370DB'
    );
    this.game.addSprite(title);

    const controls = [
      'MOVEMENT:',
      'Left and Right Arrow Keys: Move left and right',
      'Up Arrow Key: Jump over obstacles',
      '',
      'COMBAT:',
      'SPACEBAR: Shoot bullets upward',
      '',
      'INTERACTION:',
      'Mouse Click: Purchase shields and upgrades',
      '',
      'GAME CONTROL:',
      'ESC Key: Pause game and open menu (during gameplay)',
      'P Key: Pause & C Key: Continue',
      '',
      'TIPS:',
      '- Shoot correct answers to earn stars',
      '- Use stars to buy shields for protection',
      '- Jump over red obstacles to avoid damage',
    ];

    let yPos = 160;
    controls.forEach((control) => {
      if (control !== '') {
        const isHeader = control.endsWith(':');
        const text = new TextSprite(
          this.game.canvas.width / 2,
          yPos,
          control,
          isHeader ? 24 : 18,
          isHeader ? '#BA55D3' : '#FF69B4'
        );
        this.game.addSprite(text);
        yPos += isHeader ? 35 : 25;
      } else {
        yPos += 15;
      }
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
