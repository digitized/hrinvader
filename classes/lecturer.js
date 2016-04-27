var Lecturer = function(image, posx, posy, height, width){
  EntityImage.call(this, image, posx, posy, height, width);
  this.speed = 20;
}
Lecturer.prototype = Object.create(EntityImage.prototype);
Lecturer.prototype.constructor = Lecturer;
Lecturer.prototype.moveLeft = function(){
  if( this.posX > 0 )
    this.posX -= this.speed;
}
Lecturer.prototype.moveRight = function(){
  if( this.posX < window.canvas.width )
    this.posX += this.speed;
}
Lecturer.prototype.throwMic = function(){
  window.mics.push(new Mic(window.micImage, 45, 45));
}

Lecturer.prototype.draw = function(){
  window.ctx.drawImage(this.image, 0, 0, 300, 500, this.posX, this.posY, this.height, this.width);
}