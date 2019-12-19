var LineFilled = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function LineFilled() {
        Phaser.Scene.call(this, {key: 'LineFilled', active: true});
    },
    
    preload:
    function() {
        this.load.image('metal', 'assets/alien-metal.jpg');
    },
    
    create:
    function() {
        var graphics = this.add.graphics();
        
        graphics.setTexture('metal');
        graphics.lineStyle(128, 0x00ff00, 1);
        graphics.lineBetween(100, 100, 600, 500);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [LineFilled],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);