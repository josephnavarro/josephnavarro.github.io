var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Game instance
var game = new Phaser.Game(config);


// Globals
var bombs;
var cursors;
var platforms;
var player;
var scoreText;
var stars;

var gameOver = false;
var score = 0;


// Star collection callback
function collectStar(player, star) {
    star.disableBody(true, true);
    
    score += 10;
    scoreText.setText('Score: ' + score);
    
    if (stars.countActive(true) === 0) {
        // Add a new batch of stars if they're all gone
        stars.children.iterate(
            function(child) {
                child.enableBody(true, child.x, 0, true, true);
            }
        );
        
        // Spawn a bomb elsewhere
        var x;
        if (player.x < 400) {
            x = Phaser.Math.Between(400, 800);
        }
        else {
            x = Phaser.Math.Between(0, 400);
        }
        
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}


// Bomb collision callback
function hitBomb(player, bomb) {
    this.physics.pause();
    
    player.setTint(0xff0000);
    player.anims.play('turn');
    
    gameOver = true;
}


// Preload callback
function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    
    this.load.spritesheet(
        'dude',
        'assets/dude.png',
        {
            frameWidth: 32,
            frameHeight: 48
        }
    );
}


// Create callback
function create() {
    var w = this.sys.renderer.width;
    var h = this.sys.renderer.height;
    
    // Add sky background
    this.add.image(w / 2, h / 2, 'sky');
    
    // Add platforms (group with physical attributes)
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    
    // Add player (sprite with physical attributes)
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    // Create 'left' animation
    this.anims.create(
        {
            key: 'left',
            frames: this.anims.generateFrameNumbers(
                'dude',
                {
                    start: 0,
                    end: 3
                }
            ),
            frameRate: 10,
            repeat: -1
        }
    );
    
    // Create 'turning' animation
    this.anims.create(
        {
            key: 'turn',
            frames: [{key: 'dude', frame: 4}],
            frameRate: 20
        }
    );
    
    // Create 'right' animation
    this.anims.create(
        {
            key: 'right',
            frames: this.anims.generateFrameNumbers(
                'dude',
                {
                    start: 5,
                    end: 8
                }
            ),
            frameRate: 10,
            repeat: -1
        }
    );
    
    // Add input via cursor keys
    cursors = this.input.keyboard.createCursorKeys();
    
    
    // Add stars (group with physical attributes)
    stars = this.physics.add.group(
        {
            key: 'star',
            repeat: 11,    // Add 11 stars in addition to the first
            setXY: {
                x: 12,     // Start at x=12
                y: 0,      // Start at y=0
                stepX: 70  // Evenly spaced 70 pixels apart
            }
        }
    );
    
    stars.children.iterate(
        function(child) {
            // Each star gets a randomly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        }
    );
    
    
    // Add bombs (group with physical attributes)
    bombs = this.physics.add.group();
    
    // Add score text
    scoreText = this.add.text(
        16, 16, 
        'score: 0',
        {
            fontSize: '32px',
            fill: '#000'
        }
    );
    
    
    // Add collision detection between player and platforms
    this.physics.add.collider(player, platforms);
    
    // Add collision detection between stars and platforms
    this.physics.add.collider(stars, platforms);
    
    // Add collision detection between bombs and platforms
    this.physics.add.collider(bombs, platforms);
    
    // Add collision detection between bombs
    this.physics.add.collider(bombs, bombs);
    
    // Add overlapping collision between stars and player
    this.physics.add.overlap(player, stars, collectStar, null, this);
    
    // Add collision detection between bombs and player
    this.physics.add.collider(player, bombs, hitBomb, null, this);
}


// Update callback
function update() {
    if (gameOver) {
        return;
    }
    else {
        if (cursors.left.isDown) {
            // Move left on 'left'
            player.setVelocityX(-160);
            player.anims.play('left', true);
        }
        else if (cursors.right.isDown) {
            // Move right on 'right'
            player.setVelocityX(160);
            player.anims.play('right', true);
        }
        else {
            // Stop moving
            player.setVelocityX(0);
            player.anims.play('turn');
        }
  
        if (cursors.up.isDown && player.body.touching.down) {
            // Jump on 'up'
            player.setVelocityY(-330);
        }
    }
    
}