function Spider (x, y, game, group, bodies) {
    this.x = x;
    this.y = y;
    this.timer = 5;
    this.sound = game.add.audio('spider_on');
    this.sound.play();
    this.ant_death_sound = game.add.audio('ant_death');
    this.spawnPosition = {};
    this.spawnPosition.x = x;
    this.spawnPosition.y = y;
    this.group = group;
    this.carriedAntBody = null;
    this.GameScreen = game.state.states[game.state.current];
  
    this.sprite = game.add.sprite(x, y, 'spider');
    this.sprite.animations.add('walk');
    this.sprite.animations.play('walk', 10, true);

    if(this.group){
      this.group.add(this.sprite);
    }
  
    this.move_speed = 2;
  
    //	Enable the physics body on this sprite and turn on the visual debugger
    game.physics.p2.enable(this.sprite);
    
    //	Clear the shapes and load the 'contra2' polygon from the physicsData JSON file in the cache
    this.body = this.sprite.body;
    this.body.clearShapes();
    //this.body.mass = 30;
    this.body.addCircle(40, 0, 0, 0);
    this.body.x = x;
    this.body.y = y;
    this.body.kinematic = false;
    this.body.fixedRotation = true;
    this.body.velocity.y = 0;
    bodies.push(this.body);
  
    //  Check for the spider hitting another object
    this.body.onBeginContact.add(this.onContactWith, this);
  
    
};
  
Spider.prototype.update = function(){

    var speed = this.move_speed;
    if(this.timer > 0){
        this.timer -= game.time.elapsedMS/1000;
        speed = 0;
    }

    this.y += speed;
    this.body.velocity.y=0;
    this.body.velocity.x=0;
    this.body.y = this.y;
    this.body.x = this.x;

    //this.body.velocity.y = this.move_speed;

    if (this.body.y < this.spawnPosition.y){
      this.move_speed *= -1;
      this.sprite.scale.x = -1;
      if (this.carriedAntBody != null){
        // destroy the seeds if there is one:
        if(this.carriedAntBody.myGameObject.carriedSeedBody){
            var seedBody = this.carriedAntBody.myGameObject.carriedSeedBody;
            seedBody.sprite.destroy();
            seedBody.destroy();
            this.GameScreen.removeEntityFromBody(seedBody, this.GameScreen.Seeds);
            this.carriedAntBody.myGameObject.carriedSeedBody = null;
        }
        // destroy the ant:
        this.carriedAntBody.sprite.destroy();
        this.carriedAntBody.destroy();
        this.carriedAntBody.myGameObject.sound.destroy();
        this.GameScreen.removeEntityFromBody(this.carriedAntBody, this.GameScreen.Ants);
        // destroy the spider
        this.sprite.destroy();
        this.body.destroy();
        this.sound.stop();
        this.sound.destroy();
        this.ant_death_sound.destroy();
        this.GameScreen.removeEntityFromBody(this.body, this.GameScreen.Spiders);
      }
      // this.body.x = 0;
    }
    if (this.body.y > flowerSpawnY-40){ //FIXME: ideally we would used this.GameScreen.Flowers.spawnLines[0], which should be anchored on the bottom of flower ( it is now anchored to the top).
      this.move_speed *= -1;
      //this.sprite.scale.x = 1;
      // this.body.x = x_size;
    }
  
    if(this.carriedAntBody){
      this.carriedAntBody.y = this.body.y + this.sprite.height/2;
      this.carriedAntBody.x = this.body.x// + this.sprite.height/2;

    }
  };
  

// Spider.prototype.addCollisionGroup = function(group1, group2){
//     this.body.setCollisionGroup(group1);
//     this.body.collides([group2], this.onContactWith, this);
// };

Spider.prototype.onContactWith = function(phaserBody, p2Body) {
    if(phaserBody.sprite.key == 'ant' && this.carriedAntBody == null){
        if (phaserBody.myGameObject.carriedBySpider == true)
            return;
      this.ant_death_sound.play();

      phaserBody.kinematic = true;
        phaserBody.velocity.x = 0;
        phaserBody.velocity.y = 0;
        phaserBody.fixedRotation = true;
        this.carriedAntBody = phaserBody;
        this.carriedAntBody.x = this.body.x;
        this.carriedAntBody.myGameObject.carriedBySpider = true;
        this.carriedAntBody.myGameObject.move_speed = 0;
        //this.carriedSeedBody.y = this.body.y + this.sprite.width;

    }

        
    };