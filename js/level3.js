class Level3 extends GameplayLevel {
  constructor(game) {
    super(game);
  }

  initialize() {
    this.levelNumber = 3;
    this.initializeCommonElements();
    this.addGameElements(3);
  }
}
