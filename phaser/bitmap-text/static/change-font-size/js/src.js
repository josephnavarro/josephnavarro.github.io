var ChangeFontSize = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function ChangeFontSize() {
        Phaser.Scene.call(this, {key: 'ChangeFontSize', active: true});
    },
    
    preload:
    function() {
        this.load.bitmapFont('gem', 'assets/gem.png', 'assets/gem.xml');
    },
    
    create:
    function() {
        var text = this.add.bitmapText(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'gem', '', 16
        );
        
        text.setOrigin(0.5);
        text.setCenterAlign();
        text.setInteractive();
        
        text.setText([
            'Phaser 3',
            'BitmapText',
            'Click to change size!'
        ]);
        
        var count = 0;
        
        this.input.on(
            'pointerup',
            function() {
                text.setFontSize(text.fontSize + 2);
            },
            this
        );
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    width: 800,
    height: 600,
    pixelArt: true,
    scene: [ChangeFontSize]
}

var game = new Phaser.Game(config);