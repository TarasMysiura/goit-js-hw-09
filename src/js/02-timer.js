import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  calendar: document.getElementById(`datetime-picker`),
  startBtn: document.querySelector(`[data-start]`),
  timer: document.querySelector(`.timer`),
  fields: document.querySelectorAll(`.field`),
  days: document.querySelector(`[data-days]`),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector(`[data-seconds]`),
};

let timerInterval = null;
refs.startBtn.setAttribute(`disabled`, true);
refs.timer.style.display = 'flex';

refs.fields.forEach(field => {
  // adding CSS markup to fields
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.margin = '5px';
  field.style.textAlign = 'center';
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onScreenLoad(obj) {
  refs.days.textContent = addLeadingZero(obj.days);
  refs.hours.textContent = addLeadingZero(obj.hours);
  refs.minutes.textContent = addLeadingZero(obj.minutes);
  refs.seconds.textContent = addLeadingZero(obj.seconds);
}
function counter(chosenDate) {
  const currentDate = new Date();
  const countdownTime = convertMs(chosenDate.getTime() - currentDate.getTime());
  //   console.log(countdownTime);
  onScreenLoad(countdownTime);
  if (
    countdownTime.days === 0 &&
    countdownTime.hours === 0 &&
    countdownTime.minutes === 0 &&
    countdownTime.seconds === 0
  ) {
    clearInterval(timerInterval);
    refs.days.textContent = addLeadingZero(0);
    refs.hours.textContent = addLeadingZero(0);
    refs.minutes.textContent = addLeadingZero(0);
    refs.seconds.textContent = addLeadingZero(0);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    const chosenDate = selectedDates[0];
    if (chosenDate < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute(`disabled`, true);
      console.log(chosenDate.getTime());
      console.log(currentDate.getTime());
      refs.startBtn.addEventListener('click', startCounter);
      // counter trigger function
    }
  },
};

const datePicker = flatpickr(refs.calendar, options);

function startCounter() {
  chosenDate = datePicker.selectedDates[0];
  clearInterval(timerInterval);
  timerInterval = setInterval(() => counter(chosenDate), 1000);
  refs.startBtn.setAttribute(`disabled`, true);
}
