var BitmapTextBlendMode = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function BitmapTextBlendMode() {
        Phaser.Scene.call(this, {key: 'BitmapTextBlendMode', active: true});
    },
    
    preload:
    function() {
        this.load.image('z2', 'assets/zero-two.png');
        this.load.bitmapFont('ice', 'assets/iceicebaby.png', 'assets/iceicebaby.xml');
    },
    
    create:
    function() {
        this.add.image(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'z2'
        );
        
        var text = this.add.bitmapText(64, 200, 'ice', 'Zero Two', 32);
        text.setBlendMode(Phaser.BlendModes.ADD);
        
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
        })
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    width: 800,
    height: 600,
    pixelArt: false,
    scene: [BitmapTextBlendMode]
};

var game = new Phaser.Game(config);