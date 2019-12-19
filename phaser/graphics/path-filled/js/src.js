var PathFilled = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function PathFilled() {
        Phaser.Scene.call(this, {key: 'PathFilled', active: true});
        
        this.graphics = null;
    },
    
    fillPolygon:
    function(color, points) {
        this.graphics.fillStyle(color, 1);
        
        this.graphics.beginPath();
        this.graphics.moveTo(points[0], points[1]);
        
        for (var i = 2; i < points.length; i+= 2) {
            this.graphics.lineTo(points[i], points[i + 1]);
        }
        
        this.graphics.closePath();
        this.graphics.fillPath();
    },
    
    preload:
    function() {
        this.load.image('metal', 'assets/alien-metal.jpg');
    },
    
    create:
    function() {
        this.graphics = this.add.graphics();
        
        this.graphics.setTexture('metal');
        
        this.fillPolygon(
            0x00ff00,
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
    scene: [PathFilled],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);