var TurnOffEventHandler = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function TurnOffEventHandler() {
        Phaser.Scene.call(this, {key: 'TurnOffEventHandler', active: true});
        
        this.n = 0;
    },
    
    preload:
    function() {
        this.load.image('plush', 'assets/profil-sad-plush.png');
    },
    
    create:
    function() {
        this.events.on('addImage', this.handler, this);
        
        for (var i = 0; i != 10; i++) {
            this.events.emit('addImage');
        }
    },
    
    handler:
    function() {
        var x = Phaser.Math.Between(100, 700);
        var y = Phaser.Math.Between(100, 500);
        
        this.add.image(x, y, 'plush');
        
        this.n += 1;
        if (this.n >= 5) {
            this.events.off('addImage', this.handler);
        }
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [TurnOffEventHandler],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);