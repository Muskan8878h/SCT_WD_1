const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById("startBtn");

const box = 20;
let snake, direction, food, score, gameOver, gameInterval;

document.addEventListener("keydown", directionControl);

    function initGame(){
        snake = [{x: 9*box, y: 10*box}];
        direction = "RIGHT";
        food = {x: Math.floor(Math.random()*20)*box, y: Math.floor(Math.random()*20)*box};
        score = 0;
        gameOver = false;
    }

    function startGame() {
        initGame();
        startBtn.style.display = "none"; // hide button
        if(gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(draw, 150);
    }

    startBtn.addEventListener("click", startGame);

    function directionControl(event){
        if(event.keyCode === 37 && direction != "RIGHT") direction = "LEFT";
        if(event.keyCode === 38 && direction != "DOWN") direction = "UP";
        if(event.keyCode === 39 && direction != "LEFT") direction = "RIGHT";
        if(event.keyCode === 40 && direction != "UP") direction = "DOWN";
    }

    function draw(){
        if(gameOver) return;

        ctx.fillStyle = "#fff";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        for(let i=0;i<snake.length;i++){
        ctx.fillStyle = (i===0)?"rgba(67, 246, 240, 0.8)":"rgba(25, 166, 161, 0.8)";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle = "#fff";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
        }

        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if(direction === "LEFT") snakeX -= box;
        if(direction === "UP") snakeY -= box;
        if(direction === "RIGHT") snakeX += box;
        if(direction === "DOWN") snakeY += box;

        if(snakeX === food.x && snakeY === food.y){
        score++;
        food = {x: Math.floor(Math.random()*20)*box, y: Math.floor(Math.random()*20)*box};
        } else {
        snake.pop();
        }

        const newHead = {x: snakeX, y: snakeY};

        if(snakeX<0 || snakeX>=canvas.width || snakeY<0 || snakeY>=canvas.height || collision(newHead,snake)){
        gameOver = true;
        clearInterval(gameInterval);
        setTimeout(() => {
            alert("Game Over! Score: "+score);
            startBtn.style.display = "inline-block"; // show button again
        }, 100);
        }

        snake.unshift(newHead);
    }

    function collision(head,array){
        for(let i=0;i<array.length;i++){
        if(head.x === array[i].x && head.y === array[i].y){
            return true;
        }
    }
    return false;
}
