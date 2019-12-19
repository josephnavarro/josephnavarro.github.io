var PrimitiveTypes = new Phaser.Class({
    Extends: Phaser.Scene,
    
    create:
    function() {
        var graphics = this.add.graphics();
        
        graphics.lineStyle(4, 0x00ff00, 1);
        graphics.strokeRect(32, 32, 256, 256);
        
        graphics.fillStyle(0xff0000, 0.8);
        graphics.fillCircle(260, 260, 120);
        
        graphics.lineStyle(4, 0xff00ff, 1);
        graphics.strokeEllipse(400, 300, 200, 128);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [PrimitiveTypes],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);