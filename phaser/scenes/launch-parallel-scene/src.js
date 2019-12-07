var SceneA = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function SceneA() {
        Phaser.Scene.call(this, {key: 'SceneA'});
    },
    
    preload:
    function() {
        this.load.image('face', 'assets/bw-face.png');
    },
    
    create:
    function() {
        this.add.image(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'face'
        ).setAlpha(0.2);
        
        this.input.once(
            'pointerdown',
            function() {
                this.scene.launch('SceneB');
                this.scene.launch('SceneC');
            },
            this
        );
    }
    
});


var SceneB = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function SceneB() {
        Phaser.Scene.call(this, {key: 'SceneB'});
        
        this.arrow;
    },
    
    preload:
    function() {
        this.load.image('arrow', 'assets/longarrow.png');
    },
    
    create:
    function() {
        this.arrow = this.add.sprite(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'arrow'
        ).setOrigin(0, 0.5);
    },
    
    update:
    function() {
        this.arrow.rotation += 0.01;
    }
    
});


var SceneC = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function SceneC() {
        Phaser.Scene.call(this, {key: 'SceneC'});
        
        this.mech;
    },
    
    preload:
    function() {
        this.load.image('mech', 'assets/titan-mech.png');
    },
    
    create:
    function() {
        this.mech = this.add.sprite(
            Phaser.Math.Between(300, 600),
            300,
            'mech'
        );
    },
    
    update:
    function() {
        this.mech.rotation -= 0.02;
    }
    
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    scene: [SceneA, SceneB, SceneC]
    
};

var game = new Phaser.Game(config);