
let gl = undefined;
let sphere, cube, cone;
let matrixStack;
let sphereAngle = 0.0, cubeAngle = 0.0, coneAngle = 0.0;

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    // Add initialization code here

    gl.clearColor(0.2, 0.2, 0.2, 1.0);  
    gl.enable(gl.DEPTH_TEST);           

    // Initialize the matrix stack
    matrixStack = new MatrixStack();

    // Create objects: sphere, cube, and cone
    sphere = new Sphere(gl, 100, 100);
    cube = new Cube(gl);               
    cone = new Cone(gl, 36, 36);       

    // Start rendering loop
    render();
}

function render() {
    // Add rendering code here
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Update animation angles
    sphereAngle += 1.0;
    cubeAngle += 2.0;
    coneAngle += 3.0;

    // Draw the sphere
    matrixStack.push();
    matrixStack.translate([-2.0, 0.0, 0.0]);  // Move sphere to the left
    matrixStack.rotate(sphereAngle, [0, 1, 0]);  // Rotate the sphere
    matrixStack.scale(0.6);                    // Scale down
    sphere.MV = matrixStack.current();          // Apply transformations
    sphere.draw();
    matrixStack.pop();

    // Draw the cube
    matrixStack.push();
    matrixStack.translate([0.0, 0.0, 0.0]);    // Cube in the center
    matrixStack.rotate(cubeAngle, [1, 1, 0]);  // Rotate cube on multiple axes
    matrixStack.scale(0.6);                    // Scale down
    cube.MV = matrixStack.current();            // Apply transformations
    cube.draw();
    matrixStack.pop();

    // Draw the cone
    matrixStack.push();
    matrixStack.translate([2.0, 0.0, 0.0]);    // Move cone to the right
    matrixStack.rotate(coneAngle, [0, 0, 1]);  // Rotate the cone
    matrixStack.scale(0.6);                    // Scale down
    cone.MV = matrixStack.current();            // Apply transformations
    cone.draw();
    matrixStack.pop();

    requestAnimationFrame(render);
}

window.onload = init;

