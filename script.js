//Game Variavles

let inputdir = {x: 0, y: 0};
const foodSound = new Audio('Assets/food.wav');
const bgSound = new Audio('Assets/bgmusic1.mp3');
const gameOverSound = new Audio('Assets/gameover.wav');
let speed = 10;
let score = 0;
let lastPaintTime = 0;

let snakeArr = [{x: 13, y: 15}];
let food = {x: 8, y: 12};  






 
//Game Functions
function main(currentTime){
    window.requestAnimationFrame(main);
    if((currentTime -lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}

function isCollide(snake){
    //if snake collide into itself
    for (let i = 1; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        } 
    }
    
    //if snake collide into walls
    if((snake[0].x >= 20 || snake[0].x <= 0) || (snake[0].y >= 20 || snake[0].y <=0)){
        return true;
    }
   
}

function gameEngine(){
    //1. Updating the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        bgSound.pause();
        inputdir = {x: 0, y: 0};
        snakeArr = [{x: 13, y: 15}];
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
        alert("Game Over. Press any key to play again..!");
        bgSound.play();
    }


    //If you have eaten the food, increament the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score+= 10;
        if(score>hiScoreVal){
            hiScoreVal = score;
            localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
            highScoreBox.innerHTML = "HiScore: " + hiScoreVal;
        }

        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y});
        let a = 1;
        let b = 19;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;

    //2. Display the snake and food

    //Displaying Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //Displaying food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}







//Main Logic Starts Here

let hiScore = localStorage.getItem('hiScore');
if(hiScore === null){
    hiScoreVal = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
}
else{
    hiScoreVal = JSON.parse(hiScore);
    highScoreBox.innerHTML = "HiScore: " + hiScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    bgSound.play();
    inputdir = {x: 0, y:1}; //start the game

    switch(e.key){
        case "ArrowUp":
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case "ArrowDown":
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case "ArrowLeft":
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case "ArrowRight":
            inputdir.x = 1;
            inputdir.y = 0;
            break;
    }
})