var hud_icons = [];

function renderHUD(game, map) {
  var gameHUD = game.add.group();
  var toolBarTop = y_size - toolbarSize;

  var icon_size = 60,
  x_icon_spacing = 40,y_icon_spacing = 10;


  hud_icons.push({'sprite_key':'icon-bee-orange','colour': 'orange'});
  hud_icons.push({'sprite_key':'icon-bee-green', 'colour':'green'});
  hud_icons.push({'sprite_key':'icon-bee-purple','colour': 'purple'});

  var graphics = game.make.graphics();

  graphics.beginFill(0x000000);
  graphics.moveTo(0,toolBarTop);
  graphics.lineTo(x_size, toolBarTop);
  graphics.lineTo(x_size, y_size);
  graphics.lineTo(0, y_size);
  graphics.endFill();

  gameHUD.add(graphics);

  for(var icon_index=0; icon_index<hud_icons.length; icon_index++) {
    var x_pos = (icon_size + (x_icon_spacing * 2))*(icon_index+1);
    var y_pos = (toolBarTop + y_icon_spacing);
    var icon  = game.add.sprite(x_pos, y_pos, hud_icons[icon_index]['sprite_key']);
    var bee_count = map.properties['bees_'+hud_icons[icon_index]['colour']];

    var text = game.add.text(Math.floor(icon.x + icon.width / 2), y_pos + icon_size + y_icon_spacing + icon_size, '' + bee_count, {fill: '#ffffff'});

    icon.inputEnabled = true;
    icon.events.onInputDown.add(bee_update, {'clicked_index': icon_index});
    icon.events.onInputOver.add(icon_over, {'clicked_index': icon_index, 'icon': icon});
    icon.events.onInputOut.add(icon_out, {'clicked_index': icon_index, 'icon': icon});

    hud_icons[icon_index]['sprite'] = icon;
    hud_icons[icon_index]['text'] = text;
    hud_icons[icon_index]['bee_count'] = bee_count;
    gameHUD.add(hud_icons[icon_index]['sprite']);

  }


}
function bee_update() {
  var text = hud_icons[this.clicked_index]['text'],
  c = hud_icons[this.clicked_index]['bee_count'];
  if(c>0) {
    c--;
    hud_icons[this.clicked_index]['bee_count'] = c;
    text.text = c;
  }
}

function icon_over(icon) {
  if(hud_icons[this.clicked_index]['bee_count']>0) {
  this.icon.alpha = 0.5;
}
}

function icon_out(icon) {
  this.icon.alpha = 1;
}