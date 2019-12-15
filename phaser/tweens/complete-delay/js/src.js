var CompleteDelay = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function CompleteDelay() {
        Phaser.Scene.call(this, {key: 'CompleteDelay', active: true});
    },
    
    preload:
    function() {
        this.load.image('block', 'assets/block.png');
    },
    
    create:
    function() {
        var marker = this.add.image(100, 100, 'block').setAlpha(0.2);
        var image = this.add.image(100, 100, 'block');
        
        this.tweens.add({
            targets: [image],
            x: 600,
            ease: 'Power2',
            duration: 3000,
            completeDelay: 3000,
            onComplete: function() {
                console.log('onComplete');
            }
        });
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    pixelArt: false,
    scene: [CompleteDelay],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);