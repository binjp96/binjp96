let randomNumber = parseInt((Math.random()*100)+1);
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const startOver = document.querySelector('.resultParas');
const lowOrHi = document.querySelector('.lowOrHi');
const p = document.createElement('p');
let previousGuesses = [];
let numGuesses = 1;
let playGame = true;
let restartBtn=$('#restart')
restartBtn.hide()

if (playGame){
    subt.addEventListener('click', function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess){
    if (isNaN(guess)){
        alert('Please enter a valid number');
    } else if (guess < 1) {
        alert('Please enter a number greater than 1!');
    } else if (guess > 100){
        alert('Please enter a number less than 500!')
    } else {
        //試行された推測の数を記録します
        previousGuesses.push(guess);
        //ゲームが終了したかどうかを確認します。
        if (numGuesses === 11){
            displayGuesses(guess);
            displayMessage(`Game Over! Number was ${randomNumber}`);
            endGame();
        } else {
        //以前に推測された数値を表示する。
        displayGuesses(guess);
        //推測を確認し、間違っている場合は表示する。
        checkGuess(guess);
        }
    }
}

function checkGuess(guess){
    //推測が高すぎるか低すぎる場合に手がかりを表示する。
    if (guess === randomNumber){
        displayMessage(`You guessed correctly!`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Too low! Try again!`);
    } else if (guess > randomNumber) {
        displayMessage(`Too High! Try again!`);
    }
}

function displayGuesses(guess){
    restartBtn.show()
    userInput.value = '';
    guessSlot.innerHTML += `<span class="guess_div">${guess}  </span>`;
    numGuesses++
    remaining.innerHTML = `${11 - numGuesses}  `;
}

function displayMessage(message){
        lowOrHi.innerHTML = `<h1>${message}</h1>`
}

function endGame(){
    //ユーザー入力をクリアする。
    userInput.value = '';
    //ユーザー入力ボタンを無効にする。
    userInput.setAttribute('disabled', '');
    //新しいゲームの開始ボタンを表示する。
          p.classList.add('button');
          p.innerHTML = `<h1 id="newGame">Start New Game</h1>`
    startOver.appendChild(p);
    playGame = false;
    restartBtn.hide()
    newGame();
}

function newGame(){
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function(){
        //新しいランダムな番号を選ぶ。
        randomNumber = parseInt((Math.random()*100)+1);
        previousGuesses = [];
        numGuesses = 1;
        guessSlot.innerHTML = '';
        lowOrHi.innerHTML = '';
        remaining.innerHTML = `${11 - numGuesses}  `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    })
}

restartBtn.addEventListener('click', function(e){
        randomNumber = parseInt((Math.random()*100)+1);
        previousGuesses = [];
        numGuesses = 1;
        guessSlot.innerHTML = '';
        lowOrHi.innerHTML = '';
        remaining.innerHTML = `${11 - numGuesses}  `;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
        
});

