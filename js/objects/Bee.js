function Bee (x, y) {
    this.x = x;
    this.y = y;
    this.facing = 'left';

    this.sprite = game.add.sprite(x, y, 'bee');

};
