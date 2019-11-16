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
var background;
var button;
var groupBackground;
var groupClouds;
var groupEmitter;
var groupEnemy;
var groupPlayer;
var emitterTap;
var enemy;
var player;
var textGameOver;
var textScore;
var textScoreHigh;

var hasAddTap = false;
var isContact = false;
var isDead    = false;
var level     = 'basic';
var hasLoaded = false;
var score     = 0;
var scoreHigh = 0;


// Adds restart button
function addButton()
{
	var x = BUTTON_X * RATIO;
	var y = BUTTON_Y * RATIO;

	button = game.add.button(
		x, y,
		'button',
		handleButton,
		this,
		0, 0, 0
	);

	unsmoothSprite(button);
	scaleButtonSprite(button);

	return button;
}


// Adds background group
function addBackgroundGroup()
{
	if (groupBackground) { groupBackground.destroy(); }
	groupBackground = game.add.group();
	return groupBackground;
}


// Creates a cloud sprite
function addCloud()
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


// Adds cloud group
function addCloudGroup()
{
	if (groupClouds) { groupClouds.destroy(); }
	groupClouds = game.add.group();
	return groupClouds;
}


// Adds tap emitter sprite group
function addEmitterGroup()
{
	if (groupEmitter) { groupEmitter.destroy(); }
	groupEmitter = game.add.group();
	return groupEmitter;
}


// Adds tap emitter
function addEmitterTap()
{
	// Destroy old tap emitter
	destroyEmitterTap();

	// Add emitter and make particles
	var numParticles = 12;
	emitterTap = game.add.emitter(0, 0, numParticles);
	emitterTap.makeParticles('tap', [0, 1, 2]);
	emitterTap.setAlpha(0.3, 0.8);

	// Scale up emitter
	var sx1 = RATIO * SPRITE_SCALE;
	var sx2 = RATIO * SPRITE_SCALE;
	var sy1 = RATIO * SPRITE_SCALE;
	var sy2 = RATIO * SPRITE_SCALE;
	emitterTap.setScale(sx1, sx2, sy1, sy2);

	// Normalize particle speeds
	emitterTap.minParticleSpeed.x *= RATIO;
	emitterTap.minParticleSpeed.y *= RATIO
	emitterTap.maxParticleSpeed.x *= RATIO;
	emitterTap.maxParticleSpeed.y *= RATIO;

	// Add emit event only once
	if (!hasAddTap)
	{
		hasAddTap = true;
		game.input.onDown.add(handleTap, this);
	}

	groupEmitter.add(emitterTap);
}


// Creates a new enemy
function addEnemy(tag)
{
	// Clean up all enemies
	destroyEnemies();

	// Create new enemy
	var x  = RATIO * game.world.width;
	var y  = RATIO * (BACKGROUND_Y + BACKGROUND_BODY_Y);
	var w  = _ENEMY_DATA[tag]["body"][2];
	var h  = _ENEMY_DATA[tag]["body"][3];
	var dx = _ENEMY_DATA[tag]["body"][0];
	var dy = _ENEMY_DATA[tag]["body"][1];

	enemy = groupEnemy.create(x, y, tag);

	unsmoothSprite(enemy)
	scaleSprite(enemy)
	addPhysics(enemy, w, h, dx, dy, true);

	enemy.anchor.setTo(0, 1);

	return enemy;
}


// Adds enemy group
function addEnemyGroup()
{
	if (groupEnemy) { groupEnemy.destroy(); }
	groupEnemy = game.add.group();
	return groupEnemy;
}


// Adds user input handlers
function addInput()
{
	game.input.onDown.add( function(p) { handleJump(player); }, this);
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


// Adds player sprite group
function addPlayerGroup()
{
	if (groupPlayer) { groupPlayer.destroy(); }
	groupPlayer = game.add.group();
	return groupPlayer;
}


// Adds player sprite
function addPlayerSprite(x, y)
{
	// Destroy old sprite (if any)
	destroyPlayer();

	// Add new sprite
	player = addSprite(x, y, 'byleth');
	unsmoothSprite(player);
	scaleSprite(player);
	addPlayerAnimations(player);

	var w  = PLAYER_W;
	var h  = PLAYER_H;
	var dx = PLAYER_BODY_X;
	var dy = PLAYER_BODY_Y;

	addPhysics(player, w, h, dx, dy);
	addGravity(player);

	groupPlayer.add(player);

	return player;
}


// Adds the scrolling, tiled background
function addScrollingBackground(x, y)
{
	// Destroy old background (if any)
	destroyBackground();

	// Add new background
	var w   = game.world.width;
	var h   = BACKGROUND_BODY_H * SPRITE_SCALE;
	var dx  = RATIO * BACKGROUND_BODY_X;
	var dy  = RATIO * BACKGROUND_BODY_Y;
	var key = _LEVEL_DATA[level]['background'];

	background = addTiledSprite(x, y, w, h, key);

	w *= RATIO;
	h *= RATIO;
	addPhysics(background, w, h, dx, dy, true);

	groupBackground.add(background);

	return background;
}


// Adds game over text
function addTextGameOver()
{
	// Destroy old text (if any)
	if (textGameOver) { textGameOver.destroy(); }

	// Add new text
	var font = 'dark';
	var text = 'GAME OVER';
	var x    = TEXT_GAME_OVER_X;
	var y    = TEXT_GAME_OVER_Y;
	var size = FONT_SIZE;

	textGameOver = addBitmapText(font, text, x, y, size);
}


// Adds score text
function addTextScore()
{
	// Destroy old text (if any)
	if (textScore) { textScore.destroy(); }

	// Reset score
	score = 0;

	// Add mew text
	var font = 'dark';
	var text = padLeft(Math.round(score), 5);
	var x    = TEXT_SCORE_X;
	var y    = TEXT_SCORE_Y;
	var size = FONT_SIZE;

	textScore = addBitmapText(font, text, x, y, size);
}


// Adds high score text
function addTextScoreHigh()
{
	// Destroy old text (if any)
	if (textScoreHigh) { textScoreHigh.destroy(); }

	// Add new text
	var font = 'light';
	var text = 'HI ' + padLeft(Math.round(scoreHigh), 5);
	var x    = TEXT_SCORE_HIGH_X;
	var y    = TEXT_SCORE_HIGH_Y;
	var size = FONT_SIZE;

	textScoreHigh = addBitmapText(font, text, x, y, size);
}


// Destroys background image
function destroyBackground()
{
	if (background)
	{
		groupBackground.remove(background);
		background.destroy();
	}
}


// Destroys all current clouds
function destroyClouds()
{
	groupClouds.forEach(
		function(_)
		{
			groupClouds.remove(_);
			_.destroy();
		},
		this
	);
}


// Destroys tap emitter
function destroyEmitterTap()
{
	if (emitterTap)
	{
		groupEmitter.remove(emitterTap, false, false);
		emitterTap.destroy();
	}
}


// Destroys all current enemies
function destroyEnemies()
{
	groupEnemy.forEach(
		function(_)
		{
			groupEnemy.remove(_);
			_.destroy();
		},
		this
	);
}


// Destroys player sprite
function destroyPlayer()
{
	if (player)
	{
		groupPlayer.remove(player, false, false);
		player.destroy();
	}
}


// Destroys "game over" text
function destroyTextGameOver()
{
	if (textGameOver) { textGameOver.destroy(); }
}


// Returns current speed multiplier
function getMultiplier()
{
	return 1 + score / SCORE_MULTIPLIER;
}


// Handles reset button click events
function handleButton()
{
	if (button) { button.destroy(); }
	startGame(level);
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
		// Stop enemy
		enemy.body.stopMovement();
		enemy.body.velocity.x = 0;
		enemy.body.velocity.y = 0;

		// Stop player
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		player.body.gravity.y = 0;

		// Player is now dead
		playAnimation(player, 'pose', false, 0);
		setDead(true);

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
	emitterTap.x = pointer.x;
	emitterTap.y = pointer.y;
	emitterTap.explode(500, 6);

	var sx = RATIO * SPRITE_SCALE;
	var sy = RATIO * SPRITE_SCALE;

	// Scale up and de-antialias particles
	emitterTap.children.forEach(
        function(_)
        {
			unsmoothSprite(_);
            _.scale.setTo(sx, sy);
        }
    );
}


// Dynamically loads assets during runtime
function loadAssets()
{
	game.load.onLoadComplete.add(loadComplete, this);

	// Pause game to load resources
	game.paused = true;

	// Load enemies defined for this level
	var enemyData = _LEVEL_DATA[level]["enemy"];
	for (const entry of enemyData)
	{
		var key = entry;
		var image = _ENEMY_DATA[key]["image"];
		game.load.image(key, image);
	}

	// Resume game and process loads
	game.paused = false;
	game.load.start();
}


// Load completion callback
function loadComplete()
{
	hasLoaded = true;
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
	// Set current level key
	setLevel(levelKey);

	// Load all images defined under this level's enemy data
	loadAssets();

	// Clear "game over" text (if any)
	destroyTextGameOver();

	// Clear all old enemy objects (if any)
	destroyEnemies();

	// Set background color
	setBackgroundColor('#f3f3f3');

	// Reset "dead" flag
	setDead(false);

	// Add background sprite
	addScrollingBackground(BACKGROUND_X, BACKGROUND_Y);

	// Add Byleth, the player!
	playAnimation(addPlayerSprite(PLAYER_X, PLAYER_Y), 'jump', false, 1);

	// Add a lone cloud
	addCloud();

	// Add high score text
	addTextScoreHigh();

	// Add score text
	addTextScore();
}


// Updates scrolling background
function updateBackground()
{
	if (!isDead)
	{
		var dx = SCROLL_SPEED * getMultiplier();
		background.tilePosition.x -= dx;
	}
}


// Updates a single cloud sprite
function updateCloud(sprite)
{
	try
	{
		var dx = RATIO * CLOUD_SPEED * getMultiplier();
		var check = -1 * sprite.width;

    	sprite.x -= dx;
		if (sprite.x <= check)
		{
			groupClouds.remove(sprite, true);
			addCloud();
		}
	}
	catch (e) {}
}


// Updates all cloud sprites
function updateClouds()
{
	if (!isDead) { groupClouds.forEach(updateCloud, this, true); }
}


// Updates a single enemy sprite
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


// Updates all enemy sprites
function updateEnemies()
{
	// Update all enemies
	groupEnemy.forEach(updateEnemy, this, true);

	var randMin  = _LEVEL_DATA[level]["rate"][0];
	var randMax  = _LEVEL_DATA[level]["rate"][1];
	var randRate = _LEVEL_DATA[level]["rate"][2];
	var randomly = randint(randMin, randMax) < randRate;
	var isEmpty  = groupEnemy.children.length === 0;
	var loaded   = hasLoaded;

	// Randomly spawn a new enemy if none are onscreen and assets are loaded
	if (loaded && isEmpty && randomly)
	{
		var enemyKey = randomChoice(_LEVEL_DATA[level]["enemy"]);
		addEnemy(enemyKey);
	}
}


// Updates player-to-ground collisions
function updatePlayerEnemy()
{
	game.physics.arcade.collide(
		player,
		groupEnemy,
		handlePlayerEnemy,
		null,
		this
	);
}


// Updates player-to-ground collisions
function updatePlayerGround()
{
	game.physics.arcade.collide(
		player,
		background,
		handlePlayerGround,
		null,
		this
	);
}


// Updates score
function updateScore()
{
	if (!isDead)
	{
		score += DELTA_SCORE;
		var text = padLeft(Math.round(score), 5);
		textScore.text = text;
	}
}


// Updates high score
function updateScoreHigh()
{
	if (!isDead && score > scoreHigh)
	{
		scoreHigh = score;
		var text = 'HI ' + padLeft(Math.round(scoreHigh), 5);
		textScoreHigh.text = text;
	}

}


// Preload callback
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
	game.load.spritesheet('tap', 'assets/sparkle.png', 9, 9);

	// Load images
	game.load.image('cloud', 'assets/cloud.png');

	// Load all images defined under background data
	for (const entry of Object.entries(_BG_DATA))
	{
		var key = entry[0];
		var image = entry[1];
		game.load.image(key, image);
	}
}


// Create callback
function create()
{
	// Add cloud group
	addCloudGroup();

	// Add background group
	addBackgroundGroup();

	// Add enemy group
	addEnemyGroup();

	// Add player group
	addPlayerGroup();

	// Starts game
	var levelKey = 'basic';
	startGame(levelKey);

	// Process jump on input down
	addInput();

	// Add tap emitter
	addEmitterGroup();
	addEmitterTap();
}


// Render callback
function render()
{
	try
	{
		///*
		game.debug.body(background);
		game.debug.body(player);
		game.debug.body(enemy);
		//*/
	}
	catch (e) {}
}


// Update callback
function update()
{
    updateBackground();
	updateClouds();
	updateEnemies();
	updatePlayerGround();
	updatePlayerEnemy();
	updateScore();
	updateScoreHigh();
}
