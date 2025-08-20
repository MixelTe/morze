import * as Lib from "../littleLib.js"

const textEl = Lib.getEl("text", HTMLTextAreaElement);
const canvas = Lib.getCanvas("canvas");
const ctx = Lib.getCanvasContext(canvas);
const inp_perfect = Lib.get.input("inp_perfect");
const inp_theme = Lib.get.input("inp_theme");
const inp_size = Lib.get.input("inp_size");
const inp_lwidth = Lib.get.input("inp_lwidth");
const inp_rnd = Lib.get.input("inp_rnd");
const inp_seed = Lib.get.input("inp_seed");
Lib.addButtonListener("btn_dot", () => { textEl.value += "."; onTextUpdate(); });
Lib.addButtonListener("btn_space", () => { textEl.value += " "; onTextUpdate(); });
Lib.addButtonListener("btn_dash", () => { textEl.value += "-"; onTextUpdate(); });
Lib.addButtonListener("btn_rem", () => { textEl.value = textEl.value.slice(0, textEl.value.length - 1); onTextUpdate(); });
Lib.addButtonListener("btn_fs", () => { document.body.classList.toggle("fs"); draw(); });

textEl.addEventListener("input", onTextUpdate)
textEl.value = localStorage.getItem("morze2_text") || "";
setTimeout(draw);
window.addEventListener("resize", draw);

function onTextUpdate()
{
	textEl.value = textEl.value.replaceAll(/[^. -]/g, '');
	localStorage.setItem("morze2_text", textEl.value);
	draw();
}

let LH = 8;
let LW = 0.5;
let Scale = 6;
let perfect = false;
let rnd = 1;
let light = false;
let lastC = NaN;
let seed = 1;
let random = Lib.random.withSeed(seed);

inp_perfect.addEventListener("input", () =>
{
	perfect = inp_perfect.checked;
	draw();
});
inp_theme.addEventListener("input", () =>
{
	light = inp_theme.checked;
	document.body.classList.toggle("light", light);
	draw();
});
inp_size.min = "2";
inp_size.max = "10";
inp_size.step = "0.1";
inp_size.valueAsNumber = Scale;
inp_size.addEventListener("input", () =>
{
	Scale = inp_size.valueAsNumber;
	draw();
});
inp_lwidth.min = "0.05";
inp_lwidth.max = "1.5";
inp_lwidth.step = "0.05";
inp_lwidth.valueAsNumber = LW;
inp_lwidth.addEventListener("input", () =>
{
	LW = inp_lwidth.valueAsNumber;
	draw();
});
inp_rnd.min = "0";
inp_rnd.max = "2";
inp_rnd.step = "0.1";
inp_rnd.valueAsNumber = rnd;
inp_rnd.addEventListener("input", () =>
{
	rnd = inp_rnd.valueAsNumber;
	draw();
});
inp_seed.valueAsNumber = seed;
inp_seed.addEventListener("input", () =>
{
	seed = inp_seed.valueAsNumber;
	draw();
});

function draw()
{
	Lib.canvas.fitToParent(canvas);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const color = light ? "black" : "#d4d4d4";
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	const chars = textEl.value.split("");
	let x = LH / 4;
	let y = LH / 4;
	random = Lib.random.withSeed(seed);
	for (const ch of chars)
	{
		const { w, drawer } = drawers[ch] || drawers[" "];
		if ((x + w) * Scale > canvas.width - LH / 2)
		{
			x = LH / 4;
			y += LH * 1.5;
		}
		ctx.save();
		ctx.scale(Scale, Scale);
		ctx.translate(x, y + LH);
		ctx.scale(1, -1);
		if (x == LH / 4) ctx.moveTo(0, LH / 3);
		// ctx.lineWidth = LW / 10;
		// ctx.strokeRect(0, 0, w, LH);
		ctx.lineWidth = LW;
		drawer();
		ctx.restore();
		x += w;
	}
	ctx.lineWidth = LW * Scale;
	ctx.stroke();
}

const drawersSimple: { [ch: string]: { w: number, drawer: () => void } } = {
	" ": { w: 5, drawer() { }, },
	".": {
		w: 7, drawer()
		{
			ctx.beginPath();
			ctx.arc(3.5, LH / 2, 1.5, 0, Math.PI * 2);
			ctx.fill();
		}
	},
	"-": {
		w: 7, drawer()
		{
			ctx.beginPath();
			ctx.moveTo(1, LH / 2);
			ctx.lineTo(6, LH / 2);
			ctx.stroke();
		}
	},
}

const drawers: { [ch: string]: { w: number, drawer: () => void } } = {
	" ": {
		w: 2, drawer()
		{
			const W = 2;
			const B = isNaN(lastC) ? LH / 3 : lastC;
			const T = LH / 10;
			const rw = rand(-W * 0.05, W * 0.05);
			const rh = rand(-LH * 0.05, LH * 0.05);
			lastC = LH / 3 + rh() * 1.5;
			// ctx.beginPath();
			// ctx.moveTo(0, B);
			ctx.bezierCurveTo(W / 2 + rw(), B + rh(), W + rw(), T + rh(), W / 2 + rw(), T + rh());
			ctx.bezierCurveTo(0 + rw(), T + rh(), W / 2 + rw(), B + rh(), W, lastC);
			// ctx.stroke();
		},
	},
	".": {
		w: 4, drawer()
		{
			const W = 4;
			const B = isNaN(lastC) ? LH / 3 : lastC;
			const T = LH / 5 * 4;
			const rw = rand(-W * 0.1, W * 0.1);
			const rh = rand(-LH * 0.1, LH * 0.1);
			const dy = rand(-LH * 0.1, LH * 0.15)();
			lastC = LH / 3 + rh() * 1.5;
			// ctx.beginPath();
			// ctx.moveTo(0, B);
			ctx.bezierCurveTo(W / 2 + rw(), B + rh(), W + rw(), T + rh() + dy, W / 2 + rw(), T + dy);
			ctx.bezierCurveTo(0 + rw(), T + rh() + dy, W / 2 + rw(), B + rh(), W, lastC);
			// ctx.stroke();
		}
	},
	"-": {
		w: 3, drawer()
		{
			const W = 3;
			const B = isNaN(lastC) ? LH / 3 : lastC;
			const T = LH / 5 * 4;
			const rw = rand(-W * 0.05, W * 0.05);
			const rh = rand(-LH * 0.05, LH * 0.05);
			const dx = rand(-W * 0.15, W * 0.15)();
			const dy = rand(-LH * 0.2, LH * 0.1)();
			lastC = LH / 3 + rh() * 1.5;
			// ctx.beginPath();
			// ctx.moveTo(0, B);
			ctx.bezierCurveTo(W / 2 + dx + rw(), B + rh(), W / 6 + dx + rw(), T + dy + rh(), W / 2 + dx, T + dy);
			ctx.bezierCurveTo(W / 6 * 5 + dx + rw(), T + dy + rh(), W / 2 + dx + rw(), B + rh(), W, lastC);
			// ctx.stroke();
		}
	},
}

function rand(min: number, max: number)
{
	if (perfect) return () => 0;
	return () => (random() * (max - min) + min) * rnd;
}