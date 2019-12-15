var Callbacks = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function Callbacks() {
        Phaser.Scene.call(this, {key: 'Callbacks', active: true});
    },
    
    preload:
    function() {
        this.load.image('arrow', 'assets/arrow.png');
    },
    
    create:
    function() {
        var marker = this.add.image(100, 100, 'arrow').setAlpha(0.2);
        var arrow = this.add.image(100, 100, 'arrow');
        
        this.tweens.add({
            targets: [arrow],
            x: 600,
            ease: 'Power1',
            duration: 3000,
            yoyo: true,
            repeat: 1,
            onStart: function() {
                console.log('onStart');
                console.log(arguments);
            },
            onComplete: function() {
                console.log('onComplete');
                console.log(arguments);
            },
            onYoyo: function() {
                console.log('onYoyo');
                console.log(arguments);
            },
            onRepeat: function() {
                console.log('onRepeat');
                console.log(arguments);
            }
        })
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    scene: [Callbacks],
    pixelArt: false,
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);