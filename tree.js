function Tree() {
  this.nodes = [];
  
  this.addNode = function () {
    let node = new Node();
    this.nodes.push(node);
  }
  
  this.makeNodePositions = function () {
     for (let node of this.nodes) {
       node.pos.x = random(width/2-100, width/2+100);
       node.pos.y = random(height/2-100, height/2+100);
     }
  }
  
  this.makeRandomConnections = function () {
    let rnd;
    for (let i=1; i < this.nodes.length; i++) {
      // generate a random index rnd that is smaller than i
      rnd = floor(random(0, i));
      
      // connect nodes i and rnd
      this.nodes[i].connectedIDs.push(rnd);
      this.nodes[rnd].connectedIDs.push(i);
    }
  }
  
  this.updateForceDirected = function () {
    for (let node of this.nodes) {
      for (let connID of node.connectedIDs) {
        let diff = p5.Vector.sub(this.nodes[connID].pos, node.pos);
        let dist = diff.mag();
        diff.setMag(forceConstant*(dist - edgeLength));
        node.vel.add(diff.mult(dt));
      }
      let tmpVel = node.vel.copy();
      node.pos.add(tmpVel.mult(dt));
    }
  }
  
  this.show = function () {
    // draw the edges
    stroke(0);
    strokeWeight(1);
    for (let node of this.nodes) {
      for (let connID of node.connectedIDs) {
        line(node.pos.x, node.pos.y, this.nodes[connID].pos.x, this.nodes[connID].pos.y);
      }
    }
    
    // draw the vertices on top of the edges
    for (let node of this.nodes) {
      node.show();
    }
  }
}

function Node() {
  this.connectedIDs = [];
  this.tag = null;
  this.pos = createVector(0, 0);  // position vector
  this.vel = createVector(0, 0);  // velocity vector
  
  this.show = function () {
    fill(255);
    stroke(0);
    strokeWeight(1);
    ellipse(this.pos.x, this.pos.y, d, d);
  }
}
