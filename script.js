const timeElement = document.querySelector(".time");
const timeInputElement = document.querySelector(".time-input");

let isRun = false;
let seconds = 0;
let timer = null;

function tick() {
	seconds -= 1;
	if (seconds <= 0) {
		finishPomo();
		return;
	}
	renderTime();
	document.title = getTimeText();
}

function finishPomo() {
	clearInterval(timer);
	seconds = 0;
	renderTime();
	document.title = "Помодоро";
	isRun = false;

	// Запрос разрешения
	new Notification("Помодоро закончен");
}

function reset() {
	seconds = 0;
	renderTime();
	document.title = getTimeText();
}

function stop() {}

function start() {
	const minutes = timeInputElement.value;
	Notification.requestPermission();

	if (minutes) {
		isRun = true;
		seconds = minutes * 60;
		document.body.className = "start";
		timeInputElement.value = null;
		timer = setInterval(tick, 1000);
		renderTime();
		document.title = getTimeText();
	}
}

function getTimeText(params) {
	const minutes = String(Math.floor(seconds / 60));
	const sec = String(seconds % 60);
	return `${minutes.padStart(2, "0")}:${sec.padStart(2, "0")}`;
}

function renderTime() {
	timeElement.textContent = getTimeText();
}
