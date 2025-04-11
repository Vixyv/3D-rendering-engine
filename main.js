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
var _Camera_instances, _Camera_near, _Camera_far, _Camera_fov, _Camera_makePerspectiveProjectionMatrix, _ObjectNode_instances, _ObjectNode_modelToWorld, _Box_instances, _Box_createMesh, _Plane_instances, _Plane_createMesh, _Banana_instances, _Banana_createTexture, _Banana_createMesh, _Basket_instances, _Basket_createTexture, _Basket_createMesh;
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
    magnitude() { return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2); }
    normalize() {
        let magnitude = this.magnitude();
        return new Vector3(this.x / magnitude, this.y / magnitude, this.z / magnitude);
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
    // Derived from (https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles#Euler_angles_(in_3-2-1_sequence)_to_quaternion_conversion)
    eulerToQuanternion(roll, pitch, yaw) {
        roll = roll * (Math.PI / 180);
        pitch = pitch * (Math.PI / 180);
        yaw = yaw * (Math.PI / 180);
        let cr = Math.cos(roll * 0.5);
        let sr = Math.sin(roll * 0.5);
        let cp = Math.cos(pitch * 0.5);
        let sp = Math.sin(pitch * 0.5);
        let cy = Math.cos(yaw * 0.5);
        let sy = Math.sin(yaw * 0.5);
        let q = new Quanternion();
        q.x = sr * cp * cy - cr * sp * sy;
        q.y = cr * sp * cy + sr * cp * sy;
        q.z = cr * cp * sy - sr * sp * cy;
        q.w = cr * cp * cy + sr * sp * sy;
        return q;
    }
    normalize() {
        let length = Math.sqrt(this.x ** 2 + this.y ** 2 + this.z * 2 + this.w ** 2);
        return new Quanternion(this.x / length, this.y / length, this.z / length, this.w / length);
    }
}
// - Object Classes - //
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
        _Camera_far.set(this, 1000);
        _Camera_fov.set(this, 90);
        this.pitch_clamp = new Vector2(-50, 78); // Lower and upper vertical clamps on
        this.no_clip = false;
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
    // The direction the camera is facing
    facing() {
        let pitch_rad = this.view_angle.y * (Math.PI / 180);
        let yaw_rad = this.view_angle.x * (Math.PI / 180);
        return new Vector3(-Math.sin(yaw_rad) * Math.cos(pitch_rad), -Math.sin(pitch_rad), -Math.cos(yaw_rad) * Math.cos(pitch_rad));
    }
    // Moves the camera relative to the direction the camera is facing
    move(direction) {
        let forward = this.facing();
        let right = forward.cross(new Vector3(0, -1, 0)).normalize();
        let up = forward.cross(right);
        if (!this.no_clip) {
            up = new Vector3(0, 0, 0);
            right.y = 0;
            right = right.normalize();
            forward.y = 0;
            forward = forward.normalize();
        }
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
        this.colour = new RGB(0, 0, 0);
        this.vert_1 = vert_1;
        this.vert_2 = vert_2;
        this.vert_3 = vert_3;
        this.colour = colour === undefined ? this.colour : colour;
    }
    depth() { return (this.vert_1.z + this.vert_2.z + this.vert_3.z) / 3; }
    // - means facing away from camera, + means facing towards camera
    facing() {
        let A = this.vert_2.minus(this.vert_1);
        let B = this.vert_3.minus(this.vert_1);
        return A.y * B.x - A.x * B.y;
    }
}
class ObjectNode {
    // Only used if a custom mesh is given
    constructor(position, rotation, scale, texture) {
        _ObjectNode_instances.add(this);
        this.mesh = [];
        this.position = position;
        this.rotation = rotation;
        this.scale = scale;
        this.texture = texture;
    }
    // Allows for the texture to be of any length and still safely map to the mesh
    applyTexture() {
        for (let tri = 0; tri < this.mesh.length; tri++) {
            this.mesh[tri].colour = this.texture[tri % this.texture.length];
        }
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
    // 2. Rotate (Doesn't work in the z axis or with multiple rotations, but it's good enough for me)
    let q = new Quanternion(0, 90, 0, 1).eulerToQuanternion(this.rotation.x, this.rotation.y, this.rotation.z).normalize();
    // Derived from (https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation#Quaternion-derived_rotation_matrix)
    let rotation_matrix = [[1 - 2 * (q.y ** 2 + q.z ** 2), 2 * (q.x * q.y - q.z * q.w), 2 * (q.x * q.z + q.y * q.w)],
        [2 * (q.x * q.y + q.z * q.w), 1 - 2 * (q.x ** 2 + q.z ** 2), 2 * (q.y * q.z - q.x * q.w)],
        [2 * (q.x * q.z - q.y * q.w), 2 * (q.y * q.z + q.x * q.w), 1 - 2 * (q.x ** 2 + q.y ** 2)]];
    vector = vector.matrixMult(rotation_matrix);
    // 3. Translate
    return vector.add(this.position);
};
// - Shapes - //
class Box extends ObjectNode {
    constructor(position, rotation, scale, texture) {
        super(position, rotation, scale, texture);
        _Box_instances.add(this);
        __classPrivateFieldGet(this, _Box_instances, "m", _Box_createMesh).call(this);
        super.applyTexture();
    }
}
_Box_instances = new WeakSet(), _Box_createMesh = function _Box_createMesh() {
    // Winding is altered so that all sides except the top face inwards because this is only used for the ground
    // Along z
    let back_1 = new Triangle(new Vector3(-1, 1, 1), new Vector3(-1, -1, 1), new Vector3(1, 1, 1));
    let back_2 = new Triangle(new Vector3(1, -1, 1), new Vector3(1, 1, 1), new Vector3(-1, -1, 1));
    let front_1 = new Triangle(new Vector3(1, -1, -1), new Vector3(-1, 1, -1), new Vector3(1, 1, -1));
    let front_2 = new Triangle(new Vector3(-1, 1, -1), new Vector3(1, -1, -1), new Vector3(-1, -1, -1));
    // Along x
    let left_1 = new Triangle(new Vector3(-1, -1, 1), new Vector3(-1, 1, 1), new Vector3(-1, -1, -1));
    let left_2 = new Triangle(new Vector3(-1, 1, -1), new Vector3(-1, -1, -1), new Vector3(-1, 1, 1));
    let right_1 = new Triangle(new Vector3(1, -1, 1), new Vector3(1, -1, -1), new Vector3(1, 1, -1));
    let right_2 = new Triangle(new Vector3(1, 1, -1), new Vector3(1, 1, 1), new Vector3(1, -1, 1));
    // Along y
    let top_1 = new Triangle(new Vector3(-1, 1, -1), new Vector3(1, 1, -1), new Vector3(-1, 1, 1));
    let top_2 = new Triangle(new Vector3(1, 1, -1), new Vector3(1, 1, 1), new Vector3(-1, 1, 1));
    let bottom_1 = new Triangle(new Vector3(-1, -1, -1), new Vector3(1, -1, -1), new Vector3(1, -1, 1));
    let bottom_2 = new Triangle(new Vector3(1, -1, 1), new Vector3(-1, -1, 1), new Vector3(-1, -1, -1));
    this.mesh.push(back_1, back_2, front_1, front_2, left_1, left_2, right_1, right_2, top_1, top_2, bottom_1, bottom_2);
};
class Plane extends ObjectNode {
    constructor(position, rotation, scale, texture) {
        super(position, rotation, scale, texture);
        _Plane_instances.add(this);
        __classPrivateFieldGet(this, _Plane_instances, "m", _Plane_createMesh).call(this);
        super.applyTexture();
    }
}
_Plane_instances = new WeakSet(), _Plane_createMesh = function _Plane_createMesh() {
    // Along z
    let tri_1 = new Triangle(new Vector3(1, 1, 0), new Vector3(-1, 1, 0), new Vector3(1, -1, 0));
    let tri_2 = new Triangle(new Vector3(1, -1, 0), new Vector3(-1, 1, 0), new Vector3(-1, -1, 0));
    this.mesh.push(tri_1, tri_2);
};
class CustomMesh extends ObjectNode {
    constructor(position, rotation, scale, mesh, texture) {
        super(position, rotation, scale, texture);
        this.mesh = mesh;
        super.applyTexture();
    }
}
class Banana extends ObjectNode {
    constructor(position, rotation, scale, banana_colour) {
        super(position, rotation, scale, [new RGB(0, 0, 0)]);
        _Banana_instances.add(this);
        let main_colour = banana_colour === undefined ? new RGB(250, 250, 55) : banana_colour;
        this.texture = __classPrivateFieldGet(this, _Banana_instances, "m", _Banana_createTexture).call(this, main_colour);
        __classPrivateFieldGet(this, _Banana_instances, "m", _Banana_createMesh).call(this);
        super.applyTexture();
    }
}
_Banana_instances = new WeakSet(), _Banana_createTexture = function _Banana_createTexture(main_colour) {
    return [...Array(10).fill(new RGB(45, 20, 0)), ...Array(28).fill(main_colour), ...Array(10).fill(new RGB(45, 20, 0))];
}, _Banana_createMesh = function _Banana_createMesh() {
    // Banana base
    let base_end_1 = new Triangle(new Vector3(1, -4, -12), new Vector3(-1, -4, -12), new Vector3(-1, -6, -12));
    let base_end_2 = new Triangle(new Vector3(1, -4, -12), new Vector3(-1, -6, -12), new Vector3(1, -6, -12));
    let base_top_1 = new Triangle(new Vector3(-1, -4, -12), new Vector3(1, -4, -12), new Vector3(-1, -4, -11));
    let base_top_2 = new Triangle(new Vector3(1, -4, -12), new Vector3(1, -4, -11), new Vector3(-1, -4, -11));
    let base_bottom_1 = new Triangle(new Vector3(1, -6, -12), new Vector3(-1, -6, -12), new Vector3(-1, -6, -11));
    let base_bottom_2 = new Triangle(new Vector3(1, -6, -11), new Vector3(1, -6, -12), new Vector3(-1, -6, -11));
    let base_left_1 = new Triangle(new Vector3(-1, -4, -12), new Vector3(-1, -4, -11), new Vector3(-1, -6, -11));
    let base_left_2 = new Triangle(new Vector3(-1, -6, -12), new Vector3(-1, -4, -12), new Vector3(-1, -6, -11));
    let base_right_1 = new Triangle(new Vector3(1, -4, -11), new Vector3(1, -4, -12), new Vector3(1, -6, -11));
    let base_right_2 = new Triangle(new Vector3(1, -4, -12), new Vector3(1, -6, -12), new Vector3(1, -6, -11));
    // Banana loop 1
    let bottom_1_1 = new Triangle(new Vector3(1, -6, -11), new Vector3(-1, -6, -11), new Vector3(2, -7.5, -6));
    let bottom_1_2 = new Triangle(new Vector3(2, -7.5, -6), new Vector3(-1, -6, -11), new Vector3(-2, -7.5, -6));
    let top_1_1 = new Triangle(new Vector3(-1, -4, -11), new Vector3(1, -4, -11), new Vector3(2, -4.5, -6));
    let top_1_2 = new Triangle(new Vector3(-1, -4, -11), new Vector3(2, -4.5, -6), new Vector3(-2, -4.5, -6));
    let left_1_1 = new Triangle(new Vector3(-1, -6, -11), new Vector3(-1, -4, -11), new Vector3(-2, -7.5, -6));
    let left_1_2 = new Triangle(new Vector3(-1, -4, -11), new Vector3(-2, -4.5, -6), new Vector3(-2, -7.5, -6));
    let right_1_1 = new Triangle(new Vector3(1, -4, -11), new Vector3(1, -6, -11), new Vector3(2, -7.5, -6));
    let right_1_2 = new Triangle(new Vector3(2, -4.5, -6), new Vector3(1, -4, -11), new Vector3(2, -7.5, -6));
    // Banana loop 2
    let bottom_2_1 = new Triangle(new Vector3(2, -7.5, -6), new Vector3(-2, -7.5, -6), new Vector3(2, -7, 0));
    let bottom_2_2 = new Triangle(new Vector3(-2, -7.5, -6), new Vector3(-2, -7, 0), new Vector3(2, -7, 0));
    let top_2_1 = new Triangle(new Vector3(-2, -4.5, -6), new Vector3(2, -4.5, -6), new Vector3(2, -2, 0));
    let top_2_2 = new Triangle(new Vector3(-2, -4.5, -6), new Vector3(2, -2, 0), new Vector3(-2, -2, 0));
    let left_2_1 = new Triangle(new Vector3(-2, -7.5, -6), new Vector3(-2, -4.5, -6), new Vector3(-2, -2, 0));
    let left_2_2 = new Triangle(new Vector3(-2, -7, 0), new Vector3(-2, -7.5, -6), new Vector3(-2, -2, 0));
    let right_2_1 = new Triangle(new Vector3(2, -4.5, -6), new Vector3(2, -7.5, -6), new Vector3(2, -2, 0));
    let right_2_2 = new Triangle(new Vector3(2, -7.5, -6), new Vector3(2, -7, 0), new Vector3(2, -2, 0));
    // Banana loop 3
    let bottom_3_1 = new Triangle(new Vector3(2, -7, 0), new Vector3(-2, -7, 0), new Vector3(1.5, -3, 4));
    let bottom_3_2 = new Triangle(new Vector3(-2, -7, 0), new Vector3(-1.5, -3, 4), new Vector3(1.5, -3, 4));
    let top_3_1 = new Triangle(new Vector3(-2, -2, 0), new Vector3(2, -2, 0), new Vector3(1, 1, 3));
    let top_3_2 = new Triangle(new Vector3(-1, 1, 3), new Vector3(-2, -2, 0), new Vector3(1, 1, 3));
    let left_3_1 = new Triangle(new Vector3(-2, -7, 0), new Vector3(-2, -2, 0), new Vector3(-1.5, -3, 4));
    let right_3_1 = new Triangle(new Vector3(2, -2, 0), new Vector3(2, -7, 0), new Vector3(1.5, -3, 4));
    // Banana loop 4 (no top)
    let bottom_4_1 = new Triangle(new Vector3(1.5, -3, 4), new Vector3(-1.5, -3, 4), new Vector3(1, 0.5, 4.75));
    let bottom_4_2 = new Triangle(new Vector3(-1.5, -3, 4), new Vector3(-1, 0.5, 4.75), new Vector3(1, 0.5, 4.75));
    let left_4_1 = new Triangle(new Vector3(-2, -2, 0), new Vector3(-1, 1, 3), new Vector3(-1.5, -3, 4));
    let left_4_2 = new Triangle(new Vector3(-1, 0.5, 4.75), new Vector3(-1.5, -3, 4), new Vector3(-1, 1, 3));
    let right_4_1 = new Triangle(new Vector3(1, 1, 3), new Vector3(2, -2, 0), new Vector3(1.5, -3, 4));
    let right_4_2 = new Triangle(new Vector3(1.5, -3, 4), new Vector3(1, 0.5, 4.75), new Vector3(1, 1, 3));
    // Banana stem
    let stem_top_1 = new Triangle(new Vector3(-1, 1, 3), new Vector3(1, 1, 3), new Vector3(1, 4, 4));
    let stem_top_2 = new Triangle(new Vector3(-1, 4, 4), new Vector3(-1, 1, 3), new Vector3(1, 4, 4));
    let stem_bottom_1 = new Triangle(new Vector3(1, 0.5, 4.75), new Vector3(-1, 0.5, 4.75), new Vector3(1, 3.5, 5.75));
    let stem_bottom_2 = new Triangle(new Vector3(-1, 0.5, 4.75), new Vector3(-1, 3.5, 5.75), new Vector3(1, 3.5, 5.75));
    let stem_left_1 = new Triangle(new Vector3(-1, 1, 3), new Vector3(-1, 4, 4), new Vector3(-1, 3.5, 5.75));
    let stem_left_2 = new Triangle(new Vector3(-1, 0.5, 4.75), new Vector3(-1, 1, 3), new Vector3(-1, 3.5, 5.75));
    let stem_right_1 = new Triangle(new Vector3(1, 4, 4), new Vector3(1, 1, 3), new Vector3(1, 3.5, 5.75));
    let stem_right_2 = new Triangle(new Vector3(1, 1, 3), new Vector3(1, 0.5, 4.75), new Vector3(1, 3.5, 5.75));
    let stem_end_1 = new Triangle(new Vector3(-1, 3.5, 5.75), new Vector3(-1, 4, 4), new Vector3(1, 3.5, 5.75));
    let stem_end_2 = new Triangle(new Vector3(-1, 4, 4), new Vector3(1, 4, 4), new Vector3(1, 3.5, 5.75));
    this.mesh.push(base_end_1, base_end_2, base_top_1, base_top_2, base_bottom_1, base_bottom_2, base_left_1, base_left_2, base_right_1, base_right_2, bottom_1_1, bottom_1_2, top_1_1, top_1_2, left_1_1, left_1_2, right_1_1, right_1_2, bottom_2_1, bottom_2_2, top_2_1, top_2_2, left_2_1, left_2_2, right_2_1, right_2_2, bottom_3_1, bottom_3_2, top_3_1, top_3_2, left_3_1, right_3_1, bottom_4_1, bottom_4_2, left_4_1, left_4_2, right_4_1, right_4_2, stem_top_1, stem_top_2, stem_bottom_1, stem_bottom_2, stem_left_1, stem_left_2, stem_right_1, stem_right_2, stem_end_1, stem_end_2);
};
class Basket extends ObjectNode {
    constructor(position, rotation, scale, inside_colour, bottom_colour, basket_colour) {
        super(position, rotation, scale, [new RGB(0, 0, 0)]);
        _Basket_instances.add(this);
        let main_colour = basket_colour === undefined ? new RGB(50, 30, 0) : basket_colour;
        this.texture = __classPrivateFieldGet(this, _Basket_instances, "m", _Basket_createTexture).call(this, main_colour, inside_colour, bottom_colour);
        __classPrivateFieldGet(this, _Basket_instances, "m", _Basket_createMesh).call(this);
        super.applyTexture();
    }
}
_Basket_instances = new WeakSet(), _Basket_createTexture = function _Basket_createTexture(basket_colour, inside_colour, bottom_colour) {
    return [...Array(32).fill(basket_colour), ...Array(16).fill(inside_colour), ...Array(8).fill(inside_colour)];
}, _Basket_createMesh = function _Basket_createMesh() {
    const SQRT2 = Math.SQRT2;
    const INNER_SQRT2 = Math.SQRT2 * 0.75;
    // Top ring
    let t_11 = new Triangle(new Vector3(INNER_SQRT2, 1, INNER_SQRT2), new Vector3(1.5, 1, 0), new Vector3(2, 1, 0));
    let t_12 = new Triangle(new Vector3(2, 1, 0), new Vector3(SQRT2, 1, SQRT2), new Vector3(INNER_SQRT2, 1, INNER_SQRT2));
    let t_21 = new Triangle(new Vector3(0, 1, 1.5), new Vector3(INNER_SQRT2, 1, INNER_SQRT2), new Vector3(SQRT2, 1, SQRT2));
    let t_22 = new Triangle(new Vector3(SQRT2, 1, SQRT2), new Vector3(0, 1, 2), new Vector3(0, 1, 1.5));
    let t_31 = new Triangle(new Vector3(-INNER_SQRT2, 1, INNER_SQRT2), new Vector3(0, 1, 1.5), new Vector3(0, 1, 2));
    let t_32 = new Triangle(new Vector3(0, 1, 2), new Vector3(-SQRT2, 1, SQRT2), new Vector3(-INNER_SQRT2, 1, INNER_SQRT2));
    let t_41 = new Triangle(new Vector3(-1.5, 1, 0), new Vector3(-INNER_SQRT2, 1, INNER_SQRT2), new Vector3(-SQRT2, 1, SQRT2));
    let t_42 = new Triangle(new Vector3(-SQRT2, 1, SQRT2), new Vector3(-2, 1, 0), new Vector3(-1.5, 1, 0));
    let t_51 = new Triangle(new Vector3(-INNER_SQRT2, 1, -INNER_SQRT2), new Vector3(-1.5, 1, 0), new Vector3(-2, 1, 0));
    let t_52 = new Triangle(new Vector3(-2, 1, 0), new Vector3(-SQRT2, 1, -SQRT2), new Vector3(-INNER_SQRT2, 1, -INNER_SQRT2));
    let t_61 = new Triangle(new Vector3(0, 1, -1.5), new Vector3(-INNER_SQRT2, 1, -INNER_SQRT2), new Vector3(-SQRT2, 1, -SQRT2));
    let t_62 = new Triangle(new Vector3(-SQRT2, 1, -SQRT2), new Vector3(0, 1, -2), new Vector3(0, 1, -1.5));
    let t_71 = new Triangle(new Vector3(INNER_SQRT2, 1, -INNER_SQRT2), new Vector3(0, 1, -1.5), new Vector3(0, 1, -2));
    let t_72 = new Triangle(new Vector3(0, 1, -2), new Vector3(SQRT2, 1, -SQRT2), new Vector3(INNER_SQRT2, 1, -INNER_SQRT2));
    let t_81 = new Triangle(new Vector3(1.5, 1, 0), new Vector3(INNER_SQRT2, 1, -INNER_SQRT2), new Vector3(SQRT2, 1, -SQRT2));
    let t_82 = new Triangle(new Vector3(SQRT2, 1, -SQRT2), new Vector3(2, 1, 0), new Vector3(1.5, 1, 0));
    // Outside ring
    let o_11 = new Triangle(new Vector3(2, -1, 0), new Vector3(SQRT2, -1, SQRT2), new Vector3(2, 1, 0));
    let o_12 = new Triangle(new Vector3(SQRT2, 1, SQRT2), new Vector3(2, 1, 0), new Vector3(SQRT2, -1, SQRT2));
    let o_21 = new Triangle(new Vector3(SQRT2, -1, SQRT2), new Vector3(0, -1, 2), new Vector3(SQRT2, 1, SQRT2));
    let o_22 = new Triangle(new Vector3(0, 1, 2), new Vector3(SQRT2, 1, SQRT2), new Vector3(0, -1, 2));
    let o_31 = new Triangle(new Vector3(0, -1, 2), new Vector3(-SQRT2, -1, SQRT2), new Vector3(0, 1, 2));
    let o_32 = new Triangle(new Vector3(-SQRT2, 1, SQRT2), new Vector3(0, 1, 2), new Vector3(-SQRT2, -1, SQRT2));
    let o_41 = new Triangle(new Vector3(-SQRT2, -1, SQRT2), new Vector3(-2, -1, 0), new Vector3(-SQRT2, 1, SQRT2));
    let o_42 = new Triangle(new Vector3(-2, 1, 0), new Vector3(-SQRT2, 1, SQRT2), new Vector3(-2, -1, 0));
    let o_51 = new Triangle(new Vector3(-2, -1, 0), new Vector3(-SQRT2, -1, -SQRT2), new Vector3(-2, 1, 0));
    let o_52 = new Triangle(new Vector3(-SQRT2, 1, -SQRT2), new Vector3(-2, 1, 0), new Vector3(-SQRT2, -1, -SQRT2));
    let o_61 = new Triangle(new Vector3(-SQRT2, -1, -SQRT2), new Vector3(0, -1, -2), new Vector3(-SQRT2, 1, -SQRT2));
    let o_62 = new Triangle(new Vector3(0, 1, -2), new Vector3(-SQRT2, 1, -SQRT2), new Vector3(0, -1, -2));
    let o_71 = new Triangle(new Vector3(0, -1, -2), new Vector3(SQRT2, -1, -SQRT2), new Vector3(0, 1, -2));
    let o_72 = new Triangle(new Vector3(SQRT2, 1, -SQRT2), new Vector3(0, 1, -2), new Vector3(SQRT2, -1, -SQRT2));
    let o_81 = new Triangle(new Vector3(SQRT2, -1, -SQRT2), new Vector3(2, -1, 0), new Vector3(SQRT2, 1, -SQRT2));
    let o_82 = new Triangle(new Vector3(2, 1, 0), new Vector3(SQRT2, 1, -SQRT2), new Vector3(2, -1, 0));
    // Inside ring
    let i_11 = new Triangle(new Vector3(1.5, 1, 0), new Vector3(INNER_SQRT2, 1, INNER_SQRT2), new Vector3(1.5, -0.5, 0));
    let i_12 = new Triangle(new Vector3(INNER_SQRT2, -0.5, INNER_SQRT2), new Vector3(1.5, -0.5, 0), new Vector3(INNER_SQRT2, 1, INNER_SQRT2));
    let i_21 = new Triangle(new Vector3(INNER_SQRT2, 1, INNER_SQRT2), new Vector3(0, 1, 1.5), new Vector3(INNER_SQRT2, -0.5, INNER_SQRT2));
    let i_22 = new Triangle(new Vector3(0, -0.5, 1.5), new Vector3(INNER_SQRT2, -0.5, INNER_SQRT2), new Vector3(0, 1, 1.5));
    let i_31 = new Triangle(new Vector3(0, 1, 1.5), new Vector3(-INNER_SQRT2, 1, INNER_SQRT2), new Vector3(0, -0.5, 1.5));
    let i_32 = new Triangle(new Vector3(-INNER_SQRT2, -0.5, INNER_SQRT2), new Vector3(0, -0.5, 1.5), new Vector3(-INNER_SQRT2, 1, INNER_SQRT2));
    let i_41 = new Triangle(new Vector3(-INNER_SQRT2, 1, INNER_SQRT2), new Vector3(-1.5, 1, 0), new Vector3(-INNER_SQRT2, -0.5, INNER_SQRT2));
    let i_42 = new Triangle(new Vector3(-1.5, -0.5, 0), new Vector3(-INNER_SQRT2, -0.5, INNER_SQRT2), new Vector3(-1.5, 1, 0));
    let i_51 = new Triangle(new Vector3(-1.5, 1, 0), new Vector3(-INNER_SQRT2, 1, -INNER_SQRT2), new Vector3(-1.5, -0.5, 0));
    let i_52 = new Triangle(new Vector3(-INNER_SQRT2, -0.5, -INNER_SQRT2), new Vector3(-1.5, -0.5, 0), new Vector3(-INNER_SQRT2, 1, -INNER_SQRT2));
    let i_61 = new Triangle(new Vector3(-INNER_SQRT2, 1, -INNER_SQRT2), new Vector3(0, 1, -1.5), new Vector3(-INNER_SQRT2, -0.5, -INNER_SQRT2));
    let i_62 = new Triangle(new Vector3(0, -0.5, -1.5), new Vector3(-INNER_SQRT2, -0.5, -INNER_SQRT2), new Vector3(0, 1, -1.5));
    let i_71 = new Triangle(new Vector3(0, 1, -1.5), new Vector3(INNER_SQRT2, 1, -INNER_SQRT2), new Vector3(0, -0.5, -1.5));
    let i_72 = new Triangle(new Vector3(INNER_SQRT2, -0.5, -INNER_SQRT2), new Vector3(0, -0.5, -1.5), new Vector3(INNER_SQRT2, 1, -INNER_SQRT2));
    let i_81 = new Triangle(new Vector3(INNER_SQRT2, 1, -INNER_SQRT2), new Vector3(1.5, 1, 0), new Vector3(INNER_SQRT2, -0.5, -INNER_SQRT2));
    let i_82 = new Triangle(new Vector3(1.5, -0.5, 0), new Vector3(INNER_SQRT2, -0.5, -INNER_SQRT2), new Vector3(1.5, 1, 0));
    // Bottom
    let b_1 = new Triangle(new Vector3(1.5, -0.5, 0), new Vector3(INNER_SQRT2, -0.5, INNER_SQRT2), new Vector3(0, -0.5, 0));
    let b_2 = new Triangle(new Vector3(INNER_SQRT2, -0.5, INNER_SQRT2), new Vector3(0, -0.5, 1.5), new Vector3(0, -0.5, 0));
    let b_3 = new Triangle(new Vector3(0, -0.5, 1.5), new Vector3(-INNER_SQRT2, -0.5, INNER_SQRT2), new Vector3(0, -0.5, 0));
    let b_4 = new Triangle(new Vector3(-INNER_SQRT2, -0.5, INNER_SQRT2), new Vector3(-1.5, -0.5, 0), new Vector3(0, -0.5, 0));
    let b_5 = new Triangle(new Vector3(-1.5, -0.5, 0), new Vector3(-INNER_SQRT2, -0.5, -INNER_SQRT2), new Vector3(0, -0.5, 0));
    let b_6 = new Triangle(new Vector3(-INNER_SQRT2, -0.5, -INNER_SQRT2), new Vector3(0, -0.5, -1.5), new Vector3(0, -0.5, 0));
    let b_7 = new Triangle(new Vector3(0, -0.5, -1.5), new Vector3(INNER_SQRT2, -0.5, -INNER_SQRT2), new Vector3(0, -0.5, 0));
    let b_8 = new Triangle(new Vector3(INNER_SQRT2, -0.5, -INNER_SQRT2), new Vector3(1.5, -0.5, 0), new Vector3(0, -0.5, 0));
    this.mesh.push(t_11, t_12, t_21, t_22, t_31, t_32, t_41, t_42, t_51, t_52, t_61, t_62, t_71, t_72, t_81, t_82, o_11, o_12, o_21, o_22, o_31, o_32, o_41, o_42, o_51, o_52, o_61, o_62, o_71, o_72, o_81, o_82, i_11, i_12, i_21, i_22, i_31, i_32, i_41, i_42, i_51, i_52, i_61, i_62, i_71, i_72, i_81, i_82, b_1, b_2, b_3, b_4, b_5, b_6, b_7, b_8);
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
// Produces a random int from a to b
function rand_int(a, b) {
    return Math.floor(Math.random() * b) + a;
}
// Stops the program from running for n milliseconds (https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// - Rendering - //
// Notes //
// Directionality: y-up, right-handed (https://pbs.twimg.com/media/EmVSW5AW8AAoDD9.jpg:large)
// Winding order: counter clock-wise
function unpackObjects(objects) {
    let triangles = [];
    // Copies every triangle in all of the objects to be drawn (copied as the triangles will be mapped to screen space)
    for (let obj = 0; obj < objects.length; obj++) {
        objects[obj].worldPositionTriangles().forEach((item) => triangles.push(item));
    }
    return triangles;
}
function trianglesToClipSpace(camera, camera_target, mvp_matrix, unmapped_triangles) {
    for (let tri = 0; tri < unmapped_triangles.length; tri++) {
        unmapped_triangles[tri].vert_1 = worldToScreen(camera, camera_target, mvp_matrix, unmapped_triangles[tri].vert_1);
        unmapped_triangles[tri].vert_2 = worldToScreen(camera, camera_target, mvp_matrix, unmapped_triangles[tri].vert_2);
        unmapped_triangles[tri].vert_3 = worldToScreen(camera, camera_target, mvp_matrix, unmapped_triangles[tri].vert_3);
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
function cameraTarget(camera) {
    let pitch_rad = -camera.view_angle.y * (Math.PI / 180);
    let yaw_rad = -camera.view_angle.x * (Math.PI / 180);
    return new Vector3(Math.sin(yaw_rad) * Math.cos(pitch_rad), Math.sin(pitch_rad), -Math.cos(yaw_rad) * Math.cos(pitch_rad));
}
function pointBehindCamera(camera, camera_taget, vector) {
    return camera_taget.dot(vector.minus(camera.position)) > 0;
}
function worldToScreen(camera, camera_target, mvp_matrix, vector) {
    let vec_4 = new Vector4(vector.x, vector.y, vector.z, 1);
    vec_4 = vec_4.matrixMult(mvp_matrix);
    vec_4.w = 1;
    vec_4 = vec_4.matrixMult(camera.projection_matrix);
    if (vec_4.w != 0) {
        // If the point is behind the camera, its axes need to be inverted
        if (pointBehindCamera(camera, camera_target, vector)) {
            vec_4.w = -vec_4.w * 0.1;
        }
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
    // Removes triangles facing away from the camera
    for (let tri = 0; tri < triangles.length; tri++) {
        if (triangles[tri].facing() <= 0) {
            triangles.splice(tri, 1);
            tri--;
            continue;
        }
    }
    // Removes triangles that would be drawn on screen when behind the camera
    for (let tri = 0; tri < triangles.length; tri++) {
        let verts = [triangles[tri].vert_1, triangles[tri].vert_2, triangles[tri].vert_3];
        let x_signs = Math.abs(Math.sin(verts[0].x) + Math.sin(verts[1].x) + Math.sin(verts[2].x));
        let y_signs = Math.abs(Math.sin(verts[0].y) + Math.sin(verts[1].y) + Math.sin(verts[2].y));
        if (triangles[tri].depth() > 0 && x_signs != 3 && y_signs != 3) {
            triangles.splice(tri, 1);
            tri--;
            continue;
        }
    }
    triangles.sort((tri_1, tri_2) => {
        return tri_1.depth() - tri_2.depth();
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
function drawUI() {
    ctx.font = "50px Helvetica";
    ctx.textAlign = "left";
    ctx.lineWidth = 1.5;
    ctx.lineJoin = "round";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Level: " + (level + 1), 10, 50);
    ctx.fillStyle = "#000000";
    ctx.strokeText("Level: " + (level + 1), 10, 50);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Score: " + score, 10, 105);
    ctx.fillStyle = "#000000";
    ctx.strokeText("Score: " + score, 10, 105);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Quota: " + quota[level], 10, 160);
    ctx.fillStyle = "#000000";
    ctx.strokeText("Quota: " + quota[level], 10, 160);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Time: " + Math.ceil(quota_timer * 0.01), 10, 215);
    ctx.fillStyle = "#000000";
    ctx.strokeText("Time: " + Math.ceil(quota_timer * 0.01), 10, 215);
}
function render(camera, objects) {
    let unmapped_triangles = unpackObjects(objects);
    let mvp_matrix = makeMVPMatrix(camera);
    let camera_target = cameraTarget(camera);
    let mapped_triangles = trianglesToClipSpace(camera, camera_target, mvp_matrix, unmapped_triangles);
    let ordered_triangles = orderTriangles(mapped_triangles);
    drawSkyBox();
    for (let tri = 0; tri < ordered_triangles.length; tri++) {
        drawTriangle(ordered_triangles[tri]);
    }
    drawUI();
}
// Screens for the start and end of the game
function gameStartScreen() {
    ctx.fillStyle = "#F2D16D";
    ctx.beginPath();
    ctx.fillRect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y);
    ctx.textAlign = "center";
    ctx.font = "50px Helvetica";
    ctx.fillStyle = "#000000";
    ctx.fillText("Bonzo Bananas", CANVAS_SIZE.x / 2, CANVAS_SIZE.y / 2 - 30);
    ctx.font = "35px Helvetica";
    ctx.fillStyle = "#000000";
    ctx.fillText("click on the screen to start", CANVAS_SIZE.x / 2, CANVAS_SIZE.y / 2 + 30);
}
// TODO: Just use a semi transparent background + some text
function gamePauseScreen() {
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "rgb(131, 131, 131)";
    ctx.beginPath();
    ctx.fillRect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y);
    ctx.globalAlpha = 1;
    ctx.textAlign = "center";
    ctx.font = "50px Helvetica";
    ctx.fillStyle = "#000000";
    ctx.fillText("Game Paused", CANVAS_SIZE.x / 2, CANVAS_SIZE.y / 2 - 30);
    ctx.font = "35px Helvetica";
    ctx.fillStyle = "#000000";
    ctx.fillText("click on the screen to unpause", CANVAS_SIZE.x / 2, CANVAS_SIZE.y / 2 + 30);
}
function gameEndScreen(win) {
    execute = false;
    game_over = true;
    if (win) {
        new Audio("game_won.mp3").play();
        ctx.fillStyle = "#8DF279";
        ctx.beginPath();
        ctx.fillRect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y);
        ctx.textAlign = "center";
        ctx.font = "50px Helvetica";
        ctx.fillStyle = "#000000";
        ctx.fillText("Game Over, You Won!", CANVAS_SIZE.x / 2, CANVAS_SIZE.y / 2 - 30);
        ctx.font = "35px Helvetica";
        ctx.fillStyle = "#000000";
        ctx.fillText("press r to play again", CANVAS_SIZE.x / 2, CANVAS_SIZE.y / 2 + 30);
    }
    else {
        new Audio("game_lost.mp3").play();
        ctx.fillStyle = "#F27979";
        ctx.beginPath();
        ctx.fillRect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y);
        ctx.textAlign = "center";
        ctx.font = "50px Helvetica";
        ctx.fillStyle = "#000000";
        ctx.fillText("Game Over, You Lost", CANVAS_SIZE.x / 2, CANVAS_SIZE.y / 2 - 30);
        ctx.font = "35px Helvetica";
        ctx.fillStyle = "#000000";
        ctx.fillText("press r to play again", CANVAS_SIZE.x / 2, CANVAS_SIZE.y / 2 + 30);
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
        if (BUTTON_CONTROLLER[ev.key]) {
            BUTTON_CONTROLLER[ev.key].pressed = true;
        }
    });
    document.addEventListener("keyup", (ev) => {
        // Checks if the key pressed is used to control the camera
        if (CAMERA_CONTROLLER[ev.key]) {
            CAMERA_CONTROLLER[ev.key].pressed = false;
        }
        if (BUTTON_CONTROLLER[ev.key]) {
            BUTTON_CONTROLLER[ev.key].pressed = false;
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
const BUTTON_CONTROLLER = {
    "r": { pressed: false, func: () => { console.log(game_over); if (game_over) {
            resetGame();
        } } },
};
function mouseCapture() {
    if (document.pointerLockElement === canvas) {
        document.addEventListener("mousemove", mouseRotateCamera, false);
        if (!game_over) {
            execute = true;
            requestAnimationFrame((timestamp) => process(timestamp, true));
        }
    }
    else {
        document.removeEventListener("mousemove", mouseRotateCamera, false);
        if (!game_over) {
            execute = false;
            setTimeout(gamePauseScreen, 5); // Ensures that the pause screen is drawn on top of the last frame
        }
    }
}
function mouseRotateCamera(ev) {
    active_camera.rotate(new Vector2(ev.movementX * MOUSE_X_SENS, -ev.movementY * MOUSE_Y_SENS));
}
// Executes all moves based upon current inputs
function executeCameraInputs() {
    // Derived from (https://medium.com/@dovern42/handling-multiple-key-presses-at-once-in-vanilla-javascript-for-game-controllers-6dcacae931b7)
    Object.keys(CAMERA_CONTROLLER).forEach(key => {
        CAMERA_CONTROLLER[key].pressed && CAMERA_CONTROLLER[key].func(active_camera);
    });
}
function executeButtonInputs() {
    Object.keys(BUTTON_CONTROLLER).forEach(key => {
        BUTTON_CONTROLLER[key].pressed && BUTTON_CONTROLLER[key].func();
    });
}
function toggleNoClip() {
    active_camera.no_clip = active_camera.no_clip ? false : true;
}
function clipCameraPos() {
    active_camera.position.x = clamp(active_camera.position.x, -WORLD_BOUNDRY, WORLD_BOUNDRY);
    active_camera.position.z = clamp(active_camera.position.z, -WORLD_BOUNDRY, WORLD_BOUNDRY);
}
// - Init - //
let execute = false; // When false, the engine will stop running
// Canvas
let canvas;
let ctx;
// TODO: Make the canvas size dynamic for any window size (even if it changes)
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
const WORLD_BOUNDRY = 40;
const SKY_HEIGHT = 130;
// Game
let basket;
// Creates and instantiates all objects
function worldInit() {
    // Init camera
    active_camera = new Camera(new Vector3(0.1, 25, 0.1));
    // World objects
    let ground_colour = new RGB(46, 173, 3);
    let ground_size = (WORLD_BOUNDRY + 15) * 0.5;
    let wall_colour = new RGB(145, 97, 38);
    let wall_height = 4;
    let sky_colour = new RGB(61, 200, 255);
    let sky_border_size = 10;
    let sky_border_colour = new RGB(30, 30, 30);
    let ground_1 = new Box(new Vector3(ground_size, -ground_size, ground_size), new Vector3(0, 0, 0), new Vector3(ground_size, ground_size, ground_size), [ground_colour]);
    let ground_2 = new Box(new Vector3(ground_size, -ground_size, -ground_size), new Vector3(0, 0, 0), new Vector3(ground_size, ground_size, ground_size), [ground_colour]);
    let ground_3 = new Box(new Vector3(-ground_size, -ground_size, ground_size), new Vector3(0, 0, 0), new Vector3(ground_size, ground_size, ground_size), [ground_colour]);
    let ground_4 = new Box(new Vector3(-ground_size, -ground_size, -ground_size), new Vector3(0, 0, 0), new Vector3(ground_size, ground_size, ground_size), [ground_colour]);
    let sky = new Plane(new Vector3(0, SKY_HEIGHT, 0), new Vector3(90, 0, 0), new Vector3(ground_size * 1.5, ground_size * 1.5, 0), [sky_colour]);
    let sky_border = new Plane(new Vector3(0, SKY_HEIGHT + 5, 0), new Vector3(90, 0, 0), new Vector3(ground_size * 1.5 + sky_border_size, ground_size * 1.5 + sky_border_size, 0), [sky_border_colour]);
    let wall_1 = new Plane(new Vector3(-ground_size * 2, wall_height, 0), new Vector3(0, 90, 0), new Vector3(ground_size * 2, wall_height, 1), [wall_colour]);
    let wall_2 = new Plane(new Vector3(ground_size * 2, wall_height, 0), new Vector3(0, -90, 0), new Vector3(ground_size * 2, wall_height, 1), [wall_colour]);
    let wall_3 = new Plane(new Vector3(0, wall_height, -ground_size * 2), new Vector3(0, 180, 0), new Vector3(ground_size * 2, wall_height, 1), [wall_colour]);
    let wall_4 = new Plane(new Vector3(0, wall_height, ground_size * 2), new Vector3(0, 0, 0), new Vector3(ground_size * 2, wall_height, 1), [wall_colour]);
    basket = new Basket(new Vector3(0, 20, 0), new Vector3(0, 0, 0), new Vector3(0.25, 0.4, 0.25), new RGB(255, 255, 20), new RGB(196, 196, 53));
    world_objects.push(ground_1, ground_2, ground_3, ground_4, sky, sky_border, wall_1, wall_2, wall_3, wall_4, basket);
}
function ready() {
    canvasInit();
    inputInit();
    worldInit();
    gameStartScreen();
}
let last_animation_frame = 0;
let delta = 0; // Represents the amount of time since the last animation frame
function process(timestamp, unpaused) {
    return __awaiter(this, void 0, void 0, function* () {
        // Unpaused is true if the engine was just unpaused (stoped and then started again)
        delta = unpaused ? 0 : (timestamp - last_animation_frame) * 0.1;
        last_animation_frame = timestamp;
        executeButtonInputs();
        if (execute) {
            render(active_camera, world_objects);
            executeCameraInputs();
            if (!active_camera.no_clip) {
                clipCameraPos();
            }
            updateGame();
            requestAnimationFrame((timestamp) => process(timestamp, false));
        }
        else {
            requestAnimationFrame((timestamp) => process(timestamp, true));
        }
    });
}
// - Game Logic - //
// Manages the logic for game functionality
function updateGame() {
    basket.position = active_camera.position.add(active_camera.facing().scale(-2));
    basket.position.y = active_camera.position.y - 1;
    bananaManager();
}
function resetGame() {
    active_camera.position = new Vector3(0.1, 25, 0.1);
    score = 0;
    level = 0;
    quota_timer = quota_time[level];
    game_over = false;
    requestAnimationFrame((timestamp) => process(timestamp, true));
}
let game_over = false;
let score = 0;
let level = 0;
let quota = {
    0: 3,
    1: 5,
    2: 8,
    3: 10,
    4: 15,
    5: 20,
};
// In milliseconds
let quota_time = {
    0: 2000,
    1: 1800,
    2: 1500,
    3: 1400,
    4: 1400,
    5: 1500,
};
let quota_timer = quota_time[level];
// Bananas that current exist in the game
let active_bananas = [];
let max_bananas = {
    0: 10,
    1: 20,
    2: 30,
    3: 20,
    4: 30,
    5: 30,
};
// How many bananas are spawned at once
let banana_bunches = {
    0: 1,
    1: 1,
    2: 2,
    3: 2,
    4: 3,
    5: 3,
};
let banana_speed = {
    0: 1,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
};
// In milliseconds
let banana_spawn_delay = {
    0: 100,
    1: 70,
    2: 50,
    3: 40,
    4: 20,
    5: 10,
};
let banana_spawn_timer = 0;
function bananaManager() {
    if (active_bananas.length < max_bananas[level] && banana_spawn_timer <= 0) {
        banana_spawn_timer = banana_spawn_delay[level];
        for (let banana = 0; banana < banana_bunches[level]; banana++) {
            let new_banana = spawnRandomBanana();
            active_bananas.push(new_banana);
            world_objects.push(new_banana);
        }
    }
    banana_spawn_timer -= delta;
    for (let banana = 0; banana < active_bananas.length; banana++) {
        if (bananaColliding(active_bananas[banana])) {
            world_objects.splice(world_objects.indexOf(active_bananas[banana]), 1);
            active_bananas.splice(active_bananas.indexOf(active_bananas[banana]), 1);
        }
        else {
            active_bananas[banana].position.y -= delta * (0.2 * banana_speed[level]);
        }
    }
    if (quota_timer < 0) {
        setTimeout(() => gameEndScreen(false), 5); // Ensures that the game end screen is drawn on top of the last frame
    }
    quota_timer -= delta;
}
function spawnRandomBanana() {
    let position = new Vector3(rand_int(-WORLD_BOUNDRY, WORLD_BOUNDRY * 2), SKY_HEIGHT + rand_int(-9, -2), rand_int(-WORLD_BOUNDRY, WORLD_BOUNDRY * 2));
    let rotation = new Vector3(0, rand_int(0, 359), 0);
    let scale = rand_int(0.15, 0.25);
    let colour = new RGB(250, 250, 55);
    return new Banana(position, rotation, new Vector3(scale, scale, scale), colour);
}
function bananaColliding(banana) {
    if (banana.position.y <= 7) {
        return true;
    }
    // Bounding boxes of the banana and basket
    // Very forgiving
    let min_x = basket.position.x - basket.scale.x * 1.6 - banana.scale.x * 10;
    let max_x = basket.position.x + basket.scale.x * 1.6 + banana.scale.x * 10;
    let min_z = basket.position.z - basket.scale.z * 1.6 - banana.scale.z * 10;
    let max_z = basket.position.z + basket.scale.z * 1.6 + banana.scale.z * 10;
    let max_y = basket.position.y + basket.scale.y + 1;
    if (banana.position.y < max_y && banana.position.x > min_x && banana.position.x < max_x && banana.position.z > min_z && banana.position.z < max_z) {
        bananaCollected();
        return true;
    }
    return false;
}
function bananaCollected() {
    score++;
    new Audio("score_sound.mp3").play(); // Allows for the sound to be played overtop of itself
    if (score >= quota[level]) {
        levelUp();
    }
}
function levelUp() {
    level++;
    quota_timer = quota_time[level];
    if (level > 5) {
        setTimeout(() => gameEndScreen(true), 5); // Ensures that the game end screen is drawn on top of the last frame
    }
    setTimeout(() => {
        score = 0;
        new Audio("quota_sound.mp3").play();
        let current_banana_amount = active_bananas.length;
        for (let banana = 0; banana < current_banana_amount; banana++) {
            world_objects.splice(world_objects.indexOf(active_bananas[banana]), 1);
            active_bananas.splice(active_bananas.indexOf(active_bananas[banana]), 1);
        }
    }, 500);
}
