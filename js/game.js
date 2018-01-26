var Game = {
    // I played with the variables scopes:
    // these variables don't need to be exposed!
    myVariable : 'p',

    preload : function() {
        // Here we load all the needed resources for the level.
        // In our case, that's just two squares - one for the snake body and one for the apple.
        game.load.image('snake', './assets/images/snake.png');
        game.load.image('apple', './assets/images/apple.png');
    },

    create : function() {
        this.add.button(0, 0, 'snake', this.endGame, this);
    },

    update: function() {

    },

    endGame: function () {

        // Change the state back to Game.
        this.state.start('Game_Over');

    }

};