var game,
    x_size = 1920,
    y_size = 1080,
    toolbarSize = 180;
game = new Phaser.Game(x_size, y_size, Phaser.AUTO, '');

game.state.add('MainMenu', MainMenu);
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);

game.state.start('Game');


