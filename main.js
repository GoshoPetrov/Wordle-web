let letters = [];

const maxLetters = 5;

const wordToGuess = "STAIR";

start();

let count = 0;

function handleInput(key) {
    console.log(`Key pressed: ${key}`);

    if(key == "Enter" && letters.length >= 5 && count < 6){
        commitWord();
        count++
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
        content += `<div class="${cls}">${letters[i]}</div>`;
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
