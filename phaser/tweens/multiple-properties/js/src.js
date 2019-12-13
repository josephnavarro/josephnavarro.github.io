var MultipleProperties = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function MultipleProperties() {
        Phaser.Scene.call(this, {key: 'MultipleProperties', active: true});
    },
    
    preload:
    function() {
        this.load.image('block', 'assets/block.png');
    },
    
    create:
    function() {
        var image = this.add.sprite(100, 100, 'block');
        
        this.tweens.add({
            targets: [image],
            x: {
                value: 700,
                duration: 4000,
                ease: 'Power2'
            },
            y: {
                value: 400,
                duration: 1500,
                ease: 'Bounce.easeOut'
            }
        });
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    width: 800,
    height: 600,
    scene: [MultipleProperties]
};

var game = new Phaser.Game(config);