function Tree() {
  this.nodes = [];
  
  this.addNode = function () {
    let node = new Node();
    this.nodes.push(node);
  }
  
  this.makeNodePositions = function () {
     for (let node of this.nodes) {
       node.pos.x = random(width/2-200, width/2+200);
       node.pos.y = random(height/2-200, height/2+200);
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
    // take care of time-dependent stuff
    let repellAmplification = 2000;
    let springAmplification = 1./(1. + Math.exp(-(frameCount-300)/100.));  // gradually pull the springs tighter over time
    let dampAmplification = Math.sqrt(springAmplification);
    //if (frameCount > 400) {  // TODO: fancy way would be to wait until no edges cross anymore OR until nothing moves anymore
    //  //repellAmplification = 20;  // later, the repulsion is dialed down to make the whole graph more compact
    //  springAmplification = 10;
    //  dampAmplification = Math.sqrt(springAmplification);
    //}
    
    // iterate over the nodes to make them move
    for (let node of this.nodes) {
      let totalForce = createVector(0, 0);
      
      // calculate the friction force and add it to the total force vector
      totalForce.add(p5.Vector.mult(node.vel, -dampingConstant*dampAmplification));
      
      // calculate the spring force exerted by every connection and add it to the total force vector
      for (let connID of node.connectedIDs) {
        let diff = p5.Vector.sub(this.nodes[connID].pos, node.pos);
        let dist = diff.mag();
        diff.setMag(springAmplification*forceConstant*(dist - edgeLength));
        totalForce.add(diff);
      }
      
      // calculate the repellant force of every two nodes and add it to the total force vector
      for (let node2 of this.nodes) {
        if (node2 != node) {
          let diff = p5.Vector.sub(node2.pos, node.pos);
          let dist = diff.mag();
          if (dist > 0) {
            diff.setMag(repellAmplification*repulsionConstant/dist);
            totalForce.sub(diff);
          }
          //if (dist < 2*d) {
          //  diff.setMag(forceConstant*(dist - 2*d));
          //  totalForce.add(diff);  
          //}
        }
      }
      
      node.vel.add(totalForce.mult(dt));  // Euler-step the velocity
      node.pos.add(p5.Vector.mult(node.vel, dt));  // Euler-step the position
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
    fill(0);
    text(str(this.tag), this.pos.x, this.pos.y);
  }
}
