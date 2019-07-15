let touchStartY = null;
let touchEndY = null;
let firstSection = document.getElementsByClassName('iceberg')[0];

// Добавляем событие нажатия на экран, чтобы записать начальную координату Y
document.addEventListener("touchstart", evt => touchStartY = evt.changedTouches[0].pageY, false);
// Добавляем событие окончания нажатия на экран, чтобы записать конечную координату Y
document.addEventListener("touchend", evt => {
  touchEndY = evt.changedTouches[0].pageY;
  checkCoordinates(touchStartY, touchEndY, evt)
}, false);

// Проверяем какая из координат больше
function checkCoordinates(touchStartY, touchEndY, evt) {
  let section = getCurrentSection(evt);

  if (section != null) {
    if (touchStartY > touchEndY) {
      showNextSlide(section, firstSection);
    } else if (touchStartY < touchEndY) {
      showPrevious(section, firstSection);
    };
  }
  return;
}

// Получаем блок-секцию, которая сейчас на экране
function getCurrentSection(evt) {
  let section = null;
  evt.path.forEach(element => {
    if (element.tagName == 'SECTION') {
      section = element;
    };
  });
  return section
}

// Показ следующей секции
function showNextSlide(currentSection) {
  let nextSection = currentSection.nextSibling;

  if (checkForProperTag(nextSection)) {
    changeAsideNav(nextSection);
    
    switch(currentSection.classList[0]) {
      case 'iceberg':
        currentSection.classList.add('animate-second');
        break;
      case 'iceberg-root':
        firstSection.classList.remove('animate-second');
        firstSection.classList.add('animate-third');
        break;
    }
  };
  return;
}
// Показ предыдущей секции
function showPrevious(currentSection, firstSection) {
  let previousSection = currentSection.previousSibling;

  if (checkForProperTag(previousSection)) {
    changeAsideNav(previousSection);

    switch(currentSection.classList[0]) {
      case 'iceberg-root':
        firstSection.classList.remove('animate-second');
        firstSection.classList.add('animate-first');
        break;
      case 'iceberg-underworld':
        firstSection.classList.remove('animate-third');
        firstSection.classList.add('animate-second');
        break;
    }     
  };
  return;
}

// Проверяем является тэг элемента секцией
function checkForProperTag(element) {
  if (element) {
    if (element.tagName == 'SECTION') {
      return true;
    };
  };
  return false;
}

// Меняем класс активности у боковой навигации и анимируем бар в футере
function changeAsideNav(element) {
  let nav = document.getElementsByClassName('aside-right-nav')[0];
  let aside = document.getElementsByClassName('aside-bottom')[0];

  switch (element.classList[0]) {
    case 'iceberg':
      nav.childNodes[0].className = 'aside-right-nav__circle_active'; 
      nav.childNodes[1].className = 'aside-right-nav__circle';
      nav.childNodes[2].className = 'aside-right-nav__circle';
      break;
    case 'iceberg-root':
      nav.childNodes[0].className = 'aside-right-nav__circle';
      nav.childNodes[1].className = 'aside-right-nav__circle_active'; 
      nav.childNodes[2].className = 'aside-right-nav__circle';
      if (aside.classList.contains('hidden')) {
        aside.className = 'aside-bottom';
        aside.style.display = 'block';
      };
      break;
    case 'iceberg-underworld':
      nav.childNodes[0].className = 'aside-right-nav__circle';
      nav.childNodes[1].className = 'aside-right-nav__circle';
      nav.childNodes[2].className = 'aside-right-nav__circle_active'; 

      // Добавляем слушателя на окончание анимации, чтобы фейд-аут отработал адекватно
      // После отработки анимации, удаляем слушателя, чтобы он не мешал фейд-ин анимации
      document.addEventListener('webkitAnimationEnd', function _anon() {
        aside.style.display = 'none'; 
        document.removeEventListener('webkitAnimationEnd', _anon, true)
      }, true);

      aside.classList.add('hidden');
      break;
  }
}