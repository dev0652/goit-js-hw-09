import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_orange.css';
import { Ukrainian } from 'flatpickr/dist/l10n/uk.js';

refs = {
  btn: document.querySelector('button[data-start]'),
  picker: document.querySelector('#datetime-picker'),
};

refs.btn.disabled = true;

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  // defaultDate: new Date('2023-04-18 00:00'),
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: Ukrainian,

  onClose(selectedDates, dateStr, instance) {
    const selectedDate = selectedDates[0];

    if (selectedDate.getTime() <= instance.config.defaultDate.getTime()) {
      alert('Please choose a date in the future');
      return;
    }

    refs.btn.disabled = false;
  },
};

flatpickr(refs.picker, flatpickrOptions);
