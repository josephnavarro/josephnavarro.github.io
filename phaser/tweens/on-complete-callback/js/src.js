var OnCompleteCallback = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function OnCompleteCallback() {
        Phaser.Scene.call(this, {key: 'OnCompleteCallback', active: true});
    },
    
    preload:
    function() {
        this.load.image('block', 'assets/block.png');
    },
    
    create:
    function() {
        var marker = this.add.image(100, 300, 'block').setAlpha(0.2);
        var image = this.add.image(100, 300, 'block');
        
        this.tweens.add({
            targets: [image],
            x: 600,
            duration: 3000,
            ease: 'Power1',
            onComplete: this.completeHandler,
            onCompleteParams: [image]
        });
    },
    
    completeHandler:
    function(tween, targets, image) {
        console.log('onComplete');
        
        image.setScale(2);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    pixelArt: false,
    scene: [OnCompleteCallback],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);