function clickedHamburger (container) {
  container.classList.toggle('select');
  showMenu();
}

function showMenu () {
  let menu = document.getElementById('menu');
  if (menu.className === 'menu') {
    menu.className += ' show';
  } 
  else {
    menu.className = 'menu';
  }
}

(function updateCurrentPage () {
  const URL_START = 'http://localhost:3000/';
  const HOME = 'home';
  const UPDATE = 'update';
  const ADD_QUESTION = 'addQuestion';
  let currentPage = window.location.href;
  let home = document.getElementById('home');
  let update = document.getElementById('update');
  let addQuestion = document.getElementById('addQuestion');

  home.classList.remove('current');
  update.classList.remove('current');
  addQuestion.classList.remove('current');

  if (URL_START + HOME === currentPage || URL_START === currentPage) {
    home.classList.add('current');
  }
  else if (URL_START + UPDATE === currentPage) {
    update.classList.add('current');
  }
  else if (URL_START + ADD_QUESTION === currentPage) {
    addQuestion.classList.add('current');
  }
  console.log(currentPage);
}());