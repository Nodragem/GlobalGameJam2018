function Seed(x, y){
    this.x = x;
    this.y = y;
    this.life = 100;
    this.state = 'rolling'; // can be 'rolling' (on the ground) or 'carried' (by an ant)

    this.sprite = game.add.sprite(x, y, 'seed');
}