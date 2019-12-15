var NumberTween = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function NumberTween() {
        Phaser.Scene.call(this, {key: 'NumberTween', active: true});
        
        this.text = null;
        this.tween = null;
    },
    
    preload:
    function() {
        // Nothing to preload
    },
    
    create:
    function() {
        this.text = this.add.text(
            30, 20, '',
            {
                font: '16px Courier',
                fill: '#00ff00'
            }
        );
        
        // A 'Counter' is a special kind of tween that doesn't have a target.
        // Instead, it allows you to tween between two numeric values. The
        // default values are from 0 to 1, but they can be set to anything.
        // You can use the tweened value via `tween.getValue()` for the
        // duration of the tween.
        // ...
        this.tween = this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 5000,
            ease: 'Quad.easeInOut'
        });
    },
    
    update:
    function() {
        this.text.setText([
            'Value: ' + this.tween.getValue(),
            'Progress: ' + (this.tween.totalProgress * 100).toFixed(2) + '%',
            'Elapsed: ' + this.tween.totalElapsed,
            'Duration: ' + this.tween.totalDuration
        ]);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    pixelArt: false,
    scene: [NumberTween],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);