var circles = [];
var img;
var start = false;
var end = false;
var a = 0;

function preload() {
  img = loadImage("mola.jpg")
}

function setup() {
  createCanvas(450, 450);
  image(img, 0, 0);
  background(255);
  circles[0] = new Circle(0, 0, 450, 450);
  ellipseMode(CORNER);
}

function draw() {
  startScreen();
  if (start === true) {
    playCircles();
  }
  endPicture();
  if (a % 2 === 1) {
    background(img, 0, 0);
  }
}

//makes start screen before circles start
function startScreen() {
  background(255);
  textSize(50);
  text("Click to start", 100, 200);
  textSize(20);
  text("Press any key to reveal image.", 105, 250);
  if (mouseIsPressed) {
    start = true;
  }
}

function endPicture() {
  if (keyIsPressed) {
    a++;
  }
}

function playCircles() {
  background(255);
  for (var i = 0; i < circles.length; i++) {
    circles[i].display();
    circles[i].divide();
  }
  console.log("There are " + circleNum() + " circles.");
}

//adds three circles when one is divided
function addCircles(x, y, circw, circh) {
  circles.push(new Circle(x + circw, y, circw, circh));
  circles.push(new Circle(x, y + circh, circw, circh));
  circles.push(new Circle(x + circw, y + circh, circw, circh));
}

//creates new circle objects 
function Circle(x, y, circw, circh) {
  this.x = x;
  this.y = y;
  this.circleWidth = circw;
  this.circleHeight = circh;
  this.c = img.get(x + circw / 2, y + circh / 2);
  this.display = function() {
    noStroke();
    fill(this.c);
    ellipse(this.x, this.y, this.circleWidth, this.circleHeight);
  };
  //divides circle and adds three if mouse is over circle
  this.divide = function() {
    if (mouseX > this.x && mouseX < this.x + this.circleWidth && mouseY > this.y && mouseY < this.y + this.circleHeight && this.circleWidth > 7) {
      fill(this.c);
      noStroke();
      this.circleWidth /= 2;
      this.circleHeight /= 2;
      addCircles(this.x, this.y, this.circleWidth, this.circleHeight);
    }
  };
}

function circleNum() {
  return circles.length;
}