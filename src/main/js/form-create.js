// Открытие формы создания таска
const formOpenBtn = document.querySelector('.app__button');
const form = document.querySelector('.app__form');
const textarea = document.querySelector('.form-create__description');

formOpenBtn.addEventListener('click', function () {
  formOpenBtn.style.transform = `rotate(45deg)`;
  if (form.style.maxHeight) {
    form.style.maxHeight = null;
    formOpenBtn.style.transform = `rotate(0deg)`;
  } else {
    form.style.maxHeight =
      form.scrollHeight + textarea.scrollHeight + 50 + 'px';
    formOpenBtn.style.transform = `rotate(45deg)`;
  }
});

// Закрытие формы, если клик вне её
document.addEventListener('mousedown', (e) => {
  if (
    !(
      document.querySelector('.app__button').contains(e.target) ||
      document.querySelector('.app__form').contains(e.target)
    )
  ) {
    form.style.maxHeight = null;
    formOpenBtn.style.transform = `rotate(0deg)`;
  }
});
