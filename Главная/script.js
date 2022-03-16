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



const i18Obj = {
  'ru': {
    'our projects': 'Наши проекты',
    'media': 'Медиа',
    'about us': 'О нас',
    'contacts': 'Контакты',
    'design': 'Проектирование элитной недвижимости «под ключ»',
    'sign up': 'Запишитесь на бесплатную онлайн консультацию',
    'enroll': 'Записаться',
    'our services': 'Наши услуги',
    'look': 'Посмотреть',
    'join': 'Присоединяйтесь к нам в Instagram',
    'join1': 'Присоединиться',
    'country houses': 'Загородные дома',
    'apartment': 'Квартира',
    'apartments': 'Квартира',
    'non-residential premises': 'Нежилые помещения',
    'media files': 'Медиафайлы',
    'about company': 'О компании',
    'social network': 'Соц. сети',
    'privacy policy': 'Политика конфиденциальности',
    'information': 'Информация',
    'media files': 'Медиафайлы',
  },
  'en': {
    'our projects': 'Our projects',
    'media': 'Media',
    'about us': 'About us',
    'contacts': 'Contacts',
    'design': 'Turnkey luxury real estate design',
    'sign up': 'Sign up for a free online consultation',
    'enroll': 'Sign up',
    'our services': 'Our services',
    'look': 'Superintend',
    'join': 'Join us on Instagram',
    'join1': 'Join',
    'country houses': 'Country houses',
    'apartment': 'Apartment',
    'apartments': 'Apartments',
    'non-residential premises': 'Non-residential premises',
    'about company': 'About company',
    'social network': 'Social network',
    'privacy policy': 'Privacy policy',
    'information': 'Information',
    'media files': 'Media files', 
  }
};









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



