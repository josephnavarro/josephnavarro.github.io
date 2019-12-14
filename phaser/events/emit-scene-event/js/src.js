var EmitSceneEvent = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function EmitSceneEvent() {
        Phaser.Scene.call(this, {key: 'EmitSceneEvent', active: true});
    },
    
    preload:
    function() {
        this.load.image('image', 'assets/neuromancer.jpg');
    },
    
    create:
    function() {
        this.events.on('addImage', this.handler, this);
        
        this.events.emit('addImage', 400, 300);
    },
    
    handler:
    function(x, y) {
        this.add.image(x, y, 'image');
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    scene: [EmitSceneEvent],
    pixelArt: false,
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);