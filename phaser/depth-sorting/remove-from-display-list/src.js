var RemoveFromDisplayList = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function RemoveFromDisplayList() {
        Phaser.Scene.call(this, {key: 'RemoveFromDisplayList', active: true});
    },
    
    preload:
    function() {
        this.load.spritesheet('diamonds', 'assets/diamonds32x5.png', {frameWidth: 64});
    },
    
    create:
    function() {
        var group = this.make.group({
            key: 'diamonds',
            frame: [0, 1, 2, 3, 4],
            frameQuantity: 22,
            max: 108
        });
        
        Phaser.Actions.GridAlign(
            group.getChildren(),
            {
                width: 12,
                height: 9,
                cellWidth: 64,
                cellHeight: 64,
                x: 48,
                y: 32
            }
        );
        
        var timedEvent = this.time.addEvent({
            delay: 500,
            callback: this.onEvent,
            callbackScope: this,
            loop: true
        });
    },
    
    onEvent:
    function() {
        var child = this.children.getRandom();
        
        if (child) {
            this.children.remove(child);
        }
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    pixelArt: true,
    scene: [RemoveFromDisplayList],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);