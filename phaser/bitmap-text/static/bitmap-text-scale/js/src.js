var BitmapTextScale = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function BitmapTextScale() {
        Phaser.Scene.call(this, {key: 'BitmapTextScale', active: true});
    },
    
    preload:
    function() {
        this.load.bitmapFont('ice', 'assets/iceicebaby.png', 'assets/iceicebaby.xml');
    },
    
    create:
    function() {
        var text = this.add.bitmapText(100, 100, 'ice', 'Terminator', 32);
        
        this.tweens.add({
            targets: [text],
            duration: 4000,
            scaleX: 4,
            ease: 'Quad.easeInOut',
            repeat: -1,
            yoyo: true
        });
        
        this.tweens.add({
            targets: [text],
            duration: 3000,
            scaleY: 8,
            ease: 'Cubic.easeInOut',
            repeat: -1,
            yoyo: true
        });
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    width: 800,
    height: 600,
    scene: [BitmapTextScale]
};

var game = new Phaser.Game(config);