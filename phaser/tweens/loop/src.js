var Loop = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function Loop() {
        Phaser.Scene.call(this, {key: 'Loop', active: true});
    },
    
    preload:
    function() {
        this.load.image('block', 'assets/block.png');
    },
    
    create:
    function() {
        var marker = this.add.image(100, 300, 'block').setAlpha(0.3);
        var image = this.add.image(100, 300, 'block');
        
        var tween = this.tweens.add({
            targets: image,
            x: 600,
            ease: 'Power2',
            duration: 3000,
            loop: 2
        });
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    width: 800,
    height: 600,
    scene: [Loop]
};

var game = new Phaser.Game(config);