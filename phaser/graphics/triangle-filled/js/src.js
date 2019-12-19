var TriangleFilled = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function TriangleFilled() {
        Phaser.Scene.call(this, {key: 'TriangleFilled', active: true});
    },
    
    preload:
    function() {
        this.load.image('metal', 'assets/alien-metal.jpg');
    },
    
    create:
    function() {
        var graphics = this.add.graphics();
        
        graphics.setTexture('metal');
        
        graphics.fillStyle(0xfffffff, 1);
        graphics.fillTriangle(200, 200, 400, 50, 500, 300);
        
        graphics.fillStyle(0x00ffff, 1);
        graphics.fillTriangle(60, 500, 60, 400, 500, 500);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [TriangleFilled],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);