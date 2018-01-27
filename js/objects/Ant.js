function Ant (x, y, game, group, bodies) {
  this.x = x;
  this.y = y;
  this.facing = 'left';
  this.group = group;
  this.carriedSeed = null;

  this.sprite = game.add.sprite(x, y, 'ant');
  if(this.group){
    this.group.add(this.sprite);
  }

  this.move_speed = 5;

  //	Enable the physics body on this sprite and turn on the visual debugger
	game.physics.p2.enable(this.sprite, true);
  
  //	Clear the shapes and load the 'contra2' polygon from the physicsData JSON file in the cache
  this.body = this.sprite.body;
  this.body.kinematic = true;
  bodies.push(this.body);

  //  Check for the ant hitting another object
  this.body.onBeginContact.add(this.onContact, this);


};

Ant.prototype.update = function(){

  this.body.x+= this.move_speed;
  if (this.body.x > x_size){
    this.body.x = 0;
  }
  if (this.body.x < 0){
    this.body.x = x_size;
  }

  if(this.carriedSeedBody){
    this.carriedSeedBody.x = this.body.x + this.sprite.width/2;
  }
};

Ant.prototype.onContact = function(phaserBody, p2Body) {
  
      if(phaserBody.sprite.key == 'seed'){
        phaserBody.kinematic = true;
        phaserBody.velocity.x = 0;
        phaserBody.velocity.y = 0;
        phaserBody.fixedRotation = true;
        this.carriedSeedBody = phaserBody;
        this.carriedSeedBody.x = this.body.x;
        //this.carriedSeedBody.y = this.body.y + this.sprite.width;
      }
      
  }
