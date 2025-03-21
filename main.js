"use strict";
// - Classes - //
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Camera_instances, _Camera_near, _Camera_far, _Camera_fov, _Camera_makePerspectiveProjectionMatrix;
class Vector2 {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x === undefined ? this.x : x;
        this.y = y === undefined ? this.y : y;
    }
    add(vector) { return new Vector2(this.x + vector.x, this.y + vector.y); }
    minus(vector) { return new Vector2(this.x - vector.x, this.y - vector.y); }
}
class Vector3 {
    constructor(x, y, z) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.x = x === undefined ? this.x : x;
        this.y = y === undefined ? this.y : y;
        this.z = z === undefined ? this.z : z;
    }
    add(vector) { return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z); }
    minus(vector) { return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z); }
    dot(vector) { return this.x * vector.x + this.y * vector.y + this.z * vector.z; }
    cross(vector) {
        return new Vector3(this.y * vector.z - this.z * vector.y, this.z * vector.x - this.x * vector.z, this.x * vector.y - this.y * vector.x);
    }
    normalize() {
        let length = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
        return new Vector3(this.x / length, this.y / length, this.z / length);
    }
}
class Vector4 {
    constructor(x, y, z, w) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;
        this.x = x === undefined ? this.x : x;
        this.y = y === undefined ? this.y : y;
        this.z = z === undefined ? this.z : z;
        this.w = w === undefined ? this.w : w;
    }
    add(vector) { return new Vector4(this.x + vector.x, this.y + vector.y, this.z + vector.z, this.w + vector.w); }
    minus(vector) { return new Vector4(this.x - vector.x, this.y - vector.y, this.z - vector.z, this.w + vector.w); }
    // Row major
    matrixMult(matrix) {
        return new Vector4(this.x * matrix[0][0] + this.y * matrix[1][0] + this.z * matrix[2][0] + this.w * matrix[3][0], this.x * matrix[0][1] + this.y * matrix[1][1] + this.z * matrix[2][1] + this.w * matrix[3][1], this.x * matrix[0][2] + this.y * matrix[1][2] + this.z * matrix[2][2] + this.w * matrix[3][2], this.x * matrix[0][3] + this.y * matrix[1][3] + this.z * matrix[2][3] + this.w * matrix[3][3]);
    }
}
class RGB {
    constructor(red, green, blue) {
        this.r = red;
        this.g = green;
        this.b = blue;
    }
    toStr() { return `rgb(${this.r}, ${this.g}, ${this.b})`; }
}
// Used for meshes
class Triangle {
    constructor(vert_1, vert_2, vert_3, colour) {
        this.vert_1 = vert_1;
        this.vert_2 = vert_2;
        this.vert_3 = vert_3;
        this.colour = colour;
    }
}
class Object3D {
    // Only used if a custom mesh is given
    constructor(position, triangles) {
        this.position = new Vector3(0, 0, 0);
        this.triangles = [];
        this.position = position === undefined ? this.position : position;
        this.triangles = triangles === undefined ? this.triangles : triangles;
    }
    // Position is at bottom right corner
    newSquare(position, side_length) {
    }
    // Physics Functions //
    translate(vector) {
        for (let tri = 0; tri < this.triangles.length; tri++) {
            this.triangles[tri].vert_1 = this.triangles[tri].vert_1.add(vector);
            this.triangles[tri].vert_2 = this.triangles[tri].vert_2.add(vector);
            this.triangles[tri].vert_3 = this.triangles[tri].vert_3.add(vector);
        }
    }
    moveTo(location) {
        let vector_change = this.position.minus(location);
        this.translate(vector_change);
    }
}
class Camera {
    set near(value) { __classPrivateFieldSet(this, _Camera_near, value, "f"); __classPrivateFieldGet(this, _Camera_instances, "m", _Camera_makePerspectiveProjectionMatrix).call(this); }
    set far(value) { __classPrivateFieldSet(this, _Camera_far, value, "f"); __classPrivateFieldGet(this, _Camera_instances, "m", _Camera_makePerspectiveProjectionMatrix).call(this); }
    set fov(value) { __classPrivateFieldSet(this, _Camera_fov, value, "f"); __classPrivateFieldGet(this, _Camera_instances, "m", _Camera_makePerspectiveProjectionMatrix).call(this); }
    constructor(position, view_angle, near, far, fov, pitch_clamp) {
        _Camera_instances.add(this);
        // State
        this.position = new Vector3(0, 0, 0);
        this.view_angle = new Vector2(0, 90); // (yaw, pitch) in degrees
        // Default settings (if near, far, or fov change, the projection matrix must be updated)
        _Camera_near.set(this, 0.1);
        _Camera_far.set(this, 400);
        _Camera_fov.set(this, 90);
        this.pitch_clamp = new Vector2(-90, 90); // Lower and upper vertical clamps on
        // Perspective projection matrix
        this.projection_matrix = matrix(4, 4);
        this.position = position === undefined ? this.position : position;
        this.view_angle = view_angle === undefined ? this.view_angle : view_angle;
        __classPrivateFieldSet(this, _Camera_near, near === undefined ? __classPrivateFieldGet(this, _Camera_near, "f") : near, "f");
        __classPrivateFieldSet(this, _Camera_far, far === undefined ? __classPrivateFieldGet(this, _Camera_far, "f") : far, "f");
        __classPrivateFieldSet(this, _Camera_fov, fov === undefined ? this.fov : fov, "f");
        this.pitch_clamp = pitch_clamp === undefined ? this.pitch_clamp : pitch_clamp;
        __classPrivateFieldGet(this, _Camera_instances, "m", _Camera_makePerspectiveProjectionMatrix).call(this);
    }
    rotate(rotation) {
        this.view_angle = rotation;
        if (this.view_angle.x >= 360 || this.view_angle.x < 0) {
            this.view_angle.x = this.view_angle.x % 360;
        }
        this.view_angle.y = clamp(this.view_angle.y, this.pitch_clamp.x, this.pitch_clamp.y);
    }
    translate(vector) { this.position = this.position.add(vector); }
}
_Camera_near = new WeakMap(), _Camera_far = new WeakMap(), _Camera_fov = new WeakMap(), _Camera_instances = new WeakSet(), _Camera_makePerspectiveProjectionMatrix = function _Camera_makePerspectiveProjectionMatrix() {
    let SCALE = 1 / Math.tan(__classPrivateFieldGet(this, _Camera_fov, "f") * 0.5 * Math.PI / 180);
    this.projection_matrix[0][0] = SCALE;
    this.projection_matrix[1][1] = SCALE;
    this.projection_matrix[2][2] = -__classPrivateFieldGet(this, _Camera_far, "f") / (__classPrivateFieldGet(this, _Camera_far, "f") - __classPrivateFieldGet(this, _Camera_near, "f"));
    this.projection_matrix[3][2] = -(__classPrivateFieldGet(this, _Camera_far, "f") * __classPrivateFieldGet(this, _Camera_near, "f")) / (__classPrivateFieldGet(this, _Camera_far, "f") - __classPrivateFieldGet(this, _Camera_near, "f"));
    this.projection_matrix[2][3] = -1.0;
};
// - Tool Functions - //
// Clamps x to be from min to max (inclusive)
function clamp(x, min, max) {
    return Math.max(min, Math.min(x, max));
}
// Creates a matrix of mxn
// Cannot use Array(m).fill(Array(n).fill(fill_num)) as each row points to the same memory location
function matrix(m, n, fill_num = 0) {
    return Array.from({ length: m }, () => new Array(n).fill(fill_num));
}
// Multiplies two matricies
function matrixMult(mat_1, mat_2) {
    let mat_mult = matrix(mat_1.length, mat_2[0].length);
    for (let i = 0; i < mat_1.length; i++) {
        for (let j = 0; j < mat_2[0].length; j++) {
            let cell_val = 0;
            for (let k = 0; k < mat_2.length; k++) {
                cell_val += mat_1[i][k] * mat_2[k][j];
            }
            mat_mult[i][j] = cell_val;
        }
    }
    return mat_mult;
}
// - Rendering - //
// Notes //
// Directionality: y-up, right-handed (https://pbs.twimg.com/media/EmVSW5AW8AAoDD9.jpg:large)
function unpackObjects(objects) {
    let triangles = [];
    // Copies every triangle in all of the objects to be drawn (copied as the triangles will be mapped to screen space)
    for (let obj = 0; obj < objects.length; obj++) {
        for (let tri = 0; tri < objects[obj].triangles.length; tri++) {
            // TODO: NOTE THIS DOES NOT ACTUALLY PROPERLY COPY THE TRIANGLES (JUST MAKES A POINTER)
            triangles.push(structuredClone(objects[obj].triangles[tri]));
        }
    }
    return triangles;
}
function trianglesToClipSpace(camera, mvp_matrix, unmapped_triangles) {
    for (let tri = 0; tri < unmapped_triangles.length; tri++) {
        unmapped_triangles[tri].vert_1 = worldToScreen(camera, mvp_matrix, unmapped_triangles[tri].vert_1);
        unmapped_triangles[tri].vert_2 = worldToScreen(camera, mvp_matrix, unmapped_triangles[tri].vert_2);
        unmapped_triangles[tri].vert_3 = worldToScreen(camera, mvp_matrix, unmapped_triangles[tri].vert_3);
    }
    return unmapped_triangles;
}
function makeMVPMatrix(camera) {
    let pitch_rad = camera.view_angle.y * (Math.PI / 180);
    let yaw_rad = camera.view_angle.x * (Math.PI / 180);
    let cos_pitch = Math.cos(-pitch_rad);
    let sin_pitch = Math.sin(-pitch_rad);
    let cos_yaw = Math.cos(-yaw_rad);
    let sin_yaw = Math.sin(-yaw_rad);
    let rotation = [[cos_yaw, -sin_yaw * sin_pitch, sin_yaw * cos_pitch, 1],
        [0, cos_pitch, sin_pitch, 1],
        [-sin_yaw, -cos_yaw * sin_pitch, cos_yaw * cos_pitch, 1],
        [0, 0, 0, 1]];
    let translation = [[1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [-camera.position.x, -camera.position.y, -camera.position.z, 1]];
    return matrixMult(translation, rotation);
    // let pitch_rad = camera.view_angle.x*(Math.PI/180);
    // let yaw_rad = camera.view_angle.y*(Math.PI/180);
    // // The direction the camera is looking
    // let forward = new Vector3(Math.cos(yaw_rad)*Math.cos(pitch_rad),
    //                           Math.sin(pitch_rad),
    //                           Math.sin(yaw_rad)*Math.cos(pitch_rad));
    // let right = forward.cross(new Vector3(0, 1, 0)).normalize(); 
    // let up = right.cross(forward).normalize();
    // return [[right.x, up.x, forward.x, camera.position.dot(right)],
    //         [right.y, up.y, forward.y, camera.position.dot(up)],
    //         [right.z, up.z, forward.z, camera.position.dot(forward)],
    //         [0, 0, 0, 1]];
    // My version
    // // Inverse translation of the camera's position
    // let translation = [[1, 0, 0, -camera.position.x],
    //                    [0, 1, 0, -camera.position.y],
    //                    [0, 0, 1, -camera.position.z],
    //                    [0, 0, 0, 1]];
    // const DEG_TO_RAD = Math.PI/180;
    // // Degrees are negative as we want to inversely rotate the world vectors
    // let cos_pitch = Math.cos(-camera.view_angle.y*DEG_TO_RAD);
    // let sin_pitch = Math.sin(-camera.view_angle.y*DEG_TO_RAD);
    // let cos_yaw = Math.cos(-camera.view_angle.x*DEG_TO_RAD);
    // let sin_yaw = Math.sin(-camera.view_angle.x*DEG_TO_RAD);
    // let pitch_rotation = [[1, 0, 0, 0],
    //                       [0, cos_pitch, sin_pitch, 0],
    //                       [0, -sin_pitch, cos_pitch, 0],
    //                       [0, 0, 0, 1]];
    // let yaw_rotation = [[cos_yaw, 0, -sin_yaw, 0],
    //                     [0, 1, 0, 0],
    //                     [sin_yaw, 0, cos_yaw, 0],
    //                     [0, 0, 0, 1]];
    // return matrixMult(camera.projection_matrix, matrixMult(translation, matrixMult(yaw_rotation, pitch_rotation)))
}
function worldToScreen(camera, mvp_matrix, vector) {
    let vec_4 = new Vector4(vector.x, vector.y, vector.z, 1);
    console.log(JSON.stringify(vec_4));
    vec_4 = vec_4.matrixMult(mvp_matrix);
    // vec_4.x = vec_4.x/vec_4.w;
    // vec_4.y = vec_4.y/vec_4.w;
    // vec_4.z = vec_4.z/vec_4.w;
    console.log(JSON.stringify(vec_4));
    // Map to canvas
    vec_4.x = CANVAS_SIZE.x * 0.5 - vec_4.x;
    vec_4.y = CANVAS_SIZE.y * 0.5 + vec_4.y;
    console.log(JSON.stringify(vec_4));
    console.log("- - - - -");
    return new Vector3(vec_4.x, vec_4.y, vec_4.z);
}
function orderTriangles(triangles) {
    let av_z_dists = [];
    let av_z_dist = 0;
    for (let tri = 0; tri < triangles.length; tri++) {
        av_z_dist = (triangles[tri].vert_1.z + triangles[tri].vert_2.z + triangles[tri].vert_2.z) / 3;
        if (av_z_dist >= 0) {
            av_z_dists.push(av_z_dist);
        }
    }
    // Sorts by average z distance (farthest to closest)
    triangles.sort((a, b) => {
        return av_z_dists[triangles.indexOf(b)] - av_z_dists[triangles.indexOf(a)];
    });
    return triangles;
}
function drawTriangle(triangle) {
    // For some reason Triangle loses its object-ness and RGB needs to be reinstantiated to call toStr()
    ctx.fillStyle = new RGB(triangle.colour.r, triangle.colour.g, triangle.colour.b).toStr();
    ctx.beginPath();
    ctx.moveTo(triangle.vert_1.x, triangle.vert_1.y);
    ctx.lineTo(triangle.vert_2.x, triangle.vert_2.y);
    ctx.lineTo(triangle.vert_3.x, triangle.vert_3.y);
    ctx.fill();
    ctx.closePath();
}
function render(camera, objects) {
    let unmapped_triangles = unpackObjects(objects);
    let mvp_matrix = makeMVPMatrix(camera);
    let mapped_triangles = trianglesToClipSpace(camera, mvp_matrix, unmapped_triangles);
    let ordered_triangles = orderTriangles(mapped_triangles);
    for (let tri = 0; tri < ordered_triangles.length; tri++) {
        drawTriangle(ordered_triangles[tri]);
    }
}
// - Physics - //
function process(delta) {
    // TODO: Calculate delta to determine how long it has been since last execution
    return;
}
// - Init - //
let execute = true; // When false, engine will stop running
// Canvas
let canvas;
let ctx;
const CANVAS_SIZE = new Vector2(1000, 600);
// World
let world_objects = [];
let active_camera;
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
    // let vec = new Vector4(0, 0, -1, 1);
    // console.log(vec.matrixMult(makeMVPMatrix(active_camera)));
    // active_camera.position.y = 1;
    // console.log(vec.matrixMult(makeMVPMatrix(active_camera)));
    let dis = 2;
    let new_tri_1 = new Triangle(new Vector3(-100, -100, dis - 1), new Vector3(-100, 100, dis), new Vector3(100, 100, dis), new RGB(0, 0, 255));
    let new_tri_2 = new Triangle(new Vector3(100, 100, dis), new Vector3(100, -100, dis - 1), new Vector3(-100, -100, dis - 1), new RGB(255, 0, 0));
    let new_obj = new Object3D(new Vector3(0, 0, 0), [new_tri_1, new_tri_2]);
    world_objects.push(new_obj);
    // Main loop
    while (execute) {
        render(active_camera, world_objects);
        process(0);
        execute = false;
    }
}
