/**
 *  Make an instance of one scene and set its callback functions.
 */
var demo = new Phaser.Scene('demo');

demo.preload = function() {
    this.load.image('face', 'assets/bw-face.png');
};

demo.create = function() {
    console.log(this.sys.settings.key, 'is alive');
    
    var halfW = this.sys.renderer.width / 2;
    var halfH = this.sys.renderer.height / 2;
    
    this.add.image(halfW, halfH, 'face');
    
    this.scene.launch('test');
};


/**
 *  Make an instance of another scene and set its callback functions.
 */
var test = new Phaser.Scene('test');

test.preload = function() {
    this.load.image('barbarian', 'assets/barbarian-loading.png');
}

test.create = function() {
    console.log(this.sys.settings.key, 'is alive');
    
    var halfW = this.sys.renderer.width / 2;
    var halfH = this.sys.renderer.height / 2;
    
    this.add.image(halfW, halfH, 'barbarian').setScale(0.5);
}


/**
 *  Reference both scene instances in the configuration.
 */
var config = {
    type: Phaser.AUTO,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [demo, test]
};

var game = new Phaser.Game(config);