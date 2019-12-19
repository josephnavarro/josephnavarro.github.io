class Elf extends Phaser.GameObjects.Sprite {
    constructor(scene, color, x, y) {
        super(scene, x, y);
        
        this.color = color;
        this.alive = true;
        
        this.setPosition(x, y);
        this.setTexture('elves');
        this.play(this.color + 'Idle');
        
        scene.add.existing(this);
        
        this.on('animationcomplete', this.animComplete, this);
        
        var hx = (this.color === 'blue') ? 110 : -40;
        this.hp = new HealthBar(scene, x - hx, y - 110);
        
        this.scheduleFire();
    }
    
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }
    
    animComplete(animation) {
        if (animation.key === this.color + 'Attack') {
            this.play(this.color + 'Idle');
        }
    }
    
    damage(amount) {
        if (this.hp.decrease(amount)) {
            this.alive = false;
            this.play(this.color + 'Dead');
            
            if (this.color === 'blue') {
                this.scene.bluesAlive -= 1;
            }
            else {
                this.scene.greensAlive -= 1;
            }
        }
    }
    
    scheduleFire() {
        this.timer = this.scene.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000),
            callback: this.fire,
            callbackScope: this
        });
    }
    
    fire() {
        var target;
        if (this.color === 'blue') {
            target = this.scene.getGreen();
        }
        else {
            target = this.scene.getBlue();
        }
        
        if (target && this.alive) {
            this.play(this.color + 'Attack');
            
            var offset;
            var targetX;
            
            if (this.color === 'blue') {
                offset = 20;
                targetX = target.x + 30;
            }
            else {
                offset = -20;
                targetX = target.x - 30;
            }
            
            this.missile.setPosition(this.x + offset, this.y + 20).setVisible(true);
            
            this.scene.tweens.add({
                targets: [this.missile],
                x: targetX,
                ease: 'Linear',
                duration: 500,
                onComplete: function(tween, targets) { targets[0].setVisible(false); }
            });
            
            target.damage(Phaser.Math.Between(2, 8));
            
            this.scheduleFire();
        }
    }
}