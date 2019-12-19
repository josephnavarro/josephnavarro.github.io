var FillCircle = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function FillCircle() {
        Phaser.Scene.call(this, {key: 'FillCircle', active: true});
    },
    
    preload:
    function() {
        this.load.image('metal', 'assets/alien-metal.jpg');
    },
    
    create:
    function() {
        var graphics = this.add.graphics();
        
        graphics.fillStyle(0x00ff00, 1);
        graphics.setTexture('metal');
        
        var w = this.sys.renderer.width;
        var h = this.sys.renderer.height;
        graphics.fillCircle(w / 2, h / 2, 128);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [FillCircle],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);