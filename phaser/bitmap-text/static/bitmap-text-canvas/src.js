var BitmapTextCanvas = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function BitmapTextCanvas() {
        Phaser.Scene.call(this, {key: 'BitmapTextCanvas', active: true});
        
        this.dynamic1 = null;
        this.dynamic2 = null;
        this.value = 0;
    },
    
    preload:
    function() {
        this.load.bitmapFont('desyrel', 'assets/desyrel.png', 'assets/desyrel.xml');
        this.load.bitmapFont('desyrel-pink', 'assets/desyrel-pink.png', 'assets/desyrel-pink.xml');
    },
    
    create:
    function() {
        this.dynamic1 = this.add.bitmapText(0, 0, 'desyrel', 'Hello world', 8);
        this.tweens.add({
            targets: [this.dynamic1],
            fontSize: 128,
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });
        
        this.dynamic2 = this.add.bitmapText(0, 200, 'desyrel-pink', 'Hello world', 32);
        this.tweens.add({
            targets: [this.dynamic2],
            scaleX: 6,
            scaleY: 4,
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });
    },
    
    update:
    function() {
        this.dynamic1.text = 'Value: ' + this.value.toFixed(2);
        this.dynamic2.text = 'Value: ' + this.value.toFixed(2);
        
        this.value += 0.01;
    }
    
});


var config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    width: 800,
    height: 600,
    pixelArt: false,
    scene: [BitmapTextCanvas]
};

var game = new Phaser.Game(config);