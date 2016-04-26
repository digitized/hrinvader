

var Game = function(){
  this.gameloop = null;
  this.drawInterval = 10;
}

Game.prototype.init = function(){
  // Set Images for Entities
  window.lectureImage = document.getElementById('lecturer1');
  window.studentImage = document.getElementById('enemy');
  window.micImage = document.getElementById('mic');
  // Create Player
  window.player = new Lecturer(window.lectureImage, 0, 500, 50, 50);
  //Instantiate Enemies
  for( var row=0;row<3;row++){
    var enemyRow = [];
    for( var col=0;col<3;col++){
      var x = col * 60 + 10;
      enemyRow.push(new Student(window.studentImage, col*60, row*30, 50, 50));  
    }
    window.enemies.push(enemyRow);
  };
  // Start Game Loop
  this.start();
}
Game.prototype.start = function(){
  this.gameloop = setInterval(this.render, this.drawInterval);
}
Game.prototype.stop = function(){
  clearInterval(this.gameloop);
}

Game.prototype.collision = function(){
  window.mics.forEach(function(mic, micIndex){
    var micTop = mic.posY;
    var micBottom = mic.posY + 5;
    var micLeft = mic.posX;
    var micRight = mic.posX + 5;
    // console.log('mic:'+micTop);

    window.enemies.forEach(function(enemyRow, eRowIndex){
      enemyRow.forEach(function(enemy, eIndex){
        var enemyTop = enemy.posY;
        var enemyBottom = enemy.posY + 10;
        var enemyLeft = enemy.posX;
        var enemyRight = enemy.posX + 10;

        if( ((micTop >= enemyTop) && (micTop <= enemyBottom)) || (micBottom <= enemyBottom && micBottom >= enemyTop)){
          if( (micLeft >= enemyLeft && micLeft <= enemyRight) || (micRight >= enemyLeft && micRight <= enemyRight)){
            //Hit
            if( enemy.active && mic.active ){
              mic.active = false;
              window.mics.splice(micIndex, 1);
              enemy.hp -= 1;
              if( enemy.hp <= 0 ){
                enemy.active = false;
              }
            }
          }
        }
      });
    });
  });  
}

Game.prototype.render = function(){

  window.ctx.clearRect(0, 0, window.canvasWidth, window.canvasHeight);

  //Check collision
  this.game.collision();
  
  // Handles Enemy Render and Change Directions
  window.enemies.forEach(function(enemyRow){
    enemyRow.forEach(function(enemy){
      if ( enemyRow[0].posX <= 0 && enemyRow[0].direction === -1){
        enemy.changeDirection();
        enemy.moveDown();
      } else if ( enemyRow[enemyRow.length-1].posX >= 280 && enemyRow[enemyRow.length-1].direction === 1){
        enemy.changeDirection();
        enemy.moveDown();
      }
      enemy.move();
      if( enemy.active )
        enemy.draw(window.ctx);
    });
  });
  // Render Mics
  window.mics.forEach(function(mic, index){
    mic.move();
    if ( mic.checkClear() ){
      window.mics.splice(index, 1);
    }
    if( mic.active )
      mic.draw();
  });

  // Render Player
  window.player.draw();
}

