var CreateEventEmitter = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function CreateEventEmitter() {
        Phaser.Scene.call(this, {key: 'CreateEventEmitter', active: true});
    },
    
    preload:
    function() {
        this.load.image('plush', 'assets/profil-sad-plush.png');
    },
    
    create:
    function() {
        var emitter = new Phaser.Events.EventEmitter();
        
        emitter.on('addImage', this.handler, this);
        
        // Emit multiple events with varying arguments
        emitter.emit('addImage', 200, 300);
        emitter.emit('addImage', 400, 300);
        emitter.emit('addImage', 600, 300);
    },
    
    handler:
    function(x, y) {
        this.add.image(x, y, 'plush');
    }
});


var config = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    pixelArt: false,
    scene: [CreateEventEmitter],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);