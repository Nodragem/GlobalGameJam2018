Preloader = function(){
    this.ready = false;
    this.x =10;
    this.y=20;
    this.text =null;
    this.sprite = null;
};
 
Preloader.prototype = {
    preload: function(){
        //this.game.stage.backgroundColor = '#55ff55';
        //game.add.text(500, 500, 'Loading...', {fill: '#ffffff'});
        
        //this.preloadBar = this.add.sprite(10, 30, 'preloadbar');
        //this.load.setPreloadSprite(this.preloadBar);
        // Here we load all the needed resources for the level.
        // Here we load all the needed resources for the level.
        game.load.image('background', './assets/images/background.png');
        //	Load our physics data exported from PhysicsEditor
        game.load.physics('physicsData', 'assets/physics/flower_ph_collider.json');
        game.load.image('hive', '/assets/images/hive_ph.png');
        // HUD:
        game.load.image('icon-bee-orange', '/assets/images/icon-bee-orange.png');
        game.load.image('icon-bee-purple', '/assets/images/icon-bee-purple.png');
        game.load.image('icon-bee-green', '/assets/images/icon-bee-green.png');
        game.load.image('love_bee', '/assets/images/love_bee_ph.png');
        game.load.image('flower', '/assets/images/flower_ph.png');

        game.load.image('seed', '/assets/images/seed_ph.png');
        game.load.image('green-seed', '/assets/images/green-seed.png');
        game.load.image('red-seed', '/assets/images/red-seed.png');
        game.load.image('blue-seed', '/assets/images/blue-seed.png');
        game.load.image('orange-seed', '/assets/images/orange-seed.png');
        game.load.image('yellow-seed', '/assets/images/yellow-seed.png');
        game.load.image('purple-seed', '/assets/images/purple-seed.png');


        game.load.image('tiles', 'assets/images/blank.png');

        game.load.audio('bee_feedback', 'assets/audio/bee-feedback.mp3');
        game.load.audio('bee_bg', 'assets/audio/game-underscore.mp3');
        game.load.audio('spider_on', 'assets/audio/boris-approaches.mp3');
        game.load.audio('ant_death', 'assets/audio/ant-death.mp3');
        game.load.audio('ant_rustle', 'assets/audio/ant-rustle.mp3');
        game.load.audio('abeelity', 'assets/audio/abeelity.mp3' );
        game.load.audio('bee-feedback', 'assets/audio/bee-feedback.mp3' );
        game.load.audio('flower-sound-1', 'assets/audio/flower-bloom-1.mp3');
        game.load.audio('flower-sound-2', 'assets/audio/flower-bloom-2.mp3');
        game.load.audio('flower-sound-3', 'assets/audio/flower-bloom-3.mp3');
        game.load.audio('level-complete', 'assets/audio/level-complete.mp3');

        game.load.image('orange-bee', '/assets/images/orange-bee.png');
        game.load.image('purple-bee', '/assets/images/purple-bee.png');
        game.load.image('green-bee', '/assets/images/green-bee.png');
        game.load.image('toolbar', '/assets/images/toolbar.jpg');

        game.load.spritesheet('ant', 'assets/images/ant-anim.png', 120, 120);
        game.load.spritesheet('stem', 'assets/images/stem-anim.png', 120, 120);
        game.load.spritesheet('yellow-flower', 'assets/images/yellow-flower.png', 120, 120);
        game.load.spritesheet('red-flower', 'assets/images/red-flower.png', 120, 120);
        game.load.spritesheet('blue-flower', 'assets/images/blue-flower.png', 120, 120);
        game.load.spritesheet('green-flower', 'assets/images/green-flower.png', 120, 120);
        game.load.spritesheet('orange-flower', 'assets/images/orange-flower.png', 120, 120);
        game.load.spritesheet('purple-flower', 'assets/images/purple-flower.png', 120, 120);
        game.load.spritesheet('white-flower', 'assets/images/white-flower.png', 120, 120);

        game.load.spritesheet('spider', 'assets/images/spider-anim.png', 120, 120);

        
        this.load.onLoadStart.add(this.loadStart, this);
        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.loadComplete, this);
    },
    
    loadStart : function() {
        // Add a sprite to your game, here the sprite will be the game's logo
        // Parameters are : X , Y , image name (see above) 
        this.sprite = this.add.sprite(0, 0, 'menu');
        
        // Add menu screen.
        // It will act as a button to start the game.
        this.add.button(0, 0, 'menu', this.startGame, this);
        this.game.stage.backgroundColor = '#000000';
        this.text = game.add.text(x_size/2-250, 100, '', { fill: '#ffffff' });
        //this.text.align="center";
        this.text.setText("Game Assets Loading ...");
        this.bee_lullaby = game.add.audio('bee_lullaby');
        if(!this.ready) {
            this.bee_lullaby.play();
        }
    },

    create : function () {
        
    },
     
    fileComplete : function(progress, cacheKey, success, totalLoaded, totalFiles) {
     
        this.text.setText("Game loading: " + progress + "% - " + totalLoaded + " out of " + totalFiles);     
        // var newImage = game.add.image(this.x, this.y, cacheKey);     
        // newImage.scale.set(0.3);     
        // this.x += newImage.width + 20;     
        // if (this.x > 700)
        // {
        //     this.x = 32;
        //     this.y += 332;
        // }
     
    },
     
    loadComplete : function () {
        this.text.setText("Load Complete - Click to Start");
        this.ready = true;
    },


    startGame : function(){
        if(this.ready){
            this.sprite.alpha = 0;
            this.sprite.destroy();
            this.bee_lullaby.stop();

            this.state.start('Game');
            this.bee_lullaby.destroy();
        }
    }
};