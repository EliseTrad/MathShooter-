class Level2 extends Level {
  constructor(game) {
    super(game);
  }

  initialize() {
    // Background music
    this.game.addSprite(new BackgroundMusic());

    // Player - preserve existing player data if transitioning from another level
    const existingPlayer = this.game.sprites.find(
      (sprite) => sprite instanceof Player
    );
    const player = new Player(0, 0, 40, 40, 5);
    if (existingPlayer) {
      player.stars = existingPlayer.stars;
      player.hasShield = existingPlayer.hasShield;
      player.totalShieldsPurchased = existingPlayer.totalShieldsPurchased;
    }
    // Position player at center bottom after canvas is sized
    setTimeout(() => {
      player.x = (this.game.canvas.width - player.width) / 2;
      player.y = this.game.canvas.height - 100;
      player.groundY = player.y;
    }, 100);
    this.game.addSprite(player);

    // HUD Elements
    this.game.addSprite(new Lives(30, 50));
    this.game.addSprite(new Stars(30, 90));
    this.game.addSprite(new ShieldButton(30, 120)); // Shield purchase button
    this.game.addSprite(new ShieldConversionButton(30, 170)); // Shield conversion button

    // Game Elements - Level 2 settings
    this.game.addSprite(new EquationDisplay(50, 50, 2));
    this.game.addSprite(new NumberGenerator(2));
  }
}
