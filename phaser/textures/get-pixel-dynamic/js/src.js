var GetPixelDynamic = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function GetPixelDynamic() {
        Phaser.Scene.call(this, {key: 'GetPixelDynamic', active: true});
    },
    
    preload:
    function() {
        this.load.image('wheel', 'assets/color-wheel.png');
    },
    
    create:
    function() {
        var w = this.sys.renderer.width;
        var h = this.sys.renderer.height;
        
        var image = this.add.image(w / 2, h / 2, 'wheel');
        
        var _this = this;
        var graphics = this.add.graphics();
        
        // "Highlight" a pixel's color on hover
        this.input.on(
            'pointermove',
            function(pointer) {
                graphics.clear();
                
                var x = pointer.x;
                var y = pointer.y;
                
                var color = _this.textures.getPixel(
                    x - (w / 2 - image.width / 2), 
                    y - (h / 2 - image.height / 2), 
                    'wheel'
                );
                
                // Draw enlarged pixel if within bounds of image
                if (color) {
                    graphics.lineStyle(1, 0x000000, 1);
                    graphics.strokeRect(x - 1, y - 1, 34, 34);
                    
                    graphics.fillStyle(color.color, 1);
                    graphics.fillRect(x, y, 32, 32);
                }
            },
            this
        );
    }
});


var config = {
    type: Phaser.AUTO,
    //type: Phaser.WEBGL,
    parent: 'phaser-example',
    backgroundColor: '#ffffff',
    pixelArt: false,
    scene: [GetPixelDynamic],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);