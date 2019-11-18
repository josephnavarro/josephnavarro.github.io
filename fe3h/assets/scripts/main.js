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
var groupBackground;
var groupClouds;
var groupEmitter;
var groupEnemy;
var groupPlayer;
var spriteBackground;
var spriteButton;
var spriteEmitterTap;
var spriteEnemy;
var spritePlayer;
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

	spriteButton = game.add.button(
		x, y,
		'button',
		handleButton,
		this,
		0, 0, 0
	);

	unsmoothSprite(spriteButton);
	scaleButtonSprite(spriteButton);

	return spriteButton;
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


// Adds crest sprite
function addCrest()
{
	drawRect(RECT_UI_X, RECT_UI_Y, RECT_UI_W, RECT_UI_H, RECT_UI_COLOR);
	var crest = addSprite(CREST_X, CREST_Y, 'crest');
	unsmoothSprite(crest);
	scaleSprite(crest);
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
	spriteEmitterTap = game.add.emitter(0, 0, numParticles);
	spriteEmitterTap.makeParticles('tap', [0, 1, 2]);
	spriteEmitterTap.setAlpha(0.3, 0.8);

	// Scale up emitter
	var scale = RATIO * SPRITE_SCALE;
	var sx1 = scale;
	var sx2 = scale;
	var sy1 = scale;
	var sy2 = scale;
	spriteEmitterTap.setScale(sx1, sx2, sy1, sy2);

	// Normalize particle speeds
	var speed = PARTICLE_SPEED * RATIO;
	spriteEmitterTap.minParticleSpeed.x = -speed;
	spriteEmitterTap.minParticleSpeed.y = -speed;
	spriteEmitterTap.maxParticleSpeed.x = speed;
	spriteEmitterTap.maxParticleSpeed.y = speed;

	console.log(spriteEmitterTap.minParticleSpeed);
	console.log(spriteEmitterTap.maxParticleSpeed);

	// Add emit event only once
	if (!hasAddTap)
	{
		hasAddTap = true;
		game.input.onDown.add(handleTap, this);
	}

	groupEmitter.add(spriteEmitterTap);
}


// Creates a new enemy
function addEnemy(tag)
{
	// Clean up all enemies
	destroyEnemies();

	// Create new enemy
	var bgKey   = getBackground();
	var bgY     = _BG_DATA[bgKey]['y'];
	var bgBodyY = _BG_DATA[bgKey]['body-y'];
	var w       = _ENEMY_DATA[tag]['body'][2];
	var h       = _ENEMY_DATA[tag]['body'][3];
	var dx      = _ENEMY_DATA[tag]['body'][0];
	var dy      = _ENEMY_DATA[tag]['body'][1];
	var x       = RATIO * game.world.width;
	var y       = RATIO * (bgY + bgBodyY);

	spriteEnemy = groupEnemy.create(x, y, tag);

	unsmoothSprite(spriteEnemy)
	scaleSprite(spriteEnemy)
	addPhysics(spriteEnemy, w, h, dx, dy, true);

	spriteEnemy.anchor.setTo(0, 1);

	return spriteEnemy;
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


// Adds the scrolling, tiled background
function addScrollingBackground()
{
	// Destroy old background (if any)
	destroyBackground();

	// Add new background
	var bgKey   = getBackground();
	var bgBodyX = _BG_DATA[bgKey]['body-x'];
	var bgBodyY = _BG_DATA[bgKey]['body-y'];
	var x       = _BG_DATA[bgKey]['x'];
	var y       = _BG_DATA[bgKey]['y'];
	var w       = game.world.width;
	var h       = SPRITE_SCALE * _BG_DATA[bgKey]['h'];
	var bodyH   = RATIO * SPRITE_SCALE * _BG_DATA[bgKey]['body-h'];
	var dx      = RATIO * _BG_DATA[bgKey]['body-x'];
	var dy      = RATIO * _BG_DATA[bgKey]['body-y'];

	spriteBackground = addTiledSprite(x, y, w, h, bgKey);

	addPhysics(spriteBackground, RATIO * w, bodyH, dx, dy, true);

	groupBackground.add(spriteBackground);

	return spriteBackground;
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
	if (spriteBackground)
	{
		groupBackground.remove(spriteBackground);
		spriteBackground.destroy();
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
	if (spriteEmitterTap)
	{
		groupEmitter.remove(spriteEmitterTap, false, false);
		spriteEmitterTap.destroy();
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
	if (spritePlayer)
	{
		groupPlayer.remove(spritePlayer, false, false);
		spritePlayer.destroy();
	}
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
	if (spriteButton) { spriteButton.destroy(); }
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
	spriteEmitterTap.x = pointer.x;
	spriteEmitterTap.y = pointer.y;
	spriteEmitterTap.explode(500, 6);

	var sx = RATIO * SPRITE_SCALE;
	var sy = RATIO * SPRITE_SCALE;

	// Scale up and de-antialias particles
	spriteEmitterTap.children.forEach(
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
	addScrollingBackground();

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
		spriteBackground.tilePosition.x -= dx;
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
		spritePlayer,
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
		spritePlayer,
		spriteBackground,
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
	game.load.image('crest', 'assets/crest.png');
	game.load.image('cloud', 'assets/cloud.png');

	// Load all images defined under background data
	for (const entry of Object.entries(_BG_DATA))
	{
		var key = entry[0];
		var image = entry[1]['image'];
		game.load.image(key, image);
	}
}


// Create callback
function create()
{
	// Add crest sprite
	addCrest();

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
		game.debug.body(spriteBackground);
		game.debug.body(spritePlayer);
		game.debug.body(spriteEnemy);
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
