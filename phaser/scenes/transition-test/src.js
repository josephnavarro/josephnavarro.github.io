var Preloader = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function Preloader() {
        Phaser.Scene.call(this, 'preloader');
    },
    
    preload:
    function() {
        this.load.image('raster', 'assets/raster-bw-64.png');
        this.load.image('planet', 'assets/purple-planet.png');
        this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
    },
    
    create:
    function() {
        this.scene.start('demo1');
    }
    
});


var Demo1 = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function Demo1() {
        Phaser.Scene.call(this, 'demo1');
    },
    
    create:
    function() {
        var group = this.add.group();
        group.createMultiple({key: 'raster', repeat: 8});
        
        var ci = 0;
        var colors = [
            0xef658c,
            0xff9a52,
            0xffdf00,
            0x31ef8c,
            0x21dfff,
            0x31aade,
            0x5275de,
            0x9c55ad,
            0xbd208c
        ];
        
        var _this = this;
        group.children.iterate(
            function(child) {
                child.x = 100;
                child.y = 300;
                child.depth = 9 - ci;
                child.tint = colors[ci];
                
                ci += 1;
                
                _this.tweens.add({
                    targets: child,
                    x: 700,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut',
                    duration: 1500,
                    delay: 100 * ci
                });
            }
        );
        
        this.input.once(
            'pointerup',
            function() {
                var t1 = this.scene.transition({
                    target: 'demo2',
                    duration: 3000,
                    moveAbove: true
                });
            },
            this
        );
    }
    
});


var Demo2 = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function Demo2() {
        Phaser.Scene.call(this, 'demo2');
    },
    
    create:
    function() {
        var planet = this.add.image(this.sys.renderer.width / 2, this.sys.renderer.height / 2, 'planet');
        planet.setScale(0);
        
        this.events.on(
            'transitionstart',
            function(fromScene, duration) {
                this.tweens.add({
                    targets: planet,
                    duration: duration,
                    scaleX: 1,
                    scaleY: 1
                });
            },
            this
        );
        
        var _this = this;
        this.events.on(
            'transitioncomplete',
            function() {
                var particles = this.add.particles('flares');
                
                var emitter = particles.createEmitter({
                    frame: ['red', 'blue', 'green', 'yellow'],
                    x: _this.sys.renderer.width / 2,  // 400
                    y: _this.sys.renderer.height / 2,  // 300
                    speed: 200,
                    lifespan: 3000,
                    blendMode: 'ADD'
                });
            },
            this
        );
        
        this.events.on(
            'transitionout',
            function(toScene, duration) {
                this.tweens.add({
                    targets: planet,
                    scaleX: 0,
                    scaleY: 0,
                    duration: duration
                });
            },
            this
        );
        
        this.input.once(
            'pointerup',
            function(event) {
                var t2 = this.scene.transition({
                    moveBehind: true,
                    target: 'demo3',
                    duration: 5000
                });
            },
            this
        );
    }
});


var Demo3 = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function Demo3() {
        Phaser.Scene.call(this, 'demo3');
        
        this.pacX = 260;
        this.pacY = 300;
    },
    
    create:
    function() {
        this.pacX = 260;
        this.pacY = 300;
        
        var graphics = this.add.graphics();
        var _this = this;
        
        // Add a simple oscillating counter to animate a "Pac-Man"
        this.tweens.addCounter({
            from: 0,
            to: 30,
            duration: 200,
            yoyo: true,
            repeat: -1,
            callbackScope: _this,
            onUpdate:
            function(tween) {
                var t = tween.getValue();
                
                graphics.clear();
                
                // Make 2 white Pac-dot graphics
                graphics.fillStyle(0xffffff, 1);
                if (this.pacX < 700) {
                    graphics.fillCircle(580, this.pacY, 30);
                    graphics.fillCircle(740, this.pacY, 30);
                }
                
                // Make a Pac-Man graphic
                graphics.fillStyle(0xffff00, 1);
                graphics.slice(
                    this.pacX, 
                    this.pacY, 
                    200,
                    Phaser.Math.DegToRad(330 + t),
                    Phaser.Math.DegToRad(30 - t),
                    true
                );
                graphics.fillPath();
                
                // Make a graphic for Pac-Man's eye
                graphics.fillStyle(0x000000, 1);
                graphics.fillEllipse(this.pacX, this.pacY - 120, 30, 90);
            }
        });
        
        // Transition on 'pointerup'
        this.input.once(
            'pointerup',
            function(event) {
                var t3 = this.scene.transition({
                    target: 'demo1',
                    duration: 5000,
                    moveBelow: true,
                    onUpdate: this.transitionOut
                });
            },
            this
        );
    },
    
    
    transitionOut:
    function(progress) {
        this.pacX = 260 + (900 * progress);
    }
});


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    scene: [
        Preloader,
        Demo1,
        Demo2,
        Demo3
    ]
};

var game = new Phaser.Game(config);