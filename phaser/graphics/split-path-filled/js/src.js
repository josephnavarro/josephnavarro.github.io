var SplitPathFilled = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function SplitPathFilled() {
        Phaser.Scene.call(this, {key: 'SplitPathFilled', active: true});
        
        this.graphics = null;
    },
    
    drawMultiplePolygons:
    function(color, polygons) {
        this.graphics.fillStyle(color, 1);
        this.graphics.beginPath();
        
        for (const polygon of polygons) {
            
            this.graphics.moveTo(polygon[0], polygon[1]);
            
            for (var i = 2; i < polygon.length; i += 2) {
                this.graphics.lineTo(polygon[i], polygon[i + 1]);
            }
            
            this.graphics.lineTo(polygon[0], polygon[1]);
        }
        
        this.graphics.fillPath();
    },
    
    create:
    function() {
        this.graphics = this.add.graphics();
        
        this.drawMultiplePolygons(
            0x00ff00,
            [
                [200, 200, 300, 300, 200, 400],
                [500, 200, 600, 300, 500, 400]
            ]
        );
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [SplitPathFilled],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);