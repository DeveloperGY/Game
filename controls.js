var ctrlArr = [];
window.addEventListener("keydown",function(e){
    ctrlArr[e.keyCode] = true;
})
window.addEventListener("keyup",function(e){
    ctrlArr[e.keyCode] = false;
})

function controls(){
    if(ctrlArr[65]){
        //go left
        player.dx -= 1.5;
        player.lookL = true;
    }
    if(ctrlArr[68]){
        //go right
        player.dx += 1.5;
        player.lookR = true;
    }
    if(ctrlArr[39] && !player.attacking && !ctrlArr[37] && player.mp >= fireball.mpCost){
        //fireball right
        player.mp -= fireball.mpCost;
        player.attacking = true;
        let fball = new FireballR(player);
        projectileArr.push(fball);
        //do another setTimeout() for 5 seconds to make the fireball disappear
        setTimeout(function(){
            projectileArr.shift();
        },500)
        setTimeout(function(){
            //cooldown
            player.attacking = false;
        },500)
    }
    if(ctrlArr[37] && !player.attacking && !ctrlArr[39] && player.mp >= fireball.mpCost){
        //fireball left
        player.mp -= fireball.mpCost;
        let fball = new FireballL(player);
        projectileArr.push(fball);
        player.attacking = true;
        //do another setTimeout() for 5 seconds to make the fireball disappear
        setTimeout(function(){
            projectileArr.shift();
        },500)
        setTimeout(function(){
            //cooldown
            player.attacking = false;
        },500)
    }
    if(ctrlArr[39] && ctrlArr[37]){
        //switch spell
    }
    if(ctrlArr[32] && !player.airborne){
        player.dy -= 20;
        player.airborne = true;
    }
    //mark for on button up
    if(!ctrlArr[65]){
        player.lookL = false;
    }
    if(!ctrlArr[68]){
        player.lookR = false;
    }
}