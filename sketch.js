// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html

// Steve's Makerspace added color, put some variables at the top, added click on canvas to pause, and added hit "s" to print canvas to jpg.  Play with variables below, lines 7 - 15.
// https://youtu.be/CSMcrKouQ3o

var colorInc = 1.0;  // Color change speed
var sat = 100; // saturation max 100
var brt = 100; // brightness max 100
var alph = 10; // alpha max 100
var numbPart = 300; // number of particles
var partStroke = 1; // line width
var angMult = 25; // 0.1 = straighter lines; 25+ = sharp curves
var angTurn = 1; // adjust angle for straight lines (after adjusting angMult)
var zOffInc = 0.0003; // speed of vector changes
var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;
var hu = 0;
var p = 1;

function setup() {
  createCanvas(windowWidth-20, windowHeight-20);
  colorMode(HSB,359,50,50,50);

  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < numbPart; i++) {
    particles[i] = new Particle();
  }
  background(10);
}

function draw() {
  if (p>0){
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff)*angMult+angTurn;  
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      // stroke(100, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;

    zoff += zOffInc;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  // fr.html(floor(frameRate()));
  hu += colorInc; if (hu >359){hu=0}
}
}
function mousePressed(){
  p=p*-1;
}
