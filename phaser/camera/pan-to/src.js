var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade'
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Game instance
var game = new Phaser.Game(config);


// Globals
var text;


// Preload callback
function preload() {
    this.load.image('map', 'assets/earthbound-scarab.png');
}


// Create callback
function create() {
    // Add map image
    var map = this.add.image(0, 0, 'map');
    map.setOrigin(0);
    
    // Add main camera
    var cam = this.cameras.main;
    cam.setBounds(0, 0, map.width, map.height);
    cam.setZoom(4);
    cam.centerOn(0, 0);
    
    console.log(cam.getScroll(767, 1096));
    
    // Add text
    text = this.add.text(304, 230);
    text.setText('Click to move');
    text.setScrollFactor(0);
    text.setShadow(1, 1, 0x000000, 2);
    
    // Cycle through positions to scroll to upon mouse click
    var pos = 0;
    this.input.on(
        'pointerdown',
        function() {
            var cam = this.cameras.main;
            if (pos === 0) {
                cam.pan(767, 1096, 2000, 'Power2');
                pos += 1;
            }
            else if (pos === 1) {
                cam.pan(703, 1621, 2000, 'Elastic');
                pos += 1;
            }
            else if (pos === 2) {
                cam.pan(256, 623, 2000, 'Sine.easeInOut');
                pos += 1;
            }
            else if (pos === 3) {
                cam.pan(166, 304, 2000);
                pos += 1;
            }
            else if (pos === 4) {
                cam.pan(624, 158, 2000);
                pos += 1;
            }
            else if (pos === 5) {
                cam.pan(680, 330, 2000);
                pos += 1;
            }
            else if (pos === 6) {
                cam.pan(748, 488, 2000);
                pos += 1;
            }
            else if (pos === 7) {
                cam.pan(1003, 1719, 2000);
                pos = 0;
            }
        },
        this
    );
    
    //console.log(this.sys.renderer.width);
}


// Update callback
function update() {
    var cam = this.cameras.main;
    var w = this.sys.renderer.width;
    var h = this.sys.renderer.height;
    
    text.setText(
        [
            'Click to move',
            'x: ' + (cam.scrollX + w / 2).toFixed(2),
            'y: ' + (cam.scrollY + h / 2).toFixed(2)
        ]
    );
}
