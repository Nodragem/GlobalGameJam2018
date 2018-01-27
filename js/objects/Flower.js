function Flower(x, y, game, group, bodies) {
    this.x = x;
    this.y = y;
    this.pollen = 100;
    this.state = 'growing'; // can be growing or idling

    this.sprite = game.add.sprite(x, y, 'flower');
    if(group){
        group.add(this.sprite);
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