var TriangleStroked = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function TriangleStroked() {
        Phaser.Scene.call(this, {key: 'TriangleStroked', active: true});
    },
    
    create:
    function() {
        var graphics = this.add.graphics();
        
        graphics.lineStyle(1, 0xffffff, 1);
        graphics.strokeTriangle(200, 200, 400, 50, 500, 300);
        
        graphics.lineStyle(4, 0x00ffff, 1);
        graphics.strokeTriangle(60, 500, 60, 400, 500, 500);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    pixelArt: false,
    backgroundColor: '#000000',
    scene: [TriangleStroked],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);