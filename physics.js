class Physics{
    gravity(target){
        if((target.y + target.height) < (canvas.height - 50)){
            target.dy += 1.5;
        }else if((target.y + target.height) > (canvas.height - 50)){
            target.airborne = false;
            target.dy = 0;
            target.y = canvas.height - target.height - 50;
        }
    }
    friction(target){
        target.dx *= 0.85;
    }
    collision(t1,t2){
        var collide;
        if((t1.x + t1.width < t2.x) || (t2.x + t2.width < t1.x) || (t1.y + t1.height < t2.y) || (t2.y + t2.height < t1.y)){
            collide = false;
        }else{
            collide = true;
        }
        return collide;
    }
}