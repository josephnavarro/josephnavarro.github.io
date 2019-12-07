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
}

// Game instance
var game = new Phaser.Game(config);


// Globals
var iter = 0;
var image;
var camera0;
var camera1;
var camera2;
var camera3;


// Preload callback
function preload() {
    this.load.image('einstein', 'assets/ra-einstein.png');
}


// Create callback
function create() {
    var w = this.sys.renderer.width;
    var h = this.sys.renderer.height;
    
    image = this.add.image(w / 4, h / 4, 'einstein');
    
    this.cameras.main.setSize(w / 2, h / 2);
    
    camera0 = this.cameras.main;
    camera1 = this.cameras.add(w / 2, 0, w / 2, h / 2);
    camera2 = this.cameras.add(0, h / 2, w / 2, h / 2);
    camera3 = this.cameras.add(w / 2, h / 2, w / 2, h / 2);
}


// Update callback
function update() {
    //camera0.zoom = 0.5 + Math.abs(Math.sin(iter));
    camera0.scrollX = Math.sin(iter) * 400;
    
    //camera1.rotation = iter;
    
    camera2.scrollX = Math.cos(iter) * 100;
    camera2.scrollY = Math.sin(iter) * 100;
    //camera2.zoom = 0.5 + Math.abs(Math.sin(iter));
    //camera2.rotation = -iter;
    
    camera3.zoom = 0.5 + Math.abs(Math.sin(iter));
    
    iter += 0.01;
}