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
        var halfW = this.sys.renderer.width / 2;
        var halfH = this.sys.renderer.height / 2;
        
        this.face = this.add.image(halfW, halfH, 'face');
    }
};


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    width: 800,
    height: 600,
    scene: [MyGame.Boot]
};

var game = new Phaser.Game(config);
