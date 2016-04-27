var Mic = function(image, height, width){
  EntityImage.call(this, image, window.player.posX+window.player.width/4, window.player.posY, height, width);
  this.active = true;
}
Mic.prototype = Object.create(EntityImage.prototype);
Mic.prototype.constructor = Mic;
Mic.prototype.draw = function(){
  window.ctx.drawImage(this.image, 0, 0, 300, 316, this.posX, this.posY, this.height, this.width);
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