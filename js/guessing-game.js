/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

const guessInput = document.getElementById('textbox');
const remainingGuessText = document.getElementById('rem-guesses');
const hintText = document.getElementById('hint-text');
const submitButton = document.getElementById('submit-button');
const playAgainButton = document.getElementById('Play-Again-button');
const hintButton = document.getElementById('Hint-button');
const ul = document.getElementById('prev-guess-list');
const body = document.getElementById('main-content');
let wonCalled = false;
let guessCounter = 5;
let randomNumber = Math.floor(Math.random() * (100 - 1) + 1);

submitButton.addEventListener('click', () => {
    if (guessInput.value === '' || !/^\d+$/.test(guessInput.value)) {
        guessInput.value = '';
        return }

    guessCheck(guessInput.value);
})

playAgainButton.addEventListener('click', () => {
    playAgain();
})

hintButton.addEventListener('click', () => {
    generateHint();
})


function guessCheck(guess) {

    Number(guess) < randomNumber ? hintArrow = '⬆' : hintArrow = '⬇';

    guessInput.value = '';

    if (Number(guess) === randomNumber || wonCalled) { 
        wonCalled = true;
        return won(); 
    }

    if (guessCounter < 2) {
        prevGuessAdd(guess);
        return lost();
    }
    console.log(guess)
    prevGuessAdd(guess);
    guessCounter -= 1;
    remainingGuessText.innerHTML = `${guessCounter} Guesses Remaining! ${hintArrow}`;
    
}

function prevGuessAdd(guess) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(guess));
    ul.appendChild(li);
}

function playAgain() {
    randomNumber = Math.floor(Math.random() * (100 - 1) + 1);
    guessCounter = 5;
    ul.innerHTML = '';
    remainingGuessText.innerHTML = 'Guess the number between 1-100! </br> 5 guesses remaining!'
    hintText.innerHTML = '';
    body.style.background = 'linear-gradient(to top, #4286f4, #373B44)';
    wonCalled = false;
}

function generateHint() {
    const newButton1 = document.createElement('button');
    const newButton2 = document.createElement('button');
    const newButton3 = document.createElement('button');
    const buttonArray = [newButton1, newButton2, newButton3];
    const hint = [randomNumber,
        Math.floor(Math.random() * (randomNumber - 1) + 1), 
        Math.floor(Math.random() * (100 - randomNumber) + 1)];
        hint.sort((a,b) => 0.5 - Math.random());

    if (hintText.innerHTML === '') {
        buttonArray.forEach((btn, i) => {
            hintText.appendChild(btn);
            buttonArray[i].setAttribute('id', `hintButton${i+1}`)
            buttonArray[i].innerHTML = '?';
        })
    }
    else { return }

    buttonArray.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            btn.innerHTML = hint[i];
        })
    })
    
}

function won() {
    body.style.background = 'linear-gradient(to bottom, #52B51D, #AEF390)';
    remainingGuessText.innerHTML = `You won! The number was ${randomNumber}`
}

function lost() {
    body.style.background = 'linear-gradient(to bottom, #C51228, #F37383)';
    remainingGuessText.innerHTML = `You lost! The number was ${randomNumber}`
}

