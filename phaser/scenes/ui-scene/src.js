var GameScene = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function GameScene() {
        Phaser.Scene.call(this, {key: 'GameScene'});
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
        
        // Create 64 randomly positioned crates
        for (var i = 0; i < 64; i++) {
            var x = Phaser.Math.Between(0, w);
            var y = Phaser.Math.Between(0, h);
            
            var box = this.add.image(x, y, 'crate');
            
            // You can interact with the crates
            box.setInteractive();
        }
        
        // Call `clickHandler` upon interaction
        this.input.on('gameobjectup', this.clickHandler, this);
    },
    
    clickHandler:
    function(pointer, box) {
        // Make box disappear upon interaction
        box.input.enabled = false;
        box.setVisible(false);
        
        // Emit an `addScore` event upon interaction
        this.events.emit('addScore');
    } 
});


var UIScene = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function UiScene() {
        Phaser.Scene.call(this, {key: 'UIScene', active: true});
        
        this.score = 0;
    },
    
    create:
    function() {
        var info = this.add.text(10, 10, 'Score: 0', {font: '48px Arial', fill: '#000000'});
        
        // Get the reference to GameScene
        var ourGame = this.scene.get('GameScene');
        
        // Listen for events from GameScene
        ourGame.events.on(
            'addScore',
            function() {
                this.score += 10;
                info.setText('Score: ' + this.score);
            },
            this
        );
    }
});



var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    scene: [GameScene, UIScene],
};

var game = new Phaser.Game(config);
