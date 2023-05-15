const refs = {
  body: document.querySelector('body'),
  btn: document.querySelector('button'),
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

refs.btnStart.style.width = '100px';
refs.btnStart.style.height = '50px';
refs.btnStop.style.width = '100px';
refs.btnStop.style.height = '50px';

refs.btnStop.setAttribute(`disabled`, true);

// let colorTimer = null;
refs.btnStart.addEventListener('click', colorChanger);
refs.btnStop.addEventListener('click', colorChangerStop);

function colorChanger() {
  refs.btnStop.removeAttribute(`disabled`, true);
  refs.btnStart.setAttribute(`disabled`, true);
  colorTimer = setInterval(() => {
    refs.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function colorChangerStop() {
  refs.btnStart.removeAttribute(`disabled`, true);
  refs.btnStop.setAttribute(`disabled`, true);
  clearInterval(colorTimer);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

console.log(refs.btnStart.textContent);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
