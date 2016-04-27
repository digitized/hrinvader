var Game = function(){
  this.gameloop = null;
  this.drawInterval = 10;
}

Game.prototype.init = function(){
  window.enemyCount = 0;
  window.score = 0;
  // Set Canvas Size
  window.canvas.height = 500;
  window.canvas.width = 1000;
  // Set Images for Entities
  window.lectureImage = document.getElementById('lecturer1');
  window.studentImage = document.getElementById('enemy');
  window.micImage = document.getElementById('mic');
  // Create Player
  window.player = new Lecturer(window.lectureImage, window.canvas.width/2, window.canvas.height-100, 70, 100);
  //Instantiate Enemies
  for( var row=0;row<3;row++){
    var enemyRow = [];
    for( var col=0;col<9;col++){
      enemyRow.push(new Student(window.studentImage, col*80, row*80, 45, 45));  
      window.enemyCount++;
    }
    window.enemies.push(enemyRow);
  };
  // Set score and enemyCount
  $('.score').text('Score: '+window.score);
  $('.remain').text('Enemies Left: '+window.enemyCount);

  // Start Game Loop
  this.start();
}
Game.prototype.start = function(){
  this.gameloop = setInterval(this.render, this.drawInterval);
}
Game.prototype.stop = function(){
  clearInterval(this.gameloop);
}

Game.prototype.checkWin = function(){
  if ( window.enemyCount === 0 ){
    window.game.stop();  
    window.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    window.location = 'win.html';
  }
}

Game.prototype.checkLoss = function(){
  window.enemies.forEach(function(enemyRow, eRowIndex){
    enemyRow.forEach(function(enemy, eIndex){
      var enemyBottom = enemy.posY + enemy.height;
      
      if( enemyBottom >= window.canvas.height-enemy.height && enemy.active ){
        window.game.stop();  
        window.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        window.location = 'gameover.html';
      }
    });
  }); 
}

Game.prototype.collision = function(){
  window.mics.forEach(function(mic, micIndex){
    var micTop = mic.posY;
    var micBottom = mic.posY + mic.height;
    var micLeft = mic.posX;
    var micRight = mic.posX + mic.width;

    window.enemies.forEach(function(enemyRow, eRowIndex){
      enemyRow.forEach(function(enemy, eIndex){
        var enemyTop = enemy.posY;
        var enemyBottom = enemy.posY + enemy.height;
        var enemyLeft = enemy.posX;
        var enemyRight = enemy.posX + enemy.width;

        if( ((micTop >= enemyTop) && (micTop <= enemyBottom)) || (micBottom <= enemyBottom && micBottom >= enemyTop)){
          if( (micLeft >= enemyLeft && micLeft <= enemyRight) || (micRight >= enemyLeft && micRight <= enemyRight)){
            //Hit
            if( enemy.active && mic.active ){
              mic.active = false;
              window.mics.splice(micIndex, 1);
              enemy.hp -= 1;
              if( enemy.hp <= 0 ){
                enemy.active = false;
                window.enemyCount -= 1;
                window.score += 1;
                $('.score').text('Score: '+window.score);
                $('.remain').text('Enemies Left: '+window.enemyCount);
              }
            }
          }
        }
      });
    });
  });  
}

Game.prototype.render = function(){

  window.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  //Check collision
  this.game.collision();
  //Check if enemies reach the bottom
  this.game.checkLoss();
  this.game.checkWin();
  
  // Handles Enemy Render and Change Directions
  window.enemies.forEach(function(enemyRow){
    enemyRow.forEach(function(enemy){

      if ( enemyRow[0].posX <= 0 && enemyRow[0].direction === -1){
        enemy.changeDirection();
        enemy.moveDown();
        enemy.move();
      } else if ( enemyRow[enemyRow.length-1].posX >= (window.canvas.width-enemy.width/2) && enemyRow[enemyRow.length-1].direction === 1){
        enemy.changeDirection();
        enemy.moveDown();
        enemy.move();
      } else {
        enemy.move();
      }

      
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

