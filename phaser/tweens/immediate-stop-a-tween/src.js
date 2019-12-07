var ImmediateStopATween = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function ImmediateStopATween() {
        Phaser.Scene.call(this, {key: 'ImmediateStopATween', active: true});
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
            targets: [image],
            x: 700,
            ease: 'Power2',
            delay: 1000,
            duration: 6000,
            loop: -1
        });
        
        this.input.on(
            'pointerdown',
            function() {
                tween.stop();
            },
            this
        );
    }
    
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    width: 800,
    height: 600,
    scene: [ImmediateStopATween]
};

var game = new Phaser.Game(config);