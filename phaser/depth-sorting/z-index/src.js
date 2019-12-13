var ZIndex = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function ZIndex() {
        Phaser.Scene.call(this, {key: 'ZIndex', active: true});
    },
    
    preload:
    function() {
        this.load.image('ayu', 'assets/ayu2.png');
    },
    
    create:
    function() {
        var image1 = this.add.image(100, 300, 'ayu');
        var image2 = this.add.image(200, 300, 'ayu');
        var image3 = this.add.image(300, 300, 'ayu');
        var image4 = this.add.image(400, 300, 'ayu');
        var image5 = this.add.image(500, 300, 'ayu');
        var image6 = this.add.image(600, 300, 'ayu');
        var image7 = this.add.image(700, 300, 'ayu');
        
        this.input.on(
            'pointerup',
            function() {
                image4.setDepth(1);
            },
            this
        );
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    pixelArt: false,
    scene: [ZIndex],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);