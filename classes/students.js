var Student = function(image, posx, posy, height, width){
  EntityImage.call(this, image, posx, posy, height, width);
  this.direction = 1;
  this.speed = 2;
  this.active = true;
  this.hp = 3;
}
Student.prototype = Object.create(EntityImage.prototype);
Student.prototype.constructor = Student;
Student.prototype.changeDirection = function() {
  this.direction *= -1;
}
Student.prototype.move = function(){
  this.posX += this.speed * this.direction;
}

Student.prototype.moveDown = function(){
  this.posY += 10;
}

Student.prototype.draw = function(){
  window.ctx.drawImage(this.image, 0, 0, 490, 596, this.posX, this.posY, this.width, this.height);
}

