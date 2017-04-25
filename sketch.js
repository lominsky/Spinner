var button;
var input;
var radius;
var label;
var names;
var isGenerated = false;
var spinnerAngle;
var spinnerSpeed = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  radius = height/2 - 20;

  label = createP('Enter Names:');
  label.position(25, 25);

  input = createInput('');
  input.position(25, 60);

  button = createButton('Generate');
  button.position(25, 85);
  button.mousePressed(generate);

  spinnerAngle = random(0, 360);

  noStroke();
}

function draw() {
  if(isGenerated) {
    background(255);
    drawCircle();
    drawSpinner();
  }
}

function generate() {
  var n = input.value().split(", ");
  if(n.length > 2) {
    if(n.length%2 == 1) {
      n.push("Everyone");
    }
    names = n;
    isGenerated = true;
    drawCircle();
    drawSpinner();
  }
}

function drawCircle() {
  var num = names.length;
  ellipse(width/2, height/2, radius*2, radius*2);
  //Draw Segments
  for(var i = 0; i < num; i++) {
    if(i%2 == 0)
      fill(200, 0, 0);
    else
      fill(0, 0, 0);
    var rad1 = radians(360*i/num);
    var rad2 = radians(360*(i+1)/num);
    arc(width/2, height/2, radius*2, radius*2, rad1, rad2);
  }

  //Write Names
  textAlign(CENTER);
  textSize(32);
  for(var i = 0; i < num; i++) {
    var rad3 = radians((360*(i+1)/num + 360*i/num)/2);
    push();
    var transX = width/2 + (radius*2/3) * cos(rad3);
    var transY = height/2 + (radius*2/3) * sin(rad3);
    translate(transX, transY);
    rotate(rad3);
    fill(255);
    text(names[i], 0,  0);
    pop();
  }
}

function drawSpinner() {
  push();
  fill(255, 255, 0);
  translate(width/2, height/2);
  rotate(radians(spinnerAngle));
  beginShape();
  vertex(15, -25);
  vertex(-15, -25);
  vertex(0, 200);
  vertex(0, 200);
  endShape(CLOSE);
  fill(100);
  ellipse(0, 0, radius/25, radius/25);
  pop();
  var distance = sqrt(sq(mouseX - width/2) + sq(mouseY - height/2))
  if(mouseIsPressed && distance < radius) {
    if(isGenerated)
      if(spinnerSpeed == 0)
        spinnerSpeed = floor(random(10, 16));
  } else {
    if(spinnerSpeed > 0)
      spinnerSpeed -= .05;
    else
      spinnerSpeed = 0;
  }
  spinnerAngle += spinnerSpeed; 
}