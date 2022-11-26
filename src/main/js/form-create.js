// Открытие формы создания таска
const formOpenBtn = document.querySelector('.app__button');
const form = document.querySelector('.app__form');

formOpenBtn.addEventListener('click', function () {
  if (form.style.maxHeight) {
    form.style.maxHeight = null;
    formOpenBtn.style.transform = `rotate(45deg)`;
  } else {
    form.style.maxHeight =
      form.scrollHeight + formTextarea.scrollHeight + 50 + 'px';
    formOpenBtn.style.transform = `rotate(0deg)`;
  }
});

// Закрытие формы, если клик вне её
document.addEventListener('mousedown', (e) => {
  if (!document.querySelector('.app__create').contains(e.target)) {
    form.style.maxHeight = null;
    formOpenBtn.style.transform = `rotate(360deg)`;
  }
});
