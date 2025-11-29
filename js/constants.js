/**
 * @fileoverview Game configuration constants for Math Shooter+
 * @author Math Shooter+ Development Team
 * @version 1.0.0
 */

// ============================================================================
// PLAYER CONFIGURATION
// ============================================================================

/** @const {number} Player sprite width in pixels */
const PLAYER_WIDTH = 40;

/** @const {number} Player sprite height in pixels */
const PLAYER_HEIGHT = 40;

/** @const {number} Player movement speed in pixels per frame */
const PLAYER_SPEED = 5;

/** @const {number} Distance from bottom of canvas to player ground position */
const PLAYER_GROUND_OFFSET = 100;

// ============================================================================
// HUD POSITIONING
// ============================================================================

/** @const {number} Left margin for all HUD elements */
const HUD_LEFT_MARGIN = 30;

/** @const {number} Y position for lives display */
const HUD_LIVES_Y = 50;

/** @const {number} Y position for stars display */
const HUD_STARS_Y = 90;

/** @const {number} Y position for shield purchase button */
const HUD_SHIELD_BUTTON_Y = 120;

/** @const {number} Y position for shield conversion button */
const HUD_CONVERSION_BUTTON_Y = 170;

// ============================================================================
// EQUATION DISPLAY
// ============================================================================

/** @const {number} X position for equation display */
const EQUATION_X = 50;

/** @const {number} Y position for equation display */
const EQUATION_Y = 50;

// ============================================================================
// GAME ECONOMY
// ============================================================================

/** @const {number} Star cost for purchasing one shield */
const SHIELD_COST = 5;

/** @const {number} Star cost for purchasing one extra life */
const LIFE_COST = 40;

/** @const {number} Number of shield purchases required for life conversion */
const SHIELDS_FOR_LIFE_CONVERSION = 20;

// ============================================================================
// OBSTACLE SYSTEM
// ============================================================================

/** @const {number} Obstacle sprite width in pixels */
const OBSTACLE_WIDTH = 40;

/** @const {number} Obstacle sprite height in pixels */
const OBSTACLE_HEIGHT = 40;

/** @const {number} Minimum distance between obstacles to prevent overlap */
const OBSTACLE_SPACING_MIN = 50;

/** @const {number} Maximum number of obstacles allowed in levels 2+ */
const MAX_OBSTACLES_LEVEL_2_PLUS = 8;

// ============================================================================
// PROJECTILES & NUMBERS
// ============================================================================

/** @const {number} Falling number sprite width in pixels */
const NUMBER_WIDTH = 40;

/** @const {number} Falling number sprite height in pixels */
const NUMBER_HEIGHT = 40;

/** @const {number} Player bullet width in pixels */
const BULLET_WIDTH = 5;

/** @const {number} Player bullet height in pixels */
const BULLET_HEIGHT = 10;

/** @const {number} Player bullet movement speed in pixels per frame */
const BULLET_SPEED = 8;

// ============================================================================
// PHYSICS CONSTANTS
// ============================================================================

/** @const {number} Gravity acceleration applied to jumping player */
const GRAVITY = 0.5;

/** @const {number} Initial upward velocity when player jumps */
const JUMP_SPEED = -12;

// ============================================================================
// TIMING & DELAYS
// ============================================================================

/** @const {number} Frames of invincibility after taking damage (60fps = 1 second) */
const INVINCIBILITY_FRAMES = 60;

/** @const {number} Frames between allowed bullet shots */
const SHOOT_COOLDOWN_FRAMES = 15;
