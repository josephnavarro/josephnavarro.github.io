var YoyoDelay = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function YoyoDelay() {
        Phaser.Scene.call(this, {key: 'YoyoDelay', active: true});
    },
    
    preload:
    function() {
        this.load.image('block', 'assets/block.png');
    },
    
    create:
    function() {
        var marker = this.add.image(100, 300, 'block').setAlpha(0.2);
        var image = this.add.image(100, 300, 'block');
        
        this.tweens.add({
            targets: [image],
            x: 600,
            duration: 2000,
            yoyo: true,
            ease: 'Power1',
            hold: 2000
        });
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    pixelArt: false,
    scene: [YoyoDelay],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);