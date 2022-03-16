const langs = document.querySelector('.dropdown');
  const lang = document.querySelectorAll('.dropdowns'); 


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

   const i18Obj = {
    'ru': {
      'our projects': 'Наши проекты',
      'media': 'Медиа',
      'about us': 'О нас',
      'contacts': 'Контакты',
      'Country house project': 'Проект загородного дома в стиле Тюдор',
      'Podmoskovny': 'Подмосковный Тюдор',
      'bath project': 'Проект бани в поселке "Монтевиль"',
      'Madison Residence Project': 'Проект резиденции Мэдисон',
      'The project of a country house from glued laminated timber in Gavrikovo': 'Проект загородного дома из клееного бруса в Гавриково',
      'Monolith residence project. Part 3. Bathhouse': 'Проект резиденции Монолит.Часть 3.Баня',
      'Monolith residence project. Part 2. Swimming pool': 'Проект резиденции Монолит.Часть 2. Бассейн',
      'Monolith residence project. Part 1. Residential building': 'Проект резиденции Монолит.Часть 1. Жилой дом',
      'Would you like a country house?': 'Хотели бы загородный дом?',
      'Leave a request on the website and we will call you back within 15 minutes': 'Оставьте заявку на сайте, и мы вам перезвоним в течение 15 минут',
      'send': 'Отправить',
      'country houses': 'Загородные дома',
      'apartment': 'Квартира',
      'apartments': 'Квартира',
      'non-residential premises': 'Нежилые помещения',
      'media files': 'Медиафайлы',
      'about company': 'О компании',
      'social network': 'Соц. сети',
      'privacy policy': 'Политика конфиденциальности',
      'information': 'Информация',
      'placeholder': 'Ваше имя',
      'placeholder1': 'Номер телефона',
      'media files': 'Медиафайлы',
    },
    'en': {
      'our projects': 'Our projects',
      'media': 'Media',
      'about us': 'About us',
      'contacts': 'Contacts',
      'Country house project': 'Country house project in the Tudor style',
      'Podmoskovny': 'Tudor near Moscow',
      'bath project': 'The project of the bath in the village "Monteville"',
      'Madison Residence Project': 'Madison Residence Project',
      'The project of a country house from glued laminated timber in Gavrikovo': 'The project of a country house from glued laminated timber in Gavrikovo',
      'Monolith residence project. Part 3. Bathhouse': 'Monolith residence project. Part 3. Bathhouse',
      'Monolith residence project. Part 2. Swimming pool': 'Monolith residence project. Part 2. Swimming pool',
      'Monolith residence project. Part 1. Residential building': 'Monolith residence project. Part 1. Residential building',
      'Would you like a country house?': 'Would you like a country house?',
      'Leave a request on the website and we will call you back within 15 minutes': 'Leave a request on the website and we will call you back within 15 minutes',
      'send': 'Send',
      'country houses': 'Country houses',
      'apartment': 'Apartment',
      'apartments': 'Apartments',
      'non-residential premises': 'Non-residential premises',
      'about company': 'About company',
      'social network': 'Social network',
      'privacy policy': 'Privacy policy',
      'information': 'Information',
      'placeholder': 'Your name',
      'placeholder1': 'Phone number',
      'media files': 'Media files', 
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

