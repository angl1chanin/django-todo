let taskId_ = 0;

// Установить id таска
function setTaskId(taskId) {
  taskId_ = taskId;
  console.log('set taskId = ', taskId_);
}

// Взять id таска
function getTaskId() {
  console.log('get taskId = ', taskId_);
  return taskId_;
}

/* Собственно зачем это нужно:
 * Я прицнипиально не хотел создавать отдельную страницу для подтверждения удаления таска.
 * Также я принципиально не хотел делать для каждого элемента форму для его удаления (Зачем так грузить страницу?)
 * У меня есть одно модальное окно, с подтверждением удаления таска (собственно весь этот танец из-за него, можно было бы
 * без всяких подтверждений удалять просто по клику, но опять же, надо создавать отдельный url). И в это модальное
 * окно, а точнее в button со значением "Yes" (main/index.html), нужно было как-то передать "task id". Собственно здесь и реализация
 * этой композиции. По клику на кнопку конкретного таска, мы выставляем переменную "taskId" в скрипте равную id этого таска в бд
 * (это мы делаем через шаблонизатор) и тут же открывается форма, где в случае если клик будет по button со значением "Yes",
 * то в аттрибуте "value" этой кнопки уже лежит id таска, который необходимо удалить.
 * На бэкенде в обработке абсолютно ничего сверхъестественного (это во -> views.py).
 * */

// Модальное окно
const modal = document.querySelector('.modal');
const modalBtns = document.querySelectorAll('.task__remove-btn');
const formYes = document.querySelector('.modal__btn');
const body = document.body;

modalBtns.forEach((modalBtn) => {
  modalBtn.addEventListener('click', () => {
    modal.classList.toggle('modal__show');
    body.classList.toggle('block');
    formYes.setAttribute('href', `/delete/${getTaskId()}`);
  });
});

const formNo = document.querySelectorAll('.modal__btn')[1];
if (formNo) {
  formNo.addEventListener('click', () => {
    modal.classList.toggle('modal__show');
    body.classList.toggle('block');
  });
}
