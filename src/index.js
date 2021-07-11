import './sass/main.scss';
import Swal from 'sweetalert2'

const refs = {
    input: document.querySelector('#date-selector'),
    buttonStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes'),
    seconds: document.querySelector('[data-seconds'),
}

refs.input.addEventListener('change', counts);
refs.buttonStart.style.display = 'none';


function counts() {
  const inputDate = this.value;
  const userTime = new Date(inputDate);
  const curentTime = Date.now();
  let gap = userTime - curentTime;
  // console.log(gap)
  if (gap < 0) {
    Swal.fire({
  icon: 'error',
  title: 'Ooops...',
  text: 'Видел как сыграла Украина на Евро 2020?!',
  footer: '<a href="">Выбери нормальную дату</a>'
    })
    return
  }

    refs.buttonStart.style.display = 'block';
    let targetTime = convertMs(gap);
  
    refs.days.textContent = targetTime.days;
    refs.hours.textContent = targetTime.hours;
    refs.minutes.textContent = targetTime.minutes;
    refs.seconds.textContent = targetTime.seconds;
  

  refs.buttonStart.addEventListener('click', onStart)
  
  function onStart(){
    const intervalId = setInterval(() => {
            gap -= 1000;
            targetTime = convertMs(gap);
            refs.days.textContent = targetTime.days;
            refs.hours.textContent = targetTime.hours;
            refs.minutes.textContent = targetTime.minutes;
            refs.seconds.textContent = targetTime.seconds;
            if (gap < 1000) {
                clearInterval(intervalId);
            }
    }, 1000);
    refs.buttonStart.removeEventListener('click', onStart)
        refs.buttonStart.disabled = true;
    }
    refs.input.style.display = 'none';
}
  
function pad(value) {
  return String(value).padStart(2, 0);
}

function pad1(value) {
  return String(value).padStart(3, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad1(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); //{days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}