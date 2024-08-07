let letters = [];

const maxLetters = 5;

let allRandomWords = "";

async function getRandomWord() {
    try {
        const response = await fetch('words.txt');
        const data = await response.text();
        const wordsArray = data.split('\n').filter(word => word.trim().length > 0);
        const randomIndex = Math.floor(Math.random() * wordsArray.length);
        const randomWord = wordsArray[randomIndex];
        allRandomWords = randomWord;
        return randomWord;
    } catch (error) {
        console.error('Error fetching the words:', error);
    }
}

let wordToGuess = null;


async function getAllWords(){
    try {
        const response = await fetch('allWords.txt');
        const data = await response.text();
        const wordsArray = data.split('\n').filter(word => word.trim().length > 0);
        for (let i=0; i<wordsArray.length; i++) {
            wordsArray[i] = wordsArray[i].toUpperCase().trim();
        }
        return wordsArray;
    } catch (error) {
        console.error('Error fetching the words:', error);
    }
}

let allWords;
getAllWords().then(wordsArray => {
    allWords = wordsArray;
});


getRandomWord().then(randomWord => {
    console.log('Random Word:', randomWord);
    wordToGuess = randomWord.toUpperCase();

    start();
});

let count = 0;

function handleInput(key) {
    console.log(`Key pressed: ${key}`);

    if(key == "Enter" && letters.length >= 5 && count < 6){

        let word = "";

        for(let i=0; i<letters.length; i++){
            word += letters[i];
        }

        //debugger;

        let rmd = allRandomWords.toLocaleUpperCase().trim();

        if(word == rmd){
            gameWon();
            //return;
        }

        //debugger;

        if(allWords.indexOf(word) == -1){
            console.log("no such word");
            let x = document.getElementById("allLetters");
            x.classList.remove('shake');
            void x.offsetWidth;
            x.classList.add('shake');
        }
        else{
            commitWord();
            count++
        }

    }
    else if(key == "Backspace" || key == '⌫'){
        letters.pop();
    }
    else{
        if(letters.length >= maxLetters){
            return;
        }
        if (key.length === 1 && key.match(/[a-zA-Z]/i)) {
            letters.push(key.toUpperCase());
        }
    }

    if(count >= 6){
        const correctWord = document.getElementById("displayCorrectWord");
        //correctWord.textContent = getRandomWord();

        //getRandomWord().then(randomWord => correctWord.textContent = randomWord);

        //debugger;

        correctWord.textContent = allRandomWords;

        /*
        getRandomWord().then(randomWord => {
            console.log('Random Word:', randomWord);
            wordToGuess = randomWord.toUpperCase();
        
            start();
        });
        */
    }

    displayWord();
}

document.addEventListener('keydown', function(event) {
    //console.log(`Key pressed: ${event.key}`);
    handleInput(event.key);
});

function displayWord(){
    console.log(letters);

    let allLetters = document.getElementById("allLetters")

    let content = "";

    for(let i = 0; i < letters.length; i++){
        content += `<div>${letters[i]}</div>`;
    }

    for(let i = 0; i < maxLetters - letters.length; i++){
        content += `<div></div>`;
    }
    
    allLetters.innerHTML = content;
    
}

function commitWord(){

    //debugger;

    let history = document.getElementById("history");

    let cls = "incorrect";

    let content = "";

    for(let i = 0; i < letters.length; i++){

        if(wordToGuess.indexOf(letters[i]) > -1){
            cls = "missplaced";
        }

        if(letters[i] == wordToGuess[i]){
            cls = "correct";
        }
        paintLetterKey(letters[i], cls);
        content += `<div class="${cls}">${letters[i]}</div>`;

        cls = "incorrect";
    }

    history.innerHTML += `<div class="word">${content}</div>`;

    letters = [];
}

function start() {
    let history = document.getElementById("history");
    history.innerHTML = "";

    displayWord();
}

var keys = document.querySelectorAll('.keyboard-row div');

function handleClick(e){
    handleInput(e.target.innerHTML);
}

keys.forEach(element => {
    element.addEventListener('click', handleClick);
});

function paintLetterKey(letter, cls){

    //debugger;

    const keys = document.querySelectorAll('.keyboard-row div');
    
    keys.forEach((key) => {
        if (letter == key.innerHTML) {
            key.classList.add(cls);
        }
    });

}

document.addEventListener('DOMContentLoaded', (event) => {
    const reloadButton = document.getElementById('reloadButton');
    
    reloadButton.addEventListener('click', () => {
        location.reload();
    });
});


function gameWon(){
    const popup = document.getElementById('popup');
    popup.classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", function() {
    
    var hintButton = document.getElementById("hintButton");

    // Add an event listener to the button
    hintButton.addEventListener("click", function() {
        
        alert(`The first letter of the word is ${allRandomWords[0].toUpperCase()} and the last is ${allRandomWords[allRandomWords.length - 1].toUpperCase()}`);
    });
});

