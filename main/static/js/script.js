// Аккордеон
const items = document.querySelector('.app__inner').querySelectorAll('.item__title');

items.forEach((el) => {
  el.addEventListener('click', () => {
    const elContent = el.parentNode.nextElementSibling;
    if (elContent.style.maxHeight) {
      // Закрываем выпадающий список и разворачиваем стрелку, если он открыт
      elContent.style.maxHeight = null;
      el.parentNode.querySelector('.item__icon--dropdown').style.transform = `rotate(0deg)`;
      if (el.parentNode.querySelector('.item__context--mobile').classList.contains('item__context--mobile--active')) {
        el.parentNode.querySelector('.item__context--mobile').classList.toggle('item__context--mobile--active')
        el.parentNode.querySelector('.item-mobile__menu').classList.toggle('item-mobile__menu--active');
      }
    } else {
      // Если мы открываем закрытый аккордеон, то закрываем открытый
      const openItems = document.querySelectorAll('.item__description');

      openItems.forEach((item) => {
        // Если описание открыто, то закрываем
        if (item.style.maxHeight) {
          item.style.maxHeight = null;
          // Разворачиваем стрелки у открытого
          items.forEach((arrow) => {
            arrow.parentNode.querySelector('.item__icon--dropdown').style.transform = `rotate(0deg)`;
          });
        }
        // Если открыт бургер, то закрываем
        const burger = item.previousElementSibling.querySelector('.item__context--mobile');
        if (burger.classList.contains('item__context--mobile--active')) {
          burger.classList.toggle('item__context--mobile--active');
          burger.querySelector('.item-mobile__menu').classList.toggle('item-mobile__menu--active');
        }
      });
      elContent.style.maxHeight = elContent.scrollHeight + elContent.style.height + 'px';
      el.parentNode.querySelector('.item__icon--dropdown').style.transform = `rotate(-180deg)`;
    }
  });
});


// Бургер
const btns = document.querySelectorAll('.item__context--mobile');

btns.forEach(btn => {
  btn.addEventListener('click', function () {
    const menu = btn.querySelector('.item-mobile__menu');
    menu.classList.toggle('item-mobile__menu--active');
    btn.classList.toggle('item__context--mobile--active');
  });
})


// Открытие формы создания таска
const formOpenBtn = document.querySelector('.app__button');
const form = document.querySelector('.form-wrapper');
formOpenBtn.addEventListener('click', function () {
  if (form.style.maxHeight) {
    form.style.maxHeight = null;
    formOpenBtn.style.transform = `rotate(360deg)`;
  } else {
    form.style.maxHeight = form.scrollHeight + formTextarea.scrollHeight + 50 + 'px';
    formOpenBtn.style.transform = `rotate(135deg)`;
  }
});


// Закрытие формы, если клик вне её
document.addEventListener('mousedown', (e) => {
  if (!document.querySelector('.app__create').contains(e.target)) {
    form.style.maxHeight = null;
    formOpenBtn.style.transform = `rotate(360deg)`;
  }
});
