const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score');
const leftButton = document.querySelector('#left');
const rightButton = document.querySelector('#right');
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 600;
const boardHeight = 300;

const userWidth = 100;
const userHeight = 20;
const userStart = [230, 10];
let userCurrentPosition = userStart;

const ballStart = [230, 40];
let ballCurrentPosition = ballStart;

let timerId
let xDirection = 2;
let yDirection = 2;
let score = 0;

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),

    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 240),

    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
    new Block(120, 210),
    new Block(10, 210)
]

console.log(blocks[0]);

function addBlock() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);

    }
}

addBlock();

const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

function drawUser() {
    user.style.left = userCurrentPosition[0] + 'px';
    user.style.bottom = userCurrentPosition[1] + 'px';
    //aaaaaaaawwwwwwaconsole.log(userCurrentPosition);

}
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';

}

function moveUser(e) {
    switch (e.key) {
        case 'a':
            if (userCurrentPosition[0] > 0) {
                userCurrentPosition[0] -= 10;
                drawUser();
            }
            break;
        case 'd':
            if (userCurrentPosition[0] < 600 - blockWidth) {
                userCurrentPosition[0] += 10;
                drawUser();
            }
            break;
    }
}

document.addEventListener('keydown', moveUser);

leftButton.addEventListener('mousedown', event => {
    if (userCurrentPosition[0] > 0) {
        userCurrentPosition[0] -= 10;
        drawUser();
    }
})
rightButton.addEventListener('mousedown', event => {
    if (userCurrentPosition[0] < 600 - blockWidth) {
        userCurrentPosition[0] += 10
        drawUser();
    }

})


const ball = document.createElement('div');
ball.classList.add('ball');
console.log(ballCurrentPosition)
drawBall();
console.log(ball.style.left + ball.style.bottom)
grid.appendChild(ball);

function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkCollisions();

}

timerId = setInterval(moveBall, 30);

function checkCollisions() {
    //border
    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
        (ballCurrentPosition[0] <= 0) || ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
        (ballCurrentPosition[1] <= 0)) {
        changeDirection();
    }

    //user
    if ((ballCurrentPosition[0] >= userCurrentPosition[0] &&
        ballCurrentPosition[0] <= userCurrentPosition[0] + userWidth) &&

        (ballCurrentPosition[1] >= userCurrentPosition[1] &&
            ballCurrentPosition[1] <= userCurrentPosition[1] + userHeight)) {
        changeDirection();

    }
    //blocks
    for (let i = 0; i < blocks.length; i++) {
        if (ballCurrentPosition[0] >= blocks[i].bottomLeft[0] &&
            ballCurrentPosition[0] <= blocks[i].bottomRight[0] &&

            ((ballCurrentPosition[1] + ballDiameter) >= blocks[i].bottomLeft[1] &&
                ballCurrentPosition[1] <= blocks[i].topLeft[1])
        ) {
            console.log('hit');
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);
            changeDirection();
            score++;
            scoreDisplay.innerHTML = score;
        }
    }
    //gameover
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You Lost!';
        document.removeEventListener('keydown', moveUser);
    }

    if (blocks.length === 0) {
        scoreDisplay.innerHTML = ('You Won!')
        clearInterval(timerId)
        document.removeEventListener('keydown')
    }
}





function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection *= -1;
        return;
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection *= -1;
        return;
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection *= -1;
        return;
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection *= -1;
        return;
    }
}
