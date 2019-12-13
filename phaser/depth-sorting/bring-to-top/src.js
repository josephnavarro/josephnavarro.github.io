var BringToTop = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function BringToTop() {
        Phaser.Scene.call(this, {key: 'BringToTop', active: true});
    },
    
    preload:
    function() {
        this.load.image('block', 'assets/block.png');
    },
    
    create:
    function() {
        var group = this.make.group({key: 'block', frameQuantity: 12});
        
        Phaser.Actions.SetXY(group.getChildren(), 48, 500, 64, 0);
        
        this.input.on(
            'pointerdown',
            function() {
                var child = this.children.getAt(0);
                
                child.y -= 32;
                
                this.children.bringToTop(child);
            },
            this
        );
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    scene: [BringToTop],
    pixelArt: false,
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);