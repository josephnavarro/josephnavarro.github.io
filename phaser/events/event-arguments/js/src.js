var EventArguments = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function EventArguments() {
        Phaser.Scene.call(this, {key: 'EventArguments', active: true});
    },
    
    preload:
    function() {
        this.load.image('plush', 'assets/profil-sad-plush.png');
    },
    
    create:
    function() {
        this.events.on('addImage', this.handler, this);
        
        this.events.emit('addImage', 200, 300);
        this.events.emit('addImage', 400, 300);
        this.events.emit('addImage', 600, 300);
    },
    
    handler:
    function(x, y) {
        this.add.image(x, y, 'plush');
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    scene: [EventArguments],
    pixelArt: false,
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);