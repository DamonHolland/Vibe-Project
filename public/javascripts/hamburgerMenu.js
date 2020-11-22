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

function changeCurrentPage (clicked) {
  let home = document.getElementById('home');
  let update = document.getElementById('update');
  let addQuestion = document.getElementById('addQuestion');

  home.classList.remove('current');
  update.classList.remove('current');
  addQuestion.classList.remove('current');

  console.log(clicked.id);
  clicked.classList.add('current');
  console.log(clicked.classList);
}