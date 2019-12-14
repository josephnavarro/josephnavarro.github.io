var TurnOffAnonymousEventHandler = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function TurnOffAnonymousEventHandler() {
        Phaser.Scene.call(this, {key: 'TurnOffAnonymous', active: true});
    },
    
    preload:
    function() {
        this.load.image('plush', 'assets/profil-sad-plush.png');
    },
    
    create:
    function() {
        var i = 0;
        
        this.events.on(
            'addImage',
            function() {
                var x = Phaser.Math.Between(100, 700);
                var y = Phaser.Math.Between(100, 500);
                
                this.add.image(x, y, 'plush');
                
                i += 1;
                
                if (i === 5) {
                    this.events.off('addImage');
                }
            },
            this
        );
        
        for (var j = 0; j != 10; j++) {
            this.events.emit('addImage');
        }
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [TurnOffAnonymousEventHandler],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);