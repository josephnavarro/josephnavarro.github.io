var FlipX = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function FlipX() {
        Phaser.Scene.call(this, {key: 'FlipX', active: true});
    },
    
    preload:
    function() {
        this.load.image('arrow', 'assets/arrow.png');
    },
    
    create:
    function() {
        var marker = this.add.image(100, 100, 'arrow').setAlpha(0.3);
        var image = this.add.image(100, 100, 'arrow');
        
        // flipX will call toggleFlipX whenever the tween yoyos or repeats
        var tween = this.tweens.add({
            targets: image,
            x: 600,
            flipX: true,
            yoyo: true,
            ease: 'Power1',
            duration: 3000,
            repeat: -1
        });
        
        // Tweening multiple properties will call flipX for each property
    }
    
});


var config = {
    type: Phaser.AUTO,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [FlipX]
};

var game = new Phaser.Game(config);