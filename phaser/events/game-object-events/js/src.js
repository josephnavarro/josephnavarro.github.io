var GameObjectEvents = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function GameObjectEvents() {
        Phaser.Scene.call(this, {key: 'GameObjectEvents', active: true});
    },
    
    preload:
    function() {
        this.load.image('plush', 'assets/profil-sad-plush.png');
    },
    
    create:
    function() {
        var plush = this.add.image(400, 300, 'plush');
        
        plush.on('tint', this.handler, this);
        plush.emit('tint', plush);
    },
    
    handler:
    function(gameObject) {
        gameObject.tint = 0xff0000;
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [GameObjectEvents],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);