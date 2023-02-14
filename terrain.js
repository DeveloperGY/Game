var map;
function terraCollision(){
    
}
function terraGen(){
    for(let i=0;i<12;i++){
        for(let j=0;j<12;j++){
            let x = (j * 50) + 1;
            let y = (i * 50) + 1;
            let terraType = map[i][j];
            if(terraType == 1){
                ctx.drawImage(grass,x,y,50,50)
            }else if(terraType == 2){
                ctx.drawImage(cobblestone,x,y,50,50);
            }
        }
    }
}
function terraAreaGen(wldX,wldY){
    let worldX = wldX;
    let worldY = wldY;
    if(worldX == 0 && worldY == 0){
        map = [
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0],
            [1,2,2,2,1,2,1,1,2,2,1,1]
        ];
    }
}