// - Classes - //

class Vector2 {
    x: number = 0;
    y: number = 0;

    constructor(x?: number, y?: number) {
        this.x = x === undefined ? this.x : x;
        this.y = y === undefined ? this.y : y;
    }

    toMatrix() { return [this.x, this.y] }
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

    toMatrix() { return [this.x, this.y, this.z] }
    add(vector: Vector3) { return new Vector3(this.x+vector.x, this.y+vector.y, this.z+vector.z); }
    minus(vector: Vector3) { return new Vector3(this.x-vector.x, this.y-vector.y, this.z-vector.z); }
    dot(vector: Vector3) { return this.x*vector.x + this.y*vector.y + this.z*vector.z; }
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

    toMatrix() { return [this.x, this.y, this.z, this.w] }
    add(vector: Vector4) { return new Vector4(this.x+vector.x, this.y+vector.y, this.z+vector.z, this.w+vector.w); }
    minus(vector: Vector4) { return new Vector4(this.x-vector.x, this.y-vector.y, this.z-vector.z, this.w+vector.w); }
    // Row major
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
    view_angle: Vector2 = new Vector2(0, 90); // (yaw, pitch) in degrees

    // Default settings (if near, far, or fov change, the projection matrix must be updated)
    #near: number = 0.1;
        set near(value: number) { this.#near = value; this.#makePerspectiveProjectionMatrix(); }
    #far: number = 400;
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
        this.#fov = fov === undefined ? this.fov : fov;
        this.pitch_clamp = pitch_clamp === undefined ? this.pitch_clamp : pitch_clamp;

        this.#makePerspectiveProjectionMatrix()
    }

    // The projection matrix is apart of the camera class because
    // each projection matrix is individual to a camera's settings 
    // and need to instantiated for each camera in order for 
    // rendering to function properly. 
    // Derived from https://www.scratchapixel.com/lessons/3d-basic-rendering/perspective-and-orthographic-projection-matrix/building-basic-perspective-projection-matrix.html.
    #makePerspectiveProjectionMatrix() {
        let SCALE = 1 / Math.tan(this.#fov*0.5 * Math.PI/180)

        this.projection_matrix[0][0] = SCALE;
        this.projection_matrix[1][1] = SCALE;
        this.projection_matrix[2][2] = -this.#far/(this.#far-this.#near);
        this.projection_matrix[3][2] = -(this.#far*this.#near)/(this.#far-this.#near);
        this.projection_matrix[2][3] = -1.0;
    }

    rotate(rotation: Vector2) {
        this.view_angle = rotation;

        if (this.view_angle.x >= 360 || this.view_angle.x < 0) {
            this.view_angle.x = this.view_angle.x % 360;
        }
        this.view_angle.y = clamp(this.view_angle.y, this.pitch_clamp.x, this.pitch_clamp.y);
    }

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

function makeMVPMatrix(camera: Camera) : Array<Array<number>> {
    let mvp_matrix = matrix(4, 4);

    // Inverse translation of the camera's position
    let translation = [[1, 0, 0, -camera.position.x],
                       [0, 1, 0, -camera.position.y],
                       [0, 0, 1, -camera.position.z],
                       [0, 0, 0, 1]];

    const DEG_TO_RAD = Math.PI/180;

    // Degrees are negative as we want to inversely rotate the world vectors
    let cos_pitch = Math.cos(-camera.view_angle.y*DEG_TO_RAD);
    let sin_pitch = Math.sin(-camera.view_angle.y*DEG_TO_RAD);
    let cos_yaw = Math.cos(-camera.view_angle.x*DEG_TO_RAD);
    let sin_yaw = Math.sin(-camera.view_angle.x*DEG_TO_RAD);

    let pitch_rotation = [[1, 0, 0, 0],
                          [0, cos_pitch, sin_pitch, 0],
                          [0, -sin_pitch, cos_pitch, 0],
                          [0, 0, 0, 1]];

    let yaw_rotation = [[cos_yaw, 0, -sin_yaw, 0],
                        [0, 1, 0, 0],
                        [sin_yaw, 0, cos_yaw, 0],
                        [0, 0, 0, 1]];

    return matrixMult(camera.projection_matrix, matrixMult(translation, matrixMult(yaw_rotation, pitch_rotation)))
}

function worldToScreen(camera: Camera, mvp_matrix: Array<Array<number>>, vector: Vector3) : Vector3 {
    let vec_4 = new Vector4(vector.x, vector.y, vector.z, 0);

    console.log(JSON.stringify(vec_4));
    vec_4 = vec_4.matrixMult(mvp_matrix);
 
    vec_4.x = vec_4.x/vec_4.w;
    vec_4.y = vec_4.y/vec_4.w;
    vec_4.z = vec_4.z/vec_4.w;

    console.log(JSON.stringify(vec_4));

    // Map to canvas
    vec_4.x = CANVAS_SIZE.x*0.5 - vec_4.x;
    vec_4.y = CANVAS_SIZE.y*0.5 + vec_4.y;

    console.log(JSON.stringify(vec_4));
    console.log("- - - - -");

    return new Vector3(vec_4.x, vec_4.y, vec_4.z);
}


function orderTriangles(triangles: Array<Triangle>) : Array<Triangle> {
    let av_z_dists = []
    let av_z_dist = 0;

    for (let tri=0; tri<triangles.length; tri++) {
        av_z_dist = (triangles[tri].vert_1.z+triangles[tri].vert_2.z+triangles[tri].vert_2.z)/3
        
        if (av_z_dist >= 0) {
            av_z_dists.push(av_z_dist);
        }
    }

    // Sorts by average z distance (farthest to closest)
    triangles.sort((a, b) => {  
        return av_z_dists[triangles.indexOf(b)] - av_z_dists[triangles.indexOf(a)];
    });

    return triangles
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
    console.log(unmapped_triangles)

    let mvp_matrix = makeMVPMatrix(camera);
    let mapped_triangles = trianglesToClipSpace(camera, mvp_matrix, unmapped_triangles);
    
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
const CANVAS_SIZE = new Vector2(1000, 600);

// World
let world_objects: Array<Object3D> = [];
let active_camera: Camera;

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


    canvas.width = CANVAS_SIZE.x;
    canvas.height = CANVAS_SIZE.y;

    // Init camera and projection matrix
    active_camera = new Camera();
    active_camera.fov = 90;
    active_camera.view_angle.x = 0;
    active_camera.view_angle.y = 0;

    let dis = 2;

    let new_tri_1 = new Triangle(new Vector3(-100, -100, dis-1), new Vector3(-100, 100, dis), new Vector3(100, 100, dis), new RGB(0, 0, 255));
    let new_tri_2 = new Triangle(new Vector3(100, 100, dis), new Vector3(100, -100, dis-1), new Vector3(-100, -100, dis-1), new RGB(355, 0, 0));
    let new_obj = new Object3D(new Vector3(0, 0, 0), [new_tri_1, new_tri_2]);


    world_objects.push(new_obj)

    // Main loop
    while (execute) {
        render(active_camera, world_objects)
        process(0)
        execute = false;
    }
}
