class Level2 extends GameplayLevel {
  constructor(game) {
    super(game);
  }

  initialize() {
    this.levelNumber = 2;
    this.initializeCommonElements();
    this.addGameElements(2);
  }
}
