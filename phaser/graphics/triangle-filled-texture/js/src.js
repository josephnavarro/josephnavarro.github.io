var TriangleFilledTexture = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function TriangleFilledTexture() {
        Phaser.Scene.call(this, {key: 'TriangleFilledTexture', active: true});
    },
    
    preload:
    function() {
        this.load.image('test', 'assets/128x128.png');
        this.load.image('metal', 'assets/alien-metal.jpg');
    },
    
    create:
    function() {
        var graphics = this.add.graphics();
        
        graphics.setTexture('metal', null, 2);
        graphics.fillStyle(0x00ff00);
        graphics.fillTriangle(200, 200, 400, 50, 500, 300);
        
        graphics.setTexture('test', null, 2);
        graphics.fillStyle(0xff0000);
        graphics.fillTriangle(60, 500, 60, 200, 500, 500);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [TriangleFilledTexture],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);