var SceneA = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function SceneA() {
        Phaser.Scene.call(this, {key: 'SceneA', active: true});
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


var SceneB = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function SceneB() {
        Phaser.Scene.call(this, {key: 'SceneB', active: true});
    },
    
    preload:
    function() {
        this.load.image('face', 'assets/bw-face.png');
    },
    
    create:
    function() {
        var halfW = this.sys.renderer.width / 2;
        var halfH = this.sys.renderer.height / 2;
        
        var face = this.add.image(halfW, halfH, 'face');
        
        this.tweens.add({
            targets: face,
            alpha: 0,
            yoyo: true,
            repeat: -1
        });
    }

});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    width: 800,
    height: 600,
    scene: [SceneB, SceneA]
};

var game = new Phaser.Game(config);