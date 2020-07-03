class Trail {
  constructor(maxPoints = 100, cstroke = 'grey') {
    this.maxPoints = maxPoints;
    this.cstroke = cstroke;
    this.index = 0;
    this.full = false;
    this.xtrail = new Array(maxPoints);
    this.ytrail = new Array(maxPoints);
  }
  
  reset() {
    this.index = 0;
    this.full = false;
  }

  update(x, y) {
    this.xtrail[this.index] = x;
    this.ytrail[this.index] = y;
    this.index++;
    if (this.index == this.maxPoints) {
      this.index = 0;
      this.full = true;
    }
  }

  display() {
    stroke(this.cstroke);
    var npts = this.full ? this.maxPoints : this.index;
    for (var i = 0; i < npts; i++) {
      point(this.xtrail[i], this.ytrail[i]);
    }
  }
}