function Flower(x, y, game, group, bodies, type) {
    this.x = x;
    this.y = y;
    this.pollen = 100;
    this.state = 'growing'; // can be growing or idling
    this.group = group;
    this.GameScreen = game.state.states[game.state.current];

    this.sprite = game.add.sprite(x, y, 'yellow-flower');
    this.sprite_stem = game.add.sprite(x, y, 'yellow-flower');
    this.sprite.anchor.setTo(0.5);
    this.sprite_stem.anchor.setTo(0.5, 0);
    this.sprite_stem.frame = 1;
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
}

Flower.prototype.spawnSeed = function(){
    this.GameScreen.addEntity(this.GameScreen.Seeds, this.x + game.rnd.realInRange(-10, 10), this.y-70);
}