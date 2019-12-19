var PathStroked = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function PathStroked() {
        Phaser.Scene.call(this, {key: 'PathStroked', active: true});
        
        this.graphics = null;
    },
    
    drawPolygon:
    function(weight, color, points) {
        this.graphics.lineStyle(weight, color, 1);
        
        this.graphics.beginPath();
        this.graphics.moveTo(points[0], points[1]);
        
        for (var i = 2; i < points.length; i += 2) {
            this.graphics.lineTo(points[i], points[i + 1]);
        }

        this.graphics.closePath();
        this.graphics.strokePath();
    },
    
    create:
    function() {
        this.graphics = this.add.graphics();
        
        this.drawPolygon(
            16, 0x00ff00,
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
    scene: [PathStroked],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);