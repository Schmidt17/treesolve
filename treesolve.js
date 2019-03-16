var tree;
var d, edgeLength, forceConstant;
var dt;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  // draw settings
  ellipseMode(CENTER);
  
  // initialize model objects
  d = 20;  // node diameter
  edgeLength = 100;
  forceConstant = 0.1;
  dt = 0.1;  // time step per frame
  // initialize a tree
  tree = new Tree();
  for (let i=0; i<5; i++) {
    tree.addNode();
  }
  tree.makeNodePositions();
  tree.makeRandomConnections();
}


function draw() {
  background(255);
  tree.show();
  tree.updateForceDirected();
}
