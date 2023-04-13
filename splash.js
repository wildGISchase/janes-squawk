var splashScreen = document.querySelector('.splash');
splashScreen.addEventListener('click',someFunction())
  splashScreen.style.opacity = 0;
  setTimeout(()=>{
    splashScreen.classList.add('hidden')
  },610)