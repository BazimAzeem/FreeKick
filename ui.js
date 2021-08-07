class UI {
  constructor() {

  }

  powerBar(power) {
    push();
    stroke(255);
    strokeWeight(0.5);
    fill(40);
    rect(20, 20, width / 2, 10);

    var bar = map(power, 0, maxPower, 0, width / 2);
    fill(255);
    rect(20, 20, bar, 10);
    pop();
  }

  anglePicker() {
    angle = map(mouseY, height, 0, 0, -90);
  }

  angleLine() {
    push();
    translate(ball.pos.x, ball.pos.y)
    if (angle <= 0 && angle >= -90) {
      rotate(angle);
    }
    stroke(255);
    strokeWeight(2);
    line(0, 0, 75, 0);
    pop();
  }
}