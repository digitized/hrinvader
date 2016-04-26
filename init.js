$(document).ready(function(){
  window.enemies = [];
  window.mics = [];
  window.canvasHeight = 500;
  window.canvasWidth = 1000;
  window.player = null;
  window.canvas = document.getElementById('gameCanvas');
  window.ctx = window.canvas.getContext("2d");
  window.game = new Game();
  window.game.init();

  window.addEventListener('keydown', function(e){
    switch( e.keyCode ){
      case 37: 
        console.log(window.ctx.height);
        window.player.moveLeft();
        break;
      case 39: 
        window.player.moveRight();
        break;
      case 32:
        window.player.throwMic();
        break;
    }
  });
  // console.log(game);
});