var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'impact',
        impact: {
            setBounds: {
                x: 0,
                y: 0,
                width: 3200,
                height: 600,
                thickness: 32
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        extend: {
            // Local 'global' variables
            minimap: null,
            player: null,
            cursors: null,
            thrust: null,
            flares: null,
            bullets: null,
            lastFired: 0,
            text: null,
            
            // Helpful member functions
            createBulletEmitter: createBulletEmitter,
            createStarfield: createStarfield,
            createLandscape: createLandscape,
            createAliens: createAliens,
            createThrustEmitter: createThrustEmitter
        }
    }
};

var game = new Phaser.Game(config);


function preload() {
    this.load.image('star', 'assets/star2.png');
    this.load.image('bigStar', 'assets/star3.png');
    this.load.image('ship', 'assets/shmup-ship2.png');
    this.load.image('bullet', 'assets/bullet6.png');
    this.load.image('jets', 'assets/blue.png');
    this.load.image('flares', 'assets/yellow.png');
    
    this.load.spritesheet(
        'face', 
        'assets/metalface78x92.png',
        {
            frameWidth: 78,
            frameHeight: 92
        }
    );
}


function create() {
    // Bullet class
    var Bullet = new Phaser.Class({
        Extends: Phaser.GameObjects.Image,
        
        initialize:
        function Bullet(scene) {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
            
            this.speed = 0;
            this.born = 0;
        },
        
        fire:
        function(player) {
            this.setPosition(player.x, player.y);
            
            if (player.flipX) {
                // Facing left
                this.speed = Phaser.Math.GetSpeed(-1000 + player.vel.x, 1);
            }
            else {
                // Facing right
                this.speed = Phaser.Math.GetSpeed(1000 + player.vel.x, 1);
            }
            
            this.born = 0;
        },
        
        update:
        function(time, delta) {
            this.x += this.speed * delta;
            
            // Disappear after 1000 game ticks
            this.born += delta;
            if (this.born > 1000) {
                this.setActive(false);
                this.setVisible(false);
            }
        },
    });
    
    // Set world bounds to 3200x600
    this.cameras.main.setBounds(0, 0, 3200, 600);
    
    this.createStarfield();
    this.createLandscape();
    this.createAliens();
    this.createThrustEmitter();
    this.createBulletEmitter();
    
    // Add bullets
    this.bullets = this.add.group({
        classType: Bullet,
        runChildUpdate: true
    });
    
    // Add player
    this.player = this.impact.add.sprite(1600, 200, 'ship');
    this.player.setDepth(1);
    this.player.setMaxVelocity(1000);
    this.player.setFriction(800, 600);
    this.player.setPassiveCollision();
    
    // Add input
    this.cursors = this.input.keyboard.createCursorKeys();
    
    // Add text
    this.text = this.add.text(
        10, 10, '', {font: '16px Courier', fill: 0x00ff00}
    );
    this.text.setDepth(1);
    this.text.setScrollFactor(0);
}


function update(time, delta) {
    // Move thrust emitter to player
    this.thrust.setPosition(this.player.x, this.player.y);
    
    // Horizontal movement
    if (this.cursors.left.isDown) {
        // Move left
        this.player.setAccelerationX(-800);
        this.player.flipX = true;
    }
    else if (this.cursors.right.isDown) {
        // Move right
        this.player.setAccelerationX(800);
        this.player.flipX = false;
    }
    else {
        // Stop moving horizontally
        this.player.setAccelerationX(0);
    }
    
    // Vertical movement
    if (this.cursors.up.isDown) {
        // Move up
        this.player.setAccelerationY(-800);
    }
    else if (this.cursors.down.isDown) {
        // Move down
        this.player.setAccelerationY(800);
    }
    else {
        // Stop moving vertically
        this.player.setAccelerationY(0);
    }
    
    // Reposition thrust emitter
    if (this.player.flipX) {
        this.thrust.x.propertyValue += 16;
    }
    else {
        this.thrust.x.propertyValue -= 16;
    }
    
    this.thrust.setPosition(
        this.thrust.x.propertyValue,
        this.thrust.y.propertyValue
    );
    this.thrust.setSpeed(this.player.vel.x / 2);
    this.thrust.emitParticle(16);
    
    // Fire particles
    if (this.cursors.space.isDown && time > this.lastFired) {
        var bullet = this.bullets.get();
        bullet.setActive(true);
        bullet.setVisible(true);
        
        if (bullet) {
            bullet.fire(this.player);
            this.lastFired = time + 100;
        }
    }
    
    // Emitters to bullets
    this.bullets.children.each(
        function(b) {
            if (b.active) {
                this.flares.setPosition(b.x, b.y);
                this.flares.setSpeed(b.speed - 500);
                this.flares.emitParticle(1);
            }
        },
        this
    );
    
    // Update text
    this.text.setText(this.player.vel.x);
    
    // Center camera on player
    this.cameras.main.scrollX = this.player.x - this.sys.renderer.width / 2;
}


function createBulletEmitter() {
    this.flares = this.add.particles('flares').createEmitter({
        x: 1600,
        y: 200,
        angle: {min: 170, max: 190},
        scale: {start: 0.4, end: 0.2},
        blendMode: 'ADD',
        lifespan: 500,
        on: false
    });
}


function createThrustEmitter() {
    this.thrust = this.add.particles('jets').createEmitter({
        x: 1600,
        y: 200,
        angle: {min: 160, max: 200},
        scale: {start: 0.2, end: 0},
        blendMode: 'ADD',
        lifespan: 600,
        on: false
    });
}


function createStarfield() {
    // scrollFactor gives starfield background 'parallax' effect
    var group = this.add.group({key: 'star', frameQuantity: 256});
    group.createMultiple({key: 'bigStar', frameQuantity: 32});
    
    var rect = new Phaser.Geom.Rectangle(0, 0, 3200, 550);
    Phaser.Actions.RandomRectangle(group.getChildren(), rect);
    
    group.children.iterate(
        function(child, index) {
            var scrollFactor = Math.max(0.3, Math.random());
            
            if (child.texture.key === 'bigStar') {
                scrollFactor = 0.2;
            }
            
            child.setScrollFactor(scrollFactor);
        },
        this
    );
}


function createLandscape() {
    // Draw a random landscape
    var landscape = this.add.graphics();
    landscape.fillStyle(0x008800, 1);
    landscape.lineStyle(2, 0x00ff00, 1);
    
    landscape.beginPath();
    
    var minY = 400;
    var maxY = 550;
    
    var x = 0;
    var y = maxY;
    var range = 0;
    
    var up = true;
    
    landscape.moveTo(0, 600);
    landscape.lineTo(0, 550);
    
    do {
        // How large is this side of the mountain?
        range = Phaser.Math.Between(20, 100);
        
        if (up) {
            y = Phaser.Math.Between(y, minY);
            up = false;
        }
        else {
            y = Phaser.Math.Between(y, maxY);
            up = true;
        }
        
        landscape.lineTo(x + range, y);
        
        x += range;
        
    } while (x < 3100);
    
    landscape.lineTo(3200, maxY);
    landscape.lineTo(3200, 600);
    
    landscape.closePath();
    landscape.strokePath();
    landscape.fillPath();
}


function createAliens() {
    // Create some random aliens moving slowly around
    var animConfig = {
        key: 'metaleyes',
        frames: this.anims.generateFrameNumbers(
            'face', {start: 0, end: 4}
        ),
        frameRate: 20,
        repeat: -1
    };
    this.anims.create(animConfig);
    
    for (var i = 0; i < 32; i++) {
        var x = Phaser.Math.Between(100, 3100);
        var y = Phaser.Math.Between(100, 300);
        
        var face = this.impact.add.sprite(x, y, 'face');
        face.play('metaleyes');
        
        face.setLiteCollision();
        face.setBounce(1);
        face.setBodyScale(0.5);
        face.setVelocity(
            Phaser.Math.Between(20, 60),
            Phaser.Math.Between(20, 60)
        );
        
        // 50% chance to move left, otherwise move up
        if (Math.random() > 0.5) {
            face.vel.x *= -1;
        }
        else {
            face.vel.y *= -1;
        }
    }
}