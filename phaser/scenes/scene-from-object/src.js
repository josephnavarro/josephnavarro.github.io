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


function preload() {
    this.load.image('face', 'assets/bw-face.png');
}


function create() {
    this.face = this.add.image(this.sys.renderer.width / 2, this.sys.renderer.height / 2, 'face');
}


var game = new Phaser.Game(config);
