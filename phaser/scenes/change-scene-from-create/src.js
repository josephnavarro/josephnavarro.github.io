var SceneA = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function SceneA() {
        Phaser.Scene.call(this, {key: 'SceneA'});
    },
    
    preload:
    function() {
        this.load.image('face', 'assets/bw-face.png');
        this.load.image('arrow', 'assets/longarrow.png');
    },
    
    create:
    function() {
        console.log('SceneA');
        this.scene.start('SceneB');
    }
    
});


var SceneB = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function SceneB() {
        Phaser.Scene.call(this, {key: 'SceneB'});
    },
    
    create:
    function() {
        console.log('SceneB');
        this.scene.start('SceneC');
    }
    
});


var SceneC = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function SceneC() {
        Phaser.Scene.call(this, {key: 'SceneC'});
    },
    
    create:
    function() {
        console.log('SceneC');
        this.scene.start('SceneD');
    }
    
});


var SceneD = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function SceneD() {
        Phaser.Scene.call(this, {key: 'SceneD'});
    },
    
    create:
    function() {
        console.log('SceneD');
        this.scene.start('SceneE');
    }
    
});


var SceneE = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function SceneE() {
        Phaser.Scene.call(this, {key: 'SceneE'});
    },
    
    create:
    function() {
        this.add.image(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'face'
        );
        
        this.arrow = this.add.sprite(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'arrow'
        );
        this.arrow.setOrigin(0, 0.5);
    },
    
    update:
    function(time, delta) {
        this.arrow.rotation += 0.01;
    }
    
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    width: 800,
    height: 600,
    scene: [
        SceneA,
        SceneB,
        SceneC,
        SceneD,
        SceneE
    ]
};

var game = new Phaser.Game(config);
