var EntityImage = function(image, posx, posy, height, width){
  Entity.call(this, posx, posy, height, width);
  this.image = image;
}
EntityImage.prototype = Object.create(Entity.prototype);
EntityImage.prototype.constructor = EntityImage;
EntityImage.prototype.draw = function(){
  window.ctx.drawImage(this.image, 0, 0, 100, 100, this.posX, this.posY);
  console.log(this);
}