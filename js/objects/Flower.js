function Flower(x, y) {
    this.x = x;
    this.y = y;
    this.pollen = 100;
    this.state = 'growing'; // can be growing or idling

    this.sprite = game.add.sprite(x, y, 'flower');
}