var AnimationFromPNGSequence = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function AnimationFromPNGSequence() {
        Phaser.Scene.call(this, {key: 'AnimationFromPNGSequence', active: true});
    },
    
    preload:
    function() {
        this.load.path = 'assets/';
        this.load.image('cat1', 'cat1.png');
        this.load.image('cat2', 'cat2.png');
        this.load.image('cat3', 'cat3.png');
        this.load.image('cat4', 'cat4.png');
    },
    
    create:
    function() {
        this.anims.create({
            key: 'snooze',
            frames: [
                {key: 'cat1'},
                {key: 'cat2'},
                {key: 'cat3'},
                {key: 'cat4', duration: 50}
            ],
            frameRate: 8,
            repeat: -1
        });
        
        this.add.sprite(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'cat1'
        ).play('snooze');
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#2d2d2d',
    width: 800,
    height: 600,
    scene: [AnimationFromPNGSequence]
};

var game = new Phaser.Game(config);