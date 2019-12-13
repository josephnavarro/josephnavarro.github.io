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
var image = null;
var camera0 = null;
var camera1 = null;
var camera2 = null;
var camera3 = null;


// Preload callback
function preload() {
    this.load.image('einstein', 'assets/ra-einstein.png');
}


// Create callback
function create() {
    var w = this.sys.renderer.width;
    var h = this.sys.renderer.height;
    var halfW = w / 2;
    var halfH = h / 2;
    
    image = this.add.image(w / 4, h / 4, 'einstein');
    
    this.cameras.main.setSize(halfW, halfH);
    
    camera0 = this.cameras.main;
    camera1 = this.cameras.add(halfW, 0, halfW, halfH);
    camera2 = this.cameras.add(0, halfH, halfW, halfH);
    camera3 = this.cameras.add(halfW, halfH, halfW, halfH);
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