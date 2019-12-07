var MyScene = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function MyScene(config) {
        Phaser.Scene.call(this, config);
    },
    
    preload:
    function() {
        this.load.image('face', 'assets/bw-face.png');
    },
    
    create:
    function() {
        this.face = this.add.image(this.sys.renderer.width / 2, this.sys.renderer.height / 2, 'face');
    }
});


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    scene: MyScene
};

var game = new Phaser.Game(config);
