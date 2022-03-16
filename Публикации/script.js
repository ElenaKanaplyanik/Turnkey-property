const langs = document.querySelector('.dropdown');
  const lang = document.querySelectorAll('.dropdowns'); 


  function addDarkClassToHTML(){
    try {
      if (localStorage.getItem('theme') === 'dark'){
      document.querySelector('html').classList.add('dark');
      document.querySelector('.themetoggle span').textContent = 'dark_mode';
   } 
   else {
    document.querySelector('html').classList.remove('dark');
    document.querySelector('.themetoggle span').textContent = 'wb_sunny';
   }
  }catch (err) { }
  }
  addDarkClassToHTML();


document.querySelector('.themetoggle').addEventListener('click', (event)=>{
    event.preventDefault();
    if (localStorage.getItem('theme') === 'dark'){
     localStorage.removeItem('theme');
 
    }
    else{
      localStorage.setItem('theme', 'dark')
    }
    addDarkClassToHTML()
  });
  function changeClassActiveLang(className) {
    className.classList.add('active-lang');
  }
  
  
  function getTranslate(languages) {
    const data = document.querySelectorAll('[data-i18]');
    data.forEach((el) => {
      if(el.placeholder) {
        el.placeholder = i18Obj[languages][el.dataset.i18]
        el.textContent = '';
      } else {
        el.textContent = i18Obj[languages][el.dataset.i18];
      }
    });
  };
   



const i18Obj = {
  'ru': {
    'our projects': 'Наши проекты',
    'media': 'Медиа',
    'about us': 'О нас',
    'contacts': 'Контакты',
    'media files': 'Медиафайлы',
    'information': 'Информация',
    'country houses': 'Загородные дома',
    'apartment': 'Квартира',
    'apartments': 'Квартира',
    'non-residential premises': 'Нежилые помещения',
    'about company': 'О компании',
    'social network': 'Соц. сети',
    'privacy policy': 'Политика конфиденциальности',
    'Publications': 'Публикации',
    'More': 'Подробнее',
    'Away': 'В гостях: Изумрудный респаун для архитектора',
    'Design of a one-room apartment': 'Дизайн однокомнатной квартиры. Я в новой роли : мама - архитектор.дизайнер, в роли консультанта и прораба.',
    'Houzz Tour': 'Houzz тур: Квартира в Заречье с видом на лес',
    'For interiors': 'На интерьеры повлиял пейзаж за окном, а также интерес хозяина к музыке и дизайну',
    'Attic': 'Мансарда, стилистика Тюдор и внутренний двор: загородный дом в Подмосковье',
    'Implementation': 'Реализация 2019 г.',
    'House for staff': 'Дом для персонала в стиле Тюдоров получился таким уютным, что хозяева сами решили в нем жить',
    'Project of the week INMYROOM': 'Проект недели INMYROOM',
    'Office for Zeus': 'Офис для Зевса',
    'Office interior design': 'Дизайн интерьера офиса в Москва-Сити в Башне Санкт-Петербург, 61 этаж',
    'Modern XXI century': 'Модерн XXI века',
    'Apartment interior': 'Интерьер квартиры на Большой Дмитровке в стиле модерн общей площадью 156 м2',
    'Territory of comfort': 'Территория комфорта Деревянный дом с бассейном и сауной',
    'Bath project': 'Проект бани из клееного бруса в КП ГАВРИКРКО',
    'Odnushka': 'Однушка 40 м², в которой кухня используется в качестве кабинета',
    'Learned': 'Узнали у профи: как построить дом за год',
    'Certainly': 'Конечно, к вопросам строительства нужно подходить без спешки. Но иногда жизненные обстоятельства диктуют жесткие сроки, и затягивать стройку нет возможности.',
    'Design and build': 'Спроектировать и построить загородный дом немаленьких габаритов задача сама по себе непростая. А если заказчик ещё и просит сделать это меньше, чем за год – она кажется и вовсе неподъёмной. Однако при помощи профессионалов возможным становится практически всё',
    
  },
  'en': {
    'our projects': 'Our projects',
    'media': 'Media',
    'about us': 'About us',
    'contacts': 'Contacts',
    'media files': 'Media files',
    'information': 'Information',
    'country houses': 'Country houses',
    'apartment': 'Apartment',
    'apartments': 'Apartments',
    'non-residential premises': 'Non-residential premises',
    'about company': 'About company',
    'social network': 'Social network',
    'privacy policy': 'Privacy policy',
    'Publications': 'Publications',
    'More': 'More detail',
    'Away': 'Away: Emerald Architect Respawn',
    'Design of a one-room apartment': 'Design of a one-room apartment. I am in a new role: my mother is an architect.designer, as a consultant and foreman.',
    'Houzz Tour': 'Houzz tour: Apartment in Zarechye overlooking the forest',
    'For interiors': 'The interiors were influenced by the landscape outside the window, as well as the owner is interest in music and design.',
    'Attic': 'Attic, Tudor style and courtyard: a country house in the suburbs',
    'Implementation': 'Implementation 2019',
    'House for staff': 'The Tudor-style staff house turned out to be so cozy that the owners themselves decided to live in it',
    'Project of the week INMYROOM': 'Project of the week INMYROOM',
    'Office for Zeus': 'Office for Zeus',
    'Office interior design': 'Office interior design in Moscow-City in St. Petersburg Tower, 61st floor',
    'Modern XXI century': 'Modern XXI century',
    'Apartment interior': 'The interior of the apartment on Bolshaya Dmitrovka in Art Nouveau style with a total area of ​​156 m2',
    'Territory of comfort': 'Comfort area Wooden house with swimming pool and sauna',
    'Bath project': 'The project of a bathhouse made of glued laminated timber in the KP GAVRIKRKO',
    'Odnushka': 'One-room 40 m², in which the kitchen is used as an office',
    'Learned': 'Learned from the pros: how to build a house in a year',
    'Certainly': 'Of course, construction issues should be approached without haste. But sometimes life circumstances dictate tight deadlines, and there is no way to delay the construction.',
    'Design and build': 'Designing and building a country house of rather large dimensions is not an easy task in itself. And if the customer also asks to do it in less than a year, it seems completely unbearable. However, with the help of professionals, almost everything becomes possible.',
  }
};

langs.addEventListener('click', (e) => {

  if((e.target.classList.contains('ru')) || (e.target.classList.contains('en'))) 
  
  {
    
    lang.forEach((btn) => btn.classList.remove('active-lang'));
    changeClassActiveLang(e.target);
    if (e.target.classList.contains('ru')) {
      getTranslate('ru');
      localStorage.setItem('lang', 'ru');
      
    } else {
      getTranslate('en');
      localStorage.setItem('lang', 'en');
      
      
    }
  }
});

 /* Установите ширину боковой навигации 250 пикселей, и левый край содержимого страницы - 250 пикселей. */

 function openNav() {
  document.getElementById("mySidenav").style.width = "auto";
  document.getElementById("main").style.marginLeft = "0";
}

/* Установите ширину боковой навигации равной 0, и левое поле содержимого страницы - 0.  */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
