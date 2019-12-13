var Breakout = new Phaser.Class({
    Extends: Phaser.Scene,
        
    initialize:
    function Breakout() {
        Phaser.Scene.call(this, {key: 'breakout'});
            
        this.bricks = null;
        this.paddle = null;
        this.ball = null;
    },
        
    preload:
    function() {
        this.load.atlas(
            'assets', 
            'assets/breakout.png', 
            'assets/breakout.json'
        );
    },
        
    create:
    function() {
        // Enable world bounds without the floor
        this.physics.world.setBoundsCollision(
            true,  // left
            true,  // right
            true,  // up
            false  // down
        );
            
        // Create bricks in a 10x6 grid
        this.bricks = this.physics.add.staticGroup({
            key: 'assets',
            frame: [
                'blue1',
                'red1',
                'green1',
                'yellow1',
                'silver1',
                'purple1'
            ],
            frameQuantity: 10,
            gridAlign: {
                width: 10,
                height: 6,
                cellWidth: 64,
                cellHeight: 32,
                x: 112,
                y: 100
            }
        });
            
        // Create ball object
        this.ball = this.physics.add.image(400, 500, 'assets', 'ball1');
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.ball.setData('onPaddle', true);
            
        // Create paddle object
        this.paddle = this.physics.add.image(400, 550, 'assets', 'paddle1');
        this.paddle.setImmovable();
            
        // Add collision between ball and bricks
        this.physics.add.collider(
            this.ball,
            this.bricks,
            this.hitBrick,
            null,
            this
        );
            
        // Add collision between ball and paddle
        this.physics.add.collider(
            this.ball,
            this.paddle,
            this.hitPaddle,
            null,
            this
        );
            
        // Add input events
        this.input.on(
            'pointermove',
            function(pointer) {
                // Keep paddle within game world
                this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
                    
                // Lock ball onto paddle if necessary
                if (this.ball.getData('onPaddle')) {
                    this.ball.x = this.paddle.x;
                }
            },
            this
        );
            
        this.input.on(
            'pointerup',
            function(pointer) {
                if (this.ball.getData('onPaddle')) {
                    this.ball.setVelocity(-75, -300);
                    this.ball.setData('onPaddle', false);
                }
            },
            this
        );
    },
        
    update:
    function() {
        if (this.ball.y > 600) {
            this.resetBall();
        }
    },
        
    hitBrick:
    function(ball, brick) { 
        // Params:
        // 1. Deactivate (boolean)
        // 2. Hide       (boolean)
        // ...
        brick.disableBody(true, true);
            
        // Deactivate and hide a brick upon its being hit,
        // then reset level if all bricks are inactive
        // ...
        if (this.bricks.countActive() === 0) {
            this.resetLevel();
        }
    },
        
    resetBall:
    function() {
        this.ball.setVelocity(0);
        this.ball.setPosition(this.paddle.x, 500);
        this.ball.setData('onPaddle', true);
    },
        
    resetLevel:
    function() {
        this.resetBall();
            
        // Reactivate and show all bricks
        // ...
        this.bricks.children.each(
            function(brick) {
                // Params:
                // 1. Reset and place at [x, y] (boolean)
                // 2. x                         (number)
                // 3. y                         (number)
                // 4. Activate                  (boolean)
                // 5. Show                      (boolean)
                // ...
                brick.enableBody(false, 0, 0, true, true);
            }
        );
    },
        
    hitPaddle:
    function(ball, paddle) {
        if (ball.x !== paddle.x) {
            // If ball is on either the left- or the right-hand
            // side of the paddle...
            // ...
            var diff = ball.x - paddle.x;
            ball.setVelocityX(10 * diff);
        }
        else {
            // If ball is perfectly in the center of the paddle,
            // prevent it from bouncing straight up!
            // ...
            ball.setVelocityX(2 + Math.random() * 8);
        }
    }
});

var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [Breakout],
    physics: {
        default: 'arcade'
    }
};

var game = new Phaser.Game(config);