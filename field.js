class Field {
  constructor() {
    this.groundLevel = (height * 4 / 5);
    this.post = 10;
    this.angle = -10;
    this.frontPos = createVector(width - 100, height * 2 / 5);
    this.crossbarPos = createVector(width - 100 + this.post, height * 2 / 5);
    this.backCurvePos = createVector(width -60 + this.post, height * 2 / 5);
    this.topBarPos = createVector(width - 100 + this.post, height * 2 / 5 - this.post);
  }

  ground() {
    noStroke();
    fill(31, 13, 0);
    rect(0, this.groundLevel, width, height / 5);
    fill(0, 158, 37);
    rect(0, this.groundLevel, width, 3);

    return this.groundLevel;
  }

  goal() {
    fill(230);

    //Front
    rect(this.frontPos.x, this.frontPos.y, this.post, height * 2 / 5);

    //Top
    rect(this.topBarPos.x, this.topBarPos.y, 40, this.post);

    //Back
    push();
    translate(width - 60 + this.post, height * 2 / 5);
    rotate(this.angle);
    rect(0, 0, this.post, height * 3 / 5);
    pop();

    //Back Curve
    arc(this.backCurvePos.x, this.backCurvePos.y, this.post * 2, this.post * 2, 270, this.angle + 5);

    //Crossbar
    arc(this.crossbarPos.x, this.crossbarPos.y, this.post * 2, this.post * 2, 90, 270);

    //Net
    push();
    for (let i = 0; i <= height * 2 / 5 / this.post; i++) {
      stroke(230);
      line(width - 100 + this.post, height * 2 / 5 + i * this.post, width - 60 + this.post + (this.post * i * sin(abs(this.angle))), height * 2 / 5 + i * this.post);
    }
    for (let i = 0; i < (40 + (height * 2 / 5) * sin(abs(this.angle))) / this.post; i++) {
      stroke(230);
      if (i <= 40 / this.post) {
        line(width - 100 + this.post + i * this.post, height * 2 / 5, width - 100 + this.post + i * this.post, height * 4 / 5);
      } else {
        line(width - 100 + this.post + i * this.post, height * 2 / 5 + i * this.post, width - 100 + this.post + i * this.post, height * 4 / 5);
      }
    }
    pop();

    return this.post;
  }
}