let random = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector('#subt');
const input = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrhi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');
let p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if(playGame){
  submit.addEventListener('click', function(e){
    e.preventDefault();
    const guess = parseInt(input.value);
    validGuess(guess);
  })
}
function validGuess(guess){
  if(isNaN(guess) || guess > 100 || guess < 1){
    alert("Please enter a valid number from 1 to 100 !");
  }else{
    prevGuess.push(guess);
    if(guess === random){
      displayMessage(`You won the game!`);
      endGame();
    }else if(numGuess == 10){
      displayGuess(guess);
      displayMessage(`[${random}] Game Over!`);
      endGame();
    }else if(guess > random){
      displayMessage('Number is too high');
    }else{
      displayMessage('Number is too low');
    }
    if(numGuess <= 10)
      displayGuess(guess);
  }
}

function displayGuess(guess){
  input.value = '';
  guessSlot.innerHTML += `${guess} `;
  remaining.innerHTML = `${10-numGuess}`;
  numGuess++;
}

function displayMessage(message){
  lowOrhi.innerHTML = `<h2>${message}<h2>`;
}

function endGame(){
  input.value = '';
  input.setAttribute('disabled','');
  p.classList.add('button');
  p.innerHTML = `<input type="submit" id="newGame" value="New Game" class="guessSubmit">`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}
function newGame(){
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function(e){
    random = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    lowOrhi.innerHTML = '';
    guessSlot.innerHTML = '';
    remaining.innerHTML = '10';
    input.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
  })
}