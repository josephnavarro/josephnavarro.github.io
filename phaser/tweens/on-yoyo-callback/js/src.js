var OnYoyoCallback = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function OnYoyoCallback() {
        Phaser.Scene.call(this, {key: 'OnYoyoCallback', active: true});
        
        this.progressText = null;
        this.tween = null;
    },
    
    preload:
    function() {
        this.load.image('arrow', 'assets/arrow.png');
    },
    
    create:
    function() {
        var marker = this.add.image(64, 64, 'arrow').setAlpha(0.2);
        var image = this.add.image(64, 64, 'arrow');
        
        var text = this.add.text(
            32, 128, '',
            {
                font: '16px Courier',
                fill: '#00ff00'
            }
        );
        
        this.progressText = this.add.text(
            500, 128, '',
            {
                font: '16px Courier',
                fill: '#00ff00'
            }
        );
        
        var eventList = [
            'Events:',
            '-------',
            ''
        ];
        text.setText(eventList);
        
        var addEvent = function(event) {
            eventList.push(event);
            text.setText(eventList);
        };
        
        this.tween = this.tweens.add({
            targets: [image],
            props: {
                x: {value: 600, delay: 1000}
            },
            ease: 'Power1',
            duration: 3000,
            paused: true,
            yoyo: true,
            onActive: function() { addEvent('onActive'); },
            onStart: function() { addEvent('onStart'); },
            onLoop: function() { addEvent('onLoop'); },
            onRepeat: function() { addEvent('onRepeat'); },
            
            onYoyo: this.onYoyoHandler,
            onYoyoParams: [image, addEvent],
            
            onComplete: this.onCompleteHandler,
            onCompleteParams: [image, addEvent]
        });
        
        console.log(this.tween);
        
        
        this.input.on(
            'pointerup',
            function() {
                eventList = [
                    'Events:',
                    '-------',
                    ''
                ];
                this.tween.play();
            },
            this
        );
    },
    
    update:
    function() {
        this.progressText.setText('Progress: ' + this.tween.totalProgress);
    },
    
    onYoyoHandler:
    function(tween, target, image, addEvent) {
        console.log(arguments);
        
        //target.toggleFlipX().setAlpha(0.2 + Math.random());
        image.toggleFlipX().setAlpha(0.2 + Math.random());
        
        addEvent('onYoyo');
    },
    
    onCompleteHandler:
    function(tween, targets, image, addEvent) {
        console.log(arguments);
        
        /*
        targets.forEach(
            function(item, index) {
                item.toggleFlipX().setAlpha(1);
            }
        );
        */
        image.toggleFlipX().setAlpha(1);
        
        addEvent('onComplete');
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    pixelArt: false,
    scene: [OnYoyoCallback],
    width: 800,
    height: 600
};

var game = new Phaser.Game(config);