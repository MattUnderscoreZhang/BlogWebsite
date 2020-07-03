class Pellet {
  constructor(x = random(width), y = random(height), intensity = 1, value = 1) {
    this.x = x;
    this.y = y;
    this.intensity = intensity;
    this.value = value;
  }

  display() {
    if(this.intensity === 0) {
      // invisible
      stroke(0);
      noFill();
    } else {
      // visible - green
      noStroke();
      fill(0, 255, 0);
    }
    ellipse(this.x, this.y, 5);
  }
}