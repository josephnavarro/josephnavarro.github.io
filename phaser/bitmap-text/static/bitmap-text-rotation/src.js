var BitmapTextRotation = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function BitmapTextRotation() {
        Phaser.Scene.call(this, {key: 'BitmapTextRotation', active: true});
    },
    
    preload:
    function() {
        this.load.bitmapFont('ice', 'assets/iceicebaby.png', 'assets/iceicebaby.xml');
    },
    
    create:
    function() {
        var i = 0;
        var films = [
            'Aliens',
            'Terminator',
            'Star Wars',
            'The Thing',
            'Red Dawn',
            'Commando',
            'Terminator 2',
            'Robocop',
            'Batman',
            'Street Fighter',
            'Back to the Future'
        ];
        
        var text = this.add.bitmapText(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'ice',
            films[i],
            96        
        ).setOrigin(0.5);
        
        /*
        this.tweens.add({
            targets: [text],
            duration: 2000,
            angle: 360,
            repeat: -1,
            yoyo: true,
            ease: 'Quad.easeInOut'
        });*/
        
        text.angle = 33;
        
        this.input.on(
            'pointerup',
            function() {
                i += 1;
                if (i === films.length) {
                    i = 0;
                }
                text.setText(films[i]);
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
    pixelArt: false,
    scene: [BitmapTextRotation]
};

var game = new Phaser.Game(config);