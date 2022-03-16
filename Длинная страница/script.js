
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

















(function(document, window) {
    var juxtapose = {
        sliders: [],
        OPTIMIZATION_ACCEPTED: 1,
        OPTIMIZATION_WAS_CONSTRAINED: 2
    };
    var flickr_key = "d90fc2d1f4acc584e08b8eaea5bf4d6c";
    var FLICKR_SIZE_PREFERENCES = ["Large", "Medium"];

    function Graphic(properties, slider) {
        var self = this;
        this.image = new Image;
        this.loaded = false;
        this.image.onload = function() {
            self.loaded = true;
            slider._onLoaded()
        };
        this.image.src = properties.src;
        this.image.alt = properties.alt || "";
        this.label = properties.label || false;
        this.credit = properties.credit || false
    }

    function FlickrGraphic(properties, slider) {
        var self = this;
        this.image = new Image;
        this.loaded = false;
        this.image.onload = function() {
            self.loaded = true;
            slider._onLoaded()
        };
        this.flickrID = this.getFlickrID(properties.src);
        this.callFlickrAPI(this.flickrID, self);
        this.label = properties.label || false;
        this.credit = properties.credit || false
    }
    FlickrGraphic.prototype = {
        getFlickrID: function(url) {
            if (url.match(/flic.kr\/.+/i)) {
                var encoded = url.split("/").slice(-1)[0];
                return base58Decode(encoded)
            }
            var idx = url.indexOf("flickr.com/photos/");
            var pos = idx + "flickr.com/photos/".length;
            var photo_info = url.substr(pos);
            if (photo_info.indexOf("/") == -1) return null;
            if (photo_info.indexOf("/") === 0) photo_info = photo_info.substr(1);
            id = photo_info.split("/")[1];
            return id
        },
        callFlickrAPI: function(id, self) {
            var url = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes" + "&api_key=" + flickr_key + "&photo_id=" + id + "&format=json&nojsoncallback=1";
            var request = new XMLHttpRequest;
            request.open("GET", url, true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    data = JSON.parse(request.responseText);
                    var flickr_url = self.bestFlickrUrl(data.sizes.size);
                    self.setFlickrImage(flickr_url)
                } else {
                    console.error("There was an error getting the picture from Flickr")
                }
            };
            request.onerror = function() {
                console.error("There was an error getting the picture from Flickr")
            };
            request.send()
        },
        setFlickrImage: function(src) {
            this.image.src = src
        },
        bestFlickrUrl: function(ary) {
            var dict = {};
            for (var i = 0; i < ary.length; i++) {
                dict[ary[i].label] = ary[i].source
            }
            for (var j = 0; j < FLICKR_SIZE_PREFERENCES.length; j++) {
                if (FLICKR_SIZE_PREFERENCES[j] in dict) {
                    return dict[FLICKR_SIZE_PREFERENCES[j]]
                }
            }
            return ary[0].source
        }
    };

    function getNaturalDimensions(DOMelement) {
        if (DOMelement.naturalWidth && DOMelement.naturalHeight) {
            return {
                width: DOMelement.naturalWidth,
                height: DOMelement.naturalHeight
            }
        }
        var img = new Image;
        img.src = DOMelement.src;
        return {
            width: img.width,
            height: img.height
        }
    }

    function getImageDimensions(img) {
        var dimensions = {
            width: getNaturalDimensions(img).width,
            height: getNaturalDimensions(img).height,
            aspect: function() {
                return this.width / this.height
            }
        };
        return dimensions
    }

    function addClass(element, c) {
        if (element.classList) {
            element.classList.add(c)
        } else {
            element.className += " " + c
        }
    }

    function removeClass(element, c) {
        element.className = element.className.replace(/(\S+)\s*/g, function(w, match) {
            if (match === c) {
                return ""
            }
            return w
        }).replace(/^\s+/, "")
    }

    function setText(element, text) {
        if (document.body.textContent) {
            element.textContent = text
        } else {
            element.innerText = text
        }
    }

    function getComputedWidthAndHeight(element) {
        if (window.getComputedStyle) {
            return {
                width: parseInt(getComputedStyle(element).width, 10),
                height: parseInt(getComputedStyle(element).height, 10)
            }
        } else {
            w = element.getBoundingClientRect().right - element.getBoundingClientRect().left;
            h = element.getBoundingClientRect().bottom - element.getBoundingClientRect().top;
            return {
                width: parseInt(w, 10) || 0,
                height: parseInt(h, 10) || 0
            }
        }
    }

    function viewport() {
        var e = window,
            a = "inner";
        if (!("innerWidth" in window)) {
            a = "client";
            e = document.documentElement || document.body
        }
        return {
            width: e[a + "Width"],
            height: e[a + "Height"]
        }
    }

    function getPageX(e) {
        var pageX;
        if (e.pageX) {
            pageX = e.pageX
        } else if (e.touches) {
            pageX = e.touches[0].pageX
        } else {
            pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
        }
        return pageX
    }

    function getPageY(e) {
        var pageY;
        if (e.pageY) {
            pageY = e.pageY
        } else if (e.touches) {
            pageY = e.touches[0].pageY
        } else {
            pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
        }
        return pageY
    }

    function checkFlickr(url) {
        if (url.match(/flic.kr\/.+/i)) {
            return true
        }
        var idx = url.indexOf("flickr.com/photos/");
        if (idx == -1) {
            return false
        } else {
            return true
        }
    }

    function base58Decode(encoded) {
        var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
            base = alphabet.length;
        if (typeof encoded !== "string") {
            throw '"base58Decode" only accepts strings.'
        }
        var decoded = 0;
        while (encoded) {
            var alphabetPosition = alphabet.indexOf(encoded[0]);
            if (alphabetPosition < 0) {
                throw '"base58Decode" can\'t find "' + encoded[0] + '" in the alphabet: "' + alphabet + '"'
            }
            var powerOf = encoded.length - 1;
            decoded += alphabetPosition * Math.pow(base, powerOf);
            encoded = encoded.substring(1)
        }
        return decoded.toString()
    }

    function getLeftPercent(slider, input) {
        if (typeof input === "string" || typeof input === "number") {
            leftPercent = parseInt(input, 10)
        } else {
            var sliderRect = slider.getBoundingClientRect();
            var offset = {
                top: sliderRect.top + document.body.scrollTop + document.documentElement.scrollTop,
                left: sliderRect.left + document.body.scrollLeft + document.documentElement.scrollLeft
            };
            var width = slider.offsetWidth;
            var pageX = getPageX(input);
            var relativeX = pageX - offset.left;
            leftPercent = relativeX / width * 100
        }
        return leftPercent
    }

    function getTopPercent(slider, input) {
        if (typeof input === "string" || typeof input === "number") {
            topPercent = parseInt(input, 10)
        } else {
            var sliderRect = slider.getBoundingClientRect();
            var offset = {
                top: sliderRect.top + document.body.scrollTop + document.documentElement.scrollTop,
                left: sliderRect.left + document.body.scrollLeft + document.documentElement.scrollLeft
            };
            var width = slider.offsetHeight;
            var pageY = getPageY(input);
            var relativeY = pageY - offset.top;
            topPercent = relativeY / width * 100
        }
        return topPercent
    }
    var BOOLEAN_OPTIONS = {
        animate: true,
        showLabels: true,
        showCredits: true,
        makeResponsive: true
    };

    function interpret_boolean(x) {
        if (typeof x != "string") {
            return Boolean(x)
        }
        return !(x === "false" || x === "")
    }

    function JXSlider(selector, images, options) {
        this.selector = selector;
        var i;
        this.options = {
            animate: true,
            showLabels: true,
            showCredits: true,
            makeResponsive: true,
            startingPosition: "50%",
            mode: "horizontal",
            callback: null
        };
        for (i in this.options) {
            if (i in options) {
                if (i in BOOLEAN_OPTIONS) {
                    this.options[i] = interpret_boolean(options[i])
                } else {
                    this.options[i] = options[i]
                }
            }
        }
        if (images.length == 2) {
            if (checkFlickr(images[0].src)) {
                this.imgBefore = new FlickrGraphic(images[0], this)
            } else {
                this.imgBefore = new Graphic(images[0], this)
            }
            if (checkFlickr(images[1].src)) {
                this.imgAfter = new FlickrGraphic(images[1], this)
            } else {
                this.imgAfter = new Graphic(images[1], this)
            }
        } else {
            console.warn("The images parameter takes two Image objects.")
        }
        if (this.imgBefore.credit || this.imgAfter.credit) {
            this.options.showCredits = true
        } else {
            this.options.showCredits = false
        }
    }
    JXSlider.prototype = {
        updateSlider: function(input, animate) {
            var leftPercent, rightPercent;
            if (this.options.mode === "vertical") {
                leftPercent = getTopPercent(this.slider, input)
            } else {
                leftPercent = getLeftPercent(this.slider, input)
            }
            leftPercent = leftPercent.toFixed(2) + "%";
            leftPercentNum = parseFloat(leftPercent);
            rightPercent = 100 - leftPercentNum + "%";
            if (leftPercentNum > 0 && leftPercentNum < 100) {
                removeClass(this.handle, "transition");
                removeClass(this.rightImage, "transition");
                removeClass(this.leftImage, "transition");
                if (this.options.animate && animate) {
                    addClass(this.handle, "transition");
                    addClass(this.leftImage, "transition");
                    addClass(this.rightImage, "transition")
                }
                if (this.options.mode === "vertical") {
                    this.handle.style.top = leftPercent;
                    this.leftImage.style.height = leftPercent;
                    this.rightImage.style.height = rightPercent
                } else {
                    this.handle.style.left = leftPercent;
                    this.leftImage.style.width = leftPercent;
                    this.rightImage.style.width = rightPercent
                }
                this.sliderPosition = leftPercent
            }
        },
        getPosition: function() {
            return this.sliderPosition
        },
        displayLabel: function(element, labelText) {
            label = document.createElement("div");
            label.className = "jx-label";
            label.setAttribute("tabindex", 0);
            setText(label, labelText);
            element.appendChild(label)
        },
        displayCredits: function() {
            credit = document.createElement("div");
            credit.className = "jx-credit";
            text = "<em>Photo Credits:</em>";
            if (this.imgBefore.credit) {
                text += " <em>Before</em> " + this.imgBefore.credit
            }
            if (this.imgAfter.credit) {
                text += " <em>After</em> " + this.imgAfter.credit
            }
            credit.innerHTML = text;
            this.wrapper.appendChild(credit)
        },
        setStartingPosition: function(s) {
            this.options.startingPosition = s
        },
        checkImages: function() {
            if (getImageDimensions(this.imgBefore.image).aspect() == getImageDimensions(this.imgAfter.image).aspect()) {
                return true
            } else {
                return false
            }
        },
        calculateDims: function(width, height) {
            var ratio = getImageDimensions(this.imgBefore.image).aspect();
            if (width) {
                height = width / ratio
            } else if (height) {
                width = height * ratio
            }
            return {
                width: width,
                height: height,
                ratio: ratio
            }
        },
        responsivizeIframe: function(dims) {
            if (dims.height < window.innerHeight) {
                if (dims.ratio >= 1) {
                    this.wrapper.style.paddingTop = parseInt((window.innerHeight - dims.height) / 2) + "px"
                }
            } else if (dims.height > window.innerHeight) {
                dims = this.calculateDims(0, window.innerHeight);
                this.wrapper.style.paddingLeft = parseInt((window.innerWidth - dims.width) / 2) + "px"
            }
            if (this.options.showCredits) {
                dims.height -= 13
            }
            return dims
        },
        setWrapperDimensions: function() {
            var wrapperWidth = getComputedWidthAndHeight(this.wrapper).width;
            var wrapperHeight = getComputedWidthAndHeight(this.wrapper).height;
            var dims = this.calculateDims(wrapperWidth, wrapperHeight);
            if (window.location !== window.parent.location && !this.options.makeResponsive) {
                dims = this.responsivizeIframe(dims)
            }
          
        },
        optimizeWrapper: function(maxWidth) {
            var result = juxtapose.OPTIMIZATION_ACCEPTED;
            if (this.imgBefore.image.naturalWidth >= maxWidth && this.imgAfter.image.naturalWidth >= maxWidth) {
                this.wrapper.style.width = maxWidth + "px";
                result = juxtapose.OPTIMIZATION_WAS_CONSTRAINED
            } else if (this.imgAfter.image.naturalWidth < maxWidth) {
                this.wrapper.style.width = this.imgAfter.image.naturalWidth + "px"
            } else {
                this.wrapper.style.width = this.imgBefore.image.naturalWidth + "px"
            }
            this.setWrapperDimensions();
            return result
        },
        _onLoaded: function() {
            if (this.imgBefore && this.imgBefore.loaded === true && this.imgAfter && this.imgAfter.loaded === true) {
                this.wrapper = document.querySelector(this.selector);
                addClass(this.wrapper, "juxtapose");
                this.wrapper.style.width = getNaturalDimensions(this.imgBefore.image).width;
                this.setWrapperDimensions();
                this.slider = document.createElement("div");
                this.slider.className = "jx-slider";
                this.wrapper.appendChild(this.slider);
                if (this.options.mode != "horizontal") {
                    addClass(this.slider, this.options.mode)
                }
                this.handle = document.createElement("div");
                this.handle.className = "jx-handle";
                this.rightImage = document.createElement("div");
                this.rightImage.className = "jx-image jx-right";
                this.rightImage.appendChild(this.imgAfter.image);
                this.leftImage = document.createElement("div");
                this.leftImage.className = "jx-image jx-left";
                this.leftImage.appendChild(this.imgBefore.image);
                this.labCredit = document.createElement("a");
                this.labCredit.setAttribute("href", "http://juxtapose.knightlab.com");
                this.labCredit.setAttribute("target", "_blank");
                this.labCredit.className = "jx-knightlab";
                this.labLogo = document.createElement("div");
                this.labLogo.className = "knightlab-logo";
                this.labCredit.appendChild(this.labLogo);
                this.projectName = document.createElement("span");
                this.projectName.className = "juxtapose-name";
                setText(this.projectName, "JuxtaposeJS");
                this.labCredit.appendChild(this.projectName);
                this.slider.appendChild(this.handle);
                this.slider.appendChild(this.leftImage);
                this.slider.appendChild(this.rightImage);
                this.slider.appendChild(this.labCredit);
                this.leftArrow = document.createElement("div");
                this.rightArrow = document.createElement("div");
                this.control = document.createElement("div");
                this.controller = document.createElement("div");
                this.leftArrow.className = "jx-arrow jx-left";
                this.rightArrow.className = "jx-arrow jx-right";
                this.control.className = "jx-control";
                this.controller.className = "jx-controller";
                this.controller.setAttribute("tabindex", 0);
                this.controller.setAttribute("role", "slider");
                this.controller.setAttribute("aria-valuenow", 50);
                this.controller.setAttribute("aria-valuemin", 0);
                this.controller.setAttribute("aria-valuemax", 100);
                this.handle.appendChild(this.leftArrow);
                this.handle.appendChild(this.control);
                this.handle.appendChild(this.rightArrow);
                this.control.appendChild(this.controller);
                this._init()
            }
        },
        _init: function() {
            if (this.checkImages() === false) {
                console.warn(this, "Check that the two images have the same aspect ratio for the slider to work correctly.")
            }
            this.updateSlider(this.options.startingPosition, false);
            if (this.options.showLabels === true) {
                if (this.imgBefore.label) {
                    this.displayLabel(this.leftImage, this.imgBefore.label)
                }
                if (this.imgAfter.label) {
                    this.displayLabel(this.rightImage, this.imgAfter.label)
                }
            }
            if (this.options.showCredits === true) {
                this.displayCredits()
            }
            var self = this;
            window.addEventListener("resize", function() {
                self.setWrapperDimensions()
            });
            this.slider.addEventListener("mousedown", function(e) {
                e = e || window.event;
                e.preventDefault();
                self.updateSlider(e, true);
                animate = true;
                this.addEventListener("mousemove", function(e) {
                    e = e || window.event;
                    e.preventDefault();
                    if (animate) {
                        self.updateSlider(e, false)
                    }
                });
                this.addEventListener("mouseup", function(e) {
                    e = e || window.event;
                    e.preventDefault();
                    e.stopPropagation();
                    this.removeEventListener("mouseup", arguments.callee);
                    animate = false
                })
            });
            this.slider.addEventListener("touchstart", function(e) {
                e = e || window.event;
                e.preventDefault();
                e.stopPropagation();
                self.updateSlider(e, true);
                this.addEventListener("touchmove", function(e) {
                    e = e || window.event;
                    e.preventDefault();
                    e.stopPropagation();
                    self.updateSlider(event, false)
                })
            });
            this.handle.addEventListener("keydown", function(e) {
                e = e || window.event;
                var key = e.which || e.keyCode;
                var ariaValue = parseFloat(this.style.left);
                if (key == 37) {
                    ariaValue = ariaValue - 1;
                    var leftStart = parseFloat(this.style.left) - 1;
                    self.updateSlider(leftStart, false);
                    self.controller.setAttribute("aria-valuenow", ariaValue)
                }
                if (key == 39) {
                    ariaValue = ariaValue + 1;
                    var rightStart = parseFloat(this.style.left) + 1;
                    self.updateSlider(rightStart, false);
                    self.controller.setAttribute("aria-valuenow", ariaValue)
                }
            });
            this.leftImage.addEventListener("keydown", function(event) {
                var key = event.which || event.keyCode;
                if (key == 13 || key == 32) {
                    self.updateSlider("90%", true);
                    self.controller.setAttribute("aria-valuenow", 90)
                }
            });
            this.rightImage.addEventListener("keydown", function(event) {
                var key = event.which || event.keyCode;
                if (key == 13 || key == 32) {
                    self.updateSlider("10%", true);
                    self.controller.setAttribute("aria-valuenow", 10)
                }
            });
            juxtapose.sliders.push(this);
            if (this.options.callback && typeof this.options.callback == "function") {
                this.options.callback(this)
            }
        }
    };
    juxtapose.makeSlider = function(element, idx) {
        if (typeof idx == "undefined") {
            idx = juxtapose.sliders.length
        }
        var w = element;
        var images = w.querySelectorAll("img");
        var options = {};
        if (w.getAttribute("data-animate")) {
            options.animate = w.getAttribute("data-animate")
        }
        if (w.getAttribute("data-showlabels")) {
            options.showLabels = w.getAttribute("data-showlabels")
        }
        if (w.getAttribute("data-showcredits")) {
            options.showCredits = w.getAttribute("data-showcredits")
        }
        if (w.getAttribute("data-startingposition")) {
            options.startingPosition = w.getAttribute("data-startingposition")
        }
        if (w.getAttribute("data-mode")) {
            options.mode = w.getAttribute("data-mode")
        }
        if (w.getAttribute("data-makeresponsive")) {
            options.mode = w.getAttribute("data-makeresponsive")
        }
        specificClass = "juxtapose-" + idx;
        addClass(element, specificClass);
        selector = "." + specificClass;
        if (w.innerHTML) {
            w.innerHTML = ""
        } else {
            w.innerText = ""
        }
        slider = new juxtapose.JXSlider(selector, [{
            src: images[0].src,
            label: images[0].getAttribute("data-label"),
            credit: images[0].getAttribute("data-credit"),
            alt: images[0].alt
        }, {
            src: images[1].src,
            label: images[1].getAttribute("data-label"),
            credit: images[1].getAttribute("data-credit"),
            alt: images[1].alt
        }], options)
    };
    juxtapose.scanPage = function() {
        var elements = document.querySelectorAll(".juxtapose");
        for (var i = 0; i < elements.length; i++) {
            juxtapose.makeSlider(elements[i], i)
        }
    };
    juxtapose.JXSlider = JXSlider;
    window.juxtapose = juxtapose;
    juxtapose.scanPage()
})(document, window);
!window.addEventListener && function(WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
    WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function(type, listener) {
        var target = this;
        registry.unshift([target, type, listener, function(event) {
            event.currentTarget = target;
            event.preventDefault = function() {
                event.returnValue = false
            };
            event.stopPropagation = function() {
                event.cancelBubble = true
            };
            event.target = event.srcElement || target;
            listener.call(target, event)
        }]);
        this.attachEvent("on" + type, registry[0][3])
    };
    WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function(type, listener) {
        for (var index = 0, register; register = registry[index]; ++index) {
            if (register[0] == this && register[1] == type && register[2] == listener) {
                return this.detachEvent("on" + type, registry.splice(index, 1)[0][3])
            }
        }
    };
    WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function(eventObject) {
        return this.fireEvent("on" + eventObject.type, eventObject)
    }
}(Window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);

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
      'contacts': 'Contacts',
      'Guest country house project': 'Проект гостевого загородного дома в стиле Тюдор, МО, 2019г.',
      '11 February': '11 февраля',
      'the customer applied': 'обратился заказчик с просьбой спроектировать гостевой загородный дом',
      '6 May': '6 мая',
      'went to the site': 'на площадку вышла первая строительная бригада, которая сделала фундамент УШП',
      'June 20': '20 июня',
      'the company left': 'вышла компания, которая возвела каркас дома',
      'December 28th': '28 декабря',
      'the customer has moved': 'заказчик переехал в этот дом и отпразновал в нем Новый год',
      'August 19': '19 августа',
      'builders came out': 'вышли строители, которые занимались внутренней и внешней отделкой',
      'House created': 'Дом создан в рекордно короткие сроки',
      'General': 'Общая площадь дома 385 м²',
      'Project published': 'Проект опубликован в журнале SALON Классика DeLux №3.2020',
      'The emphasis was on that': '• Акцент делался на том, что должен быть большой гараж 100 м², отдельные помещения для обслуживающего персонала на первом этаже, а гостевые спальни и гостиная с кухней на мансарде',
      'The house was to be built': '• Дом предполагалось строить на месте маленького дома, в котором проживал работник заказчика. Он так давно уже помогает на участке, что стал практически членом семьи',
      'Therefore': '• Поэтому в самом начале стройки мои заказчики все время говорили, что строят дом для него. Однако это продолжалось не долго. Ровно до того момента, когда они поняли, что у нас стало получаться',
      'Construction site': '• Место стройки – это старый дачный подмосковный поселок с историей',
      'Hall': 'Холл',
      'The house is conditionally': 'Дом условно разделен на две части - общую и гостевую этажами. Так на мансарде располагаются спальни, гостиная, кухня, столовая, ванные комнаты, гардеробные. На первом этаже гостевой санузел, прихожая, гараж, техпомещения и помещения персонала. Прямо из прихожей первого этажа по лестнице можно попасть в холл мансарды из которого можно пройти в жилые комнаты',
      'For consultation': 'Для консультации мы приглашали арбориста, чтобы четко очертить границы стройки. Отсюда и г-образная конфигурация дома. Дуб оказался во внутреннем дворе, напротив центрального входа в дом',
      'The presence of oak': 'Наличие дуба на участке так же повлияло и на стилистику дома. Я бы назвала его подмосковный Тюдор. Дома в таком стиле еще не распространены в нашем регионе. Хотя в этом историчесом стиле много строили и строят в Северной Америке, тилизуя постройки под дома старой Англии. Рядом с будущим домом растёт двухсотлетний дуб, который нужно было сохранить',
      'Living room': 'Гостинная',
      'Total living area 62 m²': '• Общая площадь гостиной 62 м². Это открытое пространство объединенное с кухней и зоной столовой. Высота сложных потолков гостиной 3,5 м',
      'All rooms are finished': '• Всё помещение отделано вагонкой Штиль, покрашенной в заводских условиях',
      'June 19': '19 июня',
      'the organization came': 'зашла организация, которая выставила силовой каркас из LVL балок и сделали сложную стропильную систему крыши',
      'August 20': '20 августа',
      'transferred': 'передали дом другой строительной организации, которая сделала отделку фасадов и внутреннюю отделку',
      'Tasks before me': 'Передо мной стояли задачи построить дом быстро, поэтому я применяла технологии, которые позволили построить дом и сделать отделку за один сезон',
      'Because of': '• Из-за того, что основные окна в доме выходят на север, мы выбрали светлые тона. При этом старались, чтобы этот цвет стен сочетался со своей мебелью в доме',
      'complex walls': '• У нас довольно таки сложные стены и потолок. Все жилые комнаты находятся на мансардном этаже. Получились сложные и в то же время интересные помещения',
      'used furniture': '• В основном в этом доме использовалась мебель из запасов заказчика. Кухня, гардеробная и встроенная в ниши мебель делалась на заказ. Встроенная мебель в нишах по моим эскизам и рассчитывалась с учетом сложной ломанной крыши',
      'Probably thanks to that': '• Наверное, благодаря тому, что многие предметы интерьера уже прожили какую-то часть жизни со своими хозяевами, интерьер дома не смотрится как новодел',
      'Kitchens': 'Кухня',
      'The kitchen is': '• Кухня является частью гостиной. Однако, чтобы не перегружать помещение, кухонная мебель не высокая. Общая высота 1400 мм. Поскольку назначение дома как гостевой, то данной мебели вполне достаточно',
      'Color selection': '• Выбор цвета кухни был обусловлен тем, что часть предметов интерьера уже была у заказчика. И чтобы связать их воедино, был выбран цвет вишни для фасадов',
      '4 bedrooms': '• Нужно было разместить 4 спальни. Кухня должна была быть небольшой с минимальным набором техники, поскольку дом гостевой',
      'During the construction process, we': 'В процессе стройки нам пришлось вносить изменения и не простые. Заказчик начал понимать, что у него получается красивый дом, то он лучше его основного. У него стали появляться мысли, что основной дом нужно перестроить. Поэтому мы срочно делали перепланировку – объединили две спальни в одну, сделали при ней гардеробную и ванную комнату. Определили её как хозяйскую',
      'As I wrote earlier': 'Как я написала ранее – первоначальная задача была построить дом с гаражом и помещениями для обслуживающего персонала. Предполагалось, что мы закончим строительство дома с наружной отделкой в строительный сезон и отделаем помещения для персонала. Благодаря фундаменту УШП (утепленная шведская плита) основные коммуникации были разведены в самом начале строительства.',
      'Dining room': 'Столовая',
      'The dining room is also part of the living room': 'Столовая так же является частью гостиной. Как уже отмечалось ранее, в дом переехали предметы мебели из старого дома заказчика. Так около обеденного стола стоит старинная лавочка, бережно отреставрированная',
      'Attic floor': '• Мансардный этаж разделен на две части - общественную и условно приватную',
      'Climbing up the stairs': '• Поднимаясь по лестнице на мансардный этаж из холла можно попасть в гостиную или по коридору пройти в спальни',
      'master bedroom': 'Мастер спальня',
      '3 bedrooms': 'На мансарде располагаются 3 спальни. Одна из спален 30 м², соединена с гардеробной и собственной ванной. В этой спальни есть мягкий комфортный диван и бюро, выполняющее роль рабочего стола',
      'Bathroom': 'Ванная комната',
      'bathroom 8.5 m²': 'Ванная комната 8,5 м² рядом с мастер-спальней оснащена душевой кабиной, унитазом с гигиеническим душем и раковиной. Из окна ванной открывается вид на двухсотлетний дуб',
      'Guest bedrooms': 'Гостевые спальни',
      'Still in this house': 'В этом доме еще две спальни. Одна спальня 25 м², другая небольшая 12 м²',
      'bathrooms': 'Санузлы',
      'Guest bathroom': '• Гостевой санузел первого этажа несет на себе дополнительную функцию постирочной. Стиральная машина спрятана под столешницей рядом с раковиной',
      'Guest bathroom1': '• Гостевой санузел на втором этаже оснащен душевой кабиной, унитазом с гигиеническим душем и раковиной',
      'The closer he got': 'Чем ближе приближался конец строительных работ, тем больше у нашего заказчика возникало желание переехать в этот дом самому. И не просто переехать, а отметить новый 2020 год в этом новом доме',
      'text1': '• Это во многом повлияло на выбор отделочных материалов. В основном я искала всё, что можно было приобрести по факту. У нашего заказчика есть собаки и он просил подобрать для отделки керамогранит во все помещения. Самый большой выбор складской программ у АрдоСтудио и я естественно обратилась к ним за помощью',
      'text2': '• Поскольку у нас большая открытая гостиная, совмещенная с кухней-столовой соединена с холлом и коридором мансарды, из которого ведут двери в спальни, двери которых обычно открыты, на все эти помещения был выбран керамогранит под дерево',
      'text3': '• Только ступени на лестницу были выполнены на заказ. Однако, поскольку фабрика Italonотечественная, то сроки были минимальные. В 3-х санузлах на стенах и полу была использована плитка так же из складской программы Ардо Студио Equipe',
      'text4': '• В целях экономии времени на отделку на всех стенах и потолке была использована вагонка шитль от ТомСойер. Ее привозили на объект уже крашенную по нашему требованию в нужный цвет в заводских условиях',
      'Service list': 'Перечень услуг',
      'Adaptation of the project to a specific area': 'Адаптация проекта на конкретной местности',
      'Preparation of conditions for construction': 'Подготовка условий для строительства',
      'Carrying out geodetic and marking works': 'Проведение геодезических и разбивочных работ',
      'Purchase of building materials with discounts': 'Закупка строительных материалов со скидками',
      'We provide a range of services for designers, architects, engineers, planners': 'Предоставляем комплекс услуг дизайнеров, архитекторов, инженеров, проектировщиков',
      'Installation of temporary barriers, supply of water and electricity, arrangement of change houses': 'Установка временных заграждений, подвод воды и электричества, обустройство бытовок',
      'Drafting and coordination with the state. authorities technical and project documentation': 'Составление и согласование с гос. органами техническую и проектную документацию',
      'Construction of foundations of any type and walls from any material of varying complexity': 'Возведение фундамента любого типа и стен из любого материала разной сложности',
      'Would you like a country house?': 'Хотели бы загородный дом?',
      'a request': 'Оставьте заявку на сайте, и мы вам перезвоним в течение 15 минут',
      'submit': 'Отправить',
      'name': 'Ваше имя',
      'phone': 'Номер телефона',
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
      'Guest country house project': 'The project of a guest country house in the Tudor style, MO, 2019.',
      '11 February': '11 February',
      'the customer applied': 'the customer asked to design a guest country house',
      '6 May': 'the 6th of May',
      'went to the site': 'the first construction team entered the site, which made the foundation of the UWB',
      'June 20': 'June 20',
      'the company left': 'a company came out that erected the frame of the house',
      'December 28th': 'December 28th',
      'the customer has moved': 'the customer moved into this house and celebrated the New Year in it',
      'August 19': 'August 19',
      'builders came out': 'builders came out who were engaged in interior and exterior decoration',
      'House created': 'The house was built in record time',
      'General': 'The total area of ​​the house is 385 m²',
      'Project published': 'The project was published in the magazine SALON Classic DeLux No. 3.2020',
      'The emphasis was on that': '• Emphasis was placed on having a large garage of 100 m², separate staff quarters on the ground floor, and guest bedrooms and a living room with a kitchen in the attic',
      'The house was to be built': '• The house was supposed to be built on the site of a small house in which the customer is employee lived. He has been helping on the site for so long that he has become almost a member of the family.',
      'Therefore': '• Therefore, at the very beginning of the construction, my customers kept saying that they were building a house for him. However, this did not last long. Exactly until the moment when they realized that we began to succeed',
      'Construction site': '• The construction site is an old dacha village near Moscow with a history',
      'Hall': 'Hall',
      'The house is conditionally': 'The house is conditionally divided into two parts - common and guest floors. So in the attic there are bedrooms, a living room, a kitchen, a dining room, bathrooms, dressing rooms. On the ground floor there is a guest bathroom, an entrance hall, a garage, technical rooms and staff rooms. Directly from the entrance hall of the first floor, the stairs lead to the attic hall from which you can go to the living rooms',
      'For consultation': 'For consultation, we invited an arborist to clearly delineate the boundaries of the construction site. Hence the L-shaped configuration of the house. The oak was in the courtyard, opposite the main entrance to the house',
      'The presence of oak': 'The presence of oak on the site also influenced the style of the house. I would call him Tudor near Moscow. Houses in this style are not yet common in our region. Although in this historical style a lot was built and is being built in North America, tiling buildings under the houses of old England. A 200-year-old oak tree grows near the future house, which had to be preserved',
      'Living room': 'Living room',
      'Total living area 62 m²': '• The total area of ​​the living room is 62 m². This is an open space combined with a kitchen and dining area. The height of the complex ceilings of the living room is 3.5 m',
      'All rooms are finished': '• The whole room is finished with Calm clapboard, painted at the factory',
      'June 19': 'June 19',
      'the organization came': 'an organization came in, which put up a load-bearing frame from LVL beams and made a complex roof truss system',
      'August 20': 'August 20',
      'transferred': 'transferred the house to another construction organization, which did the facade and interior decoration',
      'Tasks before me': 'I was faced with the task of building a house quickly, so I applied technologies that allowed me to build a house and finish it in one season.',
      'Because of': '• Due to the fact that the main windows in the house face north, we chose light colors. At the same time, they tried to ensure that this color of the walls was combined with their furniture in the house.',
      'complex walls': '• We have pretty complex walls and ceilings. All living rooms are located on the attic floor. Complex and at the same time interesting premises turned out',
      'used furniture': '• Most of the furniture used in this house was from the customer is stock. The kitchen, dressing room and furniture built into niches were made to order. Built-in furniture in niches according to my sketches and calculated taking into account the complex sloping roof',
      'Probably thanks to that': '• Probably, due to the fact that many interior items have already lived some part of their lives with their owners, the interior of the house does not look like a remake',
      'Kitchens': 'Kitchens',
      'The kitchen is': '• The kitchen is part of the living room. However, in order not to overload the room, the kitchen furniture is not high. Total height 1400 mm. Since the purpose of the house as a guest room, this furniture is quite enough',
      'Color selection': '• The choice of color for the kitchen was due to the fact that some of the interior items were already at the customer is disposal. And to tie them together, cherry color was chosen for the facades.',
      '4 bedrooms': '• It was necessary to accommodate 4 bedrooms. The kitchen had to be small with a minimum set of appliances, since the guest house',
      'During the construction process, we': 'During the construction process, we had to make changes and not simple ones. The customer began to understand that he was getting a beautiful house, then it was better than his main one. He began to have thoughts that the main house needs to be rebuilt. Therefore, we urgently did redevelopment - combined two bedrooms into one, made a dressing room and a bathroom with it. They identified her as the owner.',
      'As I wrote earlier': 'As I wrote earlier - the initial task was to build a house with a garage and premises for staff. We were supposed to finish building the house with exterior finishes during the construction season and finish the staff quarters. Thanks to the UShP foundation (insulated Swedish plate), the main communications were separated at the very beginning of construction.',
      'Dining room': 'Dining room',
      'The dining room is also part of the living room': 'The dining room is also part of the living room. As noted earlier, pieces of furniture from the customer is old house moved into the house. So near the dining table is an old bench, carefully restored',
      'Attic floor': '• The attic floor is divided into two parts - public and conditionally private',
      'Climbing up the stairs': '• Climbing the stairs to the attic floor from the hall you can get into the living room or go along the corridor to the bedrooms',
      'master bedroom': 'Master bedroom',
      '3 bedrooms': 'There are 3 bedrooms in the attic. One of the bedrooms is 30 m², connected with a dressing room and a private bathroom. This bedroom has a soft comfortable sofa and a bureau that acts as a desktop.',
      'Bathroom': 'Bathroom',
      'bathroom 8.5 m²': 'The bathroom of 8.5 m² next to the master bedroom is equipped with a shower cabin, a toilet with a hygienic shower and a washbasin. The bathroom window overlooks a 200-year-old oak',
      'Guest bedrooms': 'Guest bedrooms',
      'Still in this house': 'This house has two more bedrooms. One bedroom 25 m², the other small 12 m²',
      'bathrooms': 'Bathrooms',
      'Guest bathroom': '• The guest bathroom on the ground floor has an additional laundry function. The washing machine is hidden under the countertop next to the sink.',
      'Guest bathroom1': '• The guest bathroom on the second floor is equipped with a shower cabin, a toilet bowl with a hygienic shower and a sink',
      'The closer he got': 'The closer the end of construction work approached, the more our customer had a desire to move into this house himself. And not just move, but celebrate the new year 2020 in this new house',
      'text1': '• This largely influenced the choice of finishing materials. Basically, I was looking for everything that could be purchased after the fact. Our customer has dogs and he asked to choose porcelain tiles for finishing in all rooms. ArdoStudio has the largest selection of warehouse programs and I naturally turned to them for help',
      'text2': '• Since we have a large open living room, combined with a kitchen-dining room, connected to the hall and the attic corridor, from which the doors lead to the bedrooms, the doors of which are usually open, wood-effect porcelain stoneware was chosen for all these rooms',
      'text3': '• Only the steps to the stairs were made to order. However, since the Italon factory is domestic, the terms were minimal. In 3 bathrooms, on the walls and floor, tiles were also used from the warehouse program of Ardo Studio Equipe',
      'text4': '• In order to save time on finishing, all walls and ceilings were covered with sheeting from TomSawyer. It was brought to the site already painted at our request in the desired color in the factory',
      'Service list': 'Service list',
      'Adaptation of the project to a specific area': 'Adaptation of the project to a specific area',
      'Preparation of conditions for construction': 'Preparation of conditions for construction',
      'Carrying out geodetic and marking works': 'Carrying out geodetic and marking works',
      'Purchase of building materials with discounts': 'Purchase of building materials with discounts',
      'We provide a range of services for designers, architects, engineers, planners': 'We provide a range of services for designers, architects, engineers, planners',
      'Installation of temporary barriers, supply of water and electricity, arrangement of change houses': 'Installation of temporary barriers, supply of water and electricity, arrangement of change houses',
      'Drafting and coordination with the state. authorities technical and project documentation': 'Drafting and coordination with the state. authorities technical and project documentation',
      'Construction of foundations of any type and walls from any material of varying complexity': 'Construction of foundations of any type and walls from any material of varying complexity',
      'Would you like a country house?': 'Would you like a country house?',
      'a request': 'Leave a request on the website and we will call you back within 15 minutes',
      'submit': 'Submit',
      'name': 'Your name',
      'phone': 'Phone number',
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