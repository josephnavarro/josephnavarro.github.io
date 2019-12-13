var DepthSorting = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function DepthSorting() {
        Phaser.Scene.call(this, {key: 'DepthSorting', active: true});
        
        this.move = 0;
        this.mushroom1 = null;
        this.mushroom2 = null;
        this.mushroom3 = null;
    },
    
    preload:
    function() {
        this.load.atlas('atlas', 'assets/veg.png', 'assets/veg.json');
        this.load.image('image', 'assets/mushroom2.png');
    },
    
    create:
    function() {
        for (var i = 0; i != 2000; i++) {
            var image = this.add.image(
                Phaser.Math.Between(100, 700),
                Phaser.Math.Between(100, 500),
                'atlas',
                'veg0' + Phaser.Math.Between(1, 9)
            );
            
            image.depth = image.y;
        }
        
        this.mushroom1 = this.add.image(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'image'
        );
        
        this.mushroom2 = this.add.image(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'image'
        );
        
        this.mushroom3 = this.add.image(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'image'
        );
        
        /*
        this.input.on(
            'pointerup',
            function() {
                this.cameras.main.shake(500);
            },
            this
        );
        */
    },
    
    update:
    function() {
        this.mushroom1.x = 400 + Math.cos(this.move) * 200;
        this.mushroom1.y = 300 + Math.sin(this.move) * 200;
        this.mushroom1.depth = this.mushroom1.y + this.mushroom1.height / 2;
        
        this.mushroom2.x = 400 + Math.sin(-this.move) * 200;
        this.mushroom2.y = 300 + Math.cos(-this.move) * 200;
        this.mushroom2.depth = this.mushroom2.y + this.mushroom2.height / 2;
        
        this.mushroom3.y = 300 + Math.sin(this.move) * 180;
        this.mushroom3.depth = this.mushroom3.y + this.mushroom3.height / 2;
        
        this.move += 0.01;
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    width: 800,
    height: 600,
    scene: [DepthSorting],
    pixelArt: false
};

var game = new Phaser.Game(config);