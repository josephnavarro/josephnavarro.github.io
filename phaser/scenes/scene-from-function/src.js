var MyGame = {};

MyGame.Boot = function() {
    this.face = null;
};

MyGame.Boot.prototype.constructor = MyGame.Boot;
MyGame.Boot.prototype = {
    preload:
    function() {
        this.load.image('face', 'assets/bw-face.png');
    },
    
    create:
    function() {
        this.face = this.add.image(this.sys.renderer.width / 2, this.sys.renderer.height / 2, 'face');
    }
};


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame.Boot
};

var game = new Phaser.Game(config);
