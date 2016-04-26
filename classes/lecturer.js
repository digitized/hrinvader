var Lecturer = function(image, posx, posy, height, width){
  EntityImage.call(this, image, posx, posy, height, width);
  this.posY = 130;
  this.posX = 150;
}
Lecturer.prototype = Object.create(EntityImage.prototype);
Lecturer.prototype.constructor = Lecturer;
Lecturer.prototype.moveLeft = function(){
  if( this.posX > 0 )
    this.posX -= 2;
}
Lecturer.prototype.moveRight = function(){
  if( this.posX < window.canvasWidth )
    this.posX += 2;
}
Lecturer.prototype.throwMic = function(){
  window.mics.push(new Mic(window.micImage, 50, 50));
}

Lecturer.prototype.draw = function(){
  window.ctx.drawImage(this.image, 0, 0, 250, 305, this.posX, this.posY, 20, 10);
}