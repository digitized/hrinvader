var Entity = function(posx, posy, height, width){
  this.posX = posx;
  this.posY = posy;
  this.height = height;
  this.width = width;
}

Entity.prototype.draw = function(ctx){
  ctx.beginPath();
  ctx.rect(this.posX, this.posY, this.width, this.height);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}
Entity.prototype.setPosition = function(x, y){
  this.posX = x;
  this.posY = y;
}
Entity.prototype.setHeight = function(height){
  this.height = height;
}
Entity.prototype.setWidth = function(width){
  this.width = width;
}
