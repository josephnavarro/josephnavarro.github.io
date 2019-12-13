var CreateAnimationWithoutFrameNames = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function CreateAnimationWithoutFrameNames() {
        Phaser.Scene.call(this, {key: 'CreateAnimationWithoutFrameNames', active: true});
    },
    
    preload:
    function() {
        this.load.atlas('gems', 'assets/gems.png', 'assets/gems.json');
    },
    
    create:
    function() {
        var animFrames = [];
        
        this.textures.get('gems').getFrameNames().forEach(
            function(frameName) {
                animFrames.push({key: 'gems', frame: frameName});
            }
        );
        
        this.anims.create({
            key: 'diamond',
            frames: animFrames,
            repeat: -1
        });
        
        this.add.sprite(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'gems'
        ).play('diamond');
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    width: 800,
    height: 600,
    scene: [CreateAnimationWithoutFrameNames]
};

var game = new Phaser.Game(config);