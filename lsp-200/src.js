// Game instance
var game = new Phaser.Game(
	800, 600,
	Phaser.AUTO,
	'phaser-example',
	{
		preload: preload,
		update: update,
		create: create,
		render: render
	}
)

// Globals
var emitter;
var spriteGroup;


var person = {
	"image": '',
	"age": 0,
	"gender": '',
	"ethnicity": '',
	"location": '',
	"religion": ''
};

var images = {
	"male": [
		'm-001',
		'm-002',
		'm-003',
		'm-004',
		'm-005',
		'm-006',
		'm-007',
		'm-008'
	],
	"female": [
		'f-001',
		'f-002',
		'f-003',
		'f-004',
		'f-005',
		'f-006',
		'f-007',
		'f-008',
	]
}

var sprite;
var gameLabel;
var promptLabel;
var ageLabel;
var ageText;
var genderLabel;
var genderText;
var ethnicityLabel;
var ethnicityText;
var locationLabel;
var locationText;
var religionLabel;
var religionText;


// Generates a random number between bounds
function randint(lower, upper)
{
	var range = upper - lower;
	return lower + Math.round(Math.random() * range);
}


// Randomly selects an element from an array
function randomChoice(array)
{
	var length = array.length;
	return array[randint(0, length - 1)];
}


// Randomly generates a gender
function generateGender(age)
{
	var random = randint(0, 1000);
	if (age <= 24)
	{
		if (random <= 512)
		{
			return "Male";
		}
		else
		{
			return "Female";
		}
	}
	else
	{
		if (random <= 501)
		{
			return "Male";
		}
		else
		{
			return "Female";
		}
	}
}


// Randomly generates a religion
function generateReligion()
{
	var random = randint(0, 1000);
	if (random <= 489)
	{
		return "Protestantism";
	}
	else if (random <= 719)
	{
		return "Catholicism";
	}
	else if (random <= 928)
	{
		return "No religion";
	}
	else if (random <= 953)
	{
		return "Other";
	}
	else if (random <= 974)
	{
		return "Judaism";
	}
	else if (random <= 992)
	{
		return "Mormonism";
	}
	else
	{
		return "Islam";
	}
}


// Generates an ethnicity
function generateEthnicity()
{
	var random = randint(0, 1000);
	if (random <= 615)
	{
		return "White";
	}
	else if (random <= 791)
	{
		return "Hispanic or Latino";
	}
	else if (random <= 914)
	{
		return "Black or African American";
	}
	else if (random <= 967)
	{
		return "Asian";
	}
	else if (random <= 974)
	{
		return "Native American";
	}
	else if (random <= 976)
	{
		return "Pacific Islander";
	}
	else if (random <= 984)
	{
		return "White and Black or African American";
	}
	else if (random <= 990)
	{
		return "White and Asian";
	}
	else if (random <= 996)
	{
		return "White and Native American";
	}
	else
	{
		return "Black and Native American";
	}
}


// Randomly generates a location
function generateLocation()
{
	var random = randint(0, 1000);
	if (random <= 160)
	{
		return "New York";
	}
	else if (random <= 266)
	{
		return "Los Angeles";
	}
	else if (random <= 342)
	{
		return "Chicago";
	}
	else if (random <= 402)
	{
		return "Dallas - Fort Worth";
	}
	else if (random <= 458)
	{
		return "Houston";
	}
	else if (random <= 508)
	{
		return "Washington, D.C.";
	}
	else if (random <= 557)
	{
		return "Miami";
	}
	else if (random <= 607)
	{
		return "Philadelphia";
	}
	else if (random <= 654)
	{
		return "Atlanta";
	}
	else if (random <= 693)
	{
		return "Boston";
	}
	else if (random <= 732)
	{
		return "Phoenix";
	}
	else if (random <= 769)
	{
		return "San Francisco";
	}
	else if (random <= 807)
	{
		return "Riverside - San Bernardino";
	}
	else if (random <= 841)
	{
		return "Detroit";
	}
	else if (random <= 873)
	{
		return "Seattle";
	}
	else if (random <= 902)
	{
		return "Minneapolis - St. Paul";
	}
	else if (random <= 929)
	{
		return "San Diego";
	}
	else if (random <= 954)
	{
		return "Tampa - St. Petersburg";
	}
	else if (random <= 978)
	{
		return "Denver";
	}
	else
	{
		return "St. Louis";
	}
}


// Generates a particle burst
function particleBurst()
{
	emitter = spriteGroup.add(game.add.emitter(124, 275, 10));
	emitter.makeParticles('star');
	emitter.gravity = 0;
	emitter.alpha = 0.8;
	emitter.start(true, 1000, null, 50);

	game.add.tween(emitter).to(
		{
			alpha: 0
		},
		1000,
		Phaser.Easing.Linear.Out,
		true
	);

	spriteGroup.sendToBack(emitter);
}


// Randomly generates an individual
function generatePerson()
{
	//var age = randint(15, 54);
	var age = randint(5, 18) + randint(5, 18) + randint(5, 18);
	var gender = generateGender(age);
	var religion = generateReligion();
	var ethnicity = generateEthnicity();
	var location = generateLocation();

	person["age"] = age;
	person["gender"] = gender;
	person["religion"] = religion;
	person["ethnicity"] = ethnicity;
	person["location"] = location;

	if (gender.toLowerCase() == "male")
	{
		person["image"] = randomChoice(images["male"]);
	}
	else
	{
		person["image"] = randomChoice(images["female"]);
	}

	// Update globals
	sprite.loadTexture(person["image"]);
	ageText.text = age;
	genderText.text = gender;
	ethnicityText.text = ethnicity;
	locationText.text = location;
	religionText.text = religion;

	// Particle burst
	particleBurst();
}


// Preload callback
function preload()
{
	// Particle image
	game.load.image('star', 'assets/particles/star.png');

	// Font
	game.load.bitmapFont(
		'font',
		'assets/font/font.png',
		'assets/font/font.fnt'
	);

	// Female images
	game.load.image('f-001', 'assets/people/f/001.png');
	game.load.image('f-002', 'assets/people/f/002.png');
	game.load.image('f-003', 'assets/people/f/003.png');
	game.load.image('f-004', 'assets/people/f/004.png');
	game.load.image('f-005', 'assets/people/f/005.png');
	game.load.image('f-006', 'assets/people/f/006.png');
	game.load.image('f-007', 'assets/people/f/007.png');
	game.load.image('f-008', 'assets/people/f/008.png');

	// Male images
	game.load.image('m-001', 'assets/people/m/001.png');
	game.load.image('m-002', 'assets/people/m/002.png');
	game.load.image('m-003', 'assets/people/m/003.png');
	game.load.image('m-004', 'assets/people/m/004.png');
	game.load.image('m-005', 'assets/people/m/005.png');
	game.load.image('m-006', 'assets/people/m/006.png');
	game.load.image('m-007', 'assets/people/m/007.png');
	game.load.image('m-008', 'assets/people/m/008.png');
}


// Update callback
function update()
{

}


// Create callback
function create()
{
	// Set background color
	game.stage.backgroundColor = '#a0cff0';

	// Sprite group
	spriteGroup = game.add.group();

	// Add emitter
	emitter = spriteGroup.add(game.add.emitter(48 +75, 275, 10));
	emitter.makeParticles('star');
	emitter.gravity = 0;

	// Add person sprite
	sprite = spriteGroup.add(game.add.sprite(48, 200, 'sprite'));

	// Add bitmap text objects
	gameLabel = spriteGroup.add(
		game.add.bitmapText(
			48, 48, 'font', 'People You May Meet in the U.S.', 48
		)
	);

	ageLabel = spriteGroup.add(
		game.add.bitmapText(
			200, 200, 'font', 'Age: ', 24
		)
	);

	genderLabel = spriteGroup.add(
		game.add.bitmapText(
			200, 232, 'font', 'Gender at Birth: ', 24
		)
	);

	locationLabel = spriteGroup.add(
		game.add.bitmapText(
			200, 264, 'font', 'Location: ', 24
		)
	);

	ethnicityLabel = spriteGroup.add(
		game.add.bitmapText(
			200, 296, 'font', 'Ethnicity: ', 24
		)
	);

	religionLabel = spriteGroup.add(
		game.add.bitmapText(
			200, 328, 'font', 'Religion: ', 24
		)
	);

	promptLabel = spriteGroup.add(
		game.add.bitmapText(
			200, 424, 'font', 'Tap to see different people!', 34
		)
	);

	ageText = spriteGroup.add(game.add.bitmapText(400, 200, 'font', '', 24));
	genderText = spriteGroup.add(game.add.bitmapText(400, 232, 'font', '', 24));
	locationText = spriteGroup.add(game.add.bitmapText(400, 264, 'font', '', 24));
	ethnicityText = spriteGroup.add(game.add.bitmapText(400, 296, 'font', '', 24));
	religionText = spriteGroup.add(game.add.bitmapText(400, 328, 'font', '', 24));

	// Generate people
	game.input.onDown.add(generatePerson, this);
	generatePerson();
}


// Render callback
function render()
{

}
