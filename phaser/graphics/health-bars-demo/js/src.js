class BlueElf extends Elf {
    constructor(scene, x, y) {
        super(scene, 'blue', x, y);
        
        this.missile = new Missile(scene, 'blue-missile');
        
        scene.add.existing(this.missile);
    }
}


class GreenElf extends Elf {
    constructor(scene, x, y) {
        super(scene, 'green', x, y);
        
        this.missile = new Missile(scene, 'green-missile');
        
        scene.add.existing(this.missile);
    }
}


var HealthBarsDemo = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function HealthBarsDemo() {
        Phaser.Scene.call(this, {key: 'HealthBarsDemo', active: true});
        
        this.blues = [];
        this.bluesAlive = 4;
        
        this.greens = [];
        this.greensAlive = 4;
    },
    
    preload:
    function() {
        this.load.image('background', 'assets/fairy-background-craft-pixel.png');
        this.load.atlas('elves', 'assets/elves-craft-pixel.png', 'assets/elves-craft-pixel.json');
    },
    
    create:
    function() {
        // Idle animation for green elves
        this.anims.create({
            key: 'greenIdle',
            frames: this.anims.generateFrameNames(
                'elves',
                {
                    prefix: 'green_idle_',
                    start: 0,
                    end: 4
                }
            ),
            frameRate: 10,
            repeat: -1
        });
        
        // Idle animation for blue elves
        this.anims.create({
            key: 'blueIdle',
            frames: this.anims.generateFrameNames(
                'elves',
                {
                    prefix: 'blue_idle_',
                    start: 0,
                    end: 4
                }
            ),
            frameRate: 10,
            repeat: -1
        });
        
        // Attack animation for green elves
        this.anims.create({
            key: 'greenAttack',
            frames: this.anims.generateFrameNames(
                'elves',
                {
                    prefix: 'green_attack_',
                    start: 0,
                    end: 5
                }
            ),
            frameRate: 10
        });
        
        // Attack animation for blue elves
        this.anims.create({
            key: 'blueAttack',
            frames: this.anims.generateFrameNames(
                'elves',
                {
                    prefix: 'blue_attack_',
                    start: 0,
                    end: 4
                }
            ),
            frameRate: 10
        });
        
        // Death animation for green elves
        this.anims.create({
            key: 'greenDead',
            frames: this.anims.generateFrameNames(
                'elves',
                {
                    prefix: 'green_die_',
                    start: 0,
                    end: 4
                }
            ),
            frameRate: 6
        });
        
        // Death animation for blue elves
        this.anims.create({
            key: 'blueDead',
            frames: this.anims.generateFrameNames(
                'elves',
                {
                    prefix: 'blue_die_',
                    start: 0,
                    end: 4
                }
            ),
            frameRate: 6
        });
        
        this.add.image(0, 0, 'background').setOrigin(0);
        
        this.blues.push(new BlueElf(this, 120, 476));
        this.blues.push(new BlueElf(this, 220, 480));
        this.blues.push(new BlueElf(this, 320, 484));
        this.blues.push(new BlueElf(this, 440, 480));
        
        this.greens.push(new GreenElf(this, 560, 486));
        this.greens.push(new GreenElf(this, 670, 488));
        this.greens.push(new GreenElf(this, 780, 485));
        this.greens.push(new GreenElf(this, 890, 484));
    },
    
    getGreen:
    function() {
        if (this.greensAlive) {
            this.greens = Phaser.Utils.Array.Shuffle(this.greens);
            for (var i = 0; i != this.greens.length; i++) {
                if (this.greens[i].alive) {
                    return this.greens[i];
                }
            }
        }
    },
    
    getBlue:
    function() {
        if (this.bluesAlive) {
            this.blues = Phaser.Utils.Array.Shuffle(this.blues);
            for (var i = 0; i != this.blues.length; i++) {
                if (this.blues[i].alive) {
                    return this.blues[i];
                }
            }
        }
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    pixelArt: false,
    backgroundColor: '#000000',
    scene: [HealthBarsDemo],
    width: 1024,
    height: 600
};

var game = new Phaser.Game(config);