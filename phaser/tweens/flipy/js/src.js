var FlipY = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function FlipY() {
        Phaser.Scene.call(this, {key: 'FlipY', active: true});
    },
    
    preload:
    function() {
        this.load.image('cokecan', 'assets/cokecan.png');
    },
    
    create:
    function() {
        var marker = this.add.image(100, 100, 'cokecan').setAlpha(0.3);
        var image = this.add.image(100, 100, 'cokecan');
        
        // Setting `flipY` calls `toggleFlipY` whenever the tween yoyos or repeats
        this.tweens.add({
            targets: image,
            x: 600,
            ease: 'Power1',
            flipY: true,
            yoyo: true,
            repeat: -1,
            duration: 3000
        });
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    width: 800,
    height: 600,
    scene: [FlipY],
    pixelArt: true
};

var game = new Phaser.Game(config);