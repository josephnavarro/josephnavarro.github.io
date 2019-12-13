var FromJSON = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function FromJSON() {
        Phaser.Scene.call(this, {key: 'FromJSON', active: true});
    },
    
    preload:
    function() {
        this.load.atlas('gems', 'assets/gems.png', 'assets/gems.json');
        this.load.json('gemData', 'assets/gem_data.json');
    },
    
    create:
    function() {
        var data = this.cache.json.get('gemData');
        
        this.anims.fromJSON(data);
        
        this.add.sprite(400, 100, 'gems').play('diamond');
        this.add.sprite(400, 200, 'gems').play('prism');
        this.add.sprite(400, 300, 'gems').play('ruby');
        this.add.sprite(400, 400, 'gems').play('square');
    }
});


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#000000',
    pixelArt: true,
    width: 800,
    height: 600,
    scene: [FromJSON]
};

var game = new Phaser.Game(config);