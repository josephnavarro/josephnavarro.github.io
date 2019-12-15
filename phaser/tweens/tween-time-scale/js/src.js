var TweenTimeScale = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function TweenTimeScale() {
        Phaser.Scene.call(this, {key: 'TweenTimeScale', active: true});
    },
    
    preload:
    function() {
        this.load.image('bg', 'assets/undersea-bg.png');
        this.load.image('up', 'assets/up-bubble.png');
        this.load.image('down', 'assets/down-bubble.png');
        
        this.load.spritesheet('fish', 'assets/fish-136x80.png', {frameWidth: 136, frameHeight: 80});
    },
    
    create:
    function() {
        this.add.image(400, 300, 'bg');
        
        var image1 = this.add.image(100, 80, 'fish', 0);
        var image2 = this.add.image(100, 180, 'fish', 1);
        var image3 = this.add.image(100, 280, 'fish', 2);
        var image4 = this.add.image(100, 380, 'fish', 1);
        var image5 = this.add.image(100, 480, 'fish', 0);
        
        var tween = this.tweens.add({
            targets: [image1, image2, image3, image4, image5],
            x: 700,
            ease: 'Sine.easeInOut',
            duration: 4000,
            flipX: true,
            yoyo: true,
            repeat: -1,
            delay: this.tweens.stagger(1000)
        });
        
        var text = this.add.text(250, 0, 'timeScale: 1');
        text.setFont('32px Arial Black');
        text.setFill('#ffffff');
        text.setShadow(2, 2, '#333333', 2);
        
        var downButton = this.add.image(70, 530, 'down').setInteractive();
        var upButton = this.add.image(730, 530, 'up').setInteractive();
        
        // Modulate time scale with buttons
        this.input.on(
            'gameobjectup',
            function(pointer, gameobject) {
                if (gameobject === downButton && tween.timeScale > 0) {
                    tween.timeScale -= 0.1;
                }
                else if (gameobject === upButton && tween.timeScale < 9.9) {
                    tween.timeScale += 0.1;
                }
                
                text.setText('timeScale: ' + tween.timeScale.toFixed(2));
            },
            this
        );
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    pixelArt: false,
    scene: [TweenTimeScale],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);