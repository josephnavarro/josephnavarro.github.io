var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Game instance
var game = new Phaser.Game(config);


// Globals
var controls;
var gui;


// Preload callback
function preload() {
    this.load.image('grid', 'assets/uv-grid-diag.png');
}


// Create callback
function create() {
    this.add.image(0, 0, 'grid').setOrigin(0);
    this.add.image(1024, 0, 'grid').setOrigin(0);
    this.add.image(0, 1024, 'grid').setOrigin(0);
    this.add.image(1024, 1024, 'grid').setOrigin(0);
    
    var cursors = this.input.keyboard.createCursorKeys();
    
    // Set camera bounds
    //this.cameras.main.setBounds(0, 0, 2048, 2048);
    
    var config = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
        acceleration: 0.06,
        drag: 0.0005,
        maxSpeed: 1.0
    };
    
    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(config);
    
    var help = {
        line1: 'Cursors to move',
        line2: 'Q & E to zoom'
    }
    
    var cam = this.cameras.main;
    gui = new dat.GUI();
    var f1 = gui.addFolder('Camera');
    f1.add(cam, 'x').listen();
    f1.add(cam, 'y').listen();
    f1.add(cam, 'scrollX').listen();
    f1.add(cam, 'scrollY').listen();
    f1.add(cam, 'rotation').min(0).step(0.01).listen();
    f1.add(cam, 'zoom', 0.1, 2).step(0.1).listen();
    f1.add(help, 'line1');
    f1.add(help, 'line2');
    f1.open();
}


// Update callback
function update(time, delta) {
    controls.update(delta);
}