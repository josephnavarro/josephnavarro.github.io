var demo = new Phaser.Scene('Demo');

demo.preload = function() {
    this.load.image('face', 'assets/bw-face.png');
}

demo.create = function() {
    this.face = this.add.image(this.sys.renderer.width / 2, this.sys.renderer.height / 2, 'face');
}


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: demo
};

var game = new Phaser.Game(config);
