var ChainedAnimation = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function ChainedAnimation() {
        Phaser.Scene.call(this, {key: 'ChainedAnimation', active: true});
    },
    
    preload:
    function() {
        this.load.atlas('gems', 'assets/gems.png', 'assets/gems.json');
    },
    
    create:
    function() {
        this.anims.create({
            key: 'diamond',
            frames: this.anims.generateFrameNames(
                'gems',
                {
                    prefix: 'diamond_',
                    end: 15,
                    zeroPad: 4
                }
            ),
            repeat: 4
        });
        
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
            repeat: 8
        });
        
        var gem = this.add.sprite(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'gems'
        );
        
        gem.setScale(4);
        gem.play('diamond');
        gem.anims.chain('ruby');
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    width: 800,
    height: 600,
    pixelArt: true,
    scene: [ChainedAnimation]
};

var game = new Phaser.Game(config);