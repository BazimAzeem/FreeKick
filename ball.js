class Ball {
  constructor() {
    this.diameter = 30;
    this.pos = createVector(random(100, field.frontPos.x - 400), groundLevel - this.diameter / 2);
    this.vel = createVector(0, 0);
    this.g = 0.6;
    this.ar = 0.993;
    this.eff = 0.8;
  }

  show() {
    fill(0, 200, 200);
    ellipse(this.pos.x, this.pos.y, this.diameter, this.diameter);
  }

  kick(xvel, yvel) {
    this.vel.x = xvel;
    this.vel.y = yvel;
  }

  move() {
    //Velocity
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    //Acceleration
    if (this.pos.y < groundLevel - this.diameter / 2) {
      this.vel.y += this.g;
    }
    if (abs(this.vel.x) > 0) {
      this.vel.x *= this.ar;
    }
    if (abs(this.vel.x) < 0.05) {
      this.vel.x = 0;
    }

    //Bounce
    if (this.pos.y >= groundLevel - this.diameter / 2 && this.vel.y > 0) {
      this.vel.y *= -1 * this.eff;

      if (abs(this.vel.y) < 0.5) {
        this.vel.y = 0;
      }
    }

    this.circBounce(this.diameter, wall.diameter, wall.headPos, 0, 360);
    this.circBounce(this.diameter, wall.diameter, wall.topPos, 180, 360);
    this.circBounce(post * 2, post * 2, field.crossbarPos, 90, 270);
    this.circBounce(post * 2, post * 2, field.backCurvePos, 270, field.angle + 5);

    this.rectBounce(wall.rectPos, wall.diameter, groundLevel - wall.rectPos.y, 0);
    this.rectBounce(field.topBarPos, 40, post, 1);

    this.slantBounce(field.backCurvePos, field.angle)
  }

  circBounce(ballD, objectD, object, startA, endA) {
    if (dist(this.pos.x, this.pos.y, object.x, object.y) <= (objectD + ballD) / 2) {

      //Ball Angle
      var ballA = atan(this.vel.y / this.vel.x);

      if (this.vel.y <= 0 && this.vel.x <= 0) {
        ballA += 180;
      } else if (this.vel.y >= 0 && this.vel.x <= 0) {
        ballA += 180;
      } else if (this.vel.y <= 0 && this.vel.x >= 0) {
        ballA += 360;
      }

      //Impact Angle
      var distX = object.x - this.pos.x;
      var distY = object.y - this.pos.y;
      var impactA = atan(distY / distX);

      if (distY <= 0 && distX <= 0) {
        impactA += 180;
      } else if (distY >= 0 && distX <= 0) {
        impactA += 180;
      } else if (distY <= 0 && distX >= 0) {
        impactA += 360;
      }

      //Collision
      var objectA = impactA + 180;
      if (objectA > 360) {
        objectA -= 360;
      }

      if (startA <= objectA && endA >= objectA) {
        let velocity = sqrt(pow(this.vel.x, 2) + pow(this.vel.y, 2)) * this.eff;
        let newBallA = 90 - 2 * impactA + ballA;

        this.vel.x = sin(-newBallA) * velocity;
        this.vel.y = cos(-newBallA) * velocity;

        while (dist(this.pos.x, this.pos.y, object.x, object.y) <= (objectD + ballD) / 2) {
          this.pos.x += this.vel.x;
          this.pos.y += this.vel.y;
        }
      }
    }
  }

  rectBounce(object, w, h, status) {
    var r = this.diameter / 2;

    if (status == 0 && this.pos.y > object.y && this.pos.y < object.y + h) {
      if (this.pos.x + r > object.x && this.pos.x - r < object.x + w) {
        this.vel.x *= -1 * this.eff;
      }
    } else if (status == 1 && this.pos.x > object.x && this.pos.x < object.x + w) {
      if (this.pos.y + r > object.y && this.pos.y - r < object.y) {
        this.vel.y *= -1 * this.eff;
      }
    }

    while (this.pos.x + r > object.x && this.pos.x - r < object.x + w && this.pos.y + r > object.y && this.pos.y - r < object.y) {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    }
  }

  slantBounce(object, angle) {
    let collide = false;

    collide = collideLineCircle(object.x, object.y, object.x + tan(-angle) * (groundLevel - object.y), groundLevel, this.pos.x, this.pos.y, this.diameter);

    if (collide) {
      this.vel.x = 0;
    }
  }
}