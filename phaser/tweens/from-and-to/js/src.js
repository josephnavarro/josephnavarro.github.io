var FromAndTo = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function FromAndTo() {
        Phaser.Scene.call(this, {key: 'FromAndTo'});
        
        this.image = null;
        this.tween = null;
        this.text = null;
    },
    
    preload:
    function() {
        this.load.image('makoto', 'assets/makoto.png');
    },
    
    create:
    function() {
        var halfW = this.sys.renderer.width / 2;
        var halfH = this.sys.renderer.height / 2;
        
        this.image = this.add.image(halfW, halfH, 'makoto');
        
        this.text = this.add.text(
            10, 10, '',
            {
                font: '16px Courier',
                fill: '#00ff00'
            }
        );
        
        this.tween = this.tweens.add({
            targets: this.image,
            alpha: 0.1,
            delay: 2000,
            duration: 6000
        });
    },
    
    update:
    function() {
        this.debugTweenData(this.text, this.tween.data[0]);
    },
    
    debugTweenData:
    function(text, tweenData) {
        var output = [];
        var TDStates = [
            'CREATED',
            'INIT',
            'DELAY',
            'OFFSET_DELAY',
            'PENDING_RENDER',
            'PLAYING_FORWARD',
            'PLAYING_BACKWARD',
            'HOLD_DELAY',
            'REPEAT_DELAY',
            'COMPLETE'
        ];
        
        output.push(tweenData.key);
        output.push('--------');
        output.push('State: ' + TDStates[tweenData.state]);
        output.push('Start: ' + tweenData.start);
        output.push('Current: ' + tweenData.current);
        output.push('End: ' + tweenData.end);
        output.push('Progress: ' + tweenData.progress);
        output.push('Elapsed: ' + tweenData.elapsed);
        output.push('Duration: ' + tweenData.duration);
        output.push('Total Duration: ' + tweenData.totalDuration);
        output.push('Delay: ' + tweenData.delay);
        output.push('Yoyo: ' + tweenData.yoyo);
        output.push('Hold: ' + tweenData.hold);
        output.push('Repeat: ' + tweenData.repeat);
        output.push('Repeat Counter: ' + tweenData.repeatCounter);
        output.push('Repeat Delay: ' + tweenData.repeatDelay);

        text.setText(output);
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    width: 800,
    height: 600,
    scene: [FromAndTo]
};

var game = new Phaser.Game(config);