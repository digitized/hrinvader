var Student = function(image, posx, posy, height, width){
  EntityImage.call(this, image, posx, posy, height, width);
  this.direction = 1;
  this.speed = 1;
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
  this.posY += 3;
}

Student.prototype.draw = function(){
  window.ctx.drawImage(this.image, 0, 0, 1000, 1050, this.posX, this.posY, 20, 10);
}

