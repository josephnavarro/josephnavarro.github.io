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
        var halfW = this.sys.renderer.width / 2;
        var halfH = this.sys.renderer.height / 2;
        
        this.add.image(halfW, halfH, 'face');
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
        var halfW = this.sys.renderer.width / 2;
        var halfH = this.sys.renderer.height / 2;
        
        this.arrow = this.add.image(halfW, halfH, 'arrow');
        
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