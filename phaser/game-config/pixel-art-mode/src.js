var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);


var tilesprite;
var iter = 0;


function preload() {
    this.load.image('mushroom', 'assets/mine.png');
    this.load.image('tiles1', 'assets/super-mario.png');
    this.load.image('toy', 'assets/shocktroopers-toy.png');
    
    this.load.bitmapFont(
        'atari',
        'assets/atari-classic.png',
        'assets/atari-classic.xml'
    );
    this.load.spritesheet(
        'veg', 
        'assets/fruitnveg32wh37.png',
        {
            frameWidth: 32,
            frameHeight: 37
        }
    );
    this.load.tilemapTiledJSON('map1', 'assets/super-mario.json');
}


function create() {
    // Add tiled sprite of 'mushroom'
    tilesprite = this.add.tileSprite(400, 300, 800, 600, 'mushroom');
    
    // Add static tileset layer from 'map1'
    var map1 = this.make.tilemap({key: 'map1'});
    var tileset1 = map1.addTilesetImage(
        'SuperMarioBros-World1-1', 'tiles1'
    );
    var layer1 = map1.createStaticLayer('World1', tileset1, 0, 64);
    layer1.setScale(2);
    
    // Add static image of 'toy'
    var toy = this.add.image(0, 600, 'toy');
    toy.setOrigin(0, 1);
    toy.setScale(2);
    
    // Add text
    var text = this.add.text(
        400, 8, 'Phaser 3 pixelArt: true',
        {
            font: '16px Courier',
            fill: '#00ff00'
        }
    );
    text.setOrigin(0.5, 0);
    text.setScale(3);
    
    // Add particle emitter
    var particles = this.add.particles('veg');
    var emitter = particles.createEmitter({
        frame: 0,
        x: 400,
        y: 300,
        speed: 100,
        frequency: 300,
        lifespan: 4000
    });
    emitter.setScale(4);
    
    // Add bitmap text
    var bmpText = this.add.bitmapText(
        400, 128, 'atari', 'PHASER'
    ).setOrigin(0.5)//.setScale(2);
}


function update() {
    tilesprite.tileScaleX = Math.max(2, Math.sin(iter) * 8);
    tilesprite.tileScaleY = Math.max(2, Math.sin(iter) * 8);
    iter += 0.01;
}