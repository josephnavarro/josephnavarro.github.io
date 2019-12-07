var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Game instance
var game = new Phaser.Game(config);


// Globals
var iter = 0;
var image;


// Preload callback
function preload() {
    this.load.image('einstein', 'assets/ra-einstein.png');
}


// Create callback
function create() {
    var w = this.sys.renderer.width;
    var h = this.sys.renderer.height;
    
    image = this.add.image(w / 4, h / 4, 'einstein');
    
    // Set dimensions for main camera
    this.cameras.main.setSize(w / 2, h / 2);
    //this.cameras.main.centerOn(0, 0);
    
    // Add three other cameras
    this.cameras.add(w / 2, 0, w / 2, h / 2);
    this.cameras.add(0, h / 2, w / 2, h / 2);
    this.cameras.add(w / 2, h / 2, w / 2, h / 2);
}


// Update callback
function update() {
    image.rotation += 0.01;
}