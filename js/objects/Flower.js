function Flower(x, y, game, group, bodies) {
    this.x = x;
    this.y = y;
    this.pollen = 100;
    this.state = 'growing'; // can be growing or idling
    this.group = group;
    this.GameScreen = game.state.states[game.state.current];

    this.sprite = game.add.sprite(x, y, 'flower');
    if(this.group){
        this.group.add(this.sprite);
    }

    //	Enable the physics body on this sprite and turn on the visual debugger
	game.physics.p2.enable(this.sprite, true);
    
    //	Clear the shapes and load the 'contra2' polygon from the physicsData JSON file in the cache
    this.body = this.sprite.body;
    this.body.clearShapes();
    this.body.loadPolygon('physicsData', 'flower_ph');
    this.body.kinematic = true;
    bodies.push(this.body);
}

Flower.prototype.spawnSeed = function(){
    this.GameScreen.addEntity(this.GameScreen.Seeds, this.x, this.y-70);
}