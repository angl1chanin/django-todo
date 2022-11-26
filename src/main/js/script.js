// Аккордеон
const items = document
  .querySelector('.app__items')
  .querySelectorAll('.task__preview');

items.forEach((el) => {
  el.addEventListener('click', function () {
    const dropdownDesc = el.nextElementSibling;
    const arrow = el.querySelector('.task__icon');

    if (dropdownDesc.style.maxHeight) {
      dropdownDesc.style.maxHeight = null;
      arrow.style.transform = `rotate(0deg)`;
    } else {
      // Если мы открываем закрытый аккордеон, то закрываем открытый
      const openedItems = document.querySelectorAll('.task__description');

      openedItems.forEach((item) => {
        // Если описание открыто, то закрываем
        if (item.style.maxHeight) {
          item.style.maxHeight = null;
          // Разворачиваем стрелки у открытого
          items.forEach((arrow) => {
            arrow.querySelector('.task__icon').style.transform = `rotate(0deg)`;
          });
        }
      });

      dropdownDesc.style.maxHeight = dropdownDesc.scrollHeight + dropdownDesc.style.height + 'px';
      arrow.style.transform = `rotate(180deg)`
    }
  });
});
