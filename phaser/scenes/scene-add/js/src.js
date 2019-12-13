var Boot = new Phaser.Class({
    Extends: Phaser.Scene,
    
    preload:
    function() {
        this.load.image('face', 'assets/bw-face.png');
    },
    
    create:
    function() {
        this.add.image(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'face'
        );
    }
    
});


var config = {
    type: Phaser.AUTO,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);


// 1: Key of scene   (string)
// 2: Scene class    (object)
// 3: Whether active (boolean)
// ...
game.scene.add('Boot', Boot, true);
