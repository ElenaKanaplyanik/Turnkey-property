

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

   /*****************Translate***************/
   const i18Obj = {
    'ru': {
      'our projects': 'Наши проекты',
      'media': 'Медиа',
      'about us': 'О нас',
      'contacts': 'Контакты',
      'our awards': 'Наши награды',
      'laureate': 'Лауреат конкурса «AQUA ПРЕСТИЖ», 2011',
      'per project': 'За проект бассейна в ЖК «Монолит», МО, Новая Рига',
      'more': 'Подробнее',
      'patent': 'Диплом Союза Архитекторов',
      'for the pool project': 'За проект бассейна в ЖК «Монолит», МО, Новая Рига',
      'patent of the union': 'Диплом Союза Архитекторов России «Архи-конкурс 2011», 3-е место в номинации «Лучший интерьер»',
      'for interior design': 'За проект интерьера квартиры «Московский Модерн XXI века»',
      'professional club diploma': 'Диплом профессионального клуба "Высокий дизайн»',
      'patent of the nominee': 'Диплом номинанта открытого всероссийского конкурса от Совета экспертов интерьерного дизайна и архитектурной среды',
      'for design': 'За дизайн интерьера офиса «Зевс» с Москва-сита, Башня Сантк-Петербург',
      'five stars': '«Пять звезд» в номинации трейд-стендов на выставке «Moscow Flower Show 2018»',
      'for a garden project': 'За проект сада «Садовые Подмостки» в рамках Московского международного фестиваля садов и цветов',
      'country houses': 'Загородные дома',
      'apartments': 'Квартиры',
      'non-residential premises': 'Нежилые помещения',
      'media files': 'Медиафайлы',
      'about company': 'О компании',
      'social network': 'Соц. сети',
      'privacy policy': 'Политика конфиденциальности',
      'information': 'Информация',
    },
    'en': {
      'our projects': 'Our projects',
      'media': 'Media',
      'about us': 'About us',
      'contacts': 'Contacts',
      'our awards': 'Our awards',
      'laureate': 'Laureate of the competition "AQUA PRESTIGE", 2011',
      'per project': 'For the project of the pool in the residential complex "Monolit", MO, New Riga',
      'more': 'More detail',
      'patent': 'Diploma of the Union of Architects',
      'for the pool project': 'For the project of the pool in the residential complex "Monolit", MO, New Riga',
      'patent of the union': 'Diploma of the Union of Architects of Russia "Archi-competition 2011", 3rd place in the nomination "Best Interior"',
      'for interior design': 'For the interior design of the apartment "Moscow Modern of the XXI century"»',
      'professional club diploma': 'Diploma of the professional club "High Design"',
      'patent of the nominee': 'Diploma of the nominee of the open all-Russian competition from the Council of Experts of Interior Design and Architectural Environment',
      'for design': 'For the interior design of the office "Zeus" from the Moscow City, St. Petersburg Tower',
      'five stars': '"Five Stars" in the nomination of trade stands at the exhibition "Moscow Flower Show 2018"',
      'for a garden project': 'For the garden project "Garden Scaffolding" as part of the Moscow International Festival of Gardens and Flowers',
      'country houses': 'Country houses',
      'apartments': 'Apartments',
      'non-residential premises': 'Non-residential premises',
      'media files': 'Media files',
      'about company': 'About company',
      'social network': 'Social network',
      'privacy policy': 'Privacy policy',
      'information': 'Information',
    }
  };

  const langs = document.querySelector('.dropdown');
  const lang = document.querySelectorAll('.dropdowns'); 

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


 