var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#ffffff',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


// Game instance
var game = new Phaser.Game(config);


// Globals
var controls = null;


// Preload callback
function preload() {
    this.load.image('pic', 'assets/the-end-by-iloe-and-made.jpg');
}


// Create callback
function create() {
    var pic = this.add.image(0, 0, 'pic').setOrigin(0);
    
    // Set camera bounds to be size of image
    this.cameras.main.setBounds(0, 0, pic.width, pic.height);
    
    // Camera controls
    var cursors = this.input.keyboard.createCursorKeys();
    
    controls = new Phaser.Cameras.Controls.SmoothedKeyControl({
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        acceleration: 0.06,
        drag: 0.0005,
        maxSpeed: 1.0
    });
}


// Update callback
function update(time, delta) {
    controls.update(delta);
}