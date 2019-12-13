var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    width: 800,
    height: 600
};

// Game instance
var game = new Phaser.Game(config);


// Globals
var iter = 0;
var image = null;


// Preload callback
function preload() {
    this.load.image('einstein', 'assets/ra-einstein.png');
}


// Create callback
function create() {
    image = this.add.image(0, 0, 'einstein');
    
    // Set camera viewport
    this.cameras.main.setViewport(200, 150, 400, 300);
}


// Update callback
function update() {
    // Undulate image around the viewport
    image.x = Math.sin(iter) * 200;
    image.y = Math.cos(iter) * 200;
    iter += 0.04;
}