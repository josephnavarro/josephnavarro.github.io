var SingleSpriteSheet = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function SingleSpriteSheet() {
        Phaser.Scene.call(this, {key: 'SingleSpriteSheet', active: true});
    },
    
    preload:
    function() {
        this.load.spritesheet(
            'boom', 
            'assets/explosion.png',
            {
                frameWidth: 64,
                frameHeight: 64,
                endFrame: 23
            }
        );
    },
    
    create:
    function() {
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers(
                'boom',
                {
                    start: 0,
                    end: 23,
                    first: 23
                }
            ),
            frameRate: 20
        });
        
        this.add.sprite(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'boom'
        ).play('explode');
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    width: 800,
    height: 600,
    scene: [SingleSpriteSheet]
};

var game = new Phaser.Game(config);