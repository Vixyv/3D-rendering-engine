// - Classes - //

class Vector2 {
    x: number = 0;
    y: number = 0;

    constructor(x?: number, y?: number) {
        this.x = x === undefined ? this.x : x;
        this.y = y === undefined ? this.y : y;
    }

    add(vector: Vector2) { return new Vector2(this.x+vector.x, this.y+vector.y); }
    minus(vector: Vector2) { return new Vector2(this.x-vector.x, this.y-vector.y); }
}

class Vector3 {
    x: number = 0;
    y: number = 0;
    z: number = 0;

    constructor(x?: number, y?: number, z?: number) {
        this.x = x === undefined ? this.x : x;
        this.y = y === undefined ? this.y : y;
        this.z = z === undefined ? this.z : z;
    }

    add(vector: Vector3) { return new Vector3(this.x+vector.x, this.y+vector.y, this.z+vector.z); }
    minus(vector: Vector3) { return new Vector3(this.x-vector.x, this.y-vector.y, this.z-vector.z); }
    vecMult(vector: Vector3) { return new Vector3(this.x*vector.x, this.y*vector.y, this.z*vector.z); }
    // Column major
    matrixMult(matrix: Array<Array<number>>) {
        return new Vector3(
            this.x*matrix[0][0] + this.y*matrix[1][0] + this.z*matrix[2][0],
            this.x*matrix[0][1] + this.y*matrix[1][1] + this.z*matrix[2][1],
            this.x*matrix[0][2] + this.y*matrix[1][2] + this.z*matrix[2][2],
        );
    }

    dot(vector: Vector3) { return this.x*vector.x + this.y*vector.y + this.z*vector.z; }
    cross(vector: Vector3) {
        return new Vector3(this.y*vector.z - this.z*vector.y,
                           this.z*vector.x - this.x*vector.z,
                           this.x*vector.y - this.y*vector.x)
    }
    normalize() { 
        let length = Math.sqrt(this.x**2 + this.y**2 + this.z**2);
        return new Vector3(this.x/length, this.y/length, this.z/length)
    }
}

class Vector4 {
    x: number = 0;
    y: number = 0;
    z: number = 0;
    w: number = 0;

    constructor(x?: number, y?: number, z?: number, w?: number) {
        this.x = x === undefined ? this.x : x;
        this.y = y === undefined ? this.y : y;
        this.z = z === undefined ? this.z : z;
        this.w = w === undefined ? this.w : w;
    }

    add(vector: Vector4) { return new Vector4(this.x+vector.x, this.y+vector.y, this.z+vector.z, this.w+vector.w); }
    minus(vector: Vector4) { return new Vector4(this.x-vector.x, this.y-vector.y, this.z-vector.z, this.w+vector.w); }
    // Column major
    matrixMult(matrix: Array<Array<number>>) {
        return new Vector4(
            this.x*matrix[0][0] + this.y*matrix[1][0] + this.z*matrix[2][0] + this.w*matrix[3][0],
            this.x*matrix[0][1] + this.y*matrix[1][1] + this.z*matrix[2][1] + this.w*matrix[3][1],
            this.x*matrix[0][2] + this.y*matrix[1][2] + this.z*matrix[2][2] + this.w*matrix[3][2],
            this.x*matrix[0][3] + this.y*matrix[1][3] + this.z*matrix[2][3] + this.w*matrix[3][3],
        );
    }
}

class RGB {
    r: number;
    g: number;
    b: number;

    constructor(red: number, green: number, blue: number) {
        this.r = red;
        this.g = green;
        this.b = blue;
    }

    toStr() { return `rgb(${this.r}, ${this.g}, ${this.b})` }
}

// Used for meshes
class Triangle {
    vert_1: Vector3;
    vert_2: Vector3;
    vert_3: Vector3;
    colour: RGB;

    constructor(vert_1: Vector3, vert_2: Vector3, vert_3: Vector3, colour: RGB) {
        this.vert_1 = vert_1;
        this.vert_2 = vert_2;
        this.vert_3 = vert_3;
        this.colour = colour;
    }
}

class Object3D {
    position: Vector3 = new Vector3(0, 0, 0);
    triangles: Array<Triangle> = [];

    // Only used if a custom mesh is given
    constructor(position?: Vector3, triangles?: Array<Triangle>) {
        this.position = position === undefined ? this.position : position;
        this.triangles = triangles === undefined ? this.triangles : triangles;
    }

    // Position is at bottom right corner
    newSquare(position: Vector3, side_length: number) {

    }

    // Physics Functions //
    translate(vector: Vector3) {
        for (let tri = 0; tri<this.triangles.length; tri++) {
            this.triangles[tri].vert_1 = this.triangles[tri].vert_1.add(vector);
            this.triangles[tri].vert_2 = this.triangles[tri].vert_2.add(vector);
            this.triangles[tri].vert_3 = this.triangles[tri].vert_3.add(vector);
        }
    }

    moveTo(location: Vector3) {
        let vector_change = this.position.minus(location);
        this.translate(vector_change);
    }
}

class Camera {
    // State
    position: Vector3 = new Vector3(0, 0, 0);
    view_angle: Vector2 = new Vector2(0, 0); // (yaw, pitch) in degrees

    // Default settings (if near, far, or fov change, the projection matrix must be updated)
    #near: number = 0.1;
        set near(value: number) { this.#near = value; this.#makePerspectiveProjectionMatrix(); }
    #far: number = 1500;
        set far(value: number) { this.#far = value; this.#makePerspectiveProjectionMatrix(); }
    #fov: number = 90;
        set fov(value: number) { this.#fov = value; this.#makePerspectiveProjectionMatrix(); }
    pitch_clamp: Vector2 = new Vector2(-90, 90) // Lower and upper vertical clamps on

    // Perspective projection matrix
    projection_matrix = matrix(4, 4);

    constructor(position?: Vector3, view_angle?: Vector2, near?: number, far?: number, fov?: number, pitch_clamp?: Vector2) {
        this.position = position === undefined ? this.position : position;
        this.view_angle = view_angle === undefined ? this.view_angle : view_angle;

        this.#near = near === undefined ? this.#near : near
        this.#far = far === undefined ? this.#far : far;
        this.#fov = fov === undefined ? this.#fov : fov;
        this.pitch_clamp = pitch_clamp === undefined ? this.pitch_clamp : pitch_clamp;

        this.#makePerspectiveProjectionMatrix()
    }

    // The projection matrix is apart of the camera class because each projection matrix
    // is individual to a camera's settings and need to instantiated for each camera in
    // order for rendering to function properly.
    // Derived from https://www.youtube.com/watch?v=EqNcqBdrNyI.
    #makePerspectiveProjectionMatrix() {
        let SCALE = 1/Math.tan(this.#fov*0.5 * Math.PI/180);

        this.projection_matrix[0][0] = SCALE;
        this.projection_matrix[1][1] = (CANVAS_SIZE.x/CANVAS_SIZE.y) * SCALE;
        this.projection_matrix[2][2] = (this.#far+this.#near)/(this.#near-this.#far);
        this.projection_matrix[2][3] = -1.0;
        this.projection_matrix[3][2] = (2*this.#far*this.#near)/(this.#near-this.#far);
    }

    rotate(rotation: Vector2) {
        this.view_angle = this.view_angle.add(rotation);

        if (this.view_angle.x >= 360 || this.view_angle.x < 0) {
            this.view_angle.x = this.view_angle.x % 360;
        }
        this.view_angle.y = clamp(this.view_angle.y, this.pitch_clamp.x, this.pitch_clamp.y);
    }

    // Moves the camera relative to the direction the camera is facing
    move(direction: Vector3) {
        let pitch_rad = this.view_angle.y*(Math.PI/180);
        let yaw_rad = this.view_angle.x*(Math.PI/180);

        let forward = new Vector3(Math.sin(yaw_rad)*Math.cos(pitch_rad),
                                  Math.sin(pitch_rad),
                                  -Math.cos(yaw_rad)*Math.cos(pitch_rad));

        let right = forward.cross(new Vector3(0, 1, 0)).normalize();
        let up = forward.cross(right);

        let translation = [[right.x, right.y, right.z],
                           [-up.x, -up.y, -up.z],
                           [forward.x, forward.y, forward.z]];
        
        this.position = this.position.minus(direction.matrixMult(translation));
    }

    // Moves the camera relative to the world axes
    translate(vector: Vector3) { this.position = this.position.add(vector) }
}

// - Tool Functions - //

// Clamps x to be from min to max (inclusive)
function clamp(x: number, min: number, max: number) {
    return Math.max(min, Math.min(x, max))
}

// Creates a matrix of mxn
// Cannot use Array(m).fill(Array(n).fill(fill_num)) as each row points to the same memory location
function matrix(m: number, n: number, fill_num: number = 0) {
    return Array.from({ length: m }, () => new Array(n).fill(fill_num));
}

// Multiplies two matricies
function matrixMult(mat_1: Array<Array<number>>, mat_2: Array<Array<number>>) : Array<Array<number>> {
    let mat_mult = matrix(mat_1.length, mat_2[0].length);

    for (let i=0; i<mat_1.length; i++) {
        for (let j=0; j<mat_2[0].length; j++) {
            let cell_val = 0;

            for (let k=0; k<mat_2.length; k++) {
                cell_val += mat_1[i][k]*mat_2[k][j];
            }

            mat_mult[i][j] = cell_val;
        }
    }

    return mat_mult;
}

// Stops the program from running for n milliseconds (https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep)
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// - Rendering - //

// Notes //
// Directionality: y-up, right-handed (https://pbs.twimg.com/media/EmVSW5AW8AAoDD9.jpg:large)

function unpackObjects(objects: Array<Object3D>) : Array<Triangle> {
    let triangles = [];

    // Copies every triangle in all of the objects to be drawn (copied as the triangles will be mapped to screen space)
    for (let obj=0; obj<objects.length; obj++) {
        for (let tri=0; tri<objects[obj].triangles.length; tri++) {
            // TODO: NOTE THIS DOES NOT ACTUALLY PROPERLY COPY THE TRIANGLES (JUST MAKES A POINTER)
            triangles.push(structuredClone(objects[obj].triangles[tri]));
        }
    }

    return triangles
}

function trianglesToClipSpace(camera: Camera, mvp_matrix: Array<Array<number>>, unmapped_triangles: Array<Triangle>) : Array<Triangle> {
    for (let tri=0; tri<unmapped_triangles.length; tri++) {
        unmapped_triangles[tri].vert_1 = worldToScreen(camera, mvp_matrix, unmapped_triangles[tri].vert_1);
        unmapped_triangles[tri].vert_2 = worldToScreen(camera, mvp_matrix, unmapped_triangles[tri].vert_2);
        unmapped_triangles[tri].vert_3 = worldToScreen(camera, mvp_matrix, unmapped_triangles[tri].vert_3);
    }

    return unmapped_triangles
}

// Generates a matrix which transforms world coordinates to view coordinates
// Based upon the position, pitch, and yaw of the camera.
// Derived from https://www.3dgep.com/understanding-the-view-matrix/#Look_At_Camera.
function makeMVPMatrix(camera: Camera) : Array<Array<number>> {
    // Inverted because we want to rotate the vector in the opposite direction of the camera
    let pitch_rad = camera.view_angle.y*(Math.PI/180);
    let yaw_rad = camera.view_angle.x*(Math.PI/180);

    // The point the camera is looking at
    let target = new Vector3(Math.sin(yaw_rad)*Math.cos(pitch_rad),
                             Math.sin(pitch_rad),
                             -Math.cos(yaw_rad)*Math.cos(pitch_rad)).add(camera.position);

    let z_axis = camera.position.minus(target);                  // The "forward" vector
    let x_axis = new Vector3(0, 1, 0).cross(z_axis).normalize(); // The "right" vector
    let y_axis = z_axis.cross(x_axis);                           // The "up" vector

    let rotation = [[x_axis.x, y_axis.x, z_axis.x, 0],
                    [x_axis.y, y_axis.y, z_axis.y, 0],
                    [x_axis.z, y_axis.z, z_axis.z, 0],
                    [0, 0, 0, 1]];

    let translation = [[1, 0, 0, 0],
                       [0, 1, 0, 0],
                       [0, 0, 1, 0],
                       [-camera.position.x, -camera.position.y, -camera.position.z, 1]];

    return matrixMult(translation, rotation)
}

function worldToScreen(camera: Camera, mvp_matrix: Array<Array<number>>, vector: Vector3) : Vector3 {
    let vec_4 = new Vector4(vector.x, vector.y, vector.z, 1);
    
    vec_4 = vec_4.matrixMult(mvp_matrix);
    vec_4.w = 1;
    vec_4 = vec_4.matrixMult(camera.projection_matrix);
 
    if (vec_4.w != 0) {
        vec_4.x = vec_4.x/(vec_4.w);
        vec_4.y = vec_4.y/(vec_4.w);
        // vec_4.z = vec_4.z/(vec_4.w);
    }

    // Map to canvas
    vec_4.x = CANVAS_SIZE.x*0.5 * (vec_4.x+1);
    vec_4.y = CANVAS_SIZE.y*0.5 * (1-vec_4.y);

    return new Vector3(vec_4.x, vec_4.y, vec_4.z);
}


function orderTriangles(triangles: Array<Triangle>) : Array<Triangle> {
    let av_z_dists = []
    let av_z_dist = 0;

    for (let tri=0; tri<triangles.length; tri++) {
        // Checks if the triangles are behind the camera
        if (triangles[tri].vert_1.z > 0 || triangles[tri].vert_2.z > 0 || triangles[tri].vert_2.z > 0) {
            triangles.splice(tri, 1);
            tri--;
            continue;
        }

        av_z_dist = (triangles[tri].vert_1.z+triangles[tri].vert_2.z+triangles[tri].vert_2.z)/3
        av_z_dists.push(av_z_dist);
    }

    // Sorts by average z distance (farthest to closest) (fyi, the values are negative)
    triangles.sort((a, b) => {  
        return av_z_dists[triangles.indexOf(a)] - av_z_dists[triangles.indexOf(b)];
    });

    return triangles
}

function drawSkyBox() {
    ctx.fillStyle = "rgb(255, 255, 255)";

    ctx.beginPath();
    ctx.fillRect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y);
}

function drawTriangle(triangle: Triangle) {
    // For some reason Triangle loses its object-ness and RGB needs to be reinstantiated to call toStr()
    ctx.fillStyle = new RGB(triangle.colour.r, triangle.colour.g, triangle.colour.b).toStr()

    ctx.beginPath();
	ctx.moveTo(triangle.vert_1.x, triangle.vert_1.y);
    ctx.lineTo(triangle.vert_2.x, triangle.vert_2.y);
    ctx.lineTo(triangle.vert_3.x, triangle.vert_3.y);
    ctx.fill();
    ctx.closePath();
}

function render(camera: Camera, objects: Array<Object3D>) {
    let unmapped_triangles = unpackObjects(objects);

    let mvp_matrix = makeMVPMatrix(camera);
    let mapped_triangles = trianglesToClipSpace(camera, mvp_matrix, unmapped_triangles);
    
    let ordered_triangles = orderTriangles(mapped_triangles);

    drawSkyBox();

    // console.log(ordered_triangles[0].vert_1);

    for (let tri=0; tri<ordered_triangles.length; tri++) {
        drawTriangle(ordered_triangles[tri])
    }
}

// - Physics - //

// - Init - //

let execute = false; // When false, engine will stop running

// Canvas
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
const CANVAS_SIZE = new Vector2(1000, 600);
const DIST_SCALE = 0.1;

// World
let world_objects: Array<Object3D> = [];
let active_camera: Camera;

function ready() {
    // Init keyboard input
    document.addEventListener("keydown", (ev) => {
        // Checks if the key pressed is used to control the camera
        if (CAMERA_CONTROLLER[ev.key]) {
            CAMERA_CONTROLLER[ev.key].pressed = true;
        }
    });

    document.addEventListener("keyup", (ev) => {
        // Checks if the key pressed is used to control the camera
        if (CAMERA_CONTROLLER[ev.key]) {
            CAMERA_CONTROLLER[ev.key].pressed = false;
        }
    });


    // Init canvas and context
    let temp_canvas = document.getElementById("canvas");
    if (!temp_canvas || !(temp_canvas instanceof HTMLCanvasElement)) {
        throw new Error("Failed to get canvas.");
    }
    canvas = temp_canvas;

    let temp_ctx = canvas.getContext("2d");
    if (!temp_ctx || !(temp_ctx instanceof CanvasRenderingContext2D)) {
        throw new Error("Failed to get 2D context.");
    }
    ctx = temp_ctx;


    canvas.width = CANVAS_SIZE.x;
    canvas.height = CANVAS_SIZE.y;

    // Init camera and projection matrix
    active_camera = new Camera();

    // let vec = new Vector4(10, 10, -1, 1);

    // console.log(vec.matrixMult(makeMVPMatrix(active_camera)));
    
    // console.log(vec.matrixMult(makeMVPMatrix(active_camera)));

    let dis = 40;
    let size = 10;

    let new_tri_1 = new Triangle(new Vector3(-size, -size, dis), new Vector3(-size, size, dis), new Vector3(size, size, dis), new RGB(0, 0, 255));
    let new_tri_2 = new Triangle(new Vector3(size, size, dis), new Vector3(size, -size, dis), new Vector3(-size, -size, dis), new RGB(255, 0, 0));
    let new_obj_1 = new Object3D(new Vector3(0, 0, 0), [new_tri_1, new_tri_2]);

    let new_tri_3 = new Triangle(new Vector3(-size, -size, -dis), new Vector3(-size, size, -dis), new Vector3(size, size, -dis), new RGB(0, 255, 0));
    let new_tri_4 = new Triangle(new Vector3(size, size, -dis), new Vector3(size, -size, -dis), new Vector3(-size, -size, -dis), new RGB(255, 255, 0));
    let new_obj_2 = new Object3D(new Vector3(0, 0, 0), [new_tri_3, new_tri_4]);

    world_objects.push(new_obj_1);
    world_objects.push(new_obj_2);
}

// Runs every frame when the game is started
async function process() {
    while (execute) {
        render(active_camera, world_objects);
        executeMoves()

        await sleep(16.667); // 60 fps
    }
}

// - Input - //

const ROTATE_SPEED = 2
const MOVE_SPEED = 2

// Used to track all of the current keys pressed (allowing for multiple inputs at once)
// Each key's function is then executed if the key is pressed in executeMoves()
const CAMERA_CONTROLLER: {[key:string]: {pressed: boolean; func: (camera: Camera) => void;}} = {
    // Orientation
    "ArrowUp": {pressed: false, func: (camera: Camera) => camera.rotate(new Vector2(0, ROTATE_SPEED))},    // Look up
    "ArrowDown": {pressed: false, func: (camera: Camera) => camera.rotate(new Vector2(0, -ROTATE_SPEED))}, // Look down
    "ArrowLeft": {pressed: false, func: (camera: Camera) => camera.rotate(new Vector2(-ROTATE_SPEED, 0))}, // Look left
    "ArrowRight": {pressed: false, func: (camera: Camera) => camera.rotate(new Vector2(ROTATE_SPEED, 0))}, // Look right
    // Position
    "w": {pressed: false, func: (camera: Camera) => camera.move(new Vector3(0, 0, MOVE_SPEED))},  // Forward
    "a": {pressed: false, func: (camera: Camera) => camera.move(new Vector3(-MOVE_SPEED, 0, 0))}, // Left
    "s": {pressed: false, func: (camera: Camera) => camera.move(new Vector3(0, 0, -MOVE_SPEED))}, // Back
    "d": {pressed: false, func: (camera: Camera) => camera.move(new Vector3(MOVE_SPEED, 0, 0))},  // Right
    "q": {pressed: false, func: (camera: Camera) => camera.move(new Vector3(0, -MOVE_SPEED, 0))}, // Down
    "e": {pressed: false, func: (camera: Camera) => camera.move(new Vector3(0, MOVE_SPEED, 0))},  // Up
}

// Executes all moves based upon current inputs
function executeMoves() {
    // Derived from (https://medium.com/@dovern42/handling-multiple-key-presses-at-once-in-vanilla-javascript-for-game-controllers-6dcacae931b7)
    Object.keys(CAMERA_CONTROLLER).forEach(key => {
        CAMERA_CONTROLLER[key].pressed && CAMERA_CONTROLLER[key].func(active_camera)
    })
}
