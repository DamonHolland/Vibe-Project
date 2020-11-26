(function printMessage () {
  const message = 'What came first, the chicken or the egg? Is the glass half full or half empty? Which are better, cats or dogs?';
  let index = 0;

  function typeChar () {
    if (index < message.length) {
      document.getElementById('typeQuestions').innerHTML += message.charAt(index++);
      console.log("yo");
      setTimeout(typeChar, 50);
    }
  }
  typeChar();
}());