var demo = new Phaser.Scene('Demo');

demo.preload = function() {
    this.load.image('face', 'assets/bw-face.png');
}

demo.create = function() {
    var halfW = this.sys.renderer.width / 2;
    var halfH = this.sys.renderer.height / 2;
    
    this.face = this.add.image(halfW, halfH, 'face');
}


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: demo
};

var game = new Phaser.Game(config);
