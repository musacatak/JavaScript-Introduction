const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const start = document.querySelector('#start');

let result = 0;
let currentTime = 60;
let timerId = null;
function randomSquare() {
    if(start.value == 1){
    squares.forEach(square => {
        square.classList.remove('mole');
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');

    hitPosition = randomSquare.id;}
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(square.id == hitPosition){
            result++;
            score.textContent = result;
            hitPosition = null;
        }    
    })
})

function moveMole() {
    
        timerId = setInterval(randomSquare, 500);

        

    start.addEventListener('click', startStop)

}

randomSquare();
moveMole();

function countDown() {
    if(start.value == 1){
        currentTime -= 0.1;
        timeLeft.textContent=currentTime.toFixed(1);
        if(currentTime <= 0){
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert('GAME OVER! Your final score is' + " " + score.textContent)
    }
    }
    
}

function startStop() {
    
    if(start.value == 1){
        start.value =0;
        console.log(start.value)
    }
    else{
        start.value =1
        console.log(start.value)
    }
    
}

let countDownTimerId = setInterval(countDown, 100);
