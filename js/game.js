var map;
var layer;
var Game = {
    // I played with the variables scopes:
    // these variables don't need to be exposed!
    myVariable : 'p',
    Hives: [],
    Bees: [],
    Flowers: [],

    preload : function() {
        game.stage.backgroundColor = '#1f8ec1';
        game.load.image('hive', './assets/images/hive_ph.png');
        game.load.image('bee', './assets/images/bee_ph.png');
        game.load.image('love_bee', './assets/images/love_bee_ph.png');
        game.load.image('seed', './assets/images/seed_ph.png');
        game.load.image('flower', './assets/images/flower_ph.png');
        game.load.tilemap('level-1', '/assets/maps/level-1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/images/tilemap.png');

    },

    create : function() {
        //this.Flowers.push(new Flower(20, 20));
        //this.Bees.push(new Bee(200, 200));
        //this.Hives.push(new Hive(500, 500));

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
                            this.Flowers.push(new Flower(x*60,y*60));
                        break;
                    }
                }
            }
        }


    },

    update: function() {

    },

    endGame: function () {

        // Change the state back to Game.
        this.state.start('Game_Over');

    }

};