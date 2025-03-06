// - Init - //

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

function init() {
    let temp_canvas = document.getElementById("canvas");
    if (!temp_canvas || !(temp_canvas instanceof HTMLCanvasElement)) {
        throw new Error('Failed to get canvas');
    }
    canvas = temp_canvas;

    let temp_ctx = canvas.getContext('2d');
    if (!temp_ctx || !(temp_ctx instanceof CanvasRenderingContext2D)) {
        throw new Error('Failed to get 2D context');
    }
    ctx = temp_ctx;
}

// - Classes - //

class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(vector: Vector3) {
        return new Vector3(this.x+vector.x, this.y+vector.y, this.z+vector.z);
    }

    minus(vector: Vector3) {
        return new Vector3(this.x-vector.x, this.y-vector.y, this.z-vector.z);
    }
}

class Vector3 {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(vector: Vector3) {
        return new Vector3(this.x+vector.x, this.y+vector.y, this.z+vector.z);
    }

    minus(vector: Vector3) {
        return new Vector3(this.x-vector.x, this.y-vector.y, this.z-vector.z);
    }
}

type RGB = `rgb(${number}, ${number}, ${number})`;

// Used for meshs
class Triangle {
    vert1: Vector3;
    vert2: Vector3;
    vert3: Vector3;
    colour: RGB;

    constructor(vert1: Vector3, vert2: Vector3, vert3: Vector3, colour: RGB) {
        this.vert1 = vert1;
        this.vert2 = vert2;
        this.vert3 = vert3;
        this.colour = colour;
    }
}

class Object3D {
    position: Vector3;
    triangles: Array<Triangle>;

    // Only used if a custom mesh is given.
    // args: [Vector3, Array<Triangle>] ensures that if a 
    // custom mesh is given, a position is also given.
    constructor(args: [Vector3, Array<Triangle>] = [new Vector3(0, 0, 0), []]) {
        this.position = args[0];
        this.triangles = args[1];
    }

    // Position is at bottom right corner
    newSquare(position: Vector3, side_length: number) {

    }

    // Physics Functions //
    translate(vector: Vector3) {
        for (let tri = 0; tri<this.triangles.length; tri++) {
            this.triangles[tri].vert1.add(vector);
            this.triangles[tri].vert2.add(vector);
            this.triangles[tri].vert3.add(vector);
        }
    }

    moveTo(location: Vector3) {
        let vector_change = this.position.minus(location);
        this.translate(vector_change);
    }
}

class Camera {
    position: Vector3;
    view_angle: Vector2;
    fov: number;

    constructor(position: Vector3 = new Vector3(0, 0, 0), view_angle: Vector2 = new Vector2(0, 0), fov: number = 90) {
        this.position = position;
        this.view_angle = view_angle;
        this.fov = fov;
    }

    rotate() {
        
    }

    rotateTo() {

    }
}

// - Rendering - //

// Notes //
// Directionality: y-up, right-handed

let objects = [];

function drawTri(triangle: Triangle2D) {
    ctx.beginPath();
	ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
}



// - Physics - //

