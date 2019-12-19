var LineGradientStroked = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function LineGradientStroked() {
        Phaser.Scene.call(this, {key: 'LineGradientStroked', active: true});
    },
    
    create:
    function() {
        var graphics = this.add.graphics();
        
        graphics.lineGradientStyle(128, 0xff0000, 0x0000ff, 0xff0000, 0x0000ff, 1);
        graphics.lineBetween(100, 100, 600, 500);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [LineGradientStroked],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);