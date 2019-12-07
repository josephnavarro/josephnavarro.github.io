var Boot = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function Boot() {
        Phaser.Scene.call(this, {key: 'Boot'});
    },
    
    preload:
    function() {
        this.load.image('rick', 'assets/rick-and-morty-by-sawuinhaff-da64e7y.png');
    },
    
    create:
    function() {
        // Fade in image using a random color upon scene creation
        this.cameras.main.fadeFrom(
            2000,
            Phaser.Math.Between(50, 255),
            Phaser.Math.Between(50, 255),
            Phaser.Math.Between(50, 255)
        );
        
        this.add.image(
            this.sys.renderer.width / 2,
            this.sys.renderer.height / 2,
            'rick'
        ).setScale(0.7);
        
        // Restart scene on click
        this.input.on(
            'pointerdown',
            function() {
                // Fade out using a random color
                this.cameras.main.fade(
                    2000,
                    Phaser.Math.Between(50, 255),
                    Phaser.Math.Between(50, 255),
                    Phaser.Math.Between(50, 255)
                );
            },
            this
        );
        
        this.cameras.main.on(
            'camerafadeoutcomplete',
            function() {
                // Scene restarts when fully faded out
                this.scene.restart();
            },
            this
        );
    }
});


var config = {
    type: Phaser.AUTO,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [Boot]
};

var game = new Phaser.Game(config);