//player
class Player{
    constructor(){
        this.width = 50;
        this.height = 100;
        this.x = (canvas.width - this.width)/2;
        this.y = canvas.height - 50 - this.height + 1;
        this.oldX = (canvas.width - this.widht)/2;
        this.oldY = 0;
        this.worldX = 0;
        this.worldY = 0;
        this.dx = 0;
        this.dy = 0;
        //stats
        this.hp = 10;
        this.mp = 10;
        this.hpMax = 10;
        this.mpMax = 10;
        //states
        this.airborne = true;
        this.lookL = false;
        this.lookR = false;
        //other
        this.spriteFrame = 0;
        this.sprite = playerSpriteI1;
        this.attacking = false;
        this.level = level;
        this.damageMod = this.level;
        this.type = "player";
    }
    draw(){
        ctx.drawImage(this.sprite,this.x,this.y,this.width,this.height);
    }
    update(){
        this.behaviour();
        if(this.level != level){
            this.level = level;
            this.hpMax = 10 * this.level;
            this.mpMax = 10 * this.level;
            this.hp = this.hpMax;
            this.mp = this.mpMax;
        }
        this.x += this.dx;
        this.y += this.dy;
        if(this.x < 0){
            this.x = 0
        }
        if(this.x + this.width > canvas.width){
            this.x = canvas.width - this.width;
        }
        this.draw();
    }
    updateOldPos(){
       //run this at the end of terrain collision or at the end of game loop
       this.oldX = this.x;
       this.oldY = this.y; 
    }
    updateSprite(){
        if((!this.lookL && !this.lookR) || (this.lookL && this.lookR)){
            if(this.spriteFrame == 0){
                this.sprite = playerSpriteI1;
            }else if(this.spriteFrame == 1){
                this.sprite = playerSpriteI2;
            }
        }else if(this.lookL && !this.lookR){
            if(this.spriteFrame == 0){
                this.sprite = playerSpriteL1;
            }else if(this.spriteFrame == 1){
                this.sprite = playerSpriteL2;
            }
        }else if(this.lookR && !this.lookL){
            if(this.spriteFrame == 0){
                this.sprite = playerSpriteR1;
            }else if(this.spriteFrame == 1){
                this.sprite = playerSpriteR2;
            }
        }
        this.spriteFrame++
        if(this.spriteFrame == 2){
            this.spriteFrame = 0;
        }
    }
    behaviour(){
        if(this.hp <= 0){
            gameOver();
        }
    }
}
//enemys
class Cultist{
    constructor(){
        this.width = 50;
        this.height = 100;
        this.x = Math.random()*(canvas.width - this.width);
        this.y = canvas.height - 50 - this.height;
        this.oldX = (canvas.width - this.widht);
        this.oldY = 0;
        this.worldX = 0;
        this.worldY = 0;
        this.dx = 0;
        this.dy = 0;
        //stats
        this.hp = 4;
        //states
        this.airborne = true;
        this.lookL = false;
        this.lookR = false;
        //other
        this.spriteFrame = 0;
        this.sprite = cultistSpriteI1;
        this.attacking = false;
        this.type = "enemy";
        this.level = level;
        this.damageMod = 0;
    }
    draw(){
        ctx.drawImage(this.sprite,this.x,this.y,this.width,this.height);
    }
    behaviour(){
        let x = this;
        //do stuff (possibly already in the update function)
        //if player is to the left, fireball left, if player is to the right, fireball right
        if(player.x > this.x + this.width && !this.attacking){
            //fireball right
            this.attacking = true;
            let fball = new FireballR(this);
            projectileArr.push(fball);
            //do another setTimeout() for 5 seconds to make the fireball disappear
            setTimeout(function(){
                projectileArr.shift();
            },500);
            setTimeout(function(){
                //cooldown
                x.attacking = false;
            },1000);
        }else if(player.x + player.width < this.x && !this.attacking){
            //fireball left
            let fball = new FireballL(this);
            projectileArr.push(fball);
            this.attacking = true;
            //do another setTimeout() for 5 seconds to make the fireball disappear
            setTimeout(function(){
                projectileArr.shift();
            },500);
            setTimeout(function(){
                //cooldown
                x.attacking = false;
            },1000);
        }
    }
    update(){
        if(this.level != level){
            this.level = level;
            this.hp = this.level * 5;
        }
        if(player.x + player.width + 150 < this.x){
            this.lookL = true;
            this.lookR = false;
            this.dx -= 1;
            this.x += this.dx;
        }else if(player.x - 150 > this.x + this.width){
            this.lookL = false;
            this.lookR = true;
            this.dx += 1;
            this.x += this.dx;
        }else{
            this.lookL = false;
            this.lookR = false;
            this.x += this.dx;
        }
        this.y += this.dy;
        if(this.x < 0){
            this.x = 0
        }
        if(this.x + this.width > canvas.width){
            this.x = canvas.width - this.width;
        }
        this.draw()
    }
    updateSprite(){
        if((!this.lookL && !this.lookR) || (this.lookL && this.lookR)){
            if(this.spriteFrame == 0){
                this.sprite = cultistSpriteI2;
            }else if(this.spriteFrame == 1){
                this.sprite = cultistSpriteI1;
            }
        }else if(this.lookL && !this.lookR){
            if(this.spriteFrame == 0){
                this.sprite = cultistSpriteL2;
            }else if(this.spriteFrame == 1){
                this.sprite = cultistSpriteL1;
            }
        }else if(this.lookR && !this.lookL){
            if(this.spriteFrame == 0){
                this.sprite = cultistSpriteR2;
            }else if(this.spriteFrame == 1){
                this.sprite = cultistSpriteR1;
            }
        }
        this.spriteFrame++
        if(this.spriteFrame == 2){
            this.spriteFrame = 0;
        }
    }
}

class Slime{
    constructor(){
        this.width = 50;
        this.height = 50;
        this.x = 0;
        this.y = 0;
        this.oldX = 0;
        this.oldY = 0;
        this.worldX = 0;
        this.worldY = 0;
        this.dx = 0;
        this.dy = 0;
        //stats
        this.hp = 2;
        //states
        this.airborne = true;
        this.jumping = false;
        this.lookL = false;
        this.lookR = false;
        //other
        this.type = "enemy";
        this.spriteFrame = 0;
        this.sprite;
        this.attacking = false;
    }
    behaviour(){
        let x = this;
        if(player.x + player.width < this.x && !this.jumping){
            this.jumping = true;
            this.lookL = true;
        }else if(player.x > this.x + this.width && !this.jumping){
            this.jumping = true;
            this.lookR = true;
        }
        setTimeout(function(){
            x.jumping = false;
        },2000);
    }
    draw(){
        ctx.drawImage(this.sprite,this.x,this.y,this.width,this.height);
    }
    update(){
        this.behaviour();
        if(player.x + player.width < this.x){
            this.lookL = true;
        }else if(player.x > this.x + this.width){
            this.lookR = true;
        }
        this.x += this.dx;
        this.y += this.dy;
    }
    updateSprite(){
        if((!this.lookL && !this.lookR) || (this.lookL && this.lookR)){
            if(this.spriteFrame == 0){
                this.sprite = cultistSpriteI2;
            }else if(this.spriteFrame == 1){
                this.sprite = cultistSpriteI1;
            }
        }else if(this.lookL && !this.lookR){
            if(this.spriteFrame == 0){
                this.sprite = cultistSpriteL2;
            }else if(this.spriteFrame == 1){
                this.sprite = cultistSpriteL1;
            }
        }else if(this.lookR && !this.lookL){
            if(this.spriteFrame == 0){
                this.sprite = cultistSpriteR2;
            }else if(this.spriteFrame == 1){
                this.sprite = cultistSpriteR1;
            }
        }
        this.spriteFrame++
        if(this.spriteFrame == 2){
            this.spriteFrame = 0;
        }
    }
}
//fireball
class FireballR{
    constructor(target){
        this.width = 40;
        this.height = 20;
        this.x = target.x + target.width;
        this.y = target.y + (target.height/4);
        this.sprite = fireballR;
        this.dx = 6;
        this.dy = (Math.random()*fireball.spread) - (fireball.spread/2);
        this.caster = target.type;
        //stats
        this.damage = fireball.damage + target.damageMod;
    }
    draw(){
        ctx.drawImage(this.sprite,this.x,this.y,this.width,this.height);
    }

    update(){
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
    behaviour(){

    }
}

class FireballL{
    constructor(target){
        this.width = 40;
        this.height = 20;
        this.x = target.x - this.width;
        this.y = target.y + (target.height/4);
        this.sprite = fireballL;
        this.dx = 6;
        this.dy = (Math.random()*fireball.spread) - (fireball.spread/2);
        this.damage = fireball.damage + target.damageMod;
        this.caster = target.type;
    }
    draw(){
        ctx.drawImage(this.sprite,this.x,this.y,this.width,this.height);
    }
    update(){
        this.x -= this.dx;
        this.y += this.dy;
        this.draw();
    }
    behaviour(){

    }
}