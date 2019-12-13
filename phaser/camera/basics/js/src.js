var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

// Game instance
var game = new Phaser.Game(config);


// Preload callback
function preload() {
    this.load.image('robot', 'assets/robota-uxo-by-made-of-bomb.jpg');
}


// Create callback
function create() {
    // Our image is 1920x989, but our game canvas is 800x600
    this.add.image(0, 0, 'robot').setOrigin(0);
    
    var camera1 = this.cameras.add(0, 0, 400, 300).setZoom(0.5);
    
    // Add dat.GUI
    var gui = new dat.GUI();
    
    gui.addFolder('Camera 1');
    gui.add(camera1, 'x');                      // Modulate x
    gui.add(camera1, 'y');                      // Modulate y
    gui.add(camera1, 'width');                  // Modulate width
    gui.add(camera1, 'height');                 // Modulate height
    gui.add(camera1, 'centerToSize');           // Modulate centerToSize
    gui.add(camera1, 'scrollX', -1920, 1920);   // Modulate scrollX
    gui.add(camera1, 'scrollY', -989, 989);     // Modulate scrollY
    gui.add(camera1, 'zoom', 0.1, 2).step(0.1); // Modulate zoom
    gui.add(camera1, 'rotation').step(0.01);    // Modulate rotation
    
    gui.addColor(camera1, 'backgroundColor')
        .onChange(
        function(value) {
            value.a = 255;
            camera1.setBackgroundColor(value);
        }
    );
}