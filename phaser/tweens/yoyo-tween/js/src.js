var YoyoTween = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function YoyoTween() {
        Phaser.Scene.call(this, {key: 'YoyoTween', active: true});
    },
    
    preload:
    function() {
        this.load.image('block', 'assets/block.png');
    },
    
    create:
    function() {
        var marker = this.add.image(100, 300, 'block').setAlpha(0.2);
        var image = this.add.image(100, 300, 'block');
        
        var tween = this.tweens.add({
            targets: [image],
            x: 600,
            duration: 3000,
            ease: 'Sine.easeIn',
            yoyo: true
        });
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    pixelArt: false,
    scene: [YoyoTween],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);