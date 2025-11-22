class Number extends Sprite {
  constructor(x, y, value, isCorrect, speed = 2) {
    super();
    this.x = x;
    this.y = y;
    this.value = value;
    this.isCorrect = isCorrect;
    this.speed = speed;
    this.width = 40;
    this.height = 40;
    this.deleted = false;
    this.hitSound = new SoundManager('assets/sounds/jump.wav');
  }

  update(sprites, keys) {
    if (this.deleted) return true;

    this.y += this.speed;

    if (this.y + this.height >= game.canvas.height) {
      this.reachedGround(sprites);
      return true;
    }

    return false;
  }

  hitByBullet() {
    this.deleted = true;

    // Debug: Log what was hit
    console.log(`Hit number ${this.value}, isCorrect: ${this.isCorrect}`);

    if (this.isCorrect) {
      console.log(
        'Correct answer hit! Adding star and generating new equation.'
      );
      const player = game.sprites.find((sprite) => sprite instanceof Player);
      if (player) {
        player.addStars(1);
      }

      const equation = game.sprites.find(
        (sprite) => sprite instanceof EquationDisplay
      );
      if (equation) {
        equation.generateNewEquation();
      }

      const generator = game.sprites.find(
        (sprite) => sprite instanceof NumberGenerator
      );
      if (generator) {
        generator.onCorrectAnswerHit();
      }
    } else {
      console.log('Wrong answer hit! Losing a life.');

      // Penalty: Lose a life
      const lives = game.sprites.find((sprite) => sprite instanceof Lives);
      if (lives) {
        lives.removeOneLife();
        console.log(`Player now has ${lives.lives} lives`);
        if (lives.lives <= 0) {
          game.sprites.push(
            new Lose(game.canvas.width / 2, game.canvas.height / 2)
          );
        }
      }

      const generator = game.sprites.find(
        (sprite) => sprite instanceof NumberGenerator
      );

      // Level 2+: Also spawn 2 extra numbers as additional penalty
      if (generator && generator.level >= 2) {
        console.log('Level 2+: Also spawning 2 extra numbers.');
        const equation = game.sprites.find(
          (sprite) => sprite instanceof EquationDisplay
        );
        const correctAnswer = equation ? equation.getCorrectAnswer() : 10;

        // Spawn 2 more wrong numbers as penalty
        for (let i = 0; i < 2; i++) {
          const randomX = Math.random() * (game.canvas.width - 40);
          const minWrong = Math.max(1, correctAnswer - 5);
          const maxWrong = correctAnswer + 5;
          let wrongValue;

          do {
            wrongValue =
              Math.floor(Math.random() * (maxWrong - minWrong + 1)) + minWrong;
          } while (wrongValue === correctAnswer);

          game.sprites.push(
            new Number(randomX, -40, wrongValue, false, generator.numberSpeed)
          );
        }
      }
    }

    if (this.hitSound.isReady()) {
      const sfx = new Audio(this.hitSound.audio.src);
      sfx.play();
    }
  }

  reachedGround(sprites) {
    const generator = game.sprites.find(
      (sprite) => sprite instanceof NumberGenerator
    );

    // Level 1: Numbers just disappear - beginner friendly!
    // Level 2+: Correct answers become obstacles
    if (this.isCorrect && generator && generator.level >= 2) {
      // Check if there's already an obstacle at this position (within 50px)
      const existingObstacle = sprites.find(
        (sprite) =>
          sprite instanceof Obstacle && Math.abs(sprite.x - this.x) < 50
      );

      if (!existingObstacle) {
        // Get player's ground Y position to place obstacle at same level
        const player = game.sprites.find((sprite) => sprite instanceof Player);
        const obstacleY = player ? player.groundY : game.canvas.height - 100;
        sprites.push(new Obstacle(this.x, obstacleY, 40, 40));
        console.log('Correct answer missed! Obstacle created at x=' + this.x);
      } else {
        console.log('Obstacle already exists nearby, skipping creation.');
      }
    }
  }

  draw(ctx) {
    // All numbers have the same color - no hints!
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      this.value.toString(),
      this.x + this.width / 2,
      this.y + this.height / 2
    );
  }
}

class EquationDisplay extends Sprite {
  constructor(x, y, level = 1) {
    super();
    this.x = x;
    this.y = y;
    this.level = level;
    this.num1 = 0;
    this.num2 = 0;
    this.operation = '+';
    this.answer = 0;
    this.generateNewEquation();
  }

  setLevel(level) {
    this.level = level;
  }

  generateNewEquation() {
    this.num1 = Math.floor(Math.random() * 10) + 1;
    this.num2 = Math.floor(Math.random() * 10) + 1;

    let operations;
    switch (this.level) {
      case 1:
        operations = ['+', '-'];
        break;
      case 2:
        operations = ['+', '-'];
        break;
      case 3:
      default:
        operations = ['+', '-', '*'];
        break;
    }

    this.operation = operations[Math.floor(Math.random() * operations.length)];

    switch (this.operation) {
      case '+':
        this.answer = this.num1 + this.num2;
        break;
      case '-':
        if (this.num1 < this.num2) {
          [this.num1, this.num2] = [this.num2, this.num1];
        }
        this.answer = this.num1 - this.num2;
        break;
      case '*':
        this.num1 = Math.floor(Math.random() * 5) + 1;
        this.num2 = Math.floor(Math.random() * 5) + 1;
        this.answer = this.num1 * this.num2;
        break;
    }
  }
  getCorrectAnswer() {
    return this.answer;
  }

  update(sprites, keys) {
    return false;
  }

  draw(ctx) {
    const equation = `${this.num1} ${this.operation} ${this.num2} = ?`;

    // Center the equation horizontally
    const boxWidth = 200;
    const boxX = (game.canvas.width - boxWidth) / 2;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.fillRect(boxX - 10, this.y - 30, boxWidth, 50);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX - 10, this.y - 30, boxWidth, 50);

    ctx.fillStyle = 'black';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(equation, game.canvas.width / 2, this.y);
  }
}

class NumberGenerator extends Sprite {
  constructor(level = 1) {
    super();
    this.level = level;
    this.spawnCounter = 0;
    this.correctAnswersCount = 0;
    this.targetCorrectAnswers = this.getTargetCorrectAnswers();
    this.maxNumbersOnScreen = this.getMaxNumbers();
    this.spawnRate = this.getSpawnRate();
    this.numberSpeed = this.getNumberSpeed();
    this.maxObstacles = level >= 2 ? 8 : 0; // Limit obstacles to prevent impossible scenarios
  }

  getTargetCorrectAnswers() {
    switch (this.level) {
      case 1:
        return 5; // Level 1: 5 correct answers to complete
      case 2:
        return 10; // Level 2: 10 correct answers to complete
      case 3:
        return 15; // Level 3: 15 correct answers to complete
      default:
        return 5;
    }
  }

  setLevel(level) {
    this.level = level;
    this.correctAnswersCount = 0;
    this.targetCorrectAnswers = this.getTargetCorrectAnswers();
    this.maxNumbersOnScreen = this.getMaxNumbers();
    this.spawnRate = this.getSpawnRate();
    this.numberSpeed = this.getNumberSpeed();

    // Update equation display level
    const equation = game.sprites.find(
      (sprite) => sprite instanceof EquationDisplay
    );
    if (equation) {
      equation.setLevel(level);
      equation.generateNewEquation();
    }
  }

  getMaxNumbers() {
    switch (this.level) {
      case 1:
        return 3;
      case 2:
        return 5;
      case 3:
        return 7;
      default:
        return 7;
    }
  }

  getSpawnRate() {
    switch (this.level) {
      case 1:
        return 150; // Slower spawn rate for beginners
      case 2:
        return 100; // Moderate spawn rate for Level 2
      case 3:
        return 60;
      default:
        return 60;
    }
  }

  getNumberSpeed() {
    switch (this.level) {
      case 1:
        return 1.0; // Slower speed for beginners
      case 2:
        return 2.0; // Faster but balanced for Level 2
      case 3:
        return 3.5;
      default:
        return 3.5;
    }
  }

  update(sprites, keys) {
    this.spawnCounter++;

    const currentNumbers = sprites.filter(
      (sprite) => sprite instanceof Number
    ).length;

    // Check obstacle count and remove oldest if at limit
    const obstacles = sprites.filter((sprite) => sprite instanceof Obstacle);
    if (obstacles.length > this.maxObstacles) {
      obstacles[0].deleted = true; // Remove oldest obstacle
      console.log('Max obstacles reached, removing oldest.');
    }

    if (
      this.spawnCounter >= this.spawnRate &&
      currentNumbers < this.maxNumbersOnScreen
    ) {
      this.spawnNumber(sprites);
      this.spawnCounter = 0;
    }

    return false;
  }

  spawnNumber(sprites) {
    const equation = sprites.find(
      (sprite) => sprite instanceof EquationDisplay
    );
    if (!equation) return;

    const correctAnswer = equation.getCorrectAnswer();
    const randomX = Math.random() * (game.canvas.width - 40);

    // Adjust correct answer spawn rate by level
    let correctChance;
    switch (this.level) {
      case 1:
        correctChance = 0.4; // 40% correct - beginner friendly
        break;
      case 2:
        correctChance = 0.35; // 35% correct - moderate challenge
        break;
      case 3:
      default:
        correctChance = 0.3; // 30% correct - challenging
        break;
    }
    const isCorrect = Math.random() < correctChance;
    let value;

    if (isCorrect) {
      value = correctAnswer;
    } else {
      // Generate wrong answers in a realistic range around the correct answer
      const minWrong = Math.max(1, correctAnswer - 5);
      const maxWrong = correctAnswer + 5;

      do {
        value =
          Math.floor(Math.random() * (maxWrong - minWrong + 1)) + minWrong;
      } while (value === correctAnswer);
    }

    sprites.push(new Number(randomX, -40, value, isCorrect, this.numberSpeed));
  }

  onCorrectAnswerHit() {
    this.correctAnswersCount++;

    if (this.correctAnswersCount >= this.targetCorrectAnswers) {
      // Level 1 completed - advance to Level 2
      if (this.level === 1) {
        console.log('Level 1 Complete! Moving to Level 2...');
        game.changeLevel(2);
      } else if (this.level === 2) {
        // Level 2 completed - advance to Level 3
        console.log('Level 2 Complete! Moving to Level 3...');
        game.changeLevel(3);
      } else {
        console.log('Level 3 Complete! You win!');
        // Could add a win screen here
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`Level: ${this.level}`, game.canvas.width - 30, 40);
    ctx.fillText(
      `Progress: ${this.correctAnswersCount}/${this.targetCorrectAnswers}`,
      game.canvas.width - 30,
      60
    );
  }
}

class Obstacle extends Sprite {
  constructor(x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.deleted = false;
  }

  update(sprites, keys) {
    return this.deleted;
  }

  draw(ctx) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
