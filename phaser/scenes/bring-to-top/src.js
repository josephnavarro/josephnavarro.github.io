var DemoA = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function DemoA() {
        Phaser.Scene.call(this, {key: 'DemoA', active: true});
    },
    
    preload:
    function() {
        this.load.image('picA', 'assets/lance-overdose-loader-eye.png');
    },
    
    create:
    function() {
        this.add.image(this.sys.renderer.width / 2, this.sys.renderer.height / 2, 'picA');
        
        this.input.once(
            'pointerdown',
            function() {
                this.scene.bringToTop();
            },
            this
        );
    }
})


var DemoB = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function DemoB() {
        Phaser.Scene.call(this, {key: 'DemoB', active: true});
    },
    
    preload:
    function() {
        this.load.image('picB', 'assets/sukasuka-chtholly.png');
    },
    
    create:
    function() {
        this.add.image(400, 500, 'picB');
    }
});


var DemoC = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function DemoC() {
        Phaser.Scene.call(this, {key: 'DemoC', active: true});
    },
    
    preload:
    function() {
        this.load.image('picC', 'assets/titan-mech.png');
    },
    
    create:
    function() {
        this.add.image(300, 300, 'picC');
    }
});


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [
        DemoA,
        DemoB,
        DemoC
    ]
};


var game = new Phaser.Game(config);