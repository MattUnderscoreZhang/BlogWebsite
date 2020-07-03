var itick = 0; // simulation time
var paused = true; // simulation run/pause status

var bot;
var trail;
var pellets = [];

const NSTEPS = 2000;

var controllerNames = [
  "aggressive",
  "fsm1",
  "fsm2",
  "fsm3",
  "spiral",
  "wander"
];

function setupPellets() {
  function addGreen(x, y) {
    pellets.push(new Pellet(x, y, 1000, 1));
  }

  function addClear(x, y) {
    pellets.push(new Pellet(x, y, 0, 5));
  }

  pellets = [];

  // Green (visible) pellets, 16 randomly distributed (4 more will be in center of clusters below)
  for (let i = 0; i < 16; i++) {
    addGreen(random(10, width - 10), random(10, height - 10));
  }

  // Clear (invisible) pellets, in clusters
  let clusters = [
    [70, 70, 30],
    [520, 350, 30],
    [500, 100, 30],
    [100, 300, 30]
  ]; // [xc, yc, rc]
  for (let i = 0; i < clusters.length; i++) {
    let phiOffset = random(TWO_PI);
    let xc = clusters[i][0];
    let yc = clusters[i][1];
    let r = clusters[i][2];
    addGreen(xc, yc); // add green in center
    for (let j = 0; j < 4; j++) {
      let phi = phiOffset + TWO_PI * (j / 4);
      let x = xc + r * cos(phi);
      let y = yc + r * sin(phi);
      addClear(x, y);
    }
  }
}


function simDraw() {
  background(100);
  bot.display();
  trail.display();
  for (let p of pellets) p.display();

  push();
  textSize(14);
  noStroke();
  fill('white');
  textAlign(LEFT);
  text(bot.controllerName, 5, 15);
  textAlign(CENTER);
  text("energy = " + bot.energy, width / 2, 15);
  textAlign(RIGHT);
  text(itick, width - 5, 15);
  pop();

}

function simIsDone() { // return true if done, false otherwise
  return (itick >= NSTEPS);
}

function simReset() { // reset simulation to initial state
  itick = 0;
  paused = true;
  bot.reset();
  trail.reset();
  setupPellets();
}

function simSetup() { // called once at beginning to setup simulation
  createCanvas(600, 400).parent("#canvas");
  bot = new Bot();
  trail = new Trail(NSTEPS, 'orange');
  simReset();
}

function simStep() { // executes a single time step (tick)
  itick++;
  bot.update();
  trail.update(bot.x, bot.y);
}

//==================================
// Nothing below here should change
// unless you add new UI elements
//==================================

function setup() {

  simSetup();

  // controller select
  let controllerMenu = select("#controller");
  for (let i = 0; i < controllerNames.length; i++) {
    controllerMenu.option(controllerNames[i]);
  }
  controllerMenu.changed(function() {
    let cname = select("#controller").value();
    bot.setController(cname);
  });

  select("#b_reset").mouseClicked(function() { // reset button
    simReset();
    paused = true;
    noLoop();
    redraw();
  });

  select("#b_run").mouseClicked(function() { // run-pause button
    paused = !paused;
    if (paused) noLoop();
    else loop();
  });

  select("#b_single").mouseClicked(function() { // single step button
    paused = true;
    noLoop();
    simStep();
    redraw();
  });
  
  select("#b_expt").mouseClicked(runExpt);

  simReset();
}

function draw() {
  if (!paused) {
    simStep();
    if (simIsDone()) {
      paused = true;
      noLoop();
    }
  }

  simDraw();
}