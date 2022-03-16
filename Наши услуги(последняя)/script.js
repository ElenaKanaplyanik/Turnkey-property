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
      'ser': 'Услуги',
      'our services': 'Наши услуги',
      'visiting': 'Выездная консультация на участок перед покупкой земельного участка',
      'price1': '20 000 р.',
      'submit': 'Оставить заявку',
      'finished project': 'Разберу готовый проект. Онлайн консультация более 1 часа',
      'price2': '15 000 р.',
      'finished project1': 'Разберу готовый проект. Консультация с выездом на участок',
      'price3': '30 000 р.',
      'design': 'Дизайн проекта интерьера',
      'price4': 'от 6500 р/м²',
      'architectural project': 'Архитектурный проект',
      'information': 'Информация',
      'country houses': 'Загородные дома',
      'apartment': 'Квартира',
      'apartments': 'Квартира',
      'non-residential premises': 'Нежилые помещения',
      'media files': 'Медиафайлы',
      'about company': 'О компании',
      'social network': 'Соц. сети',
      'privacy policy': 'Политика конфиденциальности',
    },
    'en': {
      'our projects': 'Our projects',
      'media': 'Media',
      'about us': 'About us',
      'contacts': 'Contacts',
      'ser': 'Services',
      'our services': 'Our services',
      'visiting': 'Field consultation on the site before buying a land plot',
      'price1': '20 000 rubles',
      'submit': 'Submit your application',
      'finished project': 'I will take a look at the finished project. Online consultation over 1 hour',
      'price2': '15 000 rubles',
      'finished project1': 'I will take a look at the finished project. On-site consultation',
      'price3': '30 000 rubles',
      'design': 'Interior project design',
      'price4': 'from 6500 rubles/m²',
      'architectural project': 'Architectural project',
      'information': 'Information',
      'country houses': 'Country houses',
      'apartment': 'Apartment',
      'apartments': 'Apartments',
      'non-residential premises': 'Non-residential premises',
      'media files': 'Media files',
      'about company': 'About company',
      'social network': 'Social network',
      'privacy policy': 'Privacy policy',
  
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
