"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function startTimer(duration, countdown, callback) {
  var timer = duration,
      seconds;
  var execTimer = setInterval(function () {
    seconds = parseInt(timer % 60, 10);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    countdown.textContent = "00:00:" + seconds;
    countdown.dataset.text = countdown.textContent;
    timer-- || (clearInterval(execTimer), callback());
  }, 1000);
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = ampm + ' ' + hours + ':' + minutes;
  return strTime;
}

window.onload = function () {
  var cursor = document.querySelector('.cursor');
  var init = document.querySelector('.init');
  var main = document.querySelector('main');
  var countdown = document.querySelector('#countdown');
  var time = document.querySelector('#time');
  var date = document.querySelector('#date');
  var today = new Date();
  var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  if (bowser.name == 'Internet Explorer') {
    alert('Sorry, This browser is not supported!');
  }

  document.addEventListener('mousemove', function (e) {
    cursor.setAttribute('style', 'top: ' + (e.pageY - 20) + 'px; left: ' + (e.pageX - 20) + 'px; transition-property: none;');
  });
  document.addEventListener('click', function (e) {
    cursor.classList.add('cursor-expand');
    setTimeout(function () {
      cursor.classList.remove('cursor-expand');
    }, 500);
  });
  time.textContent = formatAMPM(today);
  time.dataset.text = time.textContent;
  date.textContent = monthNames[today.getMonth()] + ' ' + today.getDate() + ' ' + today.getFullYear();
  date.dataset.text = date.textContent;
  startTimer(5, countdown, function () {
    init.remove();
    main.setAttribute('style', 'visibility: visible; opacity: 1;');
    execMain();
  });
};

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }

    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

function execMain() {
  var wheelEventName = /Firefox/i.test(navigator.userAgent) ? "wheel" : "mousewheel";

  var layers = _toConsumableArray(document.querySelectorAll('.layer'));

  var indicatorer = document.querySelector('.indicator-active');
  var indicatorerNumber = document.querySelector('.indicator-number');
  var nameColor = document.querySelector('.name-color');
  var itemDisplayed = 0;
  var animationPlaying = false;

  function resetClasses() {
    for (var i = 0; i < 3; i++) {
      layers[0].children[i].classList.remove('item-displayed');
      layers[1].children[i * 2].classList.remove('item-displayed');
    }
  }

  document.addEventListener(wheelEventName, function (event) {
    if (!animationPlaying) {
      var nextItem = itemDisplayed + Math.sign(event.deltaY);

      if (nextItem >= 0 && nextItem <= 2) {
        itemDisplayed += Math.sign(event.deltaY);
        layers[0].style = "transform: translateX(".concat(-itemDisplayed * 85, "vw);");
        layers[1].style = "transform: translateX(".concat(-itemDisplayed * 85 * 2, "vw);");
        layers[1].children[itemDisplayed * 2].classList.add('item-revealed');
        resetClasses();
        layers[0].children[itemDisplayed].classList.add('item-displayed');
        layers[1].children[itemDisplayed * 2].classList.add('item-displayed');
        indicatorer.style = "transform: translateX(".concat(itemDisplayed * 100, "%); transition: transform 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);");
        indicatorerNumber.innerText = "0".concat(itemDisplayed + 1);
        setTimeout(function () {
          animationPlaying = false;
        }, 2200);
        animationPlaying = true;
      }
    }
  });
}