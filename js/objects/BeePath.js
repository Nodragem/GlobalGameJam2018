function BeePath (origin) {
    // origing needs a x and y and will be the starting points
    this.points = [];
    this.points.add({x:origin.x, y:origin.y});

    this.bees = [];

    this.sprite = game.add.sprite(x, y, 'love_bees');
};

BeePath.prototype.addBees = function(bee){
    this.bees.add(bee);
};

BeePath.prototype.updatePositions = function(){

};

