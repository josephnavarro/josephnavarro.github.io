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
        create: create
    }
};

// Game instance
var game = new Phaser.Game(config);


// Preload callback
function preload() {
    // Load map image
    this.load.image('map', 'assets/earthbound-scarab.png');
}


// Create callback
function create() {
    // Add map image
    this.add.image(0, 0, 'map').setOrigin(0);
    
    // Set up main camera
    this.cameras.main.setBounds(0, 0, 1024, 2048);
    this.cameras.main.setZoom(4);
    this.cameras.main.centerOn(0, 0);
    
    console.log(this.cameras.main);
    
    // Add prompt text
    var text = this.add.text(304, 230);
    text.setText('Click to move');
    text.setScrollFactor(0);
    text.setShadow(1, 1, 0x000000, 2);
    
    var pos = 0;
    
    // Cycle through positions to center on upon mouse click
    this.input.on(
        'pointerdown',
        function() {
            var cam = this.cameras.main;
            
            if (pos === 0) {
                cam.centerOn(767, 1096);
                pos += 1;
            }
            else if (pos === 1) {
                cam.centerOn(703, 1621);
                pos += 1;
            }
            else if (pos === 2) {
                cam.centerOn(256, 623);
                pos += 1;
            }
            else if (pos === 3) {
                cam.centerOn(166, 304);
                pos += 1;
            }
            else if (pos === 4) {
                cam.centerOn(624, 158);
                pos += 1;
            }
            else if (pos === 5) {
                cam.centerOn(680, 330);
                pos += 1;
            }
            else if (pos === 6) {
                cam.centerOn(748, 488);
                pos += 1;
            }
            else if (pos === 7) {
                cam.centerOn(1003, 1719);
                pos = 0;
            }
            
            text.setText(
                [
                    'Click to move',
                    'x: ' + cam.scrollX,
                    'y: ' + cam.scrollY
                ]
            );
        },
        this
    );
}