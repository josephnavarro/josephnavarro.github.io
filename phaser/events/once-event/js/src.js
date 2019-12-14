var OnceEvent = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function OnceEvent() {
        Phaser.Scene.call(this, {key: 'OnceEvent', active: true});
    },
    
    preload:
    function() {
        this.load.image('plush', 'assets/profil-sad-plush.png');
    },
    
    create:
    function() {
        this.events.once('addImage', this.handler, this);
        
        // Emit event 3 times, but it's only called once
        this.events.emit('addImage');
        this.events.emit('addImage');
        this.events.emit('addImage');
    },
    
    handler:
    function() {
        var x = Phaser.Math.Between(200, 600);
        var y = Phaser.Math.Between(200, 400);
        
        this.add.image(x, y, 'plush');
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [OnceEvent],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);