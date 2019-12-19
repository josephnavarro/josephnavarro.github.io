var LineBetween = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function LineBetween() {
        Phaser.Scene.call(this, {key: 'LineBetween', active: true});
    },
    
    create:
    function() {
        var graphics = this.add.graphics();
        
        graphics.lineStyle(12, 0x00ff00, 1);
        graphics.lineBetween(100, 100, 600, 500);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [LineBetween],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);