var CreateFromSpriteConfig = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function CreateFromSpriteConfig() {
        Phaser.Scene.call(this, {key: 'CreateFromSpriteConfig', active: true});
    },
    
    preload:
    function() {
        this.load.atlas('gems', 'assets/gems.png', 'assets/gems.json');
    },
    
    create:
    function() {
        // Define animations first
        this.anims.create({
            key: 'ruby',
            frames: this.anims.generateFrameNames(
                'gems',
                {
                    prefix: 'ruby_',
                    end: 6,
                    zeroPad: 4
                }
            ),
            repeat: -1
        });
        
        this.anims.create({
            key: 'square',
            frames: this.anims.generateFrameNames(
                'gems',
                {
                    prefix: 'square_',
                    end: 14,
                    zeroPad: 4
                }
            ),
            repeat: -1
        });
        
        // Set up sprite config
        var config1 = {
            key: 'gems',
            x: {randInt: [0, 800]},
            y: {randInt: [0, 300]},
            scale: {randFloat: [0.5, 1.5]},
            anims: 'ruby'
        };
        
        var config2 = {
            key: 'gems',
            x: {randInt: [0, 800]},
            y: {randInt: [300, 600]},
            scale: {randFloat: [0.5, 1.5]},
            anims: {
                key: 'square',
                repeat: -1,
                repeatDelay: {randInt: [1, 4]},
                delayedPlay: function() {
                    return Math.random() * 6;
                }
            }
        };
        
        for (var i = 0; i != 16; i++) {
            this.make.sprite(config1);
        }
        
        for (var i = 0; i != 16; i++) {
            this.make.sprite(config2);
        }
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: true,
    width: 800,
    height: 600,
    scene: [CreateFromSpriteConfig]
};

var game = new Phaser.Game(config);