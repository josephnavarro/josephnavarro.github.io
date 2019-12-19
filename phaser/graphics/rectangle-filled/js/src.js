var RectangleFilled = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function RectangleFilled() {
        Phaser.Scene.call(this, {key: 'RectangleFilled', active: true});
    },
    
    create:
    function() {
        var graphics = this.add.graphics();
        
        graphics.fillStyle(0x00ff00, 1);
        graphics.fillRect(100, 100, 256, 256);
        
        graphics.fillStyle(0xff0000, 0.5);
        graphics.fillRect(250, 200, 400, 256);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [RectangleFilled],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);