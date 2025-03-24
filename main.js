"use strict";
// - Classes - //
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    vecMult(vector) { return new Vector3(this.x * vector.x, this.y * vector.y, this.z * vector.z); }
    // Column major
    matrixMult(matrix) {
        return new Vector3(this.x * matrix[0][0] + this.y * matrix[1][0] + this.z * matrix[2][0], this.x * matrix[0][1] + this.y * matrix[1][1] + this.z * matrix[2][1], this.x * matrix[0][2] + this.y * matrix[1][2] + this.z * matrix[2][2]);
    }
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
    // Column major
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
        this.view_angle = new Vector2(0, 0); // (yaw, pitch) in degrees
        // Default settings (if near, far, or fov change, the projection matrix must be updated)
        _Camera_near.set(this, 0.01);
        _Camera_far.set(this, 1500);
        _Camera_fov.set(this, 90);
        this.pitch_clamp = new Vector2(-90, 90); // Lower and upper vertical clamps on
        // Perspective projection matrix
        this.projection_matrix = matrix(4, 4);
        this.position = position === undefined ? this.position : position;
        this.view_angle = view_angle === undefined ? this.view_angle : view_angle;
        __classPrivateFieldSet(this, _Camera_near, near === undefined ? __classPrivateFieldGet(this, _Camera_near, "f") : near, "f");
        __classPrivateFieldSet(this, _Camera_far, far === undefined ? __classPrivateFieldGet(this, _Camera_far, "f") : far, "f");
        __classPrivateFieldSet(this, _Camera_fov, fov === undefined ? __classPrivateFieldGet(this, _Camera_fov, "f") : fov, "f");
        this.pitch_clamp = pitch_clamp === undefined ? this.pitch_clamp : pitch_clamp;
        __classPrivateFieldGet(this, _Camera_instances, "m", _Camera_makePerspectiveProjectionMatrix).call(this);
    }
    rotate(rotation) {
        this.view_angle = this.view_angle.add(rotation);
        if (this.view_angle.x >= 360 || this.view_angle.x < 0) {
            this.view_angle.x = this.view_angle.x % 360;
        }
        this.view_angle.y = clamp(this.view_angle.y, this.pitch_clamp.x, this.pitch_clamp.y);
    }
    // Moves the camera relative to the direction the camera is facing
    move(direction) {
        let pitch_rad = this.view_angle.y * (Math.PI / 180);
        let yaw_rad = this.view_angle.x * (Math.PI / 180);
        let forward = new Vector3(Math.sin(yaw_rad) * Math.cos(pitch_rad), Math.sin(pitch_rad), -Math.cos(yaw_rad) * Math.cos(pitch_rad));
        let right = forward.cross(new Vector3(0, 1, 0)).normalize();
        let up = forward.cross(right);
        let translation = [[right.x, right.y, right.z],
            [-up.x, -up.y, -up.z],
            [forward.x, forward.y, forward.z]];
        this.position = this.position.minus(direction.matrixMult(translation));
    }
    // Moves the camera relative to the world axes
    translate(vector) { this.position = this.position.add(vector); }
}
_Camera_near = new WeakMap(), _Camera_far = new WeakMap(), _Camera_fov = new WeakMap(), _Camera_instances = new WeakSet(), _Camera_makePerspectiveProjectionMatrix = function _Camera_makePerspectiveProjectionMatrix() {
    let SCALE = 1 / Math.tan(__classPrivateFieldGet(this, _Camera_fov, "f") * 0.5 * Math.PI / 180);
    this.projection_matrix[0][0] = SCALE;
    this.projection_matrix[1][1] = (CANVAS_SIZE.x / CANVAS_SIZE.y) * SCALE;
    this.projection_matrix[2][2] = (__classPrivateFieldGet(this, _Camera_far, "f") + __classPrivateFieldGet(this, _Camera_near, "f")) / (__classPrivateFieldGet(this, _Camera_near, "f") - __classPrivateFieldGet(this, _Camera_far, "f"));
    this.projection_matrix[2][3] = -1.0;
    this.projection_matrix[3][2] = (2 * __classPrivateFieldGet(this, _Camera_far, "f") * __classPrivateFieldGet(this, _Camera_near, "f")) / (__classPrivateFieldGet(this, _Camera_near, "f") - __classPrivateFieldGet(this, _Camera_far, "f"));
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
// Stops the program from running for n milliseconds (https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
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
// Generates a matrix which transforms world coordinates to view coordinates
// Based upon the position, pitch, and yaw of the camera.
// Derived from https://www.3dgep.com/understanding-the-view-matrix/#Look_At_Camera.
function makeMVPMatrix(camera) {
    // Inverted because we want to rotate the vector in the opposite direction of the camera
    let pitch_rad = camera.view_angle.y * (Math.PI / 180);
    let yaw_rad = camera.view_angle.x * (Math.PI / 180);
    // The point the camera is looking at
    let target = new Vector3(Math.sin(yaw_rad) * Math.cos(pitch_rad), Math.sin(pitch_rad), -Math.cos(yaw_rad) * Math.cos(pitch_rad)).add(camera.position);
    // TODO: Current +y is down and -y is up (I believe the x axis is also inverted)
    // TODO: I'll also have to make a matrix to world transform if I want to have any sort of objects
    let z_axis = camera.position.minus(target); // The "forward" vector
    let x_axis = new Vector3(0, 1, 0).cross(z_axis).normalize(); // The "right" vector
    let y_axis = z_axis.cross(x_axis); // The "up" vector
    let rotation = [[x_axis.x, y_axis.x, z_axis.x, 0],
        [x_axis.y, y_axis.y, z_axis.y, 0],
        [x_axis.z, y_axis.z, z_axis.z, 0],
        [0, 0, 0, 1]];
    let translation = [[1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [-camera.position.x, -camera.position.y, -camera.position.z, 1]];
    return matrixMult(translation, rotation);
}
function worldToScreen(camera, mvp_matrix, vector) {
    let vec_4 = new Vector4(vector.x, vector.y, vector.z, 1);
    vec_4 = vec_4.matrixMult(mvp_matrix);
    vec_4.w = 1;
    vec_4 = vec_4.matrixMult(camera.projection_matrix);
    if (vec_4.w != 0) {
        vec_4.x = vec_4.x / (vec_4.w);
        vec_4.y = vec_4.y / (vec_4.w);
        // vec_4.z = vec_4.z/(vec_4.w);
    }
    // Map to canvas
    vec_4.x = CANVAS_SIZE.x * 0.5 * (vec_4.x + 1);
    vec_4.y = CANVAS_SIZE.y * 0.5 * (1 - vec_4.y);
    return new Vector3(vec_4.x, vec_4.y, vec_4.z);
}
function orderTriangles(triangles) {
    let av_z_dists = [];
    let av_z_dist = 0;
    for (let tri = 0; tri < triangles.length; tri++) {
        let vert_1 = triangles[tri].vert_1;
        let vert_2 = triangles[tri].vert_2;
        let vert_3 = triangles[tri].vert_3;
        // Checks if the triangles are behind the camera
        // (Technically z > 0 is behind the camera, but the floating point
        // rendering bug can occur at z values of -0.5)
        if (vert_1.z > -5 || vert_2.z > -5 || vert_3.z > -5) {
            triangles.splice(tri, 1);
            tri--;
            continue;
        }
        // Checks for the floating point rendering error using sign analysis (only when Math.abs(vert_1.x) > 1000)
        // When looking straight at a vector and rotating, the x value will increase faster and faster (trig functions).
        // If the angle sheer enough, floating point error will change the sign of the x value resulting
        // in a triangle appearing across the screen.
        let sign_sum = Math.abs(Math.sign(vert_1.x) + Math.sign(vert_2.x) + Math.sign(vert_3.x));
        if (Math.abs(vert_1.x) > 2000 && sign_sum < 3) {
            triangles.splice(tri, 1);
            tri--;
            continue;
        }
        // Averages the distance of the triangle
        av_z_dist = (vert_1.z + vert_2.z + vert_3.z) / 3;
        av_z_dists.push(av_z_dist);
    }
    // Sorts by average z distance (farthest to closest) (fyi, the values are negative)
    triangles.sort((a, b) => {
        return av_z_dists[triangles.indexOf(a)] - av_z_dists[triangles.indexOf(b)];
    });
    return triangles;
}
function drawSkyBox() {
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.beginPath();
    ctx.fillRect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y);
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
    drawSkyBox();
    for (let tri = 0; tri < ordered_triangles.length; tri++) {
        drawTriangle(ordered_triangles[tri]);
    }
}
// - Physics - //
// - Init - //
let execute = true; // When false, the engine will stop running
// Canvas
let canvas;
let ctx;
const CANVAS_SIZE = new Vector2(1920, 1080);
const DIST_SCALE = 0.1;
// World
let world_objects = [];
let active_camera;
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
    // Init camera
    active_camera = new Camera();
    active_camera.fov = 90;
    // World objects
    let dis = 20;
    let size = 18;
    // Cube
    let new_tri_1 = new Triangle(new Vector3(-size, -size, dis), new Vector3(-size, size, dis), new Vector3(size, size, dis), new RGB(255, 0, 0));
    let new_tri_2 = new Triangle(new Vector3(size, size, dis), new Vector3(size, -size, dis), new Vector3(-size, -size, dis), new RGB(200, 0, 55));
    let new_obj_1 = new Object3D(new Vector3(0, 0, 0), [new_tri_1, new_tri_2]);
    let new_tri_3 = new Triangle(new Vector3(size, -size, -dis), new Vector3(-size, size, -dis), new Vector3(size, size, -dis), new RGB(0, 255, 0));
    let new_tri_4 = new Triangle(new Vector3(-size, size, -dis), new Vector3(size, -size, -dis), new Vector3(-size, -size, -dis), new RGB(55, 200, 0));
    let new_obj_2 = new Object3D(new Vector3(0, 0, 0), [new_tri_3, new_tri_4]);
    let new_tri_5 = new Triangle(new Vector3(-dis, -size, size), new Vector3(-dis, size, size), new Vector3(-dis, -size, -size), new RGB(0, 0, 255));
    let new_tri_6 = new Triangle(new Vector3(-dis, -size, -size), new Vector3(-dis, size, -size), new Vector3(-dis, size, size), new RGB(0, 55, 200));
    let new_obj_3 = new Object3D(new Vector3(0, 0, 0), [new_tri_5, new_tri_6]);
    let new_tri_7 = new Triangle(new Vector3(dis, -size, size), new Vector3(dis, -size, -size), new Vector3(dis, size, -size), new RGB(255, 255, 0));
    let new_tri_8 = new Triangle(new Vector3(dis, size, -size), new Vector3(dis, size, size), new Vector3(dis, -size, size), new RGB(255, 200, 0));
    let new_obj_4 = new Object3D(new Vector3(0, 0, 0), [new_tri_7, new_tri_8]);
    let new_tri_9 = new Triangle(new Vector3(-size, dis, -size), new Vector3(size, dis, -size), new Vector3(-size, dis, size), new RGB(210, 210, 210));
    let new_tri_10 = new Triangle(new Vector3(size, dis, -size), new Vector3(size, dis, size), new Vector3(-size, dis, size), new RGB(170, 170, 170));
    let new_obj_5 = new Object3D(new Vector3(0, 0, 0), [new_tri_9, new_tri_10]);
    let new_tri_11 = new Triangle(new Vector3(-size, -dis, -size), new Vector3(size, -dis, -size), new Vector3(size, -dis, size), new RGB(130, 130, 130));
    let new_tri_12 = new Triangle(new Vector3(size, -dis, size), new Vector3(-size, -dis, size), new Vector3(-size, -dis, -size), new RGB(90, 90, 90));
    let new_obj_6 = new Object3D(new Vector3(0, 0, 0), [new_tri_11, new_tri_12]);
    world_objects.push(new_obj_1);
    world_objects.push(new_obj_2);
    world_objects.push(new_obj_3);
    world_objects.push(new_obj_4);
    world_objects.push(new_obj_5);
    world_objects.push(new_obj_6);
    process();
}
// Runs every frame when the game is started
function process() {
    return __awaiter(this, void 0, void 0, function* () {
        while (execute) {
            render(active_camera, world_objects);
            executeMoves();
            yield sleep(10); // 100 fps
        }
    });
}
// - Input - //
const ROTATE_SPEED = 1;
const MOVE_SPEED = 1;
// Used to track all of the current keys pressed (allowing for multiple inputs at once)
// Each key's function is then executed if the key is pressed in executeMoves()
const CAMERA_CONTROLLER = {
    // Orientation
    "ArrowUp": { pressed: false, func: (camera) => camera.rotate(new Vector2(0, ROTATE_SPEED)) }, // Look up
    "ArrowDown": { pressed: false, func: (camera) => camera.rotate(new Vector2(0, -ROTATE_SPEED)) }, // Look down
    "ArrowLeft": { pressed: false, func: (camera) => camera.rotate(new Vector2(-ROTATE_SPEED, 0)) }, // Look left
    "ArrowRight": { pressed: false, func: (camera) => camera.rotate(new Vector2(ROTATE_SPEED, 0)) }, // Look right
    // Position
    "w": { pressed: false, func: (camera) => camera.move(new Vector3(0, 0, MOVE_SPEED)) }, // Forward
    "a": { pressed: false, func: (camera) => camera.move(new Vector3(-MOVE_SPEED, 0, 0)) }, // Left
    "s": { pressed: false, func: (camera) => camera.move(new Vector3(0, 0, -MOVE_SPEED)) }, // Back
    "d": { pressed: false, func: (camera) => camera.move(new Vector3(MOVE_SPEED, 0, 0)) }, // Right
    "q": { pressed: false, func: (camera) => camera.move(new Vector3(0, -MOVE_SPEED, 0)) }, // Down
    "e": { pressed: false, func: (camera) => camera.move(new Vector3(0, MOVE_SPEED, 0)) }, // Up
};
// Executes all moves based upon current inputs
function executeMoves() {
    // Derived from (https://medium.com/@dovern42/handling-multiple-key-presses-at-once-in-vanilla-javascript-for-game-controllers-6dcacae931b7)
    Object.keys(CAMERA_CONTROLLER).forEach(key => {
        CAMERA_CONTROLLER[key].pressed && CAMERA_CONTROLLER[key].func(active_camera);
    });
}
