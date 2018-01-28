var BootState = {

 preload: function() {
      this.load.image('menu', './assets/images/menu.jpg');
  },
 create: function(){
      this.game.stage.backgroundColor = '#55ff55';
      game.add.text(500, 500, 'Loading...', {fill: '#ffffff'});
      this.state.start('Preloader');
 }

};