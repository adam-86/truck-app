$('.cropme').simpleCropper();
//variables for cropzone and slides
const slide = document.querySelector('.slide'),
  cropzone = document.querySelector('.cropzone');
const nextSlide = document.getElementById('forward');
const prevSlide = document.getElementById('back');
let index = [1, 2, 3, 4];

for (let i = 0; i < index.length; i++)
;
i = 1;


                            ///////// Slide navigation starts here  //////////


//advance slide index when forward arrow is clicked
nextSlide.addEventListener('click', function() {

  //clear cropzone and hide adjustments when slide changes
  cropzone.innerHTML = '';
  contrastPlus.style.visibility = 'hidden';
  contrastMinus.style.visibility = 'hidden';
  brightness.style.visibility = 'hidden';

  if (i < index.length) {
    i = i + 1;
    //if current index is on last slide when clicked, slide index = 1
  } else {
    i = 1;
  }
  slide.classList = ' slide index-' + i;
  return;
});

//go to previous slide when back arrow is clicked
prevSlide.addEventListener('click', function() {

  cropzone.innerHTML = '';
  contrastPlus.style.visibility = 'hidden';
  contrastMinus.style.visibility = 'hidden';
  brightness.style.visibility = 'hidden';

  if (i <= index.length) {
    i = i - 1;
  }
  if (i < 1) {
    //if current index is on last slide, slide index = 4
    i = 4;
  }
  slide.classList = 'slide index-' + i;
  return;
});

                        ////////// popout instructions start here //////////


//constants for side menu
const menuButton = document.querySelector('.menu-button'),
      menu = document.querySelector('.instructions-popout'),
      menuClose = document.querySelector('.close-instructions-btn'),
      main = document.querySelector('.slide-container');

// when the menu button is clicked, slide menu to left: 70%
menuButton.addEventListener('click', function() {
  menu.style.left = '70%';
});

// hide instruction menu by moving it off screen (main container set to overflow hidden)
function closeMenu() {
  menu.style.left = '105%';
}
//hide instruction menu when x is clicked
menuClose.addEventListener('click', function() {
  closeMenu();
});


document.addEventListener('click', function(e) {
  // If instruction menu is open and the user clicks outside of it, close it
  if (e.target != menuButton && e.target != menu) {
    closeMenu();
  }
});

                            ////////// css filter/image adjustments start here  //////////

//image adjustment constants
const contrastPlus = document.querySelector('.plus-contrast-btn'),
  contrastMinus = document.querySelector('.negative-contrast-btn'),
  okButton = document.querySelector('.ok'),
  brightness = document.querySelector('.brightness');

okButton.addEventListener('click', function() {
  //when user clicks ok button on cropbox, show adjustments
  if (isImageLoaded = true) {
    contrastPlus.style.visibility = 'visible';
    contrastMinus.style.visibility = 'visible';
    brightness.style.visibility = 'visible';
  }
});

let contrastValue = 100;

//When contrast + is clicked, increase contrast by 20
contrastPlus.addEventListener('click', function() {
  if (isImageLoaded = true) {
    contrastValue += 20;

    //when contrast reaches 200, reset contrast back to default
    if (contrastValue >= 200) {
      contrastValue = 100;
    }

    const cropped = document.querySelector('.cropped');

    // apply contrast to .cropped (user uploaded image)
    cropped.style.filter = 'contrast(' + contrastValue + '%)';
  } else {
  // if no image is uploaded, alert message
    alert('You must upload an image before using this function.');
  }

});

//if negative contrast button is clicked, decrease contrast by 20
contrastMinus.addEventListener('click', function() {
  contrastValue -= 20;

//if contrast hits 0, reset back to 100
  if (contrastValue == 0) {
    contrastValue = 100;
  }

  const cropped = document.querySelector('.cropped');
  cropped.style.filter = 'contrast(' + contrastValue + '%)';
});

//repeat same steps as above for other filters
let brightnessValue = 100;

brightness.addEventListener('click', function() {
  brightnessValue += 25;

  if (brightnessValue >= 200) {
    brightnessValue = 0;
  }

  const cropped = document.querySelector('.cropped');
  cropped.style.filter = 'brightness(' + brightnessValue + '%)';
});

const downloadButton = document.getElementById('download-button');

//Check to see if browser is safari
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

//prevent default behavior when clicking on download button
downloadButton.addEventListener('click', function(e) {
  e.preventDefault();

//brower checks for IE
// let internetExplorer;
//
// if ($('html').is('.lt-ie7, .lt-ie8, .lt-ie9')) {
//   internetElxplorer = true;
//   console.log(internetExplorer);
// } else {
//   console.log('Not Internet Explorer');
// }

                            ///////// download stuff starts here //////////

  if (isSafari || internetExplorer) {
    //Inform user that download feature will not work in safari
    alert('This feature is not supported in Safari or Internet Explorer. Please try using Chrome or Firefox');
  } else {

// takes snap shot of entire div content, filters and all.
    const node = document.getElementById('capture-this');

// creates image source URL
    domtoimage.toPng(node).then(function(dataUrl) {

//create new image object
      const img = new Image();
// uses dataURL for image source
      img.src = dataUrl;
      img.download;

// create link for downloading purpose
      const link = document.createElement('a');

// set downloadable image attributes
      link.setAttribute('href', img.src);
      link.setAttribute('download', 'my-truck.jpg');
      link.setAttribute('target', '_blank');

// hide temporary link so user does not have to see it
      link.style.display = 'none';
      document.body.appendChild(link);

// initiate download
      link.click();
// and remove...
      document.body.removeChild(link);
    }).catch(function(error) {
      console.error('oops, something went wrong!', error);
    });
  }
});
