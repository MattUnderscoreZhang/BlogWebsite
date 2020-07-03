//
//  Braitenberg-style vehicle with FSM support
//

class Bot {

  //======================
  // START OF CONTROLLERS
  //======================

  fsm3(cmd) {
    
    // initialization
    if (cmd === 'init') {
      this.state = 'aggressive';
      this.counter = 0;
      this.spiralCounter = 0;
      return;
    }

    // update
    this[this.state]();
    this.counter++;
    this.spiralCounter++;

    // transition rules
    switch (this.state) {
      case 'aggressive':
        if (this.sns.collision || ((this.sns.left==0) && (this.sns.right==0))) this.transitionTo('spin');
        if (this.sns.deltaEnergy>=5) this.transitionTo('spiral');
        break;
      case 'spiral':
        if (this.sns.collision || this.counter>100) this.transitionTo('aggressive');
      	break;
      case 'spin':
        if (this.counter > 5) this.transitionTo('aggressive');
        break;
    }
  }
  
  fsm2(cmd) {

    // initialization
    if (cmd === 'init') {
      this.state = 'aggressive';
      this.counter = 0;
      this.spiralCounter = 0;
      return;
    }

    // update
    this[this.state]();
    this.counter++;
    this.spiralCounter++;

    // transition rules
    switch (this.state) {
      case 'aggressive':
        if (this.sns.collision) this.transitionTo('spin');
        if ((this.sns.left==0) && (this.sns.right==0)) this.transitionTo('spin');
        if (this.sns.deltaEnergy>=1) this.transitionTo('tightSpiral');
        if (this.sns.deltaEnergy>=5) this.transitionTo('spiral');
        break;
      case 'spiral':
        if (this.spiralCounter>100) this.transitionTo('aggressive');
				break;
      case 'tightSpiral':
        if (this.spiralCounter>30) this.transitionTo('aggressive');
        if (this.sns.deltaEnergy>=5) this.transitionTo('spiral');
        break;
      case 'spin':
        if (this.counter>5) {
          if ((this.sns.left==0) && (this.sns.right==0)) this.transitionTo('wander');
          else this.transitionTo('aggressive');
        }
        break;
      case 'wander':
        if (this.counter>10) this.transitionTo('aggressive');
        break;
    }
  }

  aggressive() {
    // aggressive - crossed excitation
    this.mtr.left = 5 + 20 * this.sns.right;
    this.mtr.right = 5 + 20 * this.sns.left;
  }

  fsm1(cmd) {
    // fsm1 - bot wanders until it hits a wall, then spins

    // initialization
    if (cmd === 'init') {
      this.state = 'wander';
      this.counter = 0;
      return;
    }

    // update
    this[this.state]();
    this.counter++;

    // transition rules
    switch (this.state) {
      case 'wander':
        if (this.sns.collision) this.transitionTo('spin');
        break;
      case 'spin':
        if (this.counter > 15) this.transitionTo('wander');
        break;
    }
  }

  tightSpiral() {
    this.mtr.left = 12;
    this.mtr.right = 0.44 * sqrt(this.spiralCounter);
  }
  
  spiral() {
    this.mtr.left = 12;
    this.mtr.right = 4 + 1.5 * pow(this.spiralCounter, 0.3);
  }

  spin() {
    this.mtr.left = 2;
    this.mtr.right = -2;
  }

  wander() {
    let rn = 5 * random(-1, 1);
    this.mtr.left = 5 + rn;
    this.mtr.right = 3 - rn;
  }

  //======================
  // END OF CONTROLLERS
  //======================

  constructor() {
    this.dia = 25;
    this.cfill = 'darkOrange';
    this.reset();
  }

  consume() {
    this.sns.deltaEnergy = 0.0;
    let bx = this.x; // bot x
    let by = this.y; // bot y
    let rsq = bot.dia * bot.dia / 4;
    for (let i = pellets.length - 1; i >= 0; i--) {
      if ((pellets[i].x - bx) * (pellets[i].x - bx) + (pellets[i].y - by) * (pellets[i].y - by) < rsq) {
        this.energy += pellets[i].value; // bot "eats" the pellet, gains energy
        this.sns.deltaEnergy += pellets[i].value; // sense change in energy
        pellets.splice(i, 1); // delete the pellet
      }
    }
  }

  display() {
    // Braitenberg bugs
    push();
    translate(this.x, this.y); 
    // text labels
    noStroke();
    fill(0);
    let xtxt = 20;
    let ytxt = 20;
    textAlign(LEFT);
    if (this.x > 0.8 * width) {
      xtxt = -20;
      textAlign(RIGHT);
    }
    if (this.y > 0.8 * height) {
      ytxt = -20;
    }
 
    let controllerString = this.controllerName;
    if (this.controllerName.substring(0, 3) === "fsm") { // FSM
      controllerString += ": " + this.state;
    }
    text(controllerString, xtxt, ytxt);
    var energyString = "energy: " + nf(this.energy, 0, 0);
    text(energyString, xtxt, ytxt + 15);
    
    // draw body
    stroke(0);
    fill(this.cfill);
    ellipse(0, 0, this.dia);
    // draw head
    rotate(this.heading);
    ellipse(12, 0, 8, 12);
    // eyes
    fill(0);
    ellipse(14, 5, 4);
    ellipse(14, -5, 4);
    
    pop();
  }


  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.heading = 0;
    this.energy = 0;
    this.state = ''; // FSM
    this.counter = 0; // FSM

    this.sns = {
      left: 0, // activation level for left sensor
      right: 0, // activation level for right sensor
      collision: false, // true = hit wall/obstacle, 
      deltaEnergy: 0, // energy gained on last time step
    };

    this.mtr = {
      left: 0, // activation level for left motor
      right: 0 // activation level for right motor
    };

    let cname = select("#controller").value();
    this.setController(cname);
  }


  update() {
    
    this.updateSensors();
    
    // constrain after updating sensors to allow collision detection
    let r = this.dia / 2;
    this.x = constrain(this.x, r, width - r);
    this.y = constrain(this.y, r, height - r);
    
    this.consume();
    
    this.controller();
    
    let newSpeed = constrain((this.mtr.left + this.mtr.right) / 2.0, -5.0, 5.0);
    this.heading += constrain((this.mtr.left - this.mtr.right) / this.dia, -0.2, 0.2);
    this.heading %= TWO_PI;
    this.x += newSpeed * cos(this.heading);
    this.y += newSpeed * sin(this.heading);
    
  }

  updateSensors() {
    
    let bx = this.x;
    let by = this.y;
    let r = this.dia / 2;
    this.sns.collision = (bx < r) || (bx > width - r) || (by < r) || (by > height - r);
    
    this.sns.left = 0;
    this.sns.right = 0;

    // compute sensor locations
    let dr = 0.7 * this.dia; // sensor from center of bot
    let dtheta = PI / 4; // angle relative to midline
    let xL = bx + dr * Math.cos(this.heading - dtheta);
    let yL = by + dr * Math.sin(this.heading - dtheta);
    let xR = bx + dr * Math.cos(this.heading + dtheta);
    let yR = by + dr * Math.sin(this.heading + dtheta);

    let ux = Math.cos(this.heading);
    let uy = Math.sin(this.heading);
    
    for (let p of pellets) {
      let distp = Math.sqrt((p.x - this.x) * (p.x - this.x) + (p.y - this.y) * (p.y - this.y));
      let dotprod = (p.x - this.x) * ux + (p.y - this.y) * uy;
      let cosang = dotprod / distp;

      if (cosang > 0.5) {
        let distLsq = (p.x-xL)*(p.x-xL) + (p.y-yL)*(p.y-yL);
        if (distLsq < 1) distLsq = 1;
        let distRsq = (p.x-xR)*(p.x-xR) + (p.y-yR)*(p.y-yR);
        if (distRsq < 1) distRsq = 1;
        
        this.sns.left += p.intensity / distLsq;
        this.sns.right += p.intensity / distRsq;
      }
    }
  }

  setController(name) {
    this.controllerName = name;
    this.controller = this[name];
    if (name.substring(0, 3) === 'fsm') { // FSM
      this.controller('init');
    }
  }

  transitionTo(state) { // FSM
    this.counter = 0;
    this.spiralCounter = 0;
    this.state = state;
  }

}