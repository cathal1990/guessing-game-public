const game = new Game();
const guessInput = document.getElementById('textbox');
const remainingGuessText = document.getElementById('rem-guesses');
const hintText = document.getElementById('hint-text');
const submitButton = document.getElementById('submit-button');
const playAgainButton = document.getElementById('Play-Again-button');
const hintButton = document.getElementById('Hint-button');
const ul = document.getElementById('prev-guess-list');
const body = document.getElementById('main-content');
let wonCalled = 0;

class Game {
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = 0;
    }

    difference() {
        return Math.abs(this.playersGuess - this.winningNumber);
    }

    isLower() {
        return this.playersGuess < this.winningNumber ? true : false;
    }

    checkGuess() {
        if (this.playersGuess === this.winningNumber) { return won();}
        if (this.pastGuesses.includes(this.playersGuess)) {
            return 'You have already guessed that number.'}
        
        this.pastGuesses.push(this.playersGuess);

        if (this.pastGuesses.length === 5) { return 'You Lose.'}
        
        if (this.difference() < 10) { return 'You\'re burning up!'};
        if (this.difference() < 25) { return 'You\'re lukewarm.'};
        if (this.difference() < 50) { return 'You\'re a bit chilly.'};
        if (this.difference() < 100) { return 'You\'re ice cold!'};

    }

    playersGuessSubmission(num) {
        if (num < 1 || num > 100 || isNaN(num)) {
            throw 'That is an invalid guess.'
        }

        this.playersGuess = num;
        
        return this.checkGuess();
    }

    provideHint() {
        const arr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
        shuffle(arr);
        return arr
    }

    playAgain() {
    this.pastGuesses = [];
    this.playersGuess = null;
    this.winningNumber = generateWinningNumber();
    ul.innerHTML = '';
    remainingGuessText.innerHTML = 'Guess the number between 1-100! </br> 5 guesses remaining!'
    hintText.innerHTML = '';
    body.style.background = 'linear-gradient(to top, #4286f4, #373B44)';
}
    
}

function newGame() {
        return new Game;
}

function generateWinningNumber() {
    return Math.ceil(Math.random() * 100);
}

function shuffle(arr) {
    let n = arr.length;
    while (n) {
        i = Math.floor(Math.random() * n--);
        temp = arr[n];
        arr[n] = arr[i];
        arr[i] = temp;
    }
    return arr;
}