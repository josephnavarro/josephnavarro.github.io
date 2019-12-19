var GetPixelFromImage = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function GetPixelFromImage() {
        Phaser.Scene.call(this, {key: 'GetPixelFromImage', active: true});
    },
    
    preload:
    function() {
        this.load.image('wheel', 'assets/color-wheel.png');
    },
    
    create:
    function() {
        var text = this.add.text(
            30, 20, '',
            {
                font: '16px Courier',
                fill: '#ffffff'
            }
        );
        
        var color1 = this.textures.getPixel(0, 0, 'wheel');
        var color2 = this.textures.getPixel(140, 170, 'wheel');
        var color3 = this.textures.getPixel(412, 300, 'wheel');
        var color4 = this.textures.getPixel(100, 420, 'wheel');
        var color5 = this.textures.getPixel(520, 260, 'wheel');
        
        console.log(color1);
        
        text.setText([
            color1.rgba,
            color2.rgba,
            color3.rgba,
            color4.rgba,
            color5.rgba
        ]);
    }
});


var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [GetPixelFromImage],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);