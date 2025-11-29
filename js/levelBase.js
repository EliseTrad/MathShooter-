class GameplayLevel extends Level {
  constructor(game) {
    super(game);
    this.levelNumber = 1; // Default, will be overridden
  }

  initializeCommonElements() {
    this.game.addSprite(new BackgroundMusic());

    const existingPlayer = this.game.sprites.find(
      (sprite) => sprite instanceof Player
    );
    const player = new Player(
      0,
      0,
      PLAYER_WIDTH,
      PLAYER_HEIGHT,
      PLAYER_SPEED,
      this.levelNumber
    );

    // Only preserve player data when NOT resetting
    if (existingPlayer && !this.game.isResetting) {
      player.stars = existingPlayer.stars;
      player.hasShield = existingPlayer.hasShield;
      player.totalShieldsPurchased = existingPlayer.totalShieldsPurchased;
    }

    setTimeout(() => {
      player.x = (this.game.canvas.width - player.width) / 2;
      player.y = this.game.canvas.height - PLAYER_GROUND_OFFSET;
      player.groundY = player.y;
    }, PLAYER_POSITION_DELAY);
    this.game.addSprite(player);

    this.game.addSprite(new Lives(HUD_LEFT_MARGIN, HUD_LIVES_Y));
    this.game.addSprite(new Stars(HUD_LEFT_MARGIN, HUD_STARS_Y));
    this.game.addSprite(new ShieldButton(HUD_LEFT_MARGIN, HUD_SHIELD_BUTTON_Y));
    this.game.addSprite(
      new ShieldConversionButton(HUD_LEFT_MARGIN, HUD_CONVERSION_BUTTON_Y)
    );
  }

  addGameElements(levelNumber) {
    this.levelNumber = levelNumber;
    this.game.addSprite(
      new EquationDisplay(EQUATION_X, EQUATION_Y, levelNumber)
    );
    this.game.addSprite(new NumberGenerator(levelNumber));
  }
}
