var CustomEase = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function CustomEase() {
        Phaser.Scene.call(this, {key: 'CustomEase', active: true});
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
            duration: 3000,
            delay: 3000,
            ease: function(t) {
                return Math.pow(Math.sin(3 * t), 3);
            }
        });
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    pixelArt: false,
    scene: [CustomEase],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);