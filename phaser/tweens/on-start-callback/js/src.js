var OnStartCallback = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function OnStartCallback() {
        Phaser.Scene.call(this, {key: 'OnStartCallback', active: true});
    },
    
    preload:
    function() {
        this.load.image('block', 'assets/block.png');
    },
    
    create:
    function() {
        var marker = this.add.image(100, 300, 'block').setAlpha(0.2);
        var image = this.add.image(100, 300, 'block').setAlpha(0);
        
        var tween = this.tweens.add({
            targets: [image],
            x: 600,
            duration: 3000,
            ease: 'Power1',
            onStart: this.handler,
            onStartParams: [image],
            paused: true
        });
        
        this.input.once(
            'pointerup',
            function() {
                tween.play();
            },
            this
        );
    },
    
    handler:
    function(tween, targets, image) {
        console.log('onStart');
        image.setAlpha(1);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    pixelArt: false,
    scene: [OnStartCallback],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);