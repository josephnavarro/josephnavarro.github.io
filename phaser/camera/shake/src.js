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
    this.load.image('pic', 'assets/a-new-link-to-the-past-by-ptimm.jpg');
    this.load.image('logo', 'assets/phaser3-logo.png');
}


// Create callback
function create() {
    var w = this.sys.renderer.width;
    var h = this.sys.renderer.height;
    
    this.add.image(w / 2, h / 2, 'pic');
    
    var logo = this.add.image(w / 2, h / 3, 'logo');
    logo.setVisible(false);
    
    // Show logo when camera shakes; hide on complete
    var cam = this.cameras.main;
    cam.on(
        'camerashakestart',
        function() {
            logo.setVisible(true);
        }
    );
    cam.on(
        'camerashakecomplete',
        function() {
            logo.setVisible(false);
        }
    );
    
    // Shake camera on click
    this.input.on(
        'pointerdown',
        function() {
            cam.shake(500);
        },
        this
    )
}