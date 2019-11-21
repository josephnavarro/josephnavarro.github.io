// Game instance
var game = new Phaser.Game(
	WIDTH * RATIO,
	HEIGHT * RATIO,
	Phaser.CANVAS,
	TARGET,
	{
		preload: preload,
		create: create,
		render: render,
		update: update
	}
);


// Globals
var graphicsDead;
var groupBackground;
var groupButton;
var groupClouds;
var groupDead;
var groupEmitter;
var groupEnemy;
var groupOverlay;
var groupPlayer;
var groupText;
var overlayLower;
var overlayUpper;
var spriteBackground;
var spriteButton;
var spriteEmitterTap;
var spritePlayer;
var textGameOver;
var textScore;
var textScoreHigh;

var buttonDelay   = 0;
var delayAddEnemy = 0;
var hasAddTap     = false;
var hasLoaded     = false;
var isContact     = false;
var isDead        = false;
var level         = 'basic';
var score         = 0;
var scoreHigh     = 0;


// Adds restart button
function addButton()
{
	// Clear old buttons from group
	destroyButton();

	// Add new button
	var x = BUTTON_X * RATIO;
	var y = BUTTON_Y * RATIO;

	spriteButton = game.add.button(
		x, y,
		'button',
		handleButton,
		this,
		0, 0, 0
	);

	unsmoothSprite(spriteButton);
	scaleButtonSprite(spriteButton);

	// Add to button group
	groupButton.add(spriteButton);

	return spriteButton;
}


// Adds the tap particle emitter effect
function addEmitterTap()
{
	// Destroy old tap emitter
	destroyEmitterTap();

	// Add emitter and make particles
	spriteEmitterTap = game.add.emitter(0, 0, EMITTER_NUM_PARTICLES);
	spriteEmitterTap.makeParticles('tap', [0, 1, 2]);
	spriteEmitterTap.setAlpha(0.3, 0.8);

	// Scale up emitter
	var scale = RATIO * SPRITE_SCALE;
	spriteEmitterTap.setScale(scale, scale, scale, scale);

	// Normalize particle speeds
	var speed = RATIO * PARTICLE_SPEED;
	spriteEmitterTap.minParticleSpeed.x = -speed;
	spriteEmitterTap.minParticleSpeed.y = -speed;
	spriteEmitterTap.maxParticleSpeed.x = speed;
	spriteEmitterTap.maxParticleSpeed.y = speed;

	// Add emitter callback event only once
	if (!hasAddTap)
	{
		hasAddTap = true;
		game.input.onDown.add(handleTap, this);
	}

	groupEmitter.add(spriteEmitterTap);
}


// Adds "dead" colored graphic
function addGraphicsDead()
{
	if (graphicsDead) { graphicsDead.kill(); }
	graphicsDead = drawRect(
		RECT_DEAD_X,
		RECT_DEAD_Y,
		RECT_DEAD_W,
		RECT_DEAD_H,
		RECT_DEAD_COLOR,
	);
	groupDead.add(graphicsDead);
}


// Adds button group
function addGroupButton()
{
	if (groupButton) { groupButton.destroy(); }
	groupButton = game.add.group();
	return groupButton;
}


// Adds background group
function addGroupBackground()
{
	if (groupBackground) { groupBackground.destroy(); }
	groupBackground = game.add.group();
	return groupBackground;
}


// Adds cloud group
function addGroupCloud()
{
	if (groupClouds) { groupClouds.destroy(); }
	groupClouds = game.add.group();
	return groupClouds;
}


// Adds "dead" colored graphics group
function addGroupDead()
{
	if (groupDead) { groupDead.destroy(); }
	groupDead = game.add.group();
	return groupDead;
}


// Adds tap emitter sprite group
function addGroupEmitter()
{
	if (groupEmitter) { groupEmitter.destroy(); }
	groupEmitter = game.add.group();
	return groupEmitter;
}


// Adds enemy group
function addGroupEnemy()
{
	if (groupEnemy) { groupEnemy.destroy(); }
	groupEnemy = game.add.group();
	return groupEnemy;
}


// Adds overlay group
function addGroupOverlay()
{
	if (groupOverlay) { groupOverlay.destroy(); }
	groupOverlay = game.add.group();
	return groupOverlay;
}


// Adds player sprite group
function addGroupPlayer()
{
	if (groupPlayer) { groupPlayer.destroy(); }
	groupPlayer = game.add.group();
	return groupPlayer;
}


// Adds text group
function addGroupText()
{
	if (groupText) { groupText.destroy(); }
	groupText = game.add.group();
	return groupText;
}


// Adds lower overlay
function addOverlayLower()
{
	if (overlayLower) { groupOverlay.remove(overlayLower, true); }
	overlayLower = addSprite(OVERLAY_LOWER_X, OVERLAY_LOWER_Y, 'overlay-lower');
	overlayLower.scale.setTo(RATIO, RATIO);
	overlayLower.alpha = OVERLAY_LOWER_ALPHA;
	groupOverlay.add(overlayLower);
}


// Adds upper overlay
function addOverlayUpper()
{
	if (overlayUpper) { groupOverlay.remove(overlayUpper, true); }
	overlayUpper = addSprite(OVERLAY_UPPER_X, OVERLAY_UPPER_Y, 'overlay-upper');
	overlayUpper.scale.setTo(RATIO, RATIO);
	overlayUpper.alpha = OVERLAY_UPPER_ALPHA;
	groupOverlay.add(overlayUpper);
}


// Creates a cloud sprite
function addSpriteCloud()
{
	// Clean up all clouds
	destroyClouds();

	// Create new cloud
	var x     = game.world.width;
	var y     = randint(MIN_CLOUD_Y, MAX_CLOUD_Y);
	var cloud = groupClouds.create(x, y, 'cloud');

	unsmoothSprite(cloud);
	scaleSprite(cloud);

	return cloud;
}


// Adds crest sprite for UI
function addSpriteCrest()
{
	drawRect(RECT_UI_X, RECT_UI_Y, RECT_UI_W, RECT_UI_H, RECT_UI_COLOR);
	var crest = addSprite(CREST_X, CREST_Y, 'crest');
	unsmoothSprite(crest);
	scaleSprite(crest);
}


// Creates a new enemy
function addSpriteEnemy(tag)
{
	// Create new enemy
	var bg      = getBackground();
	var bgY     = _BG_DATA[bg]['y'];
	var bgBodyY = _BG_DATA[bg]['body-y'];
	var w       = _ENEMY_DATA[tag]['body'][2];
	var h       = _ENEMY_DATA[tag]['body'][3];
	var dx      = _ENEMY_DATA[tag]['body'][0];
	var dy      = _ENEMY_DATA[tag]['body'][1];
	var x       = RATIO * game.world.width;
	var y       = RATIO * (bgY + bgBodyY);

	var enemy = groupEnemy.create(x, y, tag);
	unsmoothSprite(enemy)
	scaleSprite(enemy)
	addPhysics(enemy, w, h, dx, dy, true);

	enemy.name = tag;
	enemy.anchor.setTo(0, 1);

	return enemy;
}


// Adds player sprite
function addSpritePlayer(x, y)
{
	// Destroy old sprite (if any)
	destroyPlayer();

	// Add new sprite
	spritePlayer = addSprite(x, y, 'byleth');
	unsmoothSprite(spritePlayer);
	scaleSprite(spritePlayer);
	addPlayerAnimations(spritePlayer);

	var w  = PLAYER_W;
	var h  = PLAYER_H;
	var dx = PLAYER_BODY_X;
	var dy = PLAYER_BODY_Y;

	addPhysics(spritePlayer, w, h, dx, dy);
	addGravity(spritePlayer);

	groupPlayer.add(spritePlayer);

	return spritePlayer;
}


// Adds user input handlers
function addInput()
{
	game.input.onDown.add( function(p) { handleJump(spritePlayer); }, this);
}


// Adds player animations
function addPlayerAnimations(sprite)
{
	// Add animations for Byleth
	var fps = SPRITE_FRAMERATE;

	sprite.animations.add('idle', [0, 1, 2, 1], fps, true);
	sprite.animations.add('jump', [6, 7, 8, 9, 10], fps, false);
	sprite.animations.add('pose', [12], 0.01, false);
	sprite.animations.add('run', [18, 19, 20, 21], fps, true);

	return sprite;
}


// Adds the scrolling, tiled background
function addTiledSpriteBackground()
{
	// Destroy old background (if any)
	destroyBackground();

	// Add new background
	var bg    = getBackground();
	var x     = _BG_DATA[bg]['x'];
	var y     = _BG_DATA[bg]['y'];
	var w     = game.world.width;
	var h     = SPRITE_SCALE * _BG_DATA[bg]['h'];
	var bodyH = RATIO * SPRITE_SCALE * _BG_DATA[bg]['body-h'];
	var dx    = RATIO * _BG_DATA[bg]['body-x'];
	var dy    = RATIO * _BG_DATA[bg]['body-y'];

	spriteBackground = addTiledSprite(x, y, w, h, bg);

	addPhysics(spriteBackground, RATIO * w, bodyH, dx, dy, true);

	groupBackground.add(spriteBackground);

	return spriteBackground;
}


// Adds game over text
function addTextGameOver()
{
	// Destroy old text (if any)
	if (textGameOver) { groupText.remove(textGameOver, true); }

	// Add new text
	var font = 'light';
	var text = 'GAME OVER';
	var x    = TEXT_GAME_OVER_X;
	var y    = TEXT_GAME_OVER_Y;
	var size = FONT_SIZE;

	textGameOver = addBitmapText(font, text, x, y, size);
	groupText.add(textGameOver);
}


// Adds score text
function addTextScore()
{
	// Destroy old text (if any)
	if (textScore) { groupText.remove(textScore, true); }

	// Reset score
	score = 0;

	// Add mew text
	var font = 'light';
	var text = padLeft(Math.round(score), 5);
	var x    = TEXT_SCORE_X;
	var y    = TEXT_SCORE_Y;
	var size = FONT_SIZE;

	textScore = addBitmapText(font, text, x, y, size);
	groupText.add(textScore);
}


// Adds high score text
function addTextScoreHigh()
{
	// Destroy old text (if any)
	if (textScoreHigh) { groupText.remove(textScoreHigh, true); }

	// Add new text
	var font = 'dark';
	var text = 'HI ' + padLeft(Math.round(scoreHigh), 5);
	var x    = TEXT_SCORE_HIGH_X;
	var y    = TEXT_SCORE_HIGH_Y;
	var size = FONT_SIZE;

	textScoreHigh = addBitmapText(font, text, x, y, size);
	groupText.add(textScoreHigh);
}


// Destroys background image
function destroyBackground()
{
	if (spriteBackground)
	{
		groupBackground.remove(spriteBackground);
		spriteBackground.destroy();
	}
}


// Destroys button
function destroyButton()
{
	groupButton.forEach(
		function(button)
		{
			groupButton.remove(button, true);
		},
		this
	);
}


// Destroys all current clouds
function destroyClouds()
{
	groupClouds.forEach(
		function(cloud)
		{
			groupClouds.remove(cloud, true);
		},
		this
	);
}


// Destroys tap emitter
function destroyEmitterTap()
{
	if (spriteEmitterTap)
	{
		groupEmitter.remove(spriteEmitterTap, true, false);
	}
}


// Destroys all current enemies
function destroyEnemies()
{
	addGroupEnemy();
}


// Destroys player sprite
function destroyPlayer()
{
	addGroupPlayer();
}


// Destroys "dead" colored graphic
function destroyGraphicsDead()
{
	if (graphicsDead) { graphicsDead.kill(); }
}


// Destroys "game over" text
function destroyTextGameOver()
{
	if (textGameOver) { textGameOver.destroy(); }
}


// Returns current background key
function getBackground()
{
	return _LEVEL_DATA[level]['background'];
}


// Returns current speed multiplier
function getMultiplier()
{
	return 1 + score / SCORE_MULTIPLIER;
}


// Handles reset button click events
function handleButton()
{
	if (buttonDelay === 0)
	{
		if (spriteButton) { spriteButton.destroy(); }
		startGame(level);
	}
}


// Handles arbitrary jump events
function handleJump(sprite)
{
	if (!isDead && sprite.body.touching.down)
	{
		sprite.body.velocity.y = RATIO * -1 * JUMP_SPEED;
		playAnimation(sprite, 'jump', false);
	}
}


// Handles player-to-ground collisions
function handlePlayerEnemy(player, enemy)
{
	if (player.body.touching.right || player.body.touching.down)
	{
		// Stop all enemies
		stopEnemies();

		// Stop player
		stopPlayers();

		// Player is now dead
		playAnimation(player, 'pose', false, 0);
		setDead(true);
		playEffectDead();
		setButtonDelay(BUTTON_DELAY);

		// Spawn reset button and game over text
		addButton();
		addTextGameOver();
	}
}


// Handles player-to-ground collisions
function handlePlayerGround(player, ground)
{
	if (!isDead) { playAnimation(player, 'run'); }
}


// Handles a tap burst
function handleTap(pointer)
{
	spriteEmitterTap.x = pointer.x;
	spriteEmitterTap.y = pointer.y;
	spriteEmitterTap.explode(EMITTER_EXPLODE_TIME, EMITTER_EXPLODE_COUNT);

	var sx = RATIO * SPRITE_SCALE;
	var sy = RATIO * SPRITE_SCALE;

	// Scale up and de-antialias particles
	spriteEmitterTap.children.forEach(
        function(tap)
        {
			unsmoothSprite(tap);
            tap.scale.setTo(sx, sy);
        }
    );
}


// Dynamically loads assets during runtime
function loadAssets()
{
	hasLoaded = false;
	game.load.onLoadComplete.add(loadComplete, this);

	// Load enemies defined for this level
	var enemyData = _LEVEL_DATA[level]["enemy"];
	for (const entry of enemyData)
	{
		var key = entry;
		var image = _ENEMY_DATA[key]["image"];
		game.load.image(key, image);
	}

	game.load.start();
}


// Load completion callback
function loadComplete()
{
	hasLoaded = true;
}


// Plays a "dead" graphical effect
function playEffectDead()
{
	groupEnemy.forEach(function(e) { e.tint = 0x000000; } );
	groupPlayer.forEach(function(e) {e.tint = 0x000000; } );
	addGraphicsDead();
}


/**
 *  Sets button feedback delay timer.
 */
function setButtonDelay(delay)
{
	buttonDelay = delay;
}


// Sets "dead" flag
function setDead(dead)
{
	isDead = dead;
}


// Sets current level
function setLevel(key)
{
	level = key;
}


// Starts game
function startGame(levelKey)
{
	// Kill "dead" colored graphics
	destroyGraphicsDead();

	// Clear all old enemy objects (if any)
	destroyEnemies();

	// Load all images defined under this level's enemy data
	loadAssets();

	// Set current level key
	setLevel(levelKey);

	// Clear "game over" text (if any)
	destroyTextGameOver();

	// Set background color
	setBackgroundColor('#2167a5');

	// Reset "dead" flag
	setDead(false);

	// Add background sprite
	addTiledSpriteBackground();

	// Add Byleth, the player!
	playAnimation(addSpritePlayer(PLAYER_X, PLAYER_Y), 'jump', false, 1);

	// Add a lone cloud
	addSpriteCloud();

	// Add high score text
	addTextScoreHigh();

	// Add score text
	addTextScore();

	// Add overlay effects
	addGroupOverlay();
	addOverlayLower();
	addOverlayUpper();

	// Add tap emitter
	addGroupEmitter();
	addEmitterTap();
}


// Stops all enemies from moving
function stopEnemies()
{
	groupEnemy.forEach(
		function(e)
		{
			e.body.stopMovement();
			e.body.velocity.x = 0;
			e.body.velocity.y = 0;
		}
	)
}


// Stops all players from moving
function stopPlayers()
{
	groupPlayer.forEach(
		function(p)
		{
			p.body.velocity.x = 0;
			p.body.velocity.y = 0;
			p.body.gravity.y = 0;
		}
	)
}


/**
 *  Updates button feedback delay timer.
 */
function updateButtonDelay()
{
	if (isDead && buttonDelay !== 0)
	{
		if (buttonDelay > 0)
		{
			buttonDelay -= 1;
		}
		if (buttonDelay < 0)
		{
			buttonDelay = 0;
		}
	}
}


/**
 *  Updates scrolling background
 */
function updateSpriteBackground()
{
	if (!isDead)
	{
		var dx = SCROLL_SPEED * getMultiplier();
		spriteBackground.tilePosition.x -= dx;
	}
}


/**
 *  Updates a single cloud sprite
 */
function updateSpriteCloud(sprite)
{
	try
	{
		var dx = RATIO * CLOUD_SPEED * getMultiplier();
		var check = -1 * sprite.width;

    	sprite.x -= dx;
		if (sprite.x <= check)
		{
			groupClouds.remove(sprite, true);
			addSpriteCloud();
		}
	}
	catch (e) {}
}


/**
 *  Updates all cloud sprites
 */
function updateGroupClouds()
{
	if (!isDead) { groupClouds.forEach(updateSpriteCloud, this, true); }
}


/**
 *  Updates a single enemy sprite
 */
function updateEnemy(sprite)
{
	try
	{
		if (!isDead)
		{
			var time = 200;
			var dx   = RATIO * -1 * ENEMY_SPEED * getMultiplier();
			sprite.body.moveFrom(time, dx, 0);
		}

		var check = -1 * sprite.width;
		if (sprite.x <= check) { groupEnemy.remove(sprite, true); }
	}
	catch (e) {}
}


/**
 *  Updates all enemy sprites
 */
function updateGroupEnemies()
{
	if (hasLoaded)
	{
		// Update all enemies
		groupEnemy.forEach(updateEnemy, this, true);

		if (delayAddEnemy > 0) { delayAddEnemy -= 1; }

		var randMin  = _LEVEL_DATA[level]['rate'][0];
		var randMax  = _LEVEL_DATA[level]['rate'][1];
		var randRate = _LEVEL_DATA[level]['rate'][2];
		var randomly = randint(randMin, randMax) < randRate;
		var isRoom   = groupEnemy.children.length < 3;
		var noDelay  = delayAddEnemy <= 0;

		// Randomly spawn a new enemy if there's room and delay is inactive
		if (isRoom && randomly && noDelay)
		{
			var enemyKey = randomChoice(_LEVEL_DATA[level]['enemy']);
			var doAdd = true;
			groupEnemy.forEach(
				function(e)
				{
					if (e.name === enemyKey) { doAdd = false; }
				},
				this
			);
			if (doAdd)
			{
				addSpriteEnemy(enemyKey);
				delayAddEnemy = DELAY_ADD_ENEMY;
			}
		}
	}
}


/**
 *  Updates player-to-ground collisions
 */
function updateCollisionPlayerEnemy()
{
	game.physics.arcade.collide(
		spritePlayer,
		groupEnemy,
		handlePlayerEnemy,
		null,
		this
	);
}


/**
 *  Updates player-to-ground collisions.
 */
function updateCollisionPlayerGround()
{
	game.physics.arcade.collide(
		spritePlayer,
		spriteBackground,
		handlePlayerGround,
		null,
		this
	);
}


/**
 *  Updates score.
 */
function updateScore()
{
	if (!isDead)
	{
		score += DELTA_SCORE;
		var text = padLeft(Math.round(score), 5);
		textScore.text = text;
	}
}


/**
 *  Updates high score.
 */
function updateScoreHigh()
{
	if (!isDead && score > scoreHigh)
	{
		scoreHigh = score;
		var text = 'HI ' + padLeft(Math.round(scoreHigh), 5);
		textScoreHigh.text = text;
	}

}


/**
 *  Preload callback
 */
function preload()
{
	// Load bitmap fonts
	game.load.bitmapFont(
		'light',
		'assets/font/font-light/font.png',
		'assets/font/font-light/font.fnt'
	);

	game.load.bitmapFont(
		'dark',
		'assets/font/font-dark/font.png',
		'assets/font/font-dark/font.fnt'
	);

	// Load spritesheets
	game.load.spritesheet('byleth', 'assets/sheet.png', 32, 32);
	game.load.spritesheet('button', 'assets/restart.png', 36, 32);
	game.load.spritesheet('tap', 'assets/sparkle.png', 11, 11);

	// Load images
	game.load.image('crest', 'assets/crest.png');
	game.load.image('cloud', 'assets/cloud.png');
	game.load.image('overlay-upper', 'assets/upper.png');
	game.load.image('overlay-lower', 'assets/lower.png');

	// Load all images defined under background data
	for (const entry of Object.entries(_BG_DATA))
	{
		var key = entry[0];
		var image = entry[1]['image'];
		game.load.image(key, image);
	}
}


/**
 *  Create callback
 */
function create()
{
	// Add crest sprite
	addSpriteCrest();

	// Add cloud group
	addGroupCloud();

	// Add background group
	addGroupBackground();

	// Add "dead" graphics group
	addGroupDead();

	// Add button group
	addGroupButton();

	// Add enemy group
	addGroupEnemy();

	// Add player group
	addGroupPlayer();

	// Add text group
	addGroupText();

	// Add overlay group
	addGroupOverlay();

	// Starts game
	var levelKey = 'basic';
	startGame(levelKey);

	// Process jump on input down
	addInput();
}


/**
 *  Render callback
 */
function render()
{
	try
	{
		/*
		game.debug.body(spriteBackground);
		game.debug.body(spritePlayer);
		groupEnemy.children.forEach(function (e) { game.debug.body(e); }, this);
		//*/
	}
	catch (e) {}
}


/**
 *  Update callback
 */
function update()
{
    updateSpriteBackground();
	updateGroupClouds();
	updateGroupEnemies();
	updateCollisionPlayerGround();
	updateCollisionPlayerEnemy();
	updateScore();
	updateScoreHigh();
	updateButtonDelay();
}
