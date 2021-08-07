var field;
var ball;
var wall;

var groundLevel;
var post;

var power = 0;
var maxPower = 40;
var angle;

var anglePicked;
var powerPicked;

var score = -1;

function setup() {
  createCanvas(1400, 400);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  angleMode(DEGREES);

  field = new Field();
  groundLevel = field.ground();
  post = field.goal();

  ball = new Ball();

  wall = new Wall();

  ui = new UI();

  anglePicked = false;
  powerPicked = false;

  score++;
}

function draw() {
  background(40);

  if (!powerPicked) {
    ui.angleLine();
    ui.powerBar(power);
    if (!anglePicked) {
      ui.anglePicker();
    }
  }

  ball.show();
  ball.move();

  wall.show();

  field.goal();
  groundLevel = field.ground();

  if (key === ' ' && power <= maxPower && anglePicked) {
    power += 0.3;
  }

  scoreBoard();

  if (powerPicked) {
    endGame();
  }
}

function keyPressed() {
  if (keyCode === ENTER && endGame()) {
    score = -1;
    setup();
  }
}

function keyReleased() {
  if (key === ' ' && !powerPicked && anglePicked) {
    let powerX = power * cos(-angle);
    let powerY = power * sin(-angle);

    ball.kick(powerX, -powerY);
    key = '.';
    power = 0;
    powerPicked = true;
    
    anglePicked = false;
  }
}

function mouseReleased() {
  anglePicked = true;
}

function endGame() {
  let goalLine = field.frontPos.x + post;

  if (ball.pos.x > goalLine && ball.pos.y > field.frontPos.y && ball.pos.x < field.topBarPos.x + width / 20) {
    setup();
  } else if ((!(ball.pos.x > goalLine && ball.pos.y > field.frontPos.y && ball.pos.x < field.topBarPos.x + width / 20 + tan(-field.angle) * (groundLevel - field.frontPos.y)) && ball.vel.x == 0) || ball.pos.x > width || ball.pos.x < 0) {

    push()
    textAlign(CENTER, CENTER);
    background(40);

    textSize(20);
    fill(255)
    text('Your score was ' + score, width / 2, height / 2 + 70);
    text('Hit [ ENTER ] to restart', width / 2, height / 2 + 100);

    textSize(75);
    fill(255, 0, 0)
    text('GAME OVER', width / 2, height / 2 - 20);
    pop();

    return true;
  }

  return false;
}

function scoreBoard() {
  push();
  stroke(255);
  fill(255);
  textSize(20);
  text('Score: ' + score, width - 90, 25);
  textAlign(CENTER, CENTER);
  pop();
}
