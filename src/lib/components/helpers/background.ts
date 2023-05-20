type Options = {
	h1: number;
	h2: number;
	s1: number;
	s2: number;
	l1: number;
	l2: number;
	angle: number;
	noiseScale: number;
};

function perlinNoise3D(
	x: number,
	y: number,
	z: number,
	frequency: number = 1,
	persistence: number = 0.5
): number {
	// Convert the input coordinates to a unit cube.
	let u = x / frequency;
	let v = y / frequency;
	let w = z / frequency;

	// Generate 3 random numbers.
	let r1 = Math.random();
	let r2 = Math.random();
	let r3 = Math.random();

	// Calculate the 3D noise value.
	let value = 0;
	for (let i = 0; i < 2; i++) {
		for (let j = 0; j < 2; j++) {
			for (let k = 0; k < 2; k++) {
				let t = (r1 * i + r2 * j + r3 * k) % 1;
				value += grad(t, u, v, w) * persistence;
			}
		}
	}

	// Return the noise value.
	return value;
}

function grad(t: number, u: number, v: number, w: number): number {
	let x = Math.floor(u * 256);
	let y = Math.floor(v * 256);
	let z = Math.floor(w * 256);

	// Calculate the F1 and F2 values.
	let F1 = (t - (x & 1)) * 2 - 1;
	let F2 = (t - ((x + 1) & 1)) * 2 - 1;

	// Calculate the G1 and G2 values.
	let G1 = (y & 1) * 2 - 1;
	let G2 = ((y + 1) & 1) * 2 - 1;

	// Calculate the H1 and H2 values.
	let H1 = (z & 1) * 2 - 1;
	let H2 = ((z + 1) & 1) * 2 - 1;

	// Calculate the gradient vector.
	let dx = F1 * G1 * H1 + F2 * G1 * H2 + F1 * G2 * H2 + F2 * G2 * H1;
	let dy = F1 * G1 * H1 + F1 * G2 * H2 + -F2 * G1 * H2 + -F2 * G2 * H1;
	let dz = F1 * G1 * H1 + -F1 * G2 * H2 + F2 * G1 * H2 + -F2 * G2 * H1;

	// Calculate the gradient value.
	let gradValue = (dx * dx + dy * dy + dz * dz) ** 0.5;

	// Return the gradient value.
	return gradValue;
}

class Particle {
	x: number;
	y: number;
	lx: number;
	ly: number;
	vx: number;
	vy: number;
	ax: number;
	ay: number;
	hueSemen: number;
	hue: number;
	sat: number;
	light: number;
	maxSpeed: number;

	constructor(x: number, y: number, opt: Options) {
		this.x = x;
		this.y = y;
		this.lx = x;
		this.ly = y;
		this.vx = 0;
		this.vy = 0;
		this.ax = 0;
		this.ay = 0;
		this.hueSemen = Math.random();
		this.hue = this.hueSemen > 0.5 ? 20 + opt.h1 : 20 + opt.h2;
		this.sat = this.hueSemen > 0.5 ? opt.s1 : opt.s2;
		this.light = this.hueSemen > 0.5 ? opt.l1 : opt.l2;
		this.maxSpeed = this.hueSemen > 0.5 ? 3 : 2;
	}

	randomize(opt: Options) {
		this.hueSemen = Math.random();
		this.hue = this.hueSemen > 0.5 ? 20 + opt.h1 : 20 + opt.h2;
		this.sat = this.hueSemen > 0.5 ? opt.s1 : opt.s2;
		this.light = this.hueSemen > 0.5 ? opt.l1 : opt.l2;
		this.maxSpeed = this.hueSemen > 0.5 ? 3 : 2;
	}

	update(opt: Options, width: number, height: number, time: number) {
		this.follow(opt, time);

		this.vx += this.ax;
		this.vy += this.ay;

		var p = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
		var a = Math.atan2(this.vy, this.vx);
		var m = Math.min(this.maxSpeed, p);
		this.vx = Math.cos(a) * m;
		this.vy = Math.sin(a) * m;

		this.x += this.vx;
		this.y += this.vy;
		this.ax = 0;
		this.ay = 0;

		this.edges(width, height);
	}

	follow(opt: Options, time: number) {
		let angle =
			perlinNoise3D(
				this.x * opt.noiseScale,
				this.y * opt.noiseScale,
				time * opt.noiseScale,
				0,
				0.1
			) *
				Math.PI *
				0.5 +
			opt.angle;

		this.ax += Math.cos(angle);
		this.ay += Math.sin(angle);
	}

	updatePrev() {
		this.lx = this.x;
		this.ly = this.y;
	}

	edges(width: number, height: number) {
		if (this.x <= 0) {
			this.x = width + 1;
			this.lx = width + 1;
		}
		if (this.x >= width) {
			this.x = 1;
			this.lx = 1;
		}
		if (this.y <= 0) {
			this.y = height + 1;
			this.ly = height + 1;
		}
		if (this.y >= height) {
			this.y = 1;
			this.ly = 1;
		}
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.lx, this.ly);
		ctx.strokeStyle = `hsl(${this.hue}, ${this.sat}%, ${this.light}%)`;
		ctx.stroke();
		this.updatePrev();
	}
}

export default Particle;
