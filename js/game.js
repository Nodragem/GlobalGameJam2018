var Game = {
    // I played with the variables scopes:
    // these variables don't need to be exposed!
    myVariable : 'p',
    Hives: [],
    Bees: [],
    Flowers: {create: Flower, list:[], group:null, bodies:[], spawnLines: []},
    Ants: {create: Ant, list:[], group:null, bodies:[]},
    Seeds: {create: Seed, list:[], group:null, bodies:[]},
    Spiders: {create: Spider, list:[], group:null, bodies:[]},
    BeePaths: [],
    clickRate : 100,
    nextClick : 0,
    activeBeePath : null,
    selectedAction : 'yellowBee', 
    background: null,
    flowerSounds: null,

    preload : function() {
        

        initLevel(Game);

    },

    create : function() {
        this.game.stage.backgroundColor = '#000000';
        //this.ready();
        bee_feedback = game.add.audio('bee_feedback');
        bee_lullaby = game.add.audio('bee_lullaby');
        bee_bg = game.add.audio('bee_bg');
        flowerSounds = game.add.audio('flower-sound-1');
        bee_lullaby.loop = true;
        bee_bg.loop = true;
        game.sound.setDecodedCallback([ 'flower-sound-1', 'bee_bg','bee_feedback', 'bee_lullaby' ], this.ready, this);
    },

    ready: function() {
        //	Enable p2 physics for Click Detection:
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 300;
        game.physics.p2.restitution = 0.3;

        //  Background and Ground Colliders:
        this.background = game.add.sprite(game.world.centerX, 0, 'background');

        //  Enables all kind of input actions on this this.background (click, etc)
        this.background.inputEnabled = true;
        this.background.events.onInputUp.add(this.onBackgroundClick, this);
        game.physics.p2.enable(this.background, true);
        this.background.body.clearShapes();
        this.background.body.addRectangle(x_size, toolbarSize, 0, y_size-toolbarSize/2-60, 0); // FIXME: should be using something like Flowers.spawnLines
        this.background.body.kinematic = true;
        this.background.anchor.setTo(0.5,0);

        // Load Game elements:
        this.Flowers.group = game.add.group();
        //this.Flowers.list.push(new Flower(20, 1080-300, game, this.Flowers.group, this.Flowers.bodies));
        loadLevel(Game);
        renderHUD(Game);
        updateHUD();
        bee_bg.play();
    },

    update: function() {
        for(id in this.BeePaths){
            path = this.BeePaths[id];
            path.updatePositions();
        }

        for(id in this.Ants.list) {
            this.Ants.list[id].update();
        }

        for(id in this.Spiders.list) {
            this.Spiders.list[id].update();
        }



    },

    onBackgroundClick : function (layer, pointer) {

        // Detect Click on the Flowers:
        var bodies = game.physics.p2.hitTest(pointer.position, this.Flowers.bodies);
        var is_flower = !(bodies.length === 0);

        if(is_flower) {

        }

        if(is_flower) {
            var bodyID = null;
            for (id in this.Flowers.bodies) {
                if (bodies[0].parent === this.Flowers.bodies[id]) {
                    bodyID = id;
                    break;
                }
            }
            colour_type  = this.Flowers.list[bodyID].flower_type;
            if(colour_sets[active_bee][colour_type]) {
                flower_hits++;

                if (flower_hits == 2) {
                    // extract the ID:

                    // Make the active Bee Path add a point and deactivated it
                    if (this.activeBeePath != null) {
                        this.activeBeePath.addPoint(pointer.worldX, pointer.worldY);
                        this.activeBeePath.setReady(true);
                        this.activeBeePath = null;
                        flower_hits = 0;
                    }
                }
            }
        }
        if(this.activeBeePath != null) {
            this.activeBeePath.addPoint(pointer.worldX, pointer.worldY);
        }

        // Detect click on the Ants:
        var bodies = game.physics.p2.hitTest(pointer.position, this.Ants.bodies);
        var is_ant = !(bodies.length === 0);
        if (is_ant){
            for (id in this.Ants.bodies) {
                if (bodies[0].parent === this.Ants.bodies[id]) {
                    bodyID = id;
                    break;
                }
            }
        }
        this.Ants.list[id].dropSeed();
    },


    endGame: function () {
        
        // Change the state back to Game.
        this.state.start('Game_Over');
        
    },

    addEntity: function (gameGroup, x, y, params) {
        var object = new gameGroup.create(x,y, game, gameGroup.group, gameGroup.bodies, params);
        gameGroup.list.push(object);
    },

    newLevel: function() {
        level++;
        loadLevel(Game);
        updateHUD();
    },

  removeEntityFromBody : function (entityBody, gameGroup) {
    var objectID;
    const index = gameGroup.bodies.indexOf(entityBody);
    if(gameGroup.group)
      gameGroup.group.remove(gameGroup.list[index].sprite);
    gameGroup.list.splice(index, 1);
    gameGroup.bodies.splice(index, 1);
  }

};

var flower_hits = 0;