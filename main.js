"use strict";
// - Math Classes - //
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ObjectNode_instances, _ObjectNode_modelToWorld, _Camera_instances, _Camera_near, _Camera_far, _Camera_fov, _Camera_makePerspectiveProjectionMatrix, _Box_instances, _Box_constructMesh, _Plane_instances, _Plane_constructMesh;
class Vector2 {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x === undefined ? this.x : x;
        this.y = y === undefined ? this.y : y;
    }
    add(vector) { return new Vector2(this.x + vector.x, this.y + vector.y); }
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
    scale(scalar) { return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar); }
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
    // Column major
    matrixMult(matrix) {
        return new Vector4(this.x * matrix[0][0] + this.y * matrix[1][0] + this.z * matrix[2][0] + this.w * matrix[3][0], this.x * matrix[0][1] + this.y * matrix[1][1] + this.z * matrix[2][1] + this.w * matrix[3][1], this.x * matrix[0][2] + this.y * matrix[1][2] + this.z * matrix[2][2] + this.w * matrix[3][2], this.x * matrix[0][3] + this.y * matrix[1][3] + this.z * matrix[2][3] + this.w * matrix[3][3]);
    }
}
class Quanternion {
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
    normalize() {
        let length = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z * 2 + this.w ** 2);
        return new Quanternion(this.x / length, this.y / length, this.z / length, this.w / length);
    }
    // Order: This Quanternion * Different Quanternion
    quanMult(quan) {
        return new Quanternion(this.w * quan.x + quan.w * this.x + this.y * quan.z - this.z * quan.y, this.w * quan.y + quan.w * this.y + this.z * quan.x - this.x * quan.z, this.w * quan.z + quan.w * this.z + this.x * quan.y - this.y * quan.x, this.w * quan.w - this.x * quan.x - this.y * quan.z - this.z * quan.z);
    }
}
// - Object Classes - //
class RGB {
    constructor(red, green, blue) {
        this.r = red;
        this.g = green;
        this.b = blue;
    }
    toStr() { return `rgb(${this.r}, ${this.g}, ${this.b})`; }
}
class Triangle {
    constructor(vert_1, vert_2, vert_3, colour) {
        this.vert_1 = vert_1;
        this.vert_2 = vert_2;
        this.vert_3 = vert_3;
        this.colour = colour;
    }
}
class ObjectNode {
    // Only used if a custom mesh is given
    constructor(position, rotation, scale) {
        _ObjectNode_instances.add(this);
        this.mesh = [];
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
    }
    worldPositionTriangles() {
        let world_pos_triangles = [];
        for (let tri = 0; tri < this.mesh.length; tri++) {
            let vert_1 = __classPrivateFieldGet(this, _ObjectNode_instances, "m", _ObjectNode_modelToWorld).call(this, this.mesh[tri].vert_1);
            let vert_2 = __classPrivateFieldGet(this, _ObjectNode_instances, "m", _ObjectNode_modelToWorld).call(this, this.mesh[tri].vert_2);
            let vert_3 = __classPrivateFieldGet(this, _ObjectNode_instances, "m", _ObjectNode_modelToWorld).call(this, this.mesh[tri].vert_3);
            let colour = this.mesh[tri].colour;
            world_pos_triangles.push(new Triangle(vert_1, vert_2, vert_3, colour));
        }
        return world_pos_triangles;
    }
    // Physics Functions //
    translate(vector) {
        this.position = this.position.add(vector);
    }
    rotate(vector) {
        this.rotation = this.rotation.add(vector);
    }
}
_ObjectNode_instances = new WeakSet(), _ObjectNode_modelToWorld = function _ObjectNode_modelToWorld(vector) {
    // 1. Scale
    vector = vector.vecMult(this.scale);
    // 2. Rotate
    let rad_rotation = this.rotation.scale(Math.PI / 360); // Divided by 360 because every angle needs to be halved
    // Derived from https://www.youtube.com/watch?v=bKd2lPjl92c
    let quanternion_y_rot = new Quanternion(0, Math.sin(rad_rotation.y), 0, Math.cos(rad_rotation.y));
    let quanternion_x_rot = new Quanternion(Math.sin(rad_rotation.x), 0, 0, Math.cos(rad_rotation.x));
    let quanternion_z_rot = new Quanternion(0, 0, Math.sin(rad_rotation.z), Math.cos(rad_rotation.z));
    let quanternion_rot = quanternion_y_rot.quanMult(quanternion_x_rot).quanMult(quanternion_z_rot);
    quanternion_rot = quanternion_rot.normalize();
    let quanternion_rot_conj = new Quanternion(-quanternion_rot.x, -quanternion_rot.y, -quanternion_rot.z, quanternion_rot.w);
    let vector_quanternion = new Quanternion(vector.x, vector.y, vector.z, 0);
    vector_quanternion = quanternion_rot.quanMult(vector_quanternion).quanMult(quanternion_rot_conj);
    vector.x = vector_quanternion.x;
    vector.y = vector_quanternion.y;
    vector.z = vector_quanternion.z;
    // 3. Translate
    return vector.add(this.position);
};
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
        _Camera_near.set(this, 1);
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
        let forward = new Vector3(-Math.sin(yaw_rad) * Math.cos(pitch_rad), -Math.sin(pitch_rad), -Math.cos(yaw_rad) * Math.cos(pitch_rad));
        let right = forward.cross(new Vector3(0, -1, 0)).normalize();
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
// - Shapes - //
class Box extends ObjectNode {
    constructor(position, rotation, scale) {
        super(position, rotation, scale);
        _Box_instances.add(this);
        __classPrivateFieldGet(this, _Box_instances, "m", _Box_constructMesh).call(this);
    }
}
_Box_instances = new WeakSet(), _Box_constructMesh = function _Box_constructMesh() {
    // Along z
    let back_1 = new Triangle(new Vector3(-1, -1, 1), new Vector3(-1, 1, 1), new Vector3(1, 1, 1), new RGB(255, 0, 0));
    let back_2 = new Triangle(new Vector3(1, 1, 1), new Vector3(1, -1, 1), new Vector3(-1, -1, 1), new RGB(200, 0, 55));
    let front_1 = new Triangle(new Vector3(1, -1, -1), new Vector3(-1, 1, -1), new Vector3(1, 1, -1), new RGB(0, 255, 0));
    let front_2 = new Triangle(new Vector3(-1, 1, -1), new Vector3(1, -1, -1), new Vector3(-1, -1, -1), new RGB(55, 200, 0));
    // Along x
    let left_1 = new Triangle(new Vector3(-1, -1, 1), new Vector3(-1, 1, 1), new Vector3(-1, -1, -1), new RGB(0, 0, 255));
    let left_2 = new Triangle(new Vector3(-1, -1, -1), new Vector3(-1, 1, -1), new Vector3(-1, 1, 1), new RGB(0, 55, 200));
    let right_1 = new Triangle(new Vector3(1, -1, 1), new Vector3(1, -1, -1), new Vector3(1, 1, -1), new RGB(255, 255, 0));
    let right_2 = new Triangle(new Vector3(1, 1, -1), new Vector3(1, 1, 1), new Vector3(1, -1, 1), new RGB(255, 200, 0));
    // Along y
    let top_1 = new Triangle(new Vector3(-1, 1, -1), new Vector3(1, 1, -1), new Vector3(-1, 1, 1), new RGB(210, 210, 210));
    let top_2 = new Triangle(new Vector3(1, 1, -1), new Vector3(1, 1, 1), new Vector3(-1, 1, 1), new RGB(170, 170, 170));
    let bottom_1 = new Triangle(new Vector3(-1, -1, -1), new Vector3(1, -1, -1), new Vector3(1, -1, 1), new RGB(130, 130, 130));
    let bottom_2 = new Triangle(new Vector3(1, -1, 1), new Vector3(-1, -1, 1), new Vector3(-1, -1, -1), new RGB(90, 90, 90));
    this.mesh.push(back_1, back_2, front_1, front_2, left_1, left_2, right_1, right_2, top_1, top_2, bottom_1, bottom_2);
};
class Plane extends ObjectNode {
    constructor(position, rotation, scale) {
        super(position, rotation, scale);
        _Plane_instances.add(this);
        __classPrivateFieldGet(this, _Plane_instances, "m", _Plane_constructMesh).call(this);
    }
}
_Plane_instances = new WeakSet(), _Plane_constructMesh = function _Plane_constructMesh() {
    // Along z
    let tri_1 = new Triangle(new Vector3(-1, 1, 0), new Vector3(1, 1, 0), new Vector3(1, -1, 0), new RGB(255, 0, 0));
    let tri_2 = new Triangle(new Vector3(-1, 1, 0), new Vector3(1, -1, 0), new Vector3(-1, -1, 0), new RGB(200, 0, 55));
    this.mesh.push(tri_1, tri_2);
};
class CustomMesh extends ObjectNode {
    constructor(position, rotation, scale, mesh) {
        super(position, rotation, scale);
        this.mesh = mesh;
    }
}
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
        objects[obj].worldPositionTriangles().forEach((item) => triangles.push(item));
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
    let pitch_rad = -camera.view_angle.y * (Math.PI / 180);
    let yaw_rad = -camera.view_angle.x * (Math.PI / 180);
    // The point the camera is looking at
    let target = new Vector3(Math.sin(yaw_rad) * Math.cos(pitch_rad), Math.sin(pitch_rad), -Math.cos(yaw_rad) * Math.cos(pitch_rad)).add(camera.position);
    let z_axis = camera.position.minus(target); // The "forward" vector
    let x_axis = new Vector3(0, -1, 0).cross(z_axis).normalize(); // The "right" vector
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
    // Ensures ground is drawn first (a bit of a work around)
    for (let i = 0; i < 2; i++) {
        drawTriangle(ordered_triangles[0]);
        ordered_triangles.splice(0, 1);
    }
    for (let tri = 0; tri < ordered_triangles.length; tri++) {
        drawTriangle(ordered_triangles[tri]);
    }
}
// - Input - //
const BASE_ROTATE_SPEED = 1;
let rotate_speed = BASE_ROTATE_SPEED;
const BASE_MOVE_SPEED = 0.25;
let move_speed = BASE_MOVE_SPEED;
const MOUSE_X_SENS = 0.1;
const MOUSE_Y_SENS = 0.11;
function inputInit() {
    // Init keyboard input
    document.addEventListener("keydown", (ev) => {
        // Checks if the key pressed is used to control the camera
        if (CAMERA_CONTROLLER[ev.key]) {
            CAMERA_CONTROLLER[ev.key].pressed = true;
        }
        if (TOGGLE_CONTROLLER[ev.key]) {
            TOGGLE_CONTROLLER[ev.key].func();
        }
    });
    document.addEventListener("keyup", (ev) => {
        // Checks if the key pressed is used to control the camera
        if (CAMERA_CONTROLLER[ev.key]) {
            CAMERA_CONTROLLER[ev.key].pressed = false;
        }
    });
    // Init mouse input (adapted from https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API)
    canvas.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        if (!document.pointerLockElement) {
            yield canvas.requestPointerLock({
                unadjustedMovement: true,
            });
        }
    }));
    document.addEventListener("pointerlockchange", mouseCapture, false);
}
// Used to track all of the current keys pressed (allowing for multiple inputs at once)
// Each key's function is then executed if the key is pressed in executeMoves()
const CAMERA_CONTROLLER = {
    // Orientation
    "ArrowUp": { pressed: false, func: (camera) => camera.rotate(new Vector2(0, rotate_speed)) }, // Look up
    "ArrowDown": { pressed: false, func: (camera) => camera.rotate(new Vector2(0, -rotate_speed)) }, // Look down
    "ArrowLeft": { pressed: false, func: (camera) => camera.rotate(new Vector2(-rotate_speed, 0)) }, // Look left
    "ArrowRight": { pressed: false, func: (camera) => camera.rotate(new Vector2(rotate_speed, 0)) }, // Look right
    // Position
    "w": { pressed: false, func: (camera) => camera.move(new Vector3(0, 0, move_speed)) }, // Forward
    "a": { pressed: false, func: (camera) => camera.move(new Vector3(-move_speed, 0, 0)) }, // Left
    "s": { pressed: false, func: (camera) => camera.move(new Vector3(0, 0, -move_speed)) }, // Back
    "d": { pressed: false, func: (camera) => camera.move(new Vector3(move_speed, 0, 0)) }, // Right
    "q": { pressed: false, func: (camera) => camera.move(new Vector3(0, -move_speed, 0)) }, // Down
    "e": { pressed: false, func: (camera) => camera.move(new Vector3(0, move_speed, 0)) }, // Up
};
const TOGGLE_CONTROLLER = {
    "Shift": { func: () => move_speed = BASE_MOVE_SPEED * 2 },
    "Control": { func: () => move_speed = BASE_MOVE_SPEED },
};
function mouseCapture() {
    if (document.pointerLockElement === canvas) {
        document.addEventListener("mousemove", mouseRotateCamera, false);
    }
    else {
        document.removeEventListener("mousemove", mouseRotateCamera, false);
    }
}
function mouseRotateCamera(ev) {
    active_camera.rotate(new Vector2(ev.movementX * MOUSE_X_SENS, -ev.movementY * MOUSE_Y_SENS));
}
// Executes all moves based upon current inputs
function executeMoves() {
    // Derived from (https://medium.com/@dovern42/handling-multiple-key-presses-at-once-in-vanilla-javascript-for-game-controllers-6dcacae931b7)
    Object.keys(CAMERA_CONTROLLER).forEach(key => {
        CAMERA_CONTROLLER[key].pressed && CAMERA_CONTROLLER[key].func(active_camera);
    });
}
// - Init - //
let execute = true; // When false, the engine will stop running
// Canvas
let canvas;
let ctx;
const CANVAS_SIZE = new Vector2(1920, 1080); // Computer
// const CANVAS_SIZE = new Vector2(1000, 580); // Laptop
const DIST_SCALE = 0.1;
function canvasInit() {
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
}
// World
let world_objects = [];
let active_camera;
// Creates and instantiates all objects
function worldInit() {
    // Init camera
    active_camera = new Camera();
    // World objects
    let ground = new Plane(new Vector3(0, -10, 0), new Vector3(90, 0, 0), new Vector3(100, 100, 0));
    let reference_box = new Box(new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(1, 1, 2));
    let box_1 = new Box(new Vector3(0, 0, 0), new Vector3(0, 0, 0), new Vector3(5, 5, 5));
    box_1.translate(new Vector3(0, 0, 10));
    world_objects.push(ground, reference_box, box_1);
}
function ready() {
    canvasInit();
    inputInit();
    worldInit();
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
