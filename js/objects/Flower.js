function Flower(x, y, game, group, bodies, type) {
    this.x = x;
    this.y = y;
    this.pollen = 100;
    this.state = 'growing'; // can be growing or idling
    this.group = group;
    this.GameScreen = game.state.states[game.state.current];

    this.sprite = game.add.sprite(x, y, type+'-flower');
    this.sprite.animations.add('blossom');

    this.sprite_stem = game.add.sprite(x, y, 'stem');
    this.sprite_stem.animations.add('grow');
    this.sprite_stem.frame = 0;

    this.sprite.anchor.setTo(0.5);
    this.sprite_stem.anchor.setTo(0.5, 0);
    this.flower_type = type;
    if(group){
        group.add(this.sprite_stem);
        group.add(this.sprite);
    }

	  game.physics.p2.enable(this.sprite);

    //	Clear the shapes and load the 'contra2' polygon from the physicsData JSON file in the cache
    this.body = this.sprite.body;
    this.body.clearShapes();
    this.body.loadPolygon('physicsData', 'yellow-flower');
    this.body.kinematic = true;
    bodies.push(this.body);

    // add a particle effect when a flower is made:
    emitter = game.add.emitter(this.x, this.y+this.sprite.height-60, 20); 
    emitter.forEach(function(particle) { particle.tint = 0x00ff00;});
    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.5;   
    emitter.makeParticles('seed');
    emitter.gravity = 200;
    emitter.start(true, 2000, null, 10);
    switch(flower_sound_count) {
        case 0:
            flowerSoundsA.play();
            break;
        case 1:
            flowerSoundsB.play();
            break;
        case 2:
            flowerSoundsC.play();
            break;
    }
    flower_sound_count++;
    if(flower_sound_count>flower_sound_max) flower_sound_count = 0;

    anim = this.sprite_stem.animations.play('grow', 15, false);
    anim.onComplete.add(function() {
        this.sprite.animations.play('blossom', 20, false);
    }, this);


}

Flower.prototype.spawnSeed = function(active_bee){
    this.GameScreen.addEntity(this.GameScreen.Seeds, this.x + game.rnd.realInRange(-30, 30), this.y-70, active_bee);
}

var flower_sound_count = 0, flower_sound_max = 3;