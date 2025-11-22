# Math Shooter+

A fast-paced educational game where players shoot falling numbers to solve math
equations while avoiding obstacles.

## Game Overview

Math Shooter+ is a multi-level arcade game that combines math practice with
action gameplay. Players must shoot the correct answers to equations while
managing resources and avoiding hazards.

## How to Play

### Controls

- **Arrow Keys (Left/Right)**: Move the player horizontally
- **Arrow Key (Up)**: Jump over obstacles
- **Spacebar**: Shoot bullets upward
- **Mouse Click**: Interact with UI buttons (shield purchase, shield conversion)

### Objective

Shoot falling numbers that match the equation displayed at the top of the
screen. Earn stars for each correct answer and progress through increasingly
difficult levels.

## Game Mechanics

### Levels

- **Level 1 (Beginner)**: Addition and subtraction, 5 correct answers to
  complete
- **Level 2 (Moderate)**: Addition and subtraction with obstacles, 10 correct
  answers to complete
- **Level 3 (Hard)**: Addition, subtraction, and multiplication with more
  obstacles, 15 correct answers to complete

### Scoring & Resources

- **Stars**: Earn 1 star for each correct answer
- **Lives**: Start with 5 lives, lose 1 life for hitting wrong answers or
  falling numbers
- **Shield Cost**: 15 stars for 1 shield (single-use protection)
- **Extra Life Cost**: 40 stars for +1 life

### Obstacles (Level 2 & 3 Only)

- Obstacles appear when correct answers reach the ground without being shot
- Red rectangular blocks that persist on the ground
- Block horizontal movement but can be jumped over
- Maximum 8 obstacles per level (oldest removed automatically)
- Colliding with obstacles costs 1 life (unless protected by shield)
- **Invincibility Frames**: 1 second of protection after obstacle collision

### Shield System

- Purchase shields using the green **"Buy Shield"** button (15 stars)
- Shields block the next damage from obstacles OR falling numbers
- Visual indicator: Cyan glow around player when shield is active
- Shields are single-use and destroyed upon blocking damage
- Can only have 1 shield active at a time

### Shield Conversion

- After purchasing 20 total shields, a purple **"Convert 20 Shields → +1 Life"**
  button appears
- Strategic choice: renewable shields vs permanent life increase
- Conversion costs 20 shield purchases (not stars)

### Penalties

- **Wrong Answer Hit**: Lose 1 life
- **Level 2+**: Hitting wrong answers spawns 2 additional falling numbers
- **Missed Correct Answer (Level 2+)**: Creates an obstacle on the ground
- **Falling Number Collision**: Lose 1 life (unless protected by shield)
- **Obstacle Collision**: Lose 1 life (unless protected by shield)

## Difficulty Progression

| Level | Numbers on Screen | Spawn Rate | Fall Speed | Operations | Win Condition |
| ----- | ----------------- | ---------- | ---------- | ---------- | ------------- |
| 1     | 3                 | 150 frames | 1.0        | +, -       | 5 correct     |
| 2     | 5                 | 100 frames | 2.0        | +, -       | 10 correct    |
| 3     | 7                 | 60 frames  | 3.5        | +, -, ×    | 15 correct    |

## Tips & Strategy

1. **Prioritize Correct Answers**: In Level 2+, missing correct answers creates
   obstacles
2. **Shield Management**: Save shields for difficult moments when obstacles
   accumulate
3. **Jump Timing**: Learn to jump over obstacles while shooting
4. **Star Economy**:
   - Shields (15 stars) provide immediate protection
   - Lives (40 stars) are expensive but permanent
   - Shield conversion (20 purchases) is for long-term survival
5. **Obstacle Avoidance**: Keep the ground clear by shooting correct answers
   quickly

## Technical Details

### File Structure

```
index.htm           - Main HTML entry point
js/
  game.js           - Core game engine and sprite system
  sprites.js        - Reusable sprite classes (text, buttons, sounds)
  player.js         - Player and bullet mechanics
  gameElements.js   - Numbers, equations, obstacles, generator
  hud.js            - UI elements (lives, stars, buttons)
  menuLevel.js      - Title screen
  level1.js         - Level 1 initialization
  level2.js         - Level 2 initialization
  level3.js         - Level 3 initialization
  main.js           - Game initialization and level registration
assets/
  sounds/           - Audio files
```

### Key Features

- **Modular Architecture**: Separate files for different game systems
- **Level Persistence**: Stars and shields carry over between levels
- **Collision Detection**: AABB (Axis-Aligned Bounding Box) system
- **Mouse & Keyboard Input**: Dual input support for accessibility
- **Invincibility System**: Prevents rapid repeated damage
- **Dynamic Difficulty**: Level-specific parameters for balanced progression

## Game Balance

- **Obstacle Density**: Maximum 8 obstacles prevents impossible scenarios
- **Anti-Clustering**: Obstacles won't spawn within 50px of each other
- **Invincibility Frames**: 60 frames (1 second) after obstacle damage
- **Resource Economy**: Shield costs balanced for meaningful decisions
- **Correct Answer Rate**: 40%/35%/30% spawn rate by level

## Credits

Built with custom JavaScript game engine for CSIS250.
