var sceneConfigA = {
    key: 'sceneA',
    create: createA,
    pack: {
        files: [
            {
                type: 'image',
                key: 'face',
                url: 'assets/bw-face.png'
            }
        ]
    }
}

var sceneConfigB = {
    key: 'sceneB',
    create: createB,
    pack: {
        files: [
            {
                type: 'image',
                key: 'logo',
                url: 'assets/monika-krawinkel-amberstar-title.png'
            }
        ]
    }
}


var gameConfig = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: [sceneConfigA, sceneConfigB]
};

var game = new Phaser.Game(gameConfig);


function createA() {
    this.add.image(this.sys.renderer.width / 2, this.sys.renderer.height / 2, 'face');
    
    this.input.on(
        'pointerdown',
        function() {
            this.input.stopPropagation();
            this.scene.switch('sceneB');
        },
        this
    );
}


function createB() {
    this.add.image(this.sys.renderer.width / 2, this.sys.renderer.height / 2, 'logo');
    
    this.input.on(
        'pointerdown',
        function() {
            this.input.stopPropagation();
            this.scene.switch('sceneA');
        },
        this
    );
}
