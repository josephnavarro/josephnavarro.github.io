/**
 *  Note: THIS ONLY WORKS WITH `Phaser.CANVAS`!!!
 */
var EditTextureSilhouette = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function EditTextureSilhouette() {
        Phaser.Scene.call(this, {key: 'EditTextureSilhouette', active: true});
        
        this.originalTexture;
        this.newTexture;
        this.context;

        this.dude;
        this.dude2;
    },
    
    preload:
    function() {
        this.load.image('dude', 'assets/phaser-dude.png');
    },
    
    create:
    function() {
        this.originalTexture = this.textures.get('dude').getSourceImage();

        this.newTexture = this.textures.createCanvas(
            'dude_new',
            this.originalTexture.width, 
            this.originalTexture.height
        );

        this.context = this.newTexture.getSourceImage().getContext('2d');

        this.context.drawImage(this.originalTexture, 0, 0);

        this.dude = this.add.image(100, 100, 'dude');
        this.dude2 = this.add.image(200, 100, 'dude_new');
        this.createSilhouette();
    },
    
    createSilhouette:
    function() {
        var pixels = this.context.getImageData(
            0, 0, 
            this.originalTexture.width, 
            this.originalTexture.height
        );

        for (i = 0; i < pixels.data.length / 4; i++) {
            this.processPixel(pixels.data, i * 4);
        }

        this.context.putImageData(pixels, 0, 0);
    },
    
    processPixel:
    function(data, index) {
        data[index] = 255;
        data[index + 1] = 0;
        data[index + 2] = 0;
    }
});


var config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    pixelArt: false,
    scene: [Foo],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);