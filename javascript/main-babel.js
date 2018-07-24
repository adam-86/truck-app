'use strict';

$('.cropme').simpleCropper();
//Variables for cropzone and slides
var slide = document.querySelector('.slide'),
    cropzone = document.querySelector('.cropzone');
var nextSlide = document.getElementById('forward');
var prevSlide = document.getElementById('back');
var index = [1, 2, 3, 4];

for (var i = 0; i < index.length; i++) {}
i = 3;

//advance slide index when forward arrow is clicked
nextSlide.addEventListener('click', function () {
  //clear cropzone and hide adjustments when slide changes
  cropzone.innerHTML = '';
  contrastPlus.style.visibility = 'hidden';
  contrastMinus.style.visibility = 'hidden';
  brightness.style.visibility = 'hidden';

  if (i < index.length) {
    i = i + 1;
    //if current index is on last slide, slide index = 1
  } else {
    i = 1;
  }
  slide.className = ' slide index-' + i;
});

//go to previous slide when back arrow is clicked
prevSlide.addEventListener('click', function () {

  cropzone.innerHTML = '';

  contrastPlus.style.visibility = 'hidden';
  contrastMinus.style.visibility = 'hidden';
  brightness.style.visibility = 'hidden';

  if (i <= index.length) {
    i = i - 1;
  }if (i < 1) {
    //if current index is on last slide, slide index = 4
    i = 4;
  }
  slide.className = ' slide index-' + i;
});


//variables for side menu
var menuButton = document.querySelector('.menu-button'),
    menu = document.querySelector('.instructions-popout'),
    menuClose = document.querySelector('.close-instructions-btn');

var main = document.querySelector('.slide-container');

// when the menu button is clicked, slide menu to right: 0
menuButton.addEventListener('click', function () {
  menu.style.left = '70%';
});
//hide instruction menu by moving it off screen, container set to overflow hidden
function closeMenu() {
  menu.style.left = '105%';
}
//hide instruction menu when x is clicked
menuClose.addEventListener('click', function () {
  closeMenu();
});

// If instruction menu is open and the user clicks outside of it, close it
document.addEventListener('click', function (e) {
  if (e.target != menuButton && e.target != menu) {
    closeMenu();
  }
});

//image adjustment variables
var contrastPlus = document.querySelector('.plus-contrast-btn'),
    contrastMinus = document.querySelector('.negative-contrast-btn'),
    okButton = document.querySelector('.ok'),
    brightness = document.querySelector('.brightness');


okButton.addEventListener('click', function () {
  //when user clicks ok button on cropbox, show adjustments
  if (isImageLoaded = true) {
    contrastPlus.style.visibility = 'visible';
    contrastMinus.style.visibility = 'visible';
    brightness.style.visibility = 'visible';
  }
});

var contrastValue = 100;

//When contrast + is clicked, increase contrast by 20
contrastPlus.addEventListener('click', function () {
  if (isImageLoaded = true) {
    contrastValue += 20;

    //when contrast reaches 200, reset contrast back to default
    if (contrastValue >= 200) {
      contrastValue = 100;
    }

    var cropped = document.querySelector('.cropped');
    // apply contrast to .cropped (user uploaded image)
    cropped.style.filter = 'contrast(' + contrastValue + '%)';
  } else {
    alert('You must upload an image before using this function.');
  }
});

contrastMinus.addEventListener('click', function () {
  contrastValue -= 20;

  if (contrastValue == 0) {
    contrastValue = 100;
  }

  var cropped = document.querySelector('.cropped');
  cropped.style.filter = 'contrast(' + contrastValue + '%)';
});

var brightnessValue = 100;

brightness.addEventListener('click', function () {
  brightnessValue += 25;

  if (brightnessValue >= 200) {
    brightnessValue = 0;
  }

  var cropped = document.querySelector('.cropped');
  cropped.style.filter = 'brightness(' + brightnessValue + '%)';
});

var downloadButton = document.getElementById('download-button');

//browser checks
var isInternetExplorer;

if (document.getElementsByTagName('html').is('.lt-ie7, .lt-ie8, .lt-ie9')) {
  isInternetExplorer = true;
}

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var isEdge = window.navigator.userAgent.indexOf("Edge") > -1;


console.log(isInternetExplorer);
downloadButton.addEventListener('click', function (e) {
  e.preventDefault();

  if (isSafari || isEdge) {
    //Inform user that download feature will not work in safari
    alert('Sorry! This feature is not supported in Safari or Internet Explorer. Please try again using Chrome, Firefox, or Microsoft Edge');
  } else {

    var node = document.getElementById('capture-this');

    domtoimage.toJpeg(node).then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      img.download;

      var link = document.createElement('a');

      link.setAttribute('href', img.src);
      link.setAttribute('download', 'my-truck.jpg');
      link.setAttribute('target', '_blank');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch(function (error) {
      console.error('oops, something went wrong!', error);
    });
  }
});
