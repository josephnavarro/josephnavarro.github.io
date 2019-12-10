var BitmapText = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function BitmapText() {
        Phaser.Scene.call(this, {key: 'BitmapText', active: true});
        
        this.dynamic = null;
        this.value = 0;
    },
    
    preload:
    function() {
        this.load.bitmapFont('desyrel', 'assets/desyrel.png', 'assets/desyrel.xml');
        this.load.bitmapFont('desyrel-pink', 'assets/desyrel-pink.png', 'assets/desyrel-pink.xml');
        this.load.bitmapFont('shortStack', 'assets/shortStack.png', 'assets/shortStack.xml');
    },
    
    create:
    function() {
        this.add.bitmapText(0, 0, 'desyrel', 16.34);
        this.add.bitmapText(0, 200, 'desyrel-pink', 'The quick brown fox jumped\nover the lazy dog');
        this.add.bitmapText(0, 400, 'shortStack', 'Phaser BitmapText');
        
        this.dynamic = this.add.bitmapText(0, 500, 'desyrel', '');
    },
    
    update:
    function() {
        this.dynamic.text = 'Value: ' + this.value.toFixed(2);
        this.value += 0.01;
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    //width: 800,
    //height: 600,
    scene: [BitmapText]
};

var game = new Phaser.Game(config);