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
      'We build dream houses': 'Строим дома мечты',
      'ItalProject1': 'ItalProject основали Петр и Анна Насоновы. Это семейный бизнес.Название бюро родилось не случайно. Любовь к Италии, ее традициям и культуре, искусству и мастерству лежит в основе наших проектов.',
      'ItalProject2': 'В настоящий момент архитектурное бюро ItalProject занимается проектированием для частных заказчиков в сегменте элитной недвижимости.',
      'ItalProject3': 'Вы можете увидеть наши реализованные проекты в КП на Новой Риге: в поселках Монтевиль, Мэдисон-Парк, Монолит, Абрамцево, Гавриково.',
      'ItalProject4': 'Мы ведем наши проекты от эскиза до реализации. Мы умеем услышать пожелания наших заказчиков и воплотить их в жизнь.',
      'year': '1996',
      'was formed': 'было образовано архитектурное бюро',
      'metr': '20 000 м²',
      'area': 'площадь реализованных проектов',
      'permanent': 'постоянных экспертов в команде',
      'Industry': 'Индустрия частного загородного строительства не стоит на месте. Она постоянно развивается. Поэтому мы своевременно изучаем новые технологии и материалы и применяем их в жизнь. Мы готовы предложить вам полный комплекс услуг, связанных с воплощением проекта в жизнь и выступить в качестве их представителей во время строительства, отделки и оснащения',
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
      'We build dream houses': 'We build dream houses',
      'ItalProject1': 'ItalProject was founded by Peter and Anna Nasonov. This is a family business. The name of the bureau was not born by chance. Love for Italy, its traditions and culture, art and craftsmanship is at the heart of our projects.',
      'ItalProject2': 'At the moment, the ItalProject architectural bureau is engaged in designing for private customers in the luxury real estate segment.',
      'ItalProject3': 'You can see our completed projects in the KP on New Riga: in the villages of Monteville, Madison Park, Monolith, Abramtsevo, Gavrikovo. ',
      'ItalProject4': 'We take our projects from sketch to implementation. We know how to hear the wishes of our customers and bring them to life.',
      'year': '1996',
      'was formed': 'an architectural bureau was formed',
      'metr': '20 000 m²',
      'area': 'area of ​​completed projects',
      'permanent': 'permanent experts in the team',
      'Industry': 'The industry of private suburban construction does not stand still. It is constantly evolving. Therefore, we timely study new technologies and materials and apply them in life. We are ready to offer you a full range of services related to the implementation of the project and act as their representatives during construction, decoration and equipment.',
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
