var game;

// Create a new game instance 600px wide and 450px tall:
game = new Phaser.Game(1920, 1080, Phaser.AUTO, '');

// First parameter is how our state will be called.
// Second parameter is an object containing the needed methods for state functionality
game.state.add('MainMenu', MainMenu);
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);

game.state.start('MainMenu');


