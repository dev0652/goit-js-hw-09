const refs = {
  body: document.body,
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', startColorChange);
refs.stopBtn.addEventListener('click', stopColorChange);

let intervalId = null;

function startColorChange() {
  console.log('start clicked');

  if (!intervalId) {
    // intervalId = setInterval(changeBgColor, 1000, getRandomHexColor());
    intervalId = setInterval(changeBgColor, 1000);

    refs.startBtn.disabled = true;
  }
}
function stopColorChange() {
  console.log('stop clicked');

  clearInterval(intervalId);
  intervalId = null;
  // changeBgColor('white');
  refs.startBtn.disabled = false;
}

function changeBgColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
  console.log('fired');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// const colorChanger = {
//   intervalId: setInterval(() => {
//     refs.body.style.backgroundColor = this.getRandomHexColor();
//   }, 1000),

//   start() {
//     this.intervalId();
//   },

//   stop() {
//     clearInterval(this.intervalId);
//   },

//   getRandomHexColor() {
//     return `#${Math.floor(Math.random() * 16777215)
//       .toString(16)
//       .padStart(6, 0)}`;
//   },
// };
