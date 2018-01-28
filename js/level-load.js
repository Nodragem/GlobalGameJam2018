var map;
var layer;
var level = 1;

function initLevel(game) {
  game.load.tilemap('level-1', '/assets/maps/level-1.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.tilemap('level-2', '/assets/maps/level-2.json', null, Phaser.Tilemap.TILED_JSON);
}

function loadLevel(game) {
  map = game.add.tilemap('level-'+level);
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
            game.Flowers.spawnLines.push(y*60); // HACK: we will get twice the same Spawning Line for now (and that's ok)
            // then we only need the x, and the spawningLines index
            game.addEntity(game.Flowers, x*60, game.Flowers.spawnLines[0], tile.properties['colour']);
            break;

          case 'spider':
            game.addEntity(game.Spiders, x*60, 360);
            break;

          case 'hive':
            Game.Hives.push(new Hive(x*60,y*60));
            break;
        }
      }
    }
  }

  var ant_count = map.properties['ants'];
  game.Ants.group = game.add.group();
  game.Ants.group.add(game.add.sprite(x, y));
  for(var i=0;i<ant_count;i++) {
    var x = Math.floor(Math.random()*1000);
    var y = y_size - toolbarSize - 60;
    game.addEntity(game.Ants, x, y);
  }
}