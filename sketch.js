const width = 640;
const height = 360;

class Mover {
  constructor() {
    this.mass = 1;
    this.position = createVector(width / 2, 30);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  addVelocity(force) {
    this.velocity.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(255, 127);
    ellipse(this.position.x, this.position.y, 48, 48);
  }

  checkEdges() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.velocity.x *= -1;
      this.position.x = 0;
    }
    if (this.position.y > height) {
      this.velocity.y *= -1;
      this.position.y = height;
    }
  }
}

let moverA;
let moverB;

function setup() {
  createCanvas(640, 360);
  moverA = new Mover();
  moverB = new Mover();  


  let horizon_velocity = createVector(1,0);
  moverB.addVelocity(horizon_velocity);
}

function draw() {
  background(51);

  let gravity = createVector(0, 0.1);
  moverA.applyForce(gravity);
  moverB.applyForce(gravity);


  moverA.update();
  moverB.update();
  moverA.display();
  moverB.display();
  moverA.checkEdges();
  moverB.checkEdges();
}