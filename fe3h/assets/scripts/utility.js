// Adds bitmap text instance
function addBitmapText(font, text, x, y, size)
{
	x *= RATIO;
	y *= RATIO;
	size *= RATIO;

	var text = game.add.bitmapText(x, y, font, text, size);
	unsmoothSprite(text);
	return text;
}


// Adds gravity to a sprite
function addGravity(sprite, gravity=GRAVITY)
{
	gravity *= RATIO;
	sprite.body.gravity.y = gravity;

	return sprite;
}


// Adds physical attributes to a sprite
function addPhysics(sprite, w=0, h=0, dx=0, dy=0, immovable=false)
{
	game.physics.enable(sprite, Phaser.Physics.ARCADE);

	if (!w)
	{
		w = sprite.width;
	}

	if (!h)
	{
		h = sprite.height;
	}

	w *= RATIO;
	h *= RATIO;
	//dx *= RATIO;
	//dy *= RATIO;
	h = 1;
	dx = 0;
	dy = 0;

	sprite.body.setSize(w, h, dx, dy);

	if (immovable)
	{
		sprite.body.immovable = true;
	}

	return sprite;
}


// Adds a sprite using the given spritesheet tag
function addSprite(x, y, tag)
{
	x *= RATIO;
	y *= RATIO;

	return game.add.sprite(x, y, tag);
}


// Adds a tiled sprite using the given image tag and dimensions
function addTiledSprite(x, y, w, h, tag)
{
	x *= RATIO;
	y *= RATIO;
	w *= RATIO;
	h *= RATIO;

	var tileSprite = game.add.tileSprite(x, y, w, h, tag);
	unsmoothSprite(tileSprite);
	scaleTileSprite(tileSprite);

	return tileSprite;
}


// Pad number with zeros on the left
function padLeft(number, padding)
{
	padding -= number.toString().length;
	if (padding < 0)
	{
		padding = 0;
	}
	var string = '';


	for (var x=0; x < padding; x++)
	{
		string += '0';
	}
	string += number;
	return string;
}


// Plays an animation on a sprite at standard framerate
function playAnimation(sprite, animation, loop=true, frame=0)
{
	sprite.animations.play(animation, SPRITE_FRAMERATE, loop);
	sprite.animations.currentAnim.setFrame(frame, true);
	return sprite;
}


// Generates a random integer
function randint(lower, upper)
{
	return Math.round(lower + Math.random() * (upper - lower))
}


// Randomly selects an element from an array
function randomChoice(array)
{
	var length = array.length;
	return array[randint(0, length - 1)];
}


// Scales a button sprite to standard dimensions
function scaleButtonSprite(sprite)
{
	var sx = RATIO * SPRITE_SCALE;
	var sy = RATIO * SPRITE_SCALE;

	sprite.width *= sx;
	sprite.height *= sy;

	return sprite;
}


// Rescales a sprite to standard dimensions
function scaleSprite(sprite)
{
	var sx = RATIO * SPRITE_SCALE;
	var sy = RATIO * SPRITE_SCALE;
	sprite.scale.setTo(sx, sy);

	return sprite;
}


// Rescales a tile sprite to standard dimensions
function scaleTileSprite(sprite)
{
	var sx = RATIO * SPRITE_SCALE;
	var sy = RATIO * SPRITE_SCALE;
	sprite.tileScale.setTo(sx, sy);

	return sprite;
}


// Set background color
function setBackgroundColor(color)
{
	game.stage.backgroundColor = color;
}


// Disables antialiasing on a sprite
function unsmoothSprite(sprite)
{
	sprite.smoothed = false;
	return sprite;
}
