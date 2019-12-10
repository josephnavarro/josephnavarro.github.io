var AnimationData = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function AnimationData() {
        Phaser.Scene.call(this, {key: 'AnimationData', active: true});
        
        this.frameView;
        this.sprite;
        this.progress;
    },
    
    preload:
    function() {
        this.load.spritesheet(
            'mummy',
            'assets/mummy37x45.png',
            {
                frameWidth: 37,
                frameHeight: 45
            }
        );
    },
    
    create:
    function() {
        // Create frame debug view
        this.frameView = this.add.graphics({
            fillStyle: {color: 0xff00ff},
            x: 32,
            y: 32
        });
        
        this.add.image(32, 32, 'mummy', '__BASE').setOrigin(0);
        
        // Create animation
        var anim = this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('mummy'),
            frameRate: 6,
            //yoyo: true,
            repeat: -1
        });
        
        // Create sprite
        this.sprite = this.add.sprite(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'mummy'
        );
        this.sprite.setScale(4);
        this.sprite.anims.load('walk');
        
        // Create progress text
        this.progress = this.add.text(100, 500, 'Progress: 0.00%', {color: '#00ff00'});
        
        var _this = this;
        
        // Add keyboard input
        this.input.keyboard.on(
            'keydown_SPACE',
            function(event) {
                _this.sprite.anims.play('walk');
            }
        );
        
        this.input.keyboard.on(
            'keydown_P',
            function(event) {
                if (_this.sprite.anims.isPaused) {
                    _this.sprite.anims.resume();
                }
                else {
                    _this.sprite.anims.pause();
                }
            }
        );
        
        this.input.keyboard.on(
            'keydown_R',
            function(event) {
                _this.sprite.anims.restart();
            }
        );
    },
    
    update:
    function() {
        this.updateFrameView();
        
        this.progress.setText([
            'SPACE to start animation; P to pause/resume; R to restart',
            'Progress: ' + (100 * this.sprite.anims.getProgress()).toFixed(2) + '%',
            'Accumulator: ' + this.sprite.anims.accumulator,
            'NextTick: ' + this.sprite.anims.nextTick
        ]);
    },
    
    updateFrameView:
    function() {
        this.frameView.clear();
        this.frameView.fillRect(this.sprite.frame.cutX, 0, 37, 45);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    pixelArt: true,
    width: 800,
    height: 600,
    scene: [AnimationData]
};

var game = new Phaser.Game(config);