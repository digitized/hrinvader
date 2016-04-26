var Mic = function(image, height, width){
  EntityImage.call(this, image, window.player.posX, 120, height, width);
  this.active = true;
}
Mic.prototype = Object.create(EntityImage.prototype);
Mic.prototype.constructor = Mic;
Mic.prototype.draw = function(){
  window.ctx.drawImage(this.image, 0, 0, 250, 305, this.posX, this.posY, 20, 10);
}
Mic.prototype.move = function(){
  this.posY -= 1;
}
Mic.prototype.checkClear = function(){
  if( this.posY < 0 ){
    return true;
  } else {
    return false;
  }
}