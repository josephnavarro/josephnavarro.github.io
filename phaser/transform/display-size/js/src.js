var DisplaySize = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function DisplaySize() {
        Phaser.Scene.call(this, {key: 'DisplaySize', active: true});
    },
    
    preload:
    function() {
        this.load.image('frame', 'assets/scrollframe.png');
        this.load.image('pic', 'assets/cougar-face-of-nature.png');
    },
    
    create:
    function() {
        this.add.image(0, 0, 'frame').setOrigin(0);
        
        this.add.image(32, 32, 'pic').setOrigin(0).setDisplaySize(352, 240);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    pixelArt: false,
    scene: [DisplaySize],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);