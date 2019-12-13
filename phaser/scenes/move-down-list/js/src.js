var SceneA = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function SceneA() {
        Phaser.Scene.call(this, {key: 'SceneA', active: true});
    },
    
    preload:
    function() {
        this.load.image('eye', 'assets/lance-overdose-loader-eye.png');
    },
    
    create:
    function() {
        this.add.image(400, 300, 'eye');
        
        this.input.on(
            'pointerup',
            function() {
                this.scene.moveDown();
            },
            this
        );
    }
});


var SceneB = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function SceneB() {
        Phaser.Scene.call(this, {key: 'SceneB', active: true});
    },
    
    preload:
    function() {
        this.load.image('suka', 'assets/sukasuka-chtholly.png');
    },
    
    create:
    function() {
        this.add.image(400, 500, 'suka');
    }
});


var SceneC = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function SceneC() {
        Phaser.Scene.call(this, {key: 'SceneC', active: true});
    },
    
    preload:
    function() {
        this.load.image('mech', 'assets/titan-mech.png');
    },
    
    create:
    function() {
        this.add.image(300, 300, 'mech');
    }
});


var config = {
    type: Phaser.AUTO,
    backgroundColor: '#2d2d2d',
    width: 800,
    height: 600,
    scene: [SceneB, SceneC, SceneA],
    parent: 'phaser-example'
};

var game = new Phaser.Game(config);