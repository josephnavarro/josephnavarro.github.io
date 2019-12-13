var HideOnComplete = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function HideOnComplete() {
        Phaser.Scene.call(this, {key: 'HideOnComplete', active: true});
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
            repeat: 3,
            hideOnComplete: true
        });
        
        var gem = this.add.sprite(
            this.sys.renderer.width / 2, 
            this.sys.renderer.height / 2, 
            'gems'
        );
        gem.play('diamond');
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    width: 800,
    height: 600,
    pixelArt: true,
    scene: [HideOnComplete]
};

var game = new Phaser.Game(config);