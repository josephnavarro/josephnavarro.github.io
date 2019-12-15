var UpdateTo = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function UpdateTo() {
        Phaser.Scene.call(this, {key: 'UpdateTo', active: true});
        
        this.text = null;
        this.arrow = null;
        this.tween = null;
    },
    
    preload:
    function() {
        this.load.image('arrow', 'assets/arrow.png');
    },
    
    create:
    function() {
        this.text = this.add.text(30, 20, '');
        this.text.setFont('16px Courier');
        this.text.setFill('#00ff00');
        
        this.arrow = this.add.image(400, 300, 'arrow');
        
        this.tween = this.tweens.add({
            targets: [this.arrow],
            x: 400,
            y: 300,
            ease: 'Sine.easeIn',
            duration: 5000,
            paused: true
        });
        
        this.input.on(
            'pointerup',
            function() {
                this.tween.play();
            },
            this
        );
    },
    
    update:
    function() {
        this.arrow.rotation = Math.atan2(
            this.input.y - this.arrow.y,
            this.input.x - this.arrow.x
        );
        
        if (this.tween.isPlaying()) {
            this.tween.updateTo('x', this.input.x, true);
            this.tween.updateTo('y', this.input.y, true);
            this.text.setText('Progress: ' + this.tween.progress);
        }
        else {
            this.text.setText('Click to start');
        }
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    pixelArt: false,
    scene: [UpdateTo],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);