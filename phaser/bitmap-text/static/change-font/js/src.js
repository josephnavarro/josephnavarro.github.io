var ChangeFont = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function ChangeFont() {
        Phaser.Scene.call(this, {key: 'ChangeFont', active: true});
    },
    
    preload:
    function() {
        this.load.bitmapFont('desyrel', 'assets/desyrel.png', 'assets/desyrel.xml');
        this.load.bitmapFont('atari', 'assets/atari-smooth.png', 'assets/atari-smooth.xml');
        this.load.bitmapFont('ice', 'assets/iceicebaby.png', 'assets/iceicebaby.xml');
        this.load.bitmapFont('gothic', 'assets/gothic.png', 'assets/gothic.xml');
        this.load.bitmapFont('hyper', 'assets/hyperdrive.png', 'assets/hyperdrive.xml');
    },
    
    create:
    function() {
        var text = this.add.bitmapText(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'atari', '', 38
        );
        text.setOrigin(0.5);
        text.setCenterAlign();
        text.setInteractive();
        text.setText([
            'Phaser',
            'BitmapText',
            'Click to set font!'
        ]);
        
        var fonts = [
            'atari',
            'desyrel',
            'ice',
            'gothic',
            'hyper'
        ];
        var currentFont = 0;
        
        text.on(
            'pointerup',
            function() {
                currentFont += 1;
                if (currentFont === fonts.length) {
                    currentFont = 0;
                }
                text.setFont(fonts[currentFont]);
                text.setOrigin(0.5);
            },
            this
        );
    }
})


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    width: 800,
    height: 600,
    pixelArt: false,
    scene: [ChangeFont]
};

var game = new Phaser.Game(config);