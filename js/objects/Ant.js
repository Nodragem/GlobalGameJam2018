function Ant (x, y, game, group, bodies) {
  this.x = x;
  this.y = y;
  this.sound = game.add.audio('ant_rustle');
  this.sound.play();
  this.facing = 'left';
  this.group = group;
  this.carriedSeedBody = null;
  this.carriedBySpider = false;
  this.GameScreen = game.state.states[game.state.current];

  this.sprite = game.add.sprite(x, y, 'ant');
  this.sprite.animations.add('walk');
  this.sprite.animations.play('walk', 10, true);

  if(this.group){
    this.group.add(this.sprite);
  }

  this.move_speed = 5;

  //	Enable the physics body on this sprite and turn on the visual debugger
	game.physics.p2.enable(this.sprite);
  
  //	Clear the shapes and load the 'contra2' polygon from the physicsData JSON file in the cache
  this.body = this.sprite.body;
  this.body.myGameObject = this;
  this.body.clearShapes();
  //this.body.mass = 30;
  this.body.addCircle(50, 0, 0, 0);
  this.body.kinematic = true;
  bodies.push(this.body);

  //  Check for the ant hitting another object
  this.body.onBeginContact.add(this.onContact, this);

  
};

Ant.prototype.update = function(){

  this.body.x+= this.move_speed;
  if (this.body.x > x_size){
    this.move_speed *= -1;
    this.sprite.scale.x = -1;
    // this.body.x = 0;
  }
  if (this.body.x < 0){
    this.move_speed *= -1;
    this.sprite.scale.x = 1;
    // this.body.x = x_size;
  }

  if(this.carriedSeedBody){
    this.carriedSeedBody.x = this.body.x + this.sprite.width/2;
    this.carriedSeedBody.y = (this.body.y + this.sprite.height/2) - 50;
  }
};

Ant.prototype.onContact = function(phaserBody, p2Body) {
  
      if(phaserBody.sprite.key.search('seed') && this.carriedSeedBody == null && !this.carriedBySpider){
        phaserBody.kinematic = true;
        phaserBody.velocity.x = 0;
        phaserBody.velocity.y = 0;
        phaserBody.fixedRotation = true;
        this.carriedSeedBody = phaserBody;
        this.carriedSeedBody.x = this.body.x;
        //this.carriedSeedBody.y = this.body.y + this.sprite.width;

      }
      
  };

Ant.prototype.dropSeed = function (){
  if(this.carriedSeedBody){
    this.carriedSeedBody.kinematic = false;
    this.carriedSeedBody.velocity.x = 0;
    this.carriedSeedBody.velocity.y = 2;
    this.carriedSeedBody.fixedRotation = false;
    var colour = this.carriedSeedBody.mygameobject.type;
    this.GameScreen.addEntity(this.GameScreen.Flowers, this.carriedSeedBody.x, this.GameScreen.Flowers.spawnLines[0], colour);
    this.carriedSeedBody.sprite.destroy();
    this.carriedSeedBody.destroy();
    this.GameScreen.removeEntityFromBody(this.carriedSeedBody, this.GameScreen.Seeds);
    this.carriedSeedBody = null;

    window.setTimeout(function() {
      Game.newLevel();
    },2500);

    //this.carriedSeedBody.y = this.body.y + this.sprite.width;
  }
};


