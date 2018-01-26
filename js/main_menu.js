function MainMenu() {
    this.my_variable = 'test';

    this.preload = function() {
        // Loading images is required so that later on we can create sprites based on the them.
        // The first argument is how our image will be refered to, 
        // the second one is the path to our file.
        this.game.load.image('menu', './assets/images/menu.png');
        // --> looks like they added a reference to game
    };

    this.create = function () {
        // Add a sprite to your game, here the sprite will be the game's logo
        // Parameters are : X , Y , image name (see above) 
        this.add.sprite(0, 0, 'menu');
        
        // Add menu screen.
        // It will act as a button to start the game.
        this.add.button(0, 0, 'menu', this.startGame, this);
    };
    
    this.startGame = function(){
        this.state.start('Game');
    };
    
}

