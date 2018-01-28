function Bee (x, y, colour) {
    this.x = x;
    this.y = y;
    this.facing = 'left';

    this.colour = colour;
    this.sprite = game.add.sprite(x, y, 'bee');

};
