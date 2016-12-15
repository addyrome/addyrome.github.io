var sharkData;
var items = {};
var itemsShort = {};
var wordCloud = [];
var sharkHead;
var sharkTail;
var sharkFin;
var underwaterBackground;

function preload() {
  sharkData = loadTable("sharkattacks.csv", "csv", "header");
}

function setup() {
  createCanvas(1000, 600);
  activityList();
  shortenActivities();
  sharkHead = loadImage("sharkhead.png");
  sharkTail = loadImage("sharktail.png");
  sharkFin = loadImage("sharkfin.png");
  underwaterBackground = loadImage("background.jpg");
  
  for (var property in itemsShort) {
    if (wordCloud.length < 50) {
      wordCloud.push(new Word(property, itemsShort[property]));
    }
  }
}

function draw() {
  background(underwaterBackground, 0, 0);
  
  for (var i = 0; i < wordCloud.length; i++) {
    wordCloud[i].display();
    wordCloud[i].move();
    wordCloud[i].screen();
  }
}

function activityList() {
  for (var i = 0; i < sharkData.getRowCount(); i++) {
    var s = sharkData.getString(i, 7);
    s = s.toLowerCase();
    s = s.trim();
    if (s === "") {
      continue;
    }
    if (items.hasOwnProperty(s)) {
      items[s]++;
    } else {
      items[s] = 1;
    }
  }
}

function shortenActivities() {
  for (var property in items) {
    if (items[property] > 5) {
      itemsShort[property] = items[property];
    }
  }
}

function Word(word, size) {
  this.word = word;
  this.size = map(size, 5, 907, 12, 70);
  this.y = random(100, 500);
  this.x = random(0, 1000);
  this.display = function() {
    textSize(this.size);
    text(this.word, this.x, this.y);
    fill(35, 45, 55);
    var textW = textWidth(this.word);
    image(sharkHead, this.x + textW, this.y - this.size / 1.5, this.size, this.size);
    image(sharkTail, this.x - this.size, this.y - this.size, this.size, this.size);
    image(sharkFin, this.x + textW / 2.5, this.y - this.size * 1.75, this.size, this.size);
  }
  this.move = function() {
    this.x++;
    this.y = height/3 * cos(this.x / 20) + height/2;
  }
  this.screen = function() {
    var textW = textWidth(this.word);
    if (this.x > 1000 + this.size) {
      this.x = -textW - this.size;
    }
  }
}