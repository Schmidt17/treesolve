var tree;
var d, edgeLength, forceConstant, dampingConstant;
var dt;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  // draw settings
  ellipseMode(CENTER);
  textAlign(CENTER, CENTER);
  
  // initialize model
  // constants for geometry and force-directed model
  d = 20;  // node diameter
  edgeLength = 50;  // equilibrium, "desired" edge length
  forceConstant = 0.1;
  dampingConstant = Math.sqrt(forceConstant);  // this way, equilibrium is attained as fast as possible
  dt = 0.1;  // time step per frame
  
  // initialize a tree
  tree = new Tree();
  // make some nodes
  let N = 8;  // number of nodes
  for (let i=0; i<N; i++) {
    tree.addNode();
    tree.nodes[i].tag = i+1;  // label the nodes from 1 to N
  }
  tree.makeNodePositions();  // place the nodes randomly
  tree.makeRandomConnections();  // connect the nodes randomly
}


function draw() {
  background(255);
  tree.show();
  tree.updateForceDirected();
}
