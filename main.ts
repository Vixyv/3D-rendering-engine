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

    str() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
    }
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
    view_angle: Vector2 = new Vector2(0, 90); // (x, y) axis angle

    // Default settings
    near: number = 0.1;
    far: number = 4000;
    fov: number = 90;
    vert_clamp: Vector2 = new Vector2(0, 180) // Lower and upper vertical clamps

    constructor(position?: Vector3, view_angle?: Vector2, near?: number, far?: number, fov?: number, vert_clamp?: Vector2) {
        this.position = position === undefined ? this.position : position;
        this.view_angle = view_angle === undefined ? this.view_angle : view_angle;

        this.near = near === undefined ? this.near : near;
        this.far = far === undefined ? this.far : far;
        this.fov = fov === undefined ? this.fov : fov;
        this.vert_clamp = vert_clamp === undefined ? this.vert_clamp : vert_clamp;
    }

    rotate(rotation: Vector2) {
        this.view_angle = rotation;

        if (this.view_angle.x >= 360 || this.view_angle.x < 0) {
            this.view_angle.x = this.view_angle.x % 360;
        }
        this.view_angle.y = clamp(this.view_angle.y, this.vert_clamp.x, this.vert_clamp.y);
    }

    translate(vector: Vector3) { this.position = this.position.add(vector) }
}

// - Tool Functions - //
// Clamps x to be from min to max (inclusive)
function clamp(x: number, min: number, max: number) {
    return Math.max(min, Math.min(x, max))
}


// - Rendering - //

// Notes //
// Directionality: y-up, right-handed

let world_objects: Array<Object3D> = [];

function makePerspectiveProjectionMatrix(camera: Camera) {
    perspective_projection_matrix[0][0] = ASPECT_RATIO * (1/Math.tan(camera.fov/2));
    perspective_projection_matrix[1][1] = (1/Math.tan(camera.fov/2));
    perspective_projection_matrix[2][2] = camera.far/(camera.far-camera.near);
    perspective_projection_matrix[2][3] = (-camera.far*camera.near)/(camera.far-camera.near)
    perspective_projection_matrix[3][3] = 1.0;
}

function unpackObjects(objects: Array<Object3D>) : Array<Triangle> {
    let triangles = [];

    // Copies every triangle in all of the objects to be drawn (copied as the triangles will be mapped to screen space)
    for (let obj=0; obj<objects.length; obj++) {
        for (let tri=0; tri<objects[obj].triangles.length; tri++) {
            triangles.push(structuredClone(objects[obj].triangles[tri]));
        }
    }

    return triangles
}

function mapTrianglesToScreenSpace(unmapped_triangles: Array<Triangle>) : Array<Triangle> {
    let mapped_triangles = []
    
    for (let tri=0; tri<unmapped_triangles.length; tri++) {
        unmapped_triangles[tri].vert_1 = worldSpaceToScreenSpace(unmapped_triangles[tri].vert_1);
        unmapped_triangles[tri].vert_2 = worldSpaceToScreenSpace(unmapped_triangles[tri].vert_2);
        unmapped_triangles[tri].vert_3 = worldSpaceToScreenSpace(unmapped_triangles[tri].vert_3);
        mapped_triangles.push(unmapped_triangles[tri]);
    }

    return mapped_triangles
}

// TODO: I understand the matrix, but not how to integrate camera position and rotation
function worldSpaceToScreenSpace(vector: Vector3) : Vector3 {
    return new Vector3(0, 0, 0)
}

// TODO
function orderTriangles(triangles: Array<Triangle>) : Array<Triangle> {
    let ordered_triangles = triangles;

    return ordered_triangles
}

function drawTriangle(triangle: Triangle) {
    ctx.fillStyle = triangle.colour.str();

    ctx.beginPath();
	ctx.moveTo(triangle.vert_1.x, triangle.vert_1.y);
    ctx.lineTo(triangle.vert_2.x, triangle.vert_2.y);
    ctx.lineTo(triangle.vert_3.x, triangle.vert_3.y);
    ctx.fill();
    ctx.closePath();
}

function render(objects: Array<Object3D>) {
    let unmapped_triangles = unpackObjects(objects);
    let mapped_triangles = mapTrianglesToScreenSpace(unmapped_triangles);

    let ordered_triangles = orderTriangles(mapped_triangles);

    for (let tri=0; tri<ordered_triangles.length; tri++) {
        drawTriangle(ordered_triangles[tri])
    }
}

// - Physics - //

function process(delta: number) {
    // TODO: Calculate delta to determine how long it has been since last execution
    return
}

// - Init - //

let execute = true; // When false, engine will stop running

// Canvas
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
const CANVAS_SIZE = new Vector2(1920, 1080);
const ASPECT_RATIO = CANVAS_SIZE.y/CANVAS_SIZE.x;

// Camera
let active_camera: Camera;
let perspective_projection_matrix = Array(4).fill(Array(4).fill(0)); // 4x4 matrix

function ready() {
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

    canvas.width, canvas.height = CANVAS_SIZE.x, CANVAS_SIZE.y;

    // Init camera and projection matrix
    active_camera = new Camera();
    makePerspectiveProjectionMatrix(active_camera) // Projection matrix must be updated to new active_camera if the active_camera changes


    // Pre-execution modifications
    world_objects.push(new Object3D());
    active_camera.view_angle.y = 90;

    // Main loop
    while (execute) {
        render(world_objects)
        process(0)
        execute = false;
    }
}



// function mapVector3ToCanvas(vector: Vector3, camera: Camera) : Vector2 {
//     let dist_vec = vector.minus(camera.position); // Distance Vector3 to camera
//     let horz_dist = Math.sqrt(dist_vec.x**2 + dist_vec.z**2);

//     let quadrant_view_angle: number;
//     let atan_negative = 1; // Changes to -1 when atan is a negative number because of the quadrant the player is looking at

//     let vec_to_center_angle = Math.atan(dist_vec.x/dist_vec.z);
//     let xz_right_of_center = 1;

//     // Changes the view angle used to calculate rel_x and rel_z based on the quadrant the player is looking at
//     if (camera.view_angle.x <= 90) {                    // Quadrant I
//         quadrant_view_angle = camera.view_angle.x;
//         xz_right_of_center = quadrant_view_angle < vec_to_center_angle ? -1 : 1;
//     } else if (camera.view_angle.x <= 180) {            // Quadrant II
//         quadrant_view_angle = 180-camera.view_angle.x;
//         atan_negative = -1;
//         xz_right_of_center = quadrant_view_angle > vec_to_center_angle ? -1 : 1;
//     } else if (camera.view_angle.x <= 270) {            // Quadrant III
//         quadrant_view_angle = camera.view_angle.x-180;
//         xz_right_of_center = quadrant_view_angle < vec_to_center_angle ? -1 : 1;
//     } else {                                            // Quandrant IV
//         quadrant_view_angle = 360-camera.view_angle.x;
//         atan_negative -1;
//         xz_right_of_center = quadrant_view_angle > vec_to_center_angle ? -1 : 1;
//     }

//     // The relative x and y distances to the direction the player is looking
//     let rel_x = horz_dist*Math.sin(xz_right_of_center*(quadrant_view_angle) - xz_right_of_center*atan_negative*vec_to_center_angle);
//     let rel_z = horz_dist*Math.cos(xz_right_of_center*(quadrant_view_angle) - xz_right_of_center*atan_negative*vec_to_center_angle);
    
//     let relative_view_angle = camera.view_angle.y-90; // Vertical view angle relative to the horizontal
//     let atan_y_z = Math.atan(dist_vec.y/rel_z);

//     let y_above_center = atan_y_z > Math.tan(relative_view_angle) ? 1 : -1; // When y is above the center of vision, this is 1
//     let rel_y = screen_distance*Math.tan(y_above_center*atan_y_z - y_above_center*relative_view_angle);

//     let canvas_pos = new Vector2();
//     canvas_pos.x = CANVAS_SIZE.x/2+rel_x;
//     canvas_pos.y = CANVAS_SIZE.y/2+rel_y;

//     return canvas_pos
// }
