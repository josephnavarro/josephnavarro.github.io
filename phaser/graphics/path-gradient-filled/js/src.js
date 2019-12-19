var PathGradientFilled = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function PathGradientFilled() {
        Phaser.Scene.call(this, {key: 'PathGradientFilled', active: true});
        
        this.graphics = null;
    },
    
    fillPolygon:
    function(color1, color2, color3, color4, points) {
        this.graphics.fillGradientStyle(color1, color2, color3, color4, 1);
        
        this.graphics.beginPath();
        
        this.graphics.moveTo(points[0], points[1]);
        for (var i = 2; i < points.length; i += 2) {
            this.graphics.lineTo(points[i], points[i + 1]);
        }
        
        this.graphics.closePath();
        this.graphics.fillPath();
    },
    
    create:
    function() {
        this.graphics = this.add.graphics();
        
        this.fillPolygon(
            0xff0000, 0x00ff00, 0xff0000, 0xffff00,
            [
                400, 100,
                200, 278,
                340, 430,
                650, 300,
                700, 180,
                600, 80
            ]
        );
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [PathGradientFilled],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);