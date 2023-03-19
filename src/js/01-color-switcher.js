const refs = {
  body: document.body,
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', startColorChange);
refs.stopBtn.addEventListener('click', stopColorChange);

let intervalId = null;

function startColorChange() {
  if (!intervalId) {
    intervalId = setInterval(changeBgColor, 1000);
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
  }
}
function stopColorChange() {
  clearInterval(intervalId);
  intervalId = null;
  // refs.body.removeAttribute('style');
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}

function changeBgColor(color = getRandomHexColor()) {
  refs.body.style.backgroundColor = color;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
