// Увеличение высота textarea по мере заполнения
const formTextarea = document.getElementsByTagName('textarea')[0];
formTextarea.style.height = `${formTextarea.scrollHeight + 20}px`;

formTextarea.addEventListener('input', (event) => {
  formTextarea.style.height = '40px';
  formTextarea.style.height = `${event.target.scrollHeight}px`;
});

// Счетчик количества букв в полях формы добавления таска
function countCharsAtField(field, numsField, max) {
  const input = document.querySelector(`#${field}`);
  let info = document.querySelector(`[${numsField}]`);
  input.addEventListener('input', function () {
    if (this.value.length === max) {
      info.innerHTML = 'Max length';
    } else {
      info.innerHTML = `${this.value.length}/${max}`;
    }
  });
}

countCharsAtField('id_title', 'data-title-number', 36);
countCharsAtField('id_description', 'data-description-number', 200);


// Исключительно для страницы app/update/<id>
function setCountCharsAtField(field, numsField, max) {
  const input = document.querySelector(`#${field}`);
  let info = document.querySelector(`[${numsField}]`);
  if (input.value.length === max) {
    info.innerHTML = 'Max length';
  } else {
    info.innerHTML = `${input.value.length}/${max}`;
  }

}

document.addEventListener("DOMContentLoaded", function () {
  setCountCharsAtField('id_title', 'data-title-number', 36);
  setCountCharsAtField('id_description', 'data-description-number', 200);
})