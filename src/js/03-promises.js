import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector(`[name="delay"]`),
  stepInput: document.querySelector(`[name="step"]`),
  amountInput: document.querySelector(`[name="amount"]`),
};

refs.delayInput.min = '1000';
refs.delayInput.step = '500';
refs.stepInput.min = '500';
refs.stepInput.step = '100';
refs.amountInput.min = '0';

refs.form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();
  let amount = parseInt(refs.amountInput.value);
  let delay = parseInt(refs.delayInput.value);
  let step = parseInt(refs.stepInput.value);
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay + step * (position - 1))
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  refs.form.reset();
}
