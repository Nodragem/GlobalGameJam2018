function Seed(x, y, game, group, bodies, type){
    this.x = x;
    this.y = y;
    this.life = 100;
    this.state = 'rolling'; // can be 'rolling' (on the ground) or 'carried' (by an ant)

    this.type = type;

    this.group = group;  
    this.sprite = game.add.sprite(x, y, type+'-seed');
    if(this.group){
        this.group.add(this.sprite);
    }

    //	Enable the physics body on this sprite and turn on the visual debugger
    game.physics.p2.enable(this.sprite);
    
    //	Clear the shapes and load the 'contra2' polygon from the physicsData JSON file in the cache
    this.body = this.sprite.body;
    this.body.clearShapes();
    //this.body.mass = 30;
    this.body.addCircle(10, 0, 0, 0);
    this.body.mygameobject = this;
    bodies.push(this.body);
}