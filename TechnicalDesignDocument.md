# Math Shooter+ Technical Design Document

**Version:** 1.0 | **Date:** November 29, 2025 | **Developer:** Elise |
**Course:** CSIS250

---

## 1. System Overview

**Platform:** Web Browser (HTML5 Canvas) | **Language:** Vanilla JavaScript
(ES5/ES6) | **No External Libraries**

**Technology Stack:**

- Rendering: HTML5 Canvas 2D API
- Logic: JavaScript with prototype-based inheritance
- Audio: HTML5 Audio elements
- Input: DOM event listeners (keyboard, mouse)

---

## 2. Software Architecture

**Core Components:**

1. **Game Engine (game.js):** Singleton controller managing game loop (60 FPS
   via `requestAnimationFrame`), sprite lifecycle, and level transitions
2. **Sprite System:** Base `Sprite` class inherited by `Player`, `Number`,
   `Bullet`, `Obstacle`, `Button`, `TextSprite`
3. **Level Manager:** Abstract `Level` base class with specific implementations
   (`MenuLevel`, `GameplayLevel`, `PauseMenuLevel`)
4. **HUD System (hud.js):** UI components (`Lives`, `Stars`, `ShieldButton`,
   `Win`, `Lose`)

**Game Loop (60 FPS):**

```
LOOP:
  1. Process queued level changes (pendingLevelIndex)
  2. Update all sprites (sprite.update())
  3. Remove deleted sprites (markedForDeletion)
  4. Render canvas (clear, draw all sprites)
  5. Request next frame (requestAnimationFrame)
```

**Module Dependencies:** constants.js → game.js → [sprites.js, player.js,
gameElements.js] → levelBase.js → level1/2/3.js → main.js

---

## 3. Data Structures

**Sprite (Base Class):**

```javascript
{
  x, y, width, height, markedForDeletion, update(), draw(), isClicked();
}
```

**Player:**

```javascript
{
  position: {x, y},
  velocityY: 0,
  isJumping: false,
  shootCooldown: 0,
  hasShield: false,
  invincibilityTimer: 0,
  stars: 0,
  lives: 5,
  shieldsPurchased: 0
}
```

**Number (Enemy):**

```javascript
{
  x, y, value, isCorrect, speed, hit;
}
```

**Level:**

```javascript
{
  sprites: [],
  levelNumber: 1-3,
  correctAnswers: 0,
  totalQuestions: 0,
  targetCorrectAnswers: 5/10/15,
  maxQuestions: 10/15/20,
  numberSpeed: 1.0/2.0/3.5,
  spawnDelay: 150/100/60,
  maxNumbers: 3/5/7
}
```

**Equation:**

```javascript
{operand1, operator: '+|-|×', operand2, answer}
```

---

## 4. Core Algorithms (Pseudocode)

**Movement:**

```
IF ArrowLeft: player.x -= 5
IF ArrowRight: player.x += 5
Clamp player.x to canvas bounds
player.velocityY += GRAVITY (0.5)
player.y += player.velocityY
IF player.y >= GROUND_LEVEL: stop falling, isJumping = false
```

**Collision (AABB):**

```
FUNCTION checkCollision(rect1, rect2):
  RETURN rect1.x < rect2.x + rect2.width AND
         rect1.x + rect1.width > rect2.x AND
         rect1.y < rect2.y + rect2.height AND
         rect1.y + rect1.height > rect2.y
```

**Scoring:**

```
IF bullet hits correct number:
  player.stars += 1
  correctAnswers += 1
  Generate new equation
ELSE IF bullet hits wrong number:
  player.lives -= 1 (if not shielded/invincible)
  Spawn 2 penalty numbers (Level 2+)
```

**Pause/Resume:**

```
PAUSE: savedSprites = clone(currentLevel.sprites); savedLevelIndex = levelIndex; isPaused = true
RESUME: pendingSprites = savedSprites; pendingLevelIndex = savedLevelIndex; isPaused = false
```

**Reset:**

```
isResetting = true; ChangeLevel(currentLevelIndex); // Fresh level start
```

---

## 5. APIs and Libraries

**Browser APIs (No External Libraries):**

- `Canvas 2D Context`: Graphics rendering (`fillRect`, `strokeRect`, `fillText`,
  `clearRect`)
- `requestAnimationFrame`: 60 FPS game loop timing
- `HTML5 Audio`: Sound playback (`<audio>` elements for background music,
  win/lose sounds)
- `DOM Events`: Input handling (`keydown`, `keyup`, `click`, `mousemove`)

**Custom Utilities:**

- `randomInt(min, max)`: Random number generation
- `clamp(value, min, max)`: Boundary constraint
- AABB collision detection function

---

## 6. Security and Stability

**Input Validation:**

- Whitelist allowed keys (`ArrowLeft`, `ArrowRight`, ` `, `P`, `Escape`, `C`)
- Prevent default browser behavior for game keys
- Bounds check mouse coordinates (ignore clicks outside canvas)
- Click throttling to prevent spam

**State Validation:**

- Clamp player lives/stars to non-negative values
- Validate level indices (0-9 range check)
- Sprite array consistency (remove marked sprites after update)
- Safe resource spending (check sufficient stars before deduction)

**Memory Management:**

- Mark sprites for deletion (`markedForDeletion = true`) instead of immediate
  removal
- Batch cleanup after update cycle to prevent mid-loop modifications
- Single audio instance per type (no accumulation)
- Proper audio reset (`currentTime = 0`) before replay

**Crash Prevention:**

- Queue level transitions (`pendingLevelIndex`) to avoid mid-update conflicts
- Prevent recursive level changes with `isChangingLevel` flag
- Entity limits (max 10 bullets, 20 numbers, 8 obstacles)
- Try-catch around game loop with error display
- Null checks before collision detection
- Maximum update iterations per frame (100) to prevent infinite loops

**Performance Safeguards:**

- Off-screen sprite culling (skip rendering if outside viewport)
- Early exit on paused state
- Frame rate monitoring (warn if FPS < 30)
- Entity spawn throttling based on delay timers

---

## 7. File Structure

```
Math Shooter+/
├── index.htm               # Entry point, canvas, audio elements
├── assets/sounds/          # background.mp3, win.mp3, lose.mp3
└── js/
    ├── main.js             # Bootstrap (~50 lines)
    ├── game.js             # Engine (~350 lines)
    ├── constants.js        # Config (~100 lines)
    ├── sprites.js          # UI components (~200 lines)
    ├── gameElements.js     # Game entities (~450 lines)
    ├── player.js           # Player controller (~250 lines)
    ├── hud.js              # HUD components (~300 lines)
    ├── levelBase.js        # Gameplay base (~100 lines)
    ├── level1/2/3.js       # Specific levels (~80 lines each)
    ├── menuLevel.js        # Main menu (~80 lines)
    ├── pauseMenuLevels.js  # Pause system (~250 lines)
    ├── storyLevel.js       # Story screen (~60 lines)
    ├── howToPlayLevel.js   # Instructions (~80 lines)
    └── controlsLevel.js    # Controls guide (~70 lines)
```

**Script Load Order:** constants.js → game.js → sprites.js → gameElements.js →
player.js → hud.js → levelBase.js → levels → main.js

---

**Version:** 1.0 | **Last Updated:** November 29, 2025 | **Maintained By:**
Elise
