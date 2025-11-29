class Level1 extends GameplayLevel {
  constructor(game) {
    super(game);
  }

  initialize() {
    this.levelNumber = 1;
    this.initializeCommonElements();
    this.addGameElements(1);

    // Add campfire immediately
    const campfire = new CampfireAnimation(
      this.game.canvas.width / 2 + 120,
      30
    );
    this.game.addSprite(campfire);
  }
}
