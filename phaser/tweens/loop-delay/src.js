var LoopDelay = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function LoopDelay() {
        Phaser.Scene.call(this, {key: 'LoopDelay', active: true});
    },
    
    preload:
    function() {
        this.load.image('block', 'assets/block.png');
    },
    
    create:
    function() {
        var marker = this.add.image(100, 300, 'block').setAlpha(0.3);
        var image = this.add.image(100, 300, 'block');
        
        var tween = this.tweens.add({
            targets: image,
            x: 600,
            duration: 2000,
            ease: 'Sine.easeInOut',
            loop: 2,
            loopDelay: 2000
        });
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    width: 800,
    height: 600,
    scene: [LoopDelay]
};

var game = new Phaser.Game(config);