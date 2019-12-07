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
        this.add.image(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'eye'
        );
        
        this.input.on(
            'pointerup',
            function() {
                this.scene.moveUp();
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
        this.load.image('sukasuka', 'assets/sukasuka-chtholly.png');
    },
    
    create:
    function() {
        this.add.image(400, 500, 'sukasuka');
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
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    width: 800,
    height: 600,
    scene: [SceneA, SceneB, SceneC]
};

var game = new Phaser.Game(config);