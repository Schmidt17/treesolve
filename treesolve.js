var tree;
var d, edgeLength, forceConstant, dampingConstant, repulsionConstant;
var dt;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  // draw settings
  ellipseMode(CENTER);
  textAlign(CENTER, CENTER);
  
  // initialize model
  // constants for geometry and force-directed model
  d = 20;  // node diameter
  let N = 30;  // number of nodes, only needed in setup()
  edgeLength = 80;  // equilibrium, "desired" edge length
  forceConstant = 15.5;
  repulsionConstant = 25./N;
  dampingConstant = Math.sqrt(forceConstant);  // this way, equilibrium is attained as fast as possible
  dt = 0.1;  // time step per frame
  
  // initialize a tree
  tree = new Tree();
  // make some nodes
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
