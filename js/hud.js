var hud_icons = [], gameHUD, icon_size = 60,
  x_icon_spacing = 60,y_icon_spacing = 10;
var abeelity_sound = null;

function renderHUD(game) {
  gameHUD = game.add.group();
  var toolBarTop = y_size - toolbarSize;
  abeelity_sound = game.add.audio('abeelity');

  hud_icons.push({'sprite_key':'icon-bee-orange','colour': 'orange'});
  hud_icons.push({'sprite_key':'icon-bee-green', 'colour':'green'});
  hud_icons.push({'sprite_key':'icon-bee-purple','colour': 'purple'});

  /*var graphics = game.make.graphics();

  graphics.beginFill(0x000000);
  graphics.moveTo(0,toolBarTop);
  graphics.lineTo(x_size, toolBarTop);
  graphics.lineTo(x_size, y_size);
  graphics.lineTo(0, y_size);
  graphics.endFill();

  gameHUD.add(graphics);*/



}

function updateHUD() {
  var toolBarTop = y_size - toolbarSize;
  gameHUD.removeAll();
  var tb  = game.add.sprite(0, toolBarTop, 'toolbar');
  tb.anchor.setTo(0,0);
  gameHUD.add(tb);
  for(var icon_index=0; icon_index<hud_icons.length; icon_index++) {
    var x_pos = (icon_size + (x_icon_spacing * 2))*(icon_index+1);
    var y_pos = (toolBarTop + y_icon_spacing);
    var icon  = game.add.sprite(x_pos+55, y_pos, hud_icons[icon_index]['sprite_key']);
    var bee_count = map.properties['bees_'+hud_icons[icon_index]['colour']];

    var text = game.add.text(Math.floor(icon.x + icon.width / 2), y_pos + icon_size + y_icon_spacing + icon_size, '' + bee_count, {fill: '#000000'});

    icon.inputEnabled = true;
    icon.events.onInputDown.add(bee_toggle, {'clicked_index': icon_index, 'game': game, 'icon': icon});
    icon.events.onInputOver.add(icon_over, {'clicked_index': icon_index, 'icon': icon});
    icon.events.onInputOut.add(icon_out, {'clicked_index': icon_index, 'icon': icon});

    hud_icons[icon_index]['sprite'] = icon;
    hud_icons[icon_index]['text'] = text;
    hud_icons[icon_index]['bee_count'] = bee_count;
    gameHUD.add(hud_icons[icon_index]['sprite']);
    gameHUD.add(text);

  }
}

function bee_toggle() {
  if(active_bee==false) {
    var text = hud_icons[this.clicked_index]['text'],
      c = hud_icons[this.clicked_index]['bee_count'];
    if (c > 0) {
      c--;
      hud_icons[this.clicked_index]['bee_count'] = c;
      text.text = c;
    }

    Game.BeePaths = [];
    Game.Bees = [];
    Game.Bees.push(new Bee(Game.Hives[0].x, Game.Hives[0].y, hud_icons[this.clicked_index]['colour']));
    Game.BeePaths.push(new BeePath(Game.Hives[0]))
    Game.activeBeePath = Game.BeePaths[0];
    Game.activeBeePath.addBee(Game.Bees[0]);
    abeelity_sound.play();
    active_bee = hud_icons[this.clicked_index]['colour'];
    this.icon.alpha = 0.5;
  } else {
    active_bee = false;
    this.icon.alpha = 1;
    var text = hud_icons[this.clicked_index]['text'],
    c = hud_icons[this.clicked_index]['bee_count'];
    c++;
    hud_icons[this.clicked_index]['bee_count'] = c;
    text.text = c;
    Game.activeBeePath.clearPaths();
    Game.BeePaths = [];
    Game.Bees = [];

  }
}

function icon_over() {
  if(hud_icons[this.clicked_index]['bee_count']>0 && active_bee == false) {
    this.icon.alpha = 0.5;
  }
}

function icon_out() {
  if(active_bee==false) {
    this.icon.alpha = 1;
  }
}