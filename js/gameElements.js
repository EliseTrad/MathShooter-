class Number extends Sprite {
  constructor(x, y, value, isCorrect, speed = 2) {
    super();
    this.x = x;
    this.y = y;
    this.value = value;
    this.isCorrect = isCorrect;
    this.speed = speed;
    this.width = NUMBER_WIDTH;
    this.height = NUMBER_HEIGHT;
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

    if (this.isCorrect) {
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
        generator.questionsAsked++;
        generator.onCorrectAnswerHit();
      }
    } else {
      let wrongGenerator = game.sprites.find(
        (sprite) => sprite instanceof NumberGenerator
      );
      if (wrongGenerator) {
        wrongGenerator.questionsAsked++;
      }

      const equation = game.sprites.find(
        (sprite) => sprite instanceof EquationDisplay
      );
      if (equation) {
        equation.generateNewEquation();
      }

      const player = game.sprites.find((sprite) => sprite instanceof Player);
      if (player && player.hasShield) {
        player.hasShield = false;
      } else {
        const lives = game.sprites.find((sprite) => sprite instanceof Lives);
        if (lives) {
          lives.removeOneLife();
          if (lives.lives <= 0) {
            game.sprites.push(
              new Lose(game.canvas.width / 2, game.canvas.height / 2)
            );
          }
        }

        const generator = game.sprites.find(
          (sprite) => sprite instanceof NumberGenerator
        );

        if (generator && generator.level >= 2) {
          const equation = game.sprites.find(
            (sprite) => sprite instanceof EquationDisplay
          );
          const correctAnswer = equation ? equation.getCorrectAnswer() : 10;

          for (let i = 0; i < 2; i++) {
            const randomX = Math.random() * (game.canvas.width - 40);
            const minWrong = Math.max(1, correctAnswer - 5);
            const maxWrong = correctAnswer + 5;
            let wrongValue;

            do {
              wrongValue =
                Math.floor(Math.random() * (maxWrong - minWrong + 1)) +
                minWrong;
            } while (wrongValue === correctAnswer);

            game.sprites.push(
              new Number(randomX, -40, wrongValue, false, generator.numberSpeed)
            );
          }
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

    if (this.isCorrect && generator && generator.level >= 2) {
      const existingObstacle = sprites.find(
        (sprite) =>
          sprite instanceof Obstacle &&
          Math.abs(sprite.x - this.x) < OBSTACLE_SPACING_MIN
      );

      if (!existingObstacle) {
        const player = game.sprites.find((sprite) => sprite instanceof Player);
        const obstacleY = player
          ? player.groundY
          : game.canvas.height - PLAYER_GROUND_OFFSET;
        const obstacleSpeed = generator.level === 3 ? 3.0 : 1.5;
        sprites.push(
          new Obstacle(
            this.x,
            obstacleY,
            OBSTACLE_WIDTH,
            OBSTACLE_HEIGHT,
            obstacleSpeed,
            generator.level
          )
        );
      }
    }
  }

  draw(ctx) {
    // All numbers have the same color - no hints!
    ctx.fillStyle = '#FFB6C1';
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

    ctx.fillStyle = 'rgba(255, 192, 203, 0.9)';
    ctx.fillRect(boxX - 10, this.y - 30, boxWidth, 50);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX - 10, this.y - 30, boxWidth, 50);

    ctx.fillStyle = '#FF1493';
    ctx.font = 'bold 48px Arial';
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
    this.questionsAsked = 0;
    this.targetCorrectAnswers = this.getTargetCorrectAnswers();
    this.totalQuestions = this.getTotalQuestions();
    this.maxNumbersOnScreen = this.getMaxNumbers();
    this.spawnRate = this.getSpawnRate();
    this.numberSpeed = this.getNumberSpeed();
    this.maxObstacles = level >= 2 ? MAX_OBSTACLES_LEVEL_2_PLUS : 0;
  }

  getTargetCorrectAnswers() {
    switch (this.level) {
      case 1:
        return 5; // Level 1: 5 correct answers to complete (out of 10 questions)
      case 2:
        return 10; // Level 2: 10 correct answers to complete (out of 15 questions)
      case 3:
        return 15; // Level 3: 15 correct answers to complete (out of 20 questions)
      default:
        return 5;
    }
  }

  getTotalQuestions() {
    switch (this.level) {
      case 1:
        return 10; // Level 1: 10 total questions
      case 2:
        return 15; // Level 2: 15 total questions
      case 3:
        return 20; // Level 3: 20 total questions
      default:
        return 10;
    }
  }

  setLevel(level) {
    this.level = level;
    this.correctAnswersCount = 0;
    this.questionsAsked = 0;
    this.targetCorrectAnswers = this.getTargetCorrectAnswers();
    this.totalQuestions = this.getTotalQuestions();
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

    const obstacles = sprites.filter((sprite) => sprite instanceof Obstacle);
    if (obstacles.length > this.maxObstacles) {
      obstacles[0].deleted = true;
    }

    if (
      this.spawnCounter >= this.spawnRate &&
      currentNumbers < this.maxNumbersOnScreen &&
      this.questionsAsked < this.totalQuestions
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

    sprites.push(
      new Number(randomX, -NUMBER_HEIGHT, value, isCorrect, this.numberSpeed)
    );
  }

  onCorrectAnswerHit() {
    this.correctAnswersCount++;

    if (this.correctAnswersCount >= this.targetCorrectAnswers) {
      if (this.level === 1) {
        game.changeLevel(5);
      } else if (this.level === 2) {
        game.changeLevel(6);
      } else {
        game.sprites.push(
          new Win(game.canvas.width / 2, game.canvas.height / 2)
        );
      }
    } else if (this.questionsAsked >= this.totalQuestions) {
      game.sprites.push(
        new Lose(game.canvas.width / 2, game.canvas.height / 2)
      );
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`Level: ${this.level}`, game.canvas.width - 30, 40);
    ctx.fillText(
      `Correct: ${this.correctAnswersCount}/${this.targetCorrectAnswers}`,
      game.canvas.width - 30,
      60
    );
    ctx.fillText(
      `Questions: ${this.questionsAsked}/${this.totalQuestions}`,
      game.canvas.width - 30,
      80
    );
  }
}

class Obstacle extends Sprite {
  constructor(x, y, width, height, speed = 1.5, level = 2) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.level = level;
    this.deleted = false;
    this.direction = null; // Will be set once: 1 for right, -1 for left
  }

  update(sprites, keys) {
    if (this.direction === null) {
      const player = game.sprites.find((sprite) => sprite instanceof Player);
      if (player) {
        this.direction = this.x < player.x ? 1 : -1;
      } else {
        this.direction = 1;
      }
    }

    this.x += this.speed * this.direction;

    const player = game.sprites.find((sprite) => sprite instanceof Player);

    if (player) {
      const horizontalCollision = Math.abs(this.x - player.x) < this.width;
      const verticalCollision = Math.abs(this.y - player.y) < this.height;

      if (horizontalCollision && verticalCollision) {
        // Check if player has shield
        if (player.hasShield) {
          player.hasShield = false;
        } else {
          const lives = game.sprites.find((sprite) => sprite instanceof Lives);
          if (lives) {
            lives.removeOneLife();
            if (lives.lives <= 0) {
              game.sprites.push(
                new Lose(game.canvas.width / 2, game.canvas.height / 2)
              );
            }
          }
        }

        this.deleted = true;
      }
    }

    if (this.x < -this.width || this.x > game.canvas.width) {
      this.deleted = true;
    }

    return this.deleted;
  }

  draw(ctx) {
    ctx.fillStyle = '#FF69B4';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
