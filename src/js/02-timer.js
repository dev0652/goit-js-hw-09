import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_orange.css';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';

refs = {
  btn: document.querySelector('button[data-start]'),
  picker: document.querySelector('#datetime-picker'),

  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

refs.btn.disabled = true;
let timerFeed = null;

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  // defaultDate: new Date('2023-04-18 00:00'),
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: Ukrainian,

  onClose(selectedDates, dateStr, instance) {
    const target = selectedDates[0].getTime();
    const current = instance.config.defaultDate.getTime();
    const difference = convertMs(target - current);

    if (target <= current) {
      alert('Please choose a date in the future');
      return;
    }

    faceFeed = difference; // Object
    timerFeed = target;

    updateTimer(faceFeed);
    refs.btn.disabled = false;
    refs.btn.addEventListener('click', startCountdown);
  },
};

flatpickr(refs.picker, flatpickrOptions);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// Print the remaining time to screen
function updateTimer({ days = 00, hours = 00, minutes = 00, seconds = 00 }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

// Start countdown
function startCountdown() {
  setInterval(handler, 1000);
  refs.btn.disabled = true;

  function handler() {
    updateTimer(convertMs(timerFeed - Date.now()));
  }
}
