var game = new Game();

game.addLevel(new MenuLevel(game)); // Level 0 - Main Menu
game.addLevel(new HowToPlayLevel(game)); // Level 1 - How to Play
game.addLevel(new StoryLevel(game)); // Level 2 - Story
game.addLevel(new ControlsLevel(game)); // Level 3 - Controls
game.addLevel(new Level1(game)); // Level 4 - Math Shooter (Easy)
game.addLevel(new Level2(game)); // Level 5 - Math Shooter (Moderate)
game.addLevel(new Level3(game)); // Level 6 - Math Shooter (Hard)
game.addLevel(new PauseMenuLevel(game)); // Level 7 - Pause Menu
game.addLevel(new ResetConfirmLevel(game)); // Level 8 - Reset Confirmation
game.addLevel(new MainMenuConfirmLevel(game)); // Level 9 - Main Menu Confirmation

game.animate();
