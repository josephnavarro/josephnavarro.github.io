var AddAnimationEvent = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function AddAnimationEvent() {
        Phaser.Scene.call(this, {key: 'AddAnimationEvent', active: true});
        
        this.y = 100;
    },
    
    preload:
    function() {
        this.load.atlas('gems', 'assets/gems.png', 'assets/gems.json');
    },
    
    create:
    function() {
        this.anims.on(
            Phaser.Animations.Events.ADD_ANIMATION,
            this.addAnimation,
            this
        );
        
        var i = 0;
        
        this.input.on(
            'pointerup',
            function() {
                switch(i) {
                    case 0:
                        this.anims.create({
                            key: 'diamond',
                            frames: this.anims.generateFrameNames(
                                'gems',
                                {
                                    prefix: 'diamond_',
                                    end: 15,
                                    zeroPad: 4
                                }
                            ),
                            repeat: -1
                        });
                        break;
                        
                    case 1:
                        this.anims.create({
                            key: 'prism',
                            frames: this.anims.generateFrameNames(
                                'gems',
                                {
                                    prefix: 'prism_',
                                    end: 6,
                                    zeroPad: 4
                                }
                            ),
                            repeat: -1
                        });
                        break;
                        
                    case 2:
                        this.anims.create({
                            key: 'ruby',
                            frames: this.anims.generateFrameNames(
                                'gems',
                                {
                                    prefix: 'ruby_',
                                    end: 6,
                                    zeroPad: 4
                                }
                            ),
                            repeat: -1
                        });
                        break;
                        
                    case 3:
                        this.anims.create({
                            key: 'square',
                            frames: this.anims.generateFrameNames(
                                'gems',
                                {
                                    prefix: 'square_',
                                    end: 14,
                                    zeroPad: 4
                                }
                            ),
                            repeat: -1
                        })
                        break;
                }
                i += 1;
            },
            this
        );
    },
    
    addAnimation:
    function(key) {
        this.add.sprite(this.sys.renderer.width / 2, this.y, 'gems').play(key);
        
        this.y += 100;
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    width: 800,
    height: 600,
    scene: [AddAnimationEvent]
};

var game = new Phaser.Game(config);