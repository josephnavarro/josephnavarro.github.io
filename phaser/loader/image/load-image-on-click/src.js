var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create
    }
};
var game = new Phaser.Game(config);


function preload() {
    this.load.image('buttonBG', 'assets/button-bg.png');
    this.load.image('buttonText', 'assets/button-text.png');
}


function create() {
    var bg = this.add.image(0, 0, 'buttonBG');
    bg.setInteractive();
    bg.once('pointerup', loadImage, this);
    
    var text = this.add.image(0, 0, 'buttonText');
    var container = this.add.container(400, 300, [bg, text]);
}


function loadImage() {
    // Call `addSprites` once loading has completed
    this.load.once('complete', addSprites, this);
    
    // Load these images
    this.load.image('pic', 'assets/turkey-1985086.jpg');
    this.load.image('titan', 'assets/titan-mech.png');
    
    // Begin loading now
    this.load.start();
}


function addSprites() {
    this.add.image(400, 300, 'pic');
    this.add.image(400, 300, 'titan');
}