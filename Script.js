// game constant and variables
let inputDir= {x: 0 ,y: 0};
const moveSound =new Audio("move.mp3");
const foodSound =new Audio("food.mp3");
const gameOverSound =new Audio("gameover.mp3");
let speed =7;
let lastPaintTime =0;
let snakeArr =[{x: 13, y: 13}];
food ={x:6,y:7};
let score=0;
// game functions
// ctime means its a current time
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000<1/speed){
        return;
    }
       lastPaintTime=ctime;
       gameEngine();
}
function collide(snake){
     // if you bump into yourself
     for(let i=1;i<snake.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y=== snake[0].y){
            return true;
        }
     }
     // if snake bump into wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0 ){
        return true;
    }
}
function gameEngine(){
    // part1-->updating snake and food
    if(collide(snakeArr)){
        gameOverSound.play();
        inputDir={x: 0, y:0};
        alert("game Over:(press ctrl + r to refresh the game");
        snakeArr =[{x:13, y: 15}];
        score=0;
    }
    // if you have eaten the food , regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodSound.play();
        score+=10;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            Hiscorebox.innerHTML ="Hiscore: " + hiscoreval;
        }
            Scorebox.innerHTML ="score: " + score;
        snakeArr.unshift({x: snakeArr[0].x +inputDir.x ,y: snakeArr[0].y +inputDir.y});
        let a = 2,b=16;
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }

    // move the snake
    for (let i = snakeArr.length - 1; i > 0; i--) {
        snakeArr[i] = { ...snakeArr[i - 1] };
      }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    // part2--> display / render snake and food
    // display snake
    playArea.innerHTML ="";
   snakeArr.forEach((e,index)=>{
       snakeElement = document.createElement('div');
       snakeElement.style.gridRowStart = e.y;
       snakeElement.style.gridColumnStart = e.x;
   
   if(index===0){
     snakeElement.classList.add('head');
   }
   else{
    snakeElement.classList.add('snake');
   }
    playArea.appendChild(snakeElement);
  });

  // Display food 
  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  playArea.appendChild(foodElement);
}

//Main logic behind running the game
let hiscore = localStorage.getItem("hiscore");
if(hiscore===null){
    score=0;
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscore));
}
else{
    hiscoreval=JSON.parse(hiscore);
    Hiscorebox.innerHTML = "hiscore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
      switch (e.key) {
        case "ArrowUp":
            console.log("Arrow Up");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("Arrow Down");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("Arrow Left");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
        console.log("Arrow Right");
           inputDir.x=1;
           inputDir.y=0;
        break;

        default:
            break;
      }
})

