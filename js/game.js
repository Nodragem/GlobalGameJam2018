var Game = {
    // I played with the variables scopes:
    // these variables don't need to be exposed!
    myVariable : 'p',
    Hives: [],
    Bees: [],
    Flowers: [],

    preload : function() {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        game.load.image('hive', './assets/images/hive_ph.png');
        game.load.image('bee', './assets/images/bee_ph.png');
        game.load.image('love_bee', './assets/images/love_bee_ph.png');
        game.load.image('seed', './assets/images/seed_ph.png');
        game.load.image('flower', './assets/images/flower_ph.png');
    },

    create : function() {
        Flowers.add(new Flower(20, 20));
        Bees.add(new Bee(200, 200));
        Hives.add(new Hive(500, 500));
    },

    update: function() {

    },

    endGame: function () {

        // Change the state back to Game.
        this.state.start('Game_Over');

    }

};