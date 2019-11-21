// Display constants
const RATIO  = window.devicePixelRatio;
const WIDTH  = 540;
const HEIGHT = 853;
const TARGET = 'phaser-example';

// Score constants
const DELTA_SCORE      = 0.2;
const SCORE_MULTIPLIER = 500;

// Sprite constants
const SPRITE_FRAMERATE = 8;
const SPRITE_SCALE     = 4;

// Overlay constants
const OVERLAY_LOWER_X = 0;
const OVERLAY_LOWER_Y = 360;
const OVERLAY_UPPER_X = 0;
const OVERLAY_UPPER_Y = 0;

// Speed constants
const PARTICLE_SPEED = 200;
const SCROLL_SPEED   = 1;
const CLOUD_SPEED    = 2;
const ENEMY_SPEED    = 240;
const JUMP_SPEED     = 1500;
const GRAVITY        = 4800;

// User interface constants
const CREST_X         = 0;
const CREST_Y         = 360;
const RECT_DEAD_X     = 0;
const RECT_DEAD_Y     = 0;
const RECT_DEAD_W     = WIDTH;
const RECT_DEAD_H     = 360;
const RECT_DEAD_COLOR = 0xFF0000;
const RECT_UI_X       = 0;
const RECT_UI_Y       = RECT_DEAD_H;
const RECT_UI_W       = WIDTH;
const RECT_UI_H       = HEIGHT - RECT_UI_Y;
const RECT_UI_COLOR   = 0x5A4AC0;
const BUTTON_X        = 198;
const BUTTON_Y        = 492;

// Player constants
const PLAYER_X      = 64;
const PLAYER_Y      = -28;
const PLAYER_W      = 5;
const PLAYER_H      = 10;
const PLAYER_BODY_X = 15;
const PLAYER_BODY_Y = 22;

// Cloud constants
const MIN_CLOUD_Y = 0;
const MAX_CLOUD_Y = 200;

// Font constants
const FONT_SIZE = 28;

// Text constants
const TEXT_GAME_OVER_X  = 144;
const TEXT_GAME_OVER_Y  = 642;
const TEXT_SCORE_X      = 360;
const TEXT_SCORE_Y      = 399;
const TEXT_SCORE_HIGH_X = 40;
const TEXT_SCORE_HIGH_Y = 399;

// Timing constants
const DELAY_ADD_ENEMY = 60;

// Emitter constants
const EMITTER_NUM_PARTICLES = 15;
const EMITTER_EXPLODE_COUNT = 12;
const EMITTER_EXPLODE_TIME  = 500;
