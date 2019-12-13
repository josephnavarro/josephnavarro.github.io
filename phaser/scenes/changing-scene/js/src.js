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
        var halfW = this.sys.renderer.width / 2;
        var halfH = this.sys.renderer.height / 2;
        
        this.add.sprite(halfW, halfH, 'face').setAlpha(0.2);
        
        this.input.once(
            'pointerdown',
            function() {
                console.log('From SceneA to SceneB');
                this.scene.start('SceneB');
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
    },
    
    preload:
    function() {
        this.load.image('arrow', 'assets/longarrow.png');
    },
    
    create:
    function() {
        var halfW = this.sys.renderer.width / 2;
        var halfH = this.sys.renderer.height / 2;
        
        this.arrow = this.add.sprite(halfW, halfH, 'arrow').setOrigin(0, 0.5);
        
        this.input.once(
            'pointerdown',
            function() {
                console.log('From SceneB to SceneC');
                this.scene.start('SceneC');
            },
            this
        );
    },
    
    update:
    function(time, delta) {
        this.arrow.rotation += 0.01;
    }
});


var SceneC = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function SceneC() {
        Phaser.Scene.call(this, {key: 'SceneC'});
    },
    
    preload:
    function() {
        this.load.image('mech', 'assets/titan-mech.png');
    },
    
    create:
    function() {
        var halfW = this.sys.renderer.width / 2;
        var halfH = this.sys.renderer.height / 2;
        
        this.add.sprite(halfW, halfH, 'mech');
        
        this.input.once(
            'pointerdown',
            function() {
                console.log('From SceneC to SceneA');
                this.scene.start('SceneA');
            },
            this
        );
    }
    
});


var config = {
    type: Phaser.AUTO,
    backgroundColor: '#2d2d2d',
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: [SceneA, SceneB, SceneC]
};

var game = new Phaser.Game(config);