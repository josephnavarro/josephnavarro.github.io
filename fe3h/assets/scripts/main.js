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
var byleth;
var bylethGroup;
var button;
var clouds;
var emitterGroup;
var emitterTap;
var enemies;
var enemy;
var textGameOver;
var textScore;
var textScoreHigh;

var hasAddTap = false;
var isContact = false;
var isDead    = false;
var level     = "basic";
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


// Adds cloud group
function addCloudGroup()
{
	if (clouds)
	{
		clouds.destroy();
	}
	clouds = game.add.group();
	return clouds;
}


// Adds tap emitter sprite group
function addEmitterGroup()
{
	if (emitterGroup)
	{
		emitterGroup.destroy();
	}
	emitterGroup = game.add.group();
	return emitterGroup;
}


// Adds tap emitter
function addEmitterTap()
{
	if (emitterTap)
	{
		emitterGroup.remove(emitterTap, false, false);
		emitterTap.destroy();
	}

	var numParticles = 12;
	emitterTap = game.add.emitter(0, 0, numParticles);

	emitterTap.makeParticles('tap', [0, 1, 2]);
	emitterTap.setAlpha(0.3, 0.8);

	var sx1 = RATIO * SPRITE_SCALE;
	var sx2 = RATIO * SPRITE_SCALE;
	var sy1 = RATIO * SPRITE_SCALE;
	var sy2 = RATIO * SPRITE_SCALE;
	emitterTap.setScale(sx1, sx2, sy1, sy2);

	emitterTap.minParticleSpeed.x *= RATIO;
	emitterTap.minParticleSpeed.y *= RATIO
	emitterTap.maxParticleSpeed.x *= RATIO;
	emitterTap.maxParticleSpeed.y *= RATIO;

	if (!hasAddTap)
	{
		hasAddTap = true;
		game.input.onDown.add(handleTap, this);
	}

	emitterGroup.add(emitterTap);
}


// Adds enemy group
function addEnemyGroup()
{
	enemies = game.add.group();
	return enemies;
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
	if (bylethGroup)
	{
		bylethGroup.destroy();
	}
	bylethGroup = game.add.group();
	return bylethGroup;
}


// Adds player sprite
function addPlayerSprite(x, y)
{
	if (byleth)
	{
		bylethGroup.remove(byleth, false, false);
		byleth.destroy();
	}

	byleth = addSprite(x, y, 'byleth');
	unsmoothSprite(byleth);
	scaleSprite(byleth);
	addPlayerAnimations(byleth);

	var w = PLAYER_W;
	var h = PLAYER_H;
	var dx = PLAYER_BODY_X;
	var dy = PLAYER_BODY_Y;

	addPhysics(byleth, w, h, dx, dy);
	addGravity(byleth);

	bylethGroup.add(byleth);

	return byleth;
}


// Adds the scrolling, tiled background
function addScrollingBackground(x, y)
{
	var w = game.world.width;
	var h = 16 * SPRITE_SCALE;
	var dx = RATIO * BACKGROUND_BODY_X;
	var dy = RATIO * BACKGROUND_BODY_Y;
	var key = _LEVEL_DATA[level]['background'];

	background = addTiledSprite(x, y, w, h, key);
	addPhysics(background, w, h, dx, dy, true);

	return background;
}


// Adds game over text
function addTextGameOver()
{
	if (textGameOver)
	{
		textGameOver.destroy();
	}

	var font = 'dark';
	var text = 'GAME OVER';
	var x = TEXT_GAME_OVER_X;
	var y = TEXT_GAME_OVER_Y;
	var size = FONT_SIZE;

	textGameOver = addBitmapText(font, text, x, y, size);
}


// Adds score text
function addTextScore()
{
	if (textScore)
	{
		textScore.destroy();
	}

	score = 0;

	var font = 'dark';
	var text = padLeft(Math.round(score), 5);
	var x = TEXT_SCORE_X;
	var y = TEXT_SCORE_Y;
	var size = FONT_SIZE;

	textScore = addBitmapText(font, text, x, y, size);
}


// Adds high score text
function addTextScoreHigh()
{
	if (textScoreHigh)
	{
		textScoreHigh.destroy();
	}

	var font = 'light';
	var text = 'HI ' + padLeft(Math.round(scoreHigh), 5);
	var x = TEXT_SCORE_HIGH_X;
	var y = TEXT_SCORE_HIGH_Y;
	var size = FONT_SIZE;

	textScoreHigh = addBitmapText(font, text, x, y, size);
}


// Creates a cloud sprite
function createCloud()
{
	var x = game.world.width;
	var y = randint(MIN_CLOUD_Y, MAX_CLOUD_Y);

	clouds.forEach(
		function(c)
		{
			c.destroy()
		},
		this
	);

	var cloud = clouds.create(x, y, 'cloud');
	unsmoothSprite(cloud);
	scaleSprite(cloud);

	return cloud;
}


// Creates an enemy
function createEnemy(tag)
{
	//console.log(_ENEMY_DATA);
	//console.log(tag);
	var data = _ENEMY_DATA[tag];
	var x = RATIO * game.world.width;
	var y = RATIO * (BACKGROUND_Y + BACKGROUND_BODY_Y);
	var dx = data["body"][0];
	var dy = data["body"][1];
	var w = data["body"][2];
	var h = data["body"][3];

	// Clean up all enemies
	enemies.forEach(function(_){_.destroy()}, this);

	// Create new enemy
	enemy = enemies.create(x, y, tag);

	unsmoothSprite(enemy)
	scaleSprite(enemy)
	addPhysics(enemy, w, h, dx, dy, false);

	enemy.anchor.setTo(0, 1);

	return enemy;
}


// Destroys "game over" text
function destroyTextGameOver()
{
	if (textGameOver)
	{
		textGameOver.destroy();
	}
}


// Returns current speed multiplier
function getMultiplier()
{
	return 1 + score / 500;
}


// Handles button click events
function handleButton()
{
	if (button)
	{
		button.destroy();
	}
	startGame();
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
		enemy.body.velocity.x = 0;
		enemy.body.velocity.y = 0;

		// Stop player
		player.body.velocity.x = 0;
		player.body.gravity.y = 0;
		player.body.velocity.y = 0;
		playAnimation(player, 'pose', false, 0);

		// Player is now dead
		setDead(true);

		// Spawn reset button
		addButton();

		// Spawn game over text
		addTextGameOver();
	}
}


// Handles player-to-ground collisions
function handlePlayerGround(player, ground)
{
	if (!isDead)
	{
		playAnimation(player, 'run');
	}
}


// Handles a tap burst
function handleTap(pointer)
{
	emitterTap.x = pointer.x;
	emitterTap.y = pointer.y;
	emitterTap.explode(500, 6);

	var sx = RATIO * SPRITE_SCALE;
	var sy = RATIO * SPRITE_SCALE;
	emitterTap.children.forEach(
        function (element)
        {
			unsmoothSprite(element);
            element.scale.setTo(sx, sy);
        }
    );
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
function startGame(levelKey="basic")
{
	// Set background color
	setBackgroundColor('#f3f3f3');

	// Set level key
	setLevel(levelKey);

	// Reset "dead" flag
	setDead(false);

	// Clear "game over" text
	destroyTextGameOver();

	// Add Byleth
	playAnimation(addPlayerSprite(PLAYER_X, PLAYER_Y), 'jump', false, 1);

	// Add lone cloud
	createCloud();

	// Add enemy
	var enemyKey = randomChoice(_LEVEL_DATA[level]["enemy"]);
	createEnemy(enemyKey);

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
		var dx = CLOUD_SPEED * getMultiplier();
		var check = -1 * sprite.width;

    	sprite.x -= dx;
		if (sprite.x <= check)
		{
			clouds.remove(sprite, true);
			createCloud();
		}
	}
	catch (e)
	{
		// Nothing
	}
}


// Updates all cloud sprites
function updateClouds()
{
	if (!isDead)
	{
		clouds.forEach(updateCloud, this, true);
	}
}


// Updates a single enemy sprite
function updateEnemy(sprite)
{
	try
	{
		var time = 200;
		var dx = -1 * ENEMY_SPEED * getMultiplier() * RATIO;
		var check = -1 * sprite.width;

		sprite.body.moveFrom(time, dx, 0);
    	if (sprite.x <= check)
		{
			enemies.remove(sprite, true);
		}
	}
	catch (e)
	{
		// Nothing
	}
}


// Updates all enemy sprites
function updateEnemies()
{
	// Update all enemies
	enemies.forEach(updateEnemy, this, true);

	// Randomly spawn a new enemy if none are onscreen
	var isEmpty = enemies.children.length === 0;
	var randMin = _LEVEL_DATA[level]["rate"][0];
	var randMax = _LEVEL_DATA[level]["rate"][1];
	var randRate = _LEVEL_DATA[level]["rate"][2];
	var randomly = randint(randMin, randMax) < randRate;

	if (isEmpty && randomly)
	{
		var enemyKey = randomChoice(_LEVEL_DATA[level]["enemy"]);
		createEnemy(enemyKey);
	}
}


// Updates player-to-ground collisions
function updatePlayerEnemy()
{
	game.physics.arcade.collide(byleth, enemies, handlePlayerEnemy, null, this);
}


// Updates player-to-ground collisions
function updatePlayerGround()
{
	game.physics.arcade.collide(byleth, background, handlePlayerGround, null, this);
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

	// Load all images defined under enemy data
	for (const entry of Object.entries(_ENEMY_DATA))
	{
		var key = entry[0];
		var image = entry[1]['image'];
		game.load.image(key, image);
	}
}


// Create callback
function create()
{
	// Add cloud group
	addCloudGroup();

	// Add scrolling background
	addScrollingBackground(BACKGROUND_X, BACKGROUND_Y);

	// Add enemy group
	addEnemyGroup();

	// Add player group
	addPlayerGroup();

	// Starts game
	var levelKey = 'basic';
	startGame(levelKey);

	// Process jump on input down
	game.input.onDown.add(
		function(pointer)
		{
			handleJump(byleth);
		},
		this
	);

	// Add tap emitter
	addEmitterGroup();

	addEmitterTap();
}


// Render callback
function render()
{
	try
	{
		//game.debug.body(background);
		//game.debug.body(byleth);
		//game.debug.body(enemy);
	}
	catch (e)
	{
		//...
	}
	finally
	{
		//...
	}
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
