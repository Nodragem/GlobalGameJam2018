var Game = {
    // I played with the variables scopes:
    // these variables don't need to be exposed!
    myVariable : 'p',
    Hives: [],
    Bees: [],
    Flowers: {create: Flower, list:[], group:null, bodies:[], spawnLines: []},
    Ants: {create: Ant, list:[], group:null, bodies:[]},
    Seeds: {create: Seed, list:[], group:null, bodies:[]},
    BeePaths: [],
    clickRate : 100,
    nextClick : 0,
    activeBeePath : null,
    selectedAction : 'yellowBee', 
    background: null,

    preload : function() {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        game.load.image('background', './assets/images/background.png');
        //	Load our physics data exported from PhysicsEditor
  	    game.load.physics('physicsData', 'assets/physics/flower_ph_collider.json');
        game.load.image('hive', '/assets/images/hive_ph.png');
        game.load.image('bee', '/assets/images/bee_ph.png');
        game.load.image('icon-bee-orange', '/assets/images/icon-bee-orange.png');
        game.load.image('icon-bee-purple', '/assets/images/icon-bee-purple.png');
        game.load.image('icon-bee-green', '/assets/images/icon-bee-green.png');
        game.load.image('love_bee', '/assets/images/love_bee_ph.png');
        game.load.image('seed', '/assets/images/seed_ph.png');
        game.load.image('flower', '/assets/images/flower_ph.png');
        game.load.tilemap('level-1', '/assets/maps/level-1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/images/blank.png');
        game.load.image('ant', 'assets/images/ant.png');

        game.load.audio('bee_feedback', 'assets/audio/bee-feedback.mp3');
        game.load.audio('bee_lullaby', 'assets/audio/bee-lullaby.mp3');


        game.load.spritesheet('yellow-flower', 'assets/images/yellow-flower.png', 120, 120);


    },

    create : function() {
        bee_feedback = game.add.audio('bee_feedback');
        bee_lullaby = game.add.audio('bee_lullaby');
        game.sound.setDecodedCallback([ 'bee_feedback', 'bee_lullaby' ], this.ready, this);
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
        this.background.body.addRectangle(x_size, toolbarSize, 0, y_size-toolbarSize/2-60, 0);
        this.background.body.kinematic = true;
        this.background.anchor.setTo(0.5,0);

        this.Flowers.group = game.add.group();
        //this.Flowers.list.push(new Flower(20, 1080-300, game, this.Flowers.group, this.Flowers.bodies));

        map = game.add.tilemap('level-1');
        map.addTilesetImage('level-objects', 'tiles', 60, 60, 1, 1);

        layer = map.createLayer('world');
        for(var y = 0; y < map.height; ++y){
            for(var x = 0; x < map.width; ++x){
                var tile = map.getTile(x, y);
                if(tile) {
                    var object_type = tile.properties['type'];
                    switch(object_type) {
                        case 'flower':
                            // FIXME: in Tiledmap, we could have an Object Layer with the Spwaning Lines
                            this.Flowers.spawnLines.push(y*60); // HACK: we will get twice the same Spawning Line for now (and that's ok)
                            // then we only need the x, and the spawningLines index
                            this.addEntity(this.Flowers, x*60, this.Flowers.spawnLines[0], tile.properties['colour']);
                            break;

                        case 'hive':
                            this.Hives.push(new Hive(x*60,y*60));
                            break;
                    }
                }
            }
        }

        var ant_count = map.properties['ants'];
        this.Ants.group = game.add.group();
        this.Ants.group.add(game.add.sprite(x, y));
        for(var i=0;i<ant_count;i++) {
            var x = Math.floor(Math.random()*1000);
            var y = y_size - toolbarSize - 60;
            this.addEntity(this.Ants, x, y);
        }

        renderHUD(Game, map);
        bee_lullaby.play();
    },

    update: function() {
        for(id in this.BeePaths){
            path = this.BeePaths[id];
            path.updatePositions();
        }

        for(id in this.Ants.list) {
            this.Ants.list[id].update();
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
    }

};

var flower_hits = 0;