var BootState = {

 preload: function() {
   this.load.audio('bee_lullaby', 'assets/audio/bee-lullaby-loop.mp3');

   this.load.image('menu', './assets/images/menu.jpg');
  },
 create: function(){
      this.game.stage.backgroundColor = '#55ff55';
      game.add.text(500, 500, 'Loading...', {fill: '#ffffff'});
      this.state.start('Preloader');
 }

};