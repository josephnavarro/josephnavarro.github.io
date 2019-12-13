var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    },
    title: 'Shock and Awesome'  // <----
};

var game = new Phaser.Game(config);


function preload() {
    this.load.image('pic', 'assets/baal-loader.png');
}


function create() {
    this.add.image(
        this.sys.renderer.width / 2,
        this.sys.renderer.height / 2,
        'pic'
    );
    
    
    console.log(this.sys.game === game);  // <----

    
    this.add.text(
        80, 560, 
        'Game Title: ' + this.sys.game.config.gameTitle,
        {
            font: '16px Courier', 
            fill: '#ffffff'
        }
    );
}