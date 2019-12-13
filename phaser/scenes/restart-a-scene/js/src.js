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
        var r = Phaser.Math.Between(50, 255);
        var g = Phaser.Math.Between(50, 255);
        var b = Phaser.Math.Between(50, 255);
        
        this.cameras.main.fadeFrom(2000, r, g, b);
        
        var halfW = this.sys.renderer.width / 2;
        var halfH = this.sys.renderer.height / 2;
        
        this.add.image(halfW, halfH, 'rick').setScale(0.7);
        
        // Restart scene on click
        this.input.on(
            'pointerdown',
            function() {
                // Fade out using a random color
                var r = Phaser.Math.Between(50, 255);
                var g = Phaser.Math.Between(50, 255);
                var b = Phaser.Math.Between(50, 255);
                
                this.cameras.main.fade(2000, r, g, b);
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