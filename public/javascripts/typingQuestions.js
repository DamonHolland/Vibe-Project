(function printMessage () {
  const NUM_TYPED_MESSAGES = 3;
  const SECOND = 2;
  const THIRD = 3;
  const FOURTH = 4;
  const FIRST_MESSAGE = '"Is the glass half full or half empty?"';
  const SECOND_MESSAGE = '"Which are better, cats or dogs?"';
  const THIRD_MESSAGE = '"Yanny or Laurel?"';
  const LAST_MESSAGE = "Finally settle the argument. Share your opinions. Put your finger on the pulse of the public's opinion. Get feedback on issues you care about.";
  const FIRST_DIV = document.getElementById('typeQuestion1');
  const SECOND_DIV = document.getElementById('typeQuestion2');
  const THIRD_DIV = document.getElementById('typeQuestion3');
  const LAST_DIV = document.getElementById('hook');
  let index = 0;
  let numMessages = 1;
  let currentDiv = FIRST_DIV;
  let currentMessage = FIRST_MESSAGE;
  
  function typeChar () {
    if (index === currentMessage.length && numMessages < NUM_TYPED_MESSAGES) {
      index = 0;
      numMessages++;

      if (numMessages === SECOND) {
        currentDiv = SECOND_DIV;
        currentMessage = SECOND_MESSAGE;
      }

      if (numMessages === THIRD) {
        currentDiv = THIRD_DIV;
        currentMessage = THIRD_MESSAGE;
      }
    }

    if (index < currentMessage.length) {
      currentDiv.innerHTML += currentMessage.charAt(index++);
      setTimeout(typeChar, 75);
    }
    else if (index === currentMessage.length && numMessages < FOURTH) {
      numMessages++;
      currentDiv = LAST_DIV;
      currentDiv.innerHTML += LAST_MESSAGE;
    }
  }
  typeChar();
}());