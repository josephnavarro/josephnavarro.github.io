var GetTextSize = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function GetTextSize() {
        Phaser.Scene.call(this, {key: 'GetTextSize', active: true});
        
        var graphics = null;
        var bounds1 = null;
        var bounds2 = null;
        var bounds3 = null;
    },
    
    preload:
    function() {
        this.load.bitmapFont('atari', 'assets/atari-smooth.png', 'assets/atari-smooth.xml');
        this.load.bitmapFont('gothic', 'assets/gothic.png', 'assets/gothic.xml');
        this.load.bitmapFont('hyper', 'assets/hyperdrive.png', 'assets/hyperdrive.xml');
    },
    
    create:
    function() {
        this.graphics = this.add.graphics({
            x: 0,
            y: 0,
            fillStyle: {color: 0xff00ff}
        });
        
        var text1 = this.add.bitmapText(0, 0, 'atari', 'Welcome!', 70);
        var text2 = this.add.bitmapText(0, 160, 'gothic', 'Welcome!', 40);
        var text3 = this.add.bitmapText(0, 300, 'hyper', 'Welcome!', 128);
        
        this.bounds1 = text1.getTextBounds();
        this.bounds2 = text2.getTextBounds();
        this.bounds3 = text3.getTextBounds();
    },
    
    update:
    function() {
        this.graphics.clear();
        
        this.graphics.fillRect(
            this.bounds1.global.x,
            this.bounds1.global.y,
            this.bounds1.global.width,
            this.bounds1.global.height
        );
        
        this.graphics.fillRect(
            this.bounds2.global.x,
            this.bounds2.global.y,
            this.bounds2.global.width,
            this.bounds2.global.height
        );
        
        this.graphics.fillRect(
            this.bounds3.global.x,
            this.bounds3.global.y,
            this.bounds3.global.width,
            this.bounds3.global.height
        );
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    width: 800,
    height: 600,
    pixelArt: false,
    scene: [GetTextSize]
};

var game = new Phaser.Game(config);