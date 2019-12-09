var Muybridge = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function Muybridge() {
        Phaser.Scene.call(this, {key: 'Muybridge', active: true});
    },
    
    preload:
    function() {
        this.load.spritesheet(
            'muybridge',
            'assets/muybridge01.png',
            {
                frameWidth: 119,
                frameHeight: 228
            }
        );
    },
    
    create:
    function() {
        this.anims.create({
            key: 'run',
            frames: 'muybridge',
            frameRate: 15,
            repeat: -1
        });
        
        var group = this.add.group();
        group.createMultiple({key: 'muybridge', frame: 0, repeat: 8});
        
        Phaser.Actions.GridAlign(
            group.getChildren(),
            {
                width: 9,
                height: 1,
                cellWidth: 119,
                y: 170
            }
        );
        
        this.anims.staggerPlay('run', group.getChildren(), -100);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#ffffff',
    width: 800,
    height: 600,
    scene: [Muybridge]
};

var game = new Phaser.Game(config);