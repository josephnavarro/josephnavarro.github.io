var PauseAndResumeAll = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function PauseAndResumeAll() {
        Phaser.Scene.call(this, {key: 'PauseAndResumeAll', active: true});
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
        var bg = this.add.image(400, 300, 'bg');
        
        // Add first fish
        var image1 = this.add.image(0, 80, 'fish', 0);
        
        this.tweens.add({
            targets: [image1],
            props: {
                x: {value: 700, duration: 4000, flipX: true},
                y: {value: 500, duration: 8000}
            },
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        
        // Add second fish
        var image2 = this.add.image(400, 80, 'fish', 1);
        
        this.tweens.add({
            targets: [image2],
            props: {
                x: {value: 500, duration: 2000, flipX: true},
                y: {value: 500, duration: 10000}
            },
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        
        // Add third fish
        var image3 = this.add.image(800, 200, 'fish', 2).setFlipX(true);
        
        this.tweens.add({
            targets: [image3],
            props: {
                x: {value: 70, flipX:true},
                y: {value: 250}
            },
            duration: 3000,
            ease: 'Power1',
            yoyo: true,
            repeat: -1
        });
        
        // Add fourth fish
        var image4 = this.add.image(100, 550, 'fish', 2).setScale(0.75);
        
        this.tweens.add({
            targets: [image4],
            props: {
                x: {value: 700, duration: 2000, flipX: true},
                y: {value: 50, duration: 15000}
            },
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        
        // Text to display prompt
        var text = this.add.text(180, 0, 'Click to Pause / Resume');
        text.setFont('32px Arial Black');
        text.setFill('#ffffff');
        text.setShadow(2, 2, '#333333', 2);
        
        var downButton = this.add.image(70, 530, 'down').setInteractive();
        var upButton = this.add.image(730, 530, 'up').setInteractive();
        
        var tweens = this.tweens;
        
        this.input.on(
            'gameobjectup',
            function(pointer, gameobject) {
                if (gameobject === downButton) {
                    if (tweens.timeScale > 0) {
                        tweens.pauseAll();
                        text.setText('Pause all');
                    }
                }
                else if (gameobject === upButton) {
                    if (tweens.timeScale < 9.9) {
                        tweens.resumeAll();
                        text.setText('Resume all');
                    }
                }
            }
        );
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    pixelArt: false,
    scene: [PauseAndResumeAll],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);