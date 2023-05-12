const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    const sec = new Date(seconds * 1000).toISOString().slice(17, 19);
    const minutes = new Date(seconds * 1000).toISOString().slice(14, 16);
    const hours = new Date(seconds * 1000).toISOString().slice(11, 13);

    const duration = 1000;

    function addingZero(num) {
      if (num < 10) {
        return `0${num}`;
      } else {
        return `${num}`;
      }
    }

    const slowAdding = (ms) => new Promise((res) => setTimeout(res, ms));

    async function runningTime(time) {
      for (let y = 0; y <= time.length; y++) {
        for (let i = 0; i <= time[y]; i++) {
          const num = addingZero(i);

          const secZero = addingZero(time[0]);
          const minZero = addingZero(time[1]);

          if (y === 0) {
            timerEl.innerText = `00:00:${num}`;
            await slowAdding(duration);
          }
          if (y === 1) {
            timerEl.innerText = `00:${num}:${secZero}`;
            await slowAdding(duration);
          }
          if (y === 2) {
            timerEl.innerText = `${num}:${minZero}:${secZero}`;
            await slowAdding(duration);
          }
        }
      }
    }

    if (seconds < 86400) {
      const time = [+sec, +minutes, +hours];
      runningTime(time);
    } else {
      const time = [59, 59, 23];
      runningTime(time);
    }
  };
};
const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", (e) => {
  // Очистите input так, чтобы в значении
  // оставались только числа

  if (isNaN(+e.data)) {
    e.target.value = e.target.value.replace(e.data, "");
  }
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
