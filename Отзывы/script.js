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
    'reviews': 'Отзывы наших клиентов',
    'ordered a project from us?': 'Заказывали проект у нас?',
    'Leave your feedback': 'Оставьте ваш отзыв в форме ниже и мы его опубликуем на нашем сайте',
    'name': 'Ваше имя',
    'tel': 'Номер телефона',
    'text': 'Ваш отзыв',
    'submit': 'Отправить',
    'information': 'Информация',
    'country houses': 'Загородные дома',
    'apartment': 'Квартира',
    'apartments': 'Квартира',
    'non-residential premises': 'Нежилые помещения',
    'about company': 'О компании',
    'media files': 'Медиафайлы',
    'social network': 'Соц. сети',
    'privacy policy': 'Политика конфиденциальности', 
  },
  'en': {
    'our projects': 'Our projects',
    'media': 'Media',
    'about us': 'About us',
    'contacts': 'Contacts',
    'reviews': 'Feedback from our clients',
    'ordered a project from us?': 'Ordered a project from us?',
    'Leave your feedback': 'Leave your feedback in the form below and we will publish it on our website',
    'name': 'Your name',
    'tel': 'Phone number',
    'text': 'Your text',
    'submit': 'Submit',
    'information': 'Information',
    'country houses': 'Country houses',
    'apartment': 'Apartment',
    'apartments': 'Apartments',
    'non-residential premises': 'Non-residential premises',
    'about company': 'About company',
    'media files': 'Media files',
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


let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';


form.submit();