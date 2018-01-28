function Bee (x, y, colour) {
    this.x = x;
    this.y = y;
    this.facing = 'left';

    this.colour = colour;
    this.sprite = game.add.sprite(x, y, colour+'-bee');
    this.sprite.anchor.setTo(0.5);
    this.sprite.scale.setTo(0.35);
};
