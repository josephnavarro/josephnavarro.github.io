var PauseAndResume = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function PauseAndResume() {
        Phaser.Scene.call(this, {key: 'PauseAndResume', active: true});
        
        this.text = null;
        this.tween = null;
    },
    
    preload:
    function() {
        this.load.image('block', 'assets/block.png');
    },
    
    create:
    function() {
        var marker = this.add.image(100, 200, 'block').setAlpha(0.2);
        var image = this.add.image(100, 200, 'block');
        
        this.text = this.add.text(
            30, 20, '',
            {
                font: '16px Courier',
                fill: '#00ff00'
            }
        );
        
        this.tween = this.tweens.add({
            targets: [image],
            x: 700,
            y: 500,
            duration: 3000,
            yoyo: true,
            repeat: -1,
            ease: 'Power2',
            paused: true
        });
        
        // Click to pause and/or resume the tween
        this.input.on(
            'pointerup',
            function() {
                if (this.tween.isPlaying()) {
                    this.tween.pause();
                }
                else {
                    this.tween.resume();
                }
            },
            this
        );
    },
    
    update:
    function() {
        this.text.setText([
            'Progress: ' + this.tween.progress,
            'Elapsed: ' + this.tween.elapsed,
            'Duration: ' + this.tween.duration 
        ]);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    pixelArt: false,
    backgroundColor: '#2d2d2d',
    scene: [PauseAndResume],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);