class Wall {
  constructor() {
    this.pos = random(ball.pos.x + 100, field.frontPos.x - 200);
    this.diameter = 30;
    this.headPos = createVector(this.pos, height / 2 - this.diameter);
    this.topPos = createVector(this.pos, height / 2);
    this.rectPos = createVector(this.pos - this.diameter / 2, height / 2);
  }

  show() {
    push();
    stroke(247, 194, 0);
    strokeWeight(this.diameter);
    arc(this.pos, height / 2 - this.diameter, 0, 0, 0, 360);
    line(this.pos, height / 2, this.pos, groundLevel);
    pop();
  } 
}