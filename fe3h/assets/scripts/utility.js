/**
 *  Adds an instance of non-antialiased bitmap text.
 */
function addBitmapText(font, text, x, y, size) {
	x = RATIO * x;
	y = RATIO * y;
	size = RATIO * size;

	var text = game.add.bitmapText(x, y, font, text, size);
	unsmoothSprite(text);

	return text;
}


/**
 *  Adds a gravity attribute to a sprite.
 */
function addGravity(sprite, gravity=GRAVITY) {
	gravity = RATIO * gravity;
	sprite.body.gravity.y = gravity;

	return sprite;
}


/**
 *  Adds physical attributes to a sprite
 */
function addPhysics(sprite, w=0, h=0, dx=0, dy=0, immovable=false) {
	game.physics.enable(sprite, Phaser.Physics.ARCADE);

	if (!w) { w = sprite.width; }
	if (!h) { h = sprite.height; }
	if (immovable) { sprite.body.immovable = true; }

	sprite.body.setSize(w, h, dx, dy);

	return sprite;
}


/**
 *  Adds a sprite using the given image tag.
 */
function addSprite(x, y, tag) {
	x = RATIO * x;
	y = RATIO * y;

	return game.add.sprite(x, y, tag);
}


/**
 *  Adds a tiled sprite using the given image tag and dimensions.
 */
function addTiledSprite(x, y, w, h, tag) {
	x = RATIO * x;
	y = RATIO * y;
	w = RATIO * w;
	h = RATIO * h;

	var sprite = game.add.tileSprite(x, y, w, h, tag);
	unsmoothSprite(sprite);
	scaleTileSprite(sprite);

	return sprite;
}


/**
 *  Draws a colored rectangle.
 */
function drawRect(x, y, w, h, color) {
	x *= RATIO;
	y *= RATIO;
	w *= RATIO;
	h *= RATIO;

	var graphics = game.add.graphics();
	graphics.beginFill(color);
	graphics.drawRect(x, y, w, h);
	graphics.endFill();

	return graphics;
}


/**
 *  Fades out a sprite.
 */
function fadeOutSprite(sprite, time) {
	game.add.tween(sprite).to(
		{
			alpha: 0
		},
		time,
		Phaser.Easing.Linear.Out,
		true
	);
}


/**
 *  Pad number with zeros on the left
 */
function padLeft(number, padding) {
	padding -= number.toString().length;
	if (padding < 0) { padding = 0; }

	var string = '';
	for (var x = 0; x !== padding; x++)
	{
		string += '0';
	}
	string += number;

	return string;
}


/**
 *  Plays an animation on a sprite at standard framerate.
 */
function playAnimation(sprite, animation, loop=true, frame=0) {
	sprite.animations.play(animation, SPRITE_FRAMERATE, loop);
	sprite.animations.currentAnim.setFrame(frame, true);
	return sprite;
}


/**
 *  Generates a random integer.
 */
function randint(lower, upper) {
	return Math.round(lower + Math.random() * (upper - lower))
}


/**
 *  Randomly selects an element from an array.
 */
function randomChoice(array) {
	var length = array.length;
	return array[randint(0, length - 1)];
}


/**
 *  Scales a button sprite to standard dimensions.
 */
function scaleButtonSprite(sprite) {
	var scale = RATIO * SPRITE_SCALE;

	sprite.width *= scale;
	sprite.height *= scale;

	return sprite;
}


/**
 *  Rescales a sprite to standard dimensions.
 */
function scaleSprite(sprite) {
	var scale = RATIO * SPRITE_SCALE;

	sprite.scale.setTo(scale, scale);

	return sprite;
}


/**
 *  Rescales a tiled sprite to standard dimensions.
 */
function scaleTileSprite(sprite) {
	var scale = RATIO * SPRITE_SCALE;

	sprite.tileScale.setTo(scale, scale);

	return sprite;
}


/**
 *  Sets game's background color.
 */
function setBackgroundColor(color) {
	game.stage.backgroundColor = color;
}


/**
 *  Sets sprite tint color.
 */
function setTint(sprite, tint) {
	sprite.tint = tint;
}


/**
 *  Disables antialiasing on a sprite.
 */
function unsmoothSprite(sprite) {
	sprite.smoothed = false;
	return sprite;
}
