var game = new Game();

// Add levels
game.addLevel(new MenuLevel(game)); // Level 0 - Menu
game.addLevel(new Level1(game)); // Level 1 - Math Shooter (Easy)
game.addLevel(new Level2(game)); // Level 2 - Math Shooter (Moderate)
game.addLevel(new Level3(game)); // Level 3 - Math Shooter (Hard)

game.animate();
