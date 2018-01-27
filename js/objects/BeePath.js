function BeePath (origin) {
    // origing needs a x and y and will be the starting points
    this.points = [];
    // this.points.push({x:origin.x, y:origin.y});
    this.points.push({x:origin.x, y:origin.y, sprite:game.add.sprite(origin.x, origin.y, 'love_bee')});
    this.noise_amp = 4;
    this.bees = [];
    this.speed_bees = 30; //pixels per seconds
    this.ready_to_go = false;
    this.looping = false;

    
};

BeePath.prototype.addBee = function(bee){
    bee.interval = -1; // every bees start at interval 0 (between point 0 and 1)
    bee.interp_factor = 1; // force the code to init the interpolation (below)
    this.bees.push(bee);
};

BeePath.prototype.addPoint = function(x, y){
    var point = {x:x, y:y};
    point.sprite = game.add.sprite(point.x, point.y, 'love_bee');
    this.points.push(point);
}

BeePath.prototype.updatePositions = function(){
    // for (id in this.points){
    //     if (id> this.points.length)
    //     var point
    // }
    for(id in this.bees){
        var bee = this.bees[id];
        if (this.points.length>1 && this.ready_to_go){
            // if 2 points there is 1 interval
            // if 3 points there are 2 intervals ... etc...
            if(bee.interp_factor >= 1){
                // if we reached the current target (bee.point2) we update the target:
                if (bee.interval+2 <= (this.points.length-1) ){
                    // If there is more points in path, the new target (point2) is the next point:
                    bee.interp_factor = 0;
                    bee.interval += 1;
                    bee.point1 = this.points[bee.interval];
                    bee.point2 = this.points[bee.interval+1];
                    bee.interval_distance = Phaser.Point.distance(bee.point1, bee.point2, round=true)
                    bee.normed_speed = this.speed_bees/bee.interval_distance;
                }
                else {
                // if there are no more points:
                    if (this.looping){
                        // if looping, we reset the bee:
                        bee.interp_factor = 0;
                        bee.point1 = this.points[bee.interval+1];
                        bee.point2 = this.points[0];
                        bee.interval = -1;
                        bee.interval_distance = Phaser.Point.distance(bee.point1, bee.point2, round=true)
                        bee.normed_speed = this.speed_bees/bee.interval_distance;

                    }
                    else {
                        // if not looping
                        bee.normed_speed = 0;
                    }
                }
            
            }
            bee.interp_factor += bee.normed_speed;
            this.linear_interp(bee, bee.interp_factor, bee.point1, bee.point2);

        }
        else {
            bee.sprite.x = this.points[bee.interval+1].x;
            bee.sprite.y = this.points[bee.interval+1].y;
        }

        // add noise in bees:
        bee.sprite.x += 20 * game.rnd.realInRange(-1, 1);
        bee.sprite.y += 20* game.rnd.realInRange(-1, 1);
    }

};

BeePath.prototype.linear_interp = function(obj, factor, point1, point2){
    obj.x = point1.x + factor * (point2.x - point1.x);
    obj.y = point1.y + factor * (point2.y - point1.y);
    obj.sprite.x = obj.x;
    obj.sprite.y = obj.y;
};

BeePath.prototype.setReady = function(ready){
    this.ready_to_go = ready;
}

