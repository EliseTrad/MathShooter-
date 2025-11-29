# Math Shooter+ Game Design Document

**Version:** 2.0 | **Date:** November 29, 2025 | **Developer:** Elise |
**Course:** CSIS250  
**Platform:** Web Browser | **Genre:** Educational Action Shooter | **Target
Audience:** Ages 8-12

---

## Table of Contents

1. [Game Concept and Scope](#1-game-concept-and-scope)
2. [Core Game Mechanics and Rules](#2-core-game-mechanics-and-rules)
3. [Game World Design](#3-game-world-design)
4. [Characters](#4-characters)
5. [Story Arc and Narrative Progression](#5-story-arc-and-narrative-progression)
6. [Level Design and Difficulty Progression](#6-level-design-and-difficulty-progression)
7. [Art Style and Visuals](#7-art-style-and-visuals)
8. [Audio Design](#8-audio-design)
9. [User Interface Design](#9-user-interface-design)
10. [Technical Requirements](#10-technical-requirements)
11. [Marketing and Promotion](#11-marketing-and-promotion)
12. [Development Schedule](#12-development-schedule)
13. [Appendices](#13-appendices)

---

## 1. Game Concept and Scope

**Core Concept:** Math Shooter+ is an educational arcade shooter where players
solve mathematical equations by shooting falling numbers. The game combines
fast-paced action with mental math practice, transforming learning into engaging
gameplay.

**Inspired Vision:** Created by Ellie, a young mathematician who believed
learning should be fun and accessible, Math Shooter+ demonstrates how game-based
learning can make mathematics enjoyable for students.

**Scope:** 3 progressive gameplay levels, menu system (main menu, pause, story,
how-to-play, controls), mathematical operations (addition, subtraction,
multiplication), resource management (stars, shields, lives), and audio-visual
feedback.

**Educational Alignment:** Common Core Standards (CCSS.MATH 1-3.OA) for
addition, subtraction, and multiplication fluency within appropriate ranges.

---

## 2. Core Game Mechanics and Rules

**Primary Mechanics:**

- **Shooting:** Player fires bullets upward to hit falling numbers matching the
  equation's answer
- **Movement:** Left/right arrow keys control horizontal position; spacebar
  jumps (gravity-based physics)
- **Equation Solving:** Dynamic equation display at top of screen; solve by
  shooting correct answer

**Resource Management:**

- **Stars:** Earned per correct answer (1 star each); currency for purchases
- **Shields:** Single-use protection purchased with stars (cost: 2/4/8 stars by
  level); grants immunity to one hit
- **Lives:** Start with 5; lost by shooting wrong numbers, colliding with
  enemies/obstacles, or letting numbers reach ground
- **Conversion System:** 20 shield purchases = 1 permanent life; 40 stars = 1
  life (direct purchase)

**Scoring Rules:**

- Correct answer hit: +1 star, progress toward win condition, generate new
  equation
- Wrong answer hit: -1 life (unless shielded), spawn 2 penalty numbers (Level
  2+)
- Number collision with player: -1 life (unless shielded or invincible)
- Obstacle collision: -1 life (unless shielded)

**Win/Lose Conditions:**

- Win: Reach target correct answers (5/10/15 by level) before question limit
- Lose: Exceed maximum questions (10/15/20), or lives reach zero

---

## 3. Game World Design

**Visual Style:** Minimalist geometric shapes with bright educational colors
(blue player, light blue numbers, red obstacles, gold stars)

**Environment:** Simple 2D side-view with ground level at bottom, equation
display at top, open middle space for gameplay

**Level Themes:**

- **Level 1 - Forest Camp:** Peaceful learning environment with pink/purple
  animated campfire, gentle introduction
- **Level 2 - Obstacle Course:** Structured challenge with dynamic red obstacles
  spawning from missed correct answers
- **Level 3 - Advanced Arena:** High-intensity zone with maximum difficulty,
  fastest enemies, multiplication operations

**Audio Design:** Looping background music, win/lose sound effects that pause
music for dramatic impact

---

## 4. Characters

**Player Character - The Math Hero:**

- **Appearance:** 40×40px blue rectangle with white rectangular eyes and red
  smile
- **Abilities:** Quick calculation, precise shooting, agile jumping, strategic
  resource management
- **States:** Normal, shielded (cyan glow), invincible (flashing), jumping
- **Progression:** Stars accumulate across levels; shield purchase history
  tracked; lives can increase through strategic spending

**Enemies:**

- **Wrong Answer Numbers:** Light blue 40×40px blocks displaying incorrect
  values; passive falling movement; life loss on contact or shooting
- **Red Obstacle Blocks:** Active hazards created when correct answers reach
  ground (Level 2+); horizontal pursuit movement at increasing speeds
  (1.5×-3.0×); destroyed on collision

**Supporting Elements:**

- **Equation Display:** Mathematical challenge presenter at screen top; dynamic
  generation based on level operations
- **HUD Elements:** Lives (hearts), stars (gold), shield/conversion buttons
  providing real-time resource feedback

---

## 5. Story Arc and Narrative Progression

**Narrative Premise:** Ellie, a passionate young mathematician, loved math so
much that she wanted to create tools to help other kids enjoy learning. She
built Math Shooter+ as a magical world where mathematical knowledge becomes
power, and players defend against the chaos of incorrect calculations through
accuracy and quick thinking.

**Progression Structure:**

- **Tutorial Phase (Level 1):** Introduction at peaceful campfire; master basic
  addition/subtraction (5 correct answers); build confidence
- **Challenge Phase (Level 2):** Apply skills under pressure; consequences for
  mistakes introduce obstacles (10 correct answers); strategic decision-making
- **Mastery Phase (Level 3):** Ultimate test with multiplication; prove
  mathematical excellence (15 correct answers); high-intensity culmination

**Character Development:** Player evolves from cautious beginner → confident
problem-solver → mathematical master

**Achievement Milestones:** First correct answer (star economy introduction),
first shield purchase (defensive strategy), level completion (competence
validation), game completion (full mastery)

---

## 6. Level Design and Difficulty Progression

**Level 1 - Forest Camp (Beginner):**

- Target: 5 correct / 10 total questions | Operations: +, - (range 1-10)
- Speed: 1.3× fall speed, 150-frame spawn delay | Max 3 numbers on screen
- Special: Campfire animation, no obstacles, 40% correct answer rate
- Learning Focus: Core mechanics, equation solving rhythm, resource introduction

**Level 2 - Obstacle Course (Intermediate):**

- Target: 10 correct / 15 total questions | Operations: +, - (range 1-10)
- Speed: 2.3× fall speed, 100-frame spawn delay | Max 5 numbers on screen
- Mechanics: Obstacles spawn from missed correct answers, 1.5× obstacle speed
- Penalty: Wrong answer spawns 2 additional numbers | 35% correct answer rate
- Learning Focus: Obstacle avoidance, strategic positioning, resource pressure

**Level 3 - Advanced Arena (Hard):**

- Target: 15 correct / 20 total questions | Operations: +, -, × (mult range 1-5)
- Speed: 3.0× fall speed, 60-frame spawn delay | Max 7 numbers on screen
- Mechanics: 3.0× obstacle speed, multiplication introduced | 30% correct answer
  rate
- Challenge: Expensive shields (8 stars), sustained performance required
- Learning Focus: Multiplication mastery, optimal resource management,
  multi-tasking

**Difficulty Scaling:** Progressive increases in speed (1.3→3.0×), spawn rate
(150→60 frames), question count (10→20), complexity (addition→multiplication),
and shield cost (2→8 stars) create smooth learning curve

**Pedagogical Design:** Each level builds on previous knowledge, scaffolded
difficulty prevents frustration while maintaining engagement, immediate feedback
reinforces learning

---

## 7. Art Style and Visuals

**Visual Direction:** Minimalist geometric design with vibrant, child-friendly
colors emphasizing clarity and educational focus

**Color Palette:**

- Primary: Bright blue (#4169E1) player, light pink (#FFB6C1) numbers, deep pink
  (#FF1493) UI
- Accents: Gold (#FFD700) stars, red (#FF0000) obstacles, cyan (#00FFFF) shields
- Background: Black (#000000) for maximum contrast

**Character Design:** 40×40px geometric shapes - blue rectangle player with
white eyes and red smile; uniform pink number squares; red obstacle blocks

**Environmental Elements:** Campfire animation (80×64px, 4 frames), ground line,
white-bordered equation display box

**Visual Effects:** Cyan shield glow, invincibility flashing (opacity 0.3-1.0),
consistent 2-3px stroke widths

---

## 8. Audio Design

**Music:** Looping upbeat electronic background track (background.mp3, 120 BPM,
2-3 min loop, 30-40% volume)

**Sound Effects:**

- Win: Triumphant ascending chime (win.mp3, ~2s)
- Lose: Gentle descending tone (lose.mp3, ~1.5s)
- Jump/Shoot: Short pop effect (jump.wav, ~0.3s)

**Behavior:** Music stops on win/lose, starts on spacebar press, effects play
independently without overlap

---

## 9. User Interface Design

**Main Menu:** 4 centered buttons (200×50px) - "Start Game", "How to Play",
"Story", "Controls"; hover color shift

**Pause Menu:** Semi-transparent overlay, 3 buttons ("Continue", "Reset Level",
"Main Menu"); shortcuts P/ESC/C

**HUD (Top-Left):** Heart row (lives), star count, "Buy Shield" button with
dynamic cost, conversion button after 20 shields

**Equation Display:** Top-center white box (200×60px), 28px Arial text,
regenerates per answer

**Win/Lose Screens:** Large centered text (72px), "Press SPACE" instruction,
dimmed background

---

## 10. Technical Requirements

**Platform:** Web browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+);
800×600 minimum resolution

**Software:** HTML5 Canvas, Web Audio API, JavaScript ES5/ES6; no plugins
required

**Hardware:** Minimum dual-core CPU, 2GB RAM, integrated graphics; keyboard and
mouse required

**Performance:** 60 FPS locked, <10MB memory, <3s load time, 20-50 active
sprites

**Compatibility:** Safari audio autoplay restrictions; mobile touch not
supported; IE11 not supported

---

## 11. Marketing and Promotion

**Target:** Elementary/middle students (8-12), parents, educators seeking math
practice tools

**Distribution:** GitHub Pages hosting, educational platforms, teacher resource
sites, social media edu-gaming groups

**Selling Points:** Free web-based, Common Core aligned (CCSS.MATH 1-3.OA),
engaging non-traditional edutainment, peer-created

**Materials:** Gameplay video (1-2 min), screenshots, educational brief for
teachers, GitHub README

---

## 12. Development Schedule

**Timeline:** 8-10 weeks (semester project)

- ✅ Weeks 1-2: Pre-production (GDD, TDD, assets, repo setup)
- ✅ Weeks 3-5: Core development (engine, player, collision, HUD)
- ✅ Weeks 6-7: Content (3 levels, menus, audio, animations)
- ✅ Week 8: Testing and polish (bug fixes, cleanup, balance)
- 🔄 Weeks 9-10: Submission (final testing, docs, presentation, demo)

---

## 13. Appendices

**Appendix A - Difficulty Scaling:**

| Parameter       | Level 1 | Level 2 | Level 3 |
| --------------- | ------- | ------- | ------- |
| Correct Answers | 5       | 10      | 15      |
| Max Questions   | 10      | 15      | 20      |
| Fall Speed      | 1.3×    | 2.3×    | 3.0×    |
| Spawn Delay     | 150     | 100     | 60      |
| Max Numbers     | 3       | 5       | 7       |
| Shield Cost     | 2       | 4       | 8       |
| Operations      | +, -    | +, -    | +, -, × |

**Appendix B - Controls:**

- Arrow Left/Right: Move
- Spacebar: Jump + Shoot + Continue
- P/Escape: Pause
- C: Continue from pause
- Mouse: Click buttons

**Appendix C - Learning Alignment:**

- Common Core: CCSS.MATH 1-3.OA (fluency in addition, subtraction,
  multiplication)
- 21st Century: Critical thinking, problem-solving, adaptability, persistence

**Appendix D - Future Enhancements:**

- LocalStorage high scores, difficulty settings, division operation, touch
  controls, power-ups, level editor, multiplayer, achievements

---

**Document Status:** Complete | **Version:** 2.0 | **Last Updated:** November
29, 2025 | **Maintained By:** Elise
