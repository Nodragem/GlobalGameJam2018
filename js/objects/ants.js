function Ant (x, y, group) {
  this.x = x;
  this.y = y;
  this.facing = 'left';

  this.sprite = game.add.sprite(x, y, 'ant');
  group.add(this.sprite);

  move_speed = 5;

};
