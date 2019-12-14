var ListenToGameObjectEvent = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function ListenToGameObjectEvent() {
        Phaser.Scene.call(this, {key: 'ListenToGameObjectEvent', active: true});
        
        this.info = null;
        this.timer = null;
        this.alive = 0;
    },
    
    preload:
    function() {
        this.load.image('bg', 'assets/sky4.png');
        this.load.image('crate', 'assets/crate.png');
    },
    
    create:
    function() {
        var w = this.sys.renderer.width;
        var h = this.sys.renderer.height;
        
        this.add.image(w / 2, h / 2, 'bg');
        
        for (var i = 0; i < 64; i++) {
            var x = Phaser.Math.Between(0, w);
            var y = Phaser.Math.Between(0, h);
            
            var box = this.add.sprite(x, y, 'crate');
            
            box.setInteractive();
            
            // Listen for "clicked" events and process via `handler`
            box.on('clicked', this.handler, this);
            
            this.alive += 1;
        }
        
        // Emited "clicked" event whenever a crate object is clicked
        this.input.on(
            'gameobjectup',
            function(pointer, gameObject) {
                gameObject.emit('clicked', gameObject);
            },
            this
        );
        
        this.info = this.add.text(
            10, 10, '',
            {
                font: '48px Arial',
                fill: '#000000'
            }
        );
        
        // Prevent further input once time delay (10000 ms) is over
        this.timer = this.time.addEvent({
            delay: 10000,
            callback: this.gameOver,
            callbackScope: this
        });
    },
    
    update:
    function() {
        this.info.setText([
            'Alive: ' + this.alive,
            'Time: ' + Math.floor(10000 - this.timer.getElapsed())
        ]);
    },
    
    handler:
    function(box) {
        this.alive -= 1;
        
        box.off('clicked', this.handler);
        box.input.enabled = false;
        box.setVisible(false);
    },
    
    gameOver:
    function() {
        this.input.off('gameobjectup');
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [ListenToGameObjectEvent],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);