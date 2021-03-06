var EaseParams = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function EaseParams() {
        Phaser.Scene.call(this, {key: 'EaseParams', active: true});
    },
    
    preload:
    function() {
        this.load.image('block', 'assets/block.png');
    },
    
    create:
    function() {
        var marker = this.add.image(100, 300, 'block').setAlpha(0.3);
        var image = this.add.image(100, 300, 'block');
        
        this.tweens.add({
            targets: image,
            x: 600,
            duration: 3000,
            ease: 'Back',
            easeParams: [3.5],
            delay: 1000 
        });
    }
})


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    width: 800,
    height: 600,
    scene: [EaseParams]
};

var game = new Phaser.Game(config);