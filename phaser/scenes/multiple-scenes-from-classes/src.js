var Background = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function Background() {
        Phaser.Scene.call(this, {key: 'Background', active: true});
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
        );
    }
    
});


var Demo = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function Demo() {
        Phaser.Scene.call(this, {key: 'Demo', active: true});
        
        this.arrow;
    },
    
    preload:
    function() {
        this.load.image('arrow', 'assets/longarrow.png');
    },
    
    create:
    function() {
        this.arrow = this.add.image(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'arrow'
        );
        
        this.arrow.setOrigin(0, 0.5);
    },
    
    update:
    function() {
        this.arrow.rotation += 0.01;
    }
    
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    width: 800,
    height: 600,
    scene: [Background, Demo]
};

var game = new Phaser.Game(config);