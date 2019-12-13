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
    this.load.image('taikodrummaster', 'assets/taikodrummaster.jpg');
    this.load.image('sukasuka-chtholly', 'assets/sukasuka-chtholly.png');
}


function create() {
    this.add.image(400, 300, 'taikodrummaster');
    this.add.image(400, 500, 'sukasuka-chtholly');
}