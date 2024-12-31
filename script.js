let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-bt");
let turnO = true;
let gameOver = false;
let count = 0;
let newGamebtn = document.querySelector("#new-bt");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let btns = document.querySelectorAll(".button");
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];
btns.forEach((button) => {
    button.addEventListener("mouseover", () => {
        button.style.border = "2px solid white";
        button.style.backgroundColor = "#4d908e";
        button.style.transition = "border 0.1s ease-out ,color 0.1s ease,opacity 0.5s easeout"
    });
    button.addEventListener("mouseout", () => {
        button.style.border = "none";

    });
})


boxes.forEach((box) => {
    box.addEventListener("mouseover", () =>{
        if(box.innerText == ""){
            box.style.border = "2px solid white"
            
        }
    });
    box.addEventListener("mouseout", () => {
        box.style.border = "none";
    });
    box.addEventListener("click", () =>{
        if(gameOver) return;
        if(turnO){
            box.innerText = "O";
            box.style.color = "#4d908e";
            turnO = false;

        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();

        if(count == 9 && !isWinner){
            gameDraw();
        }
    });
});
const gameDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    gameOver = true;
    disableBoxes();
}
const resetGame = () => {
    count = 0;
    turnO = true;
    gameOver = false
    enableBoxes(); 
    msgContainer.classList.add("hide");

}
const disableBoxes = () => {
    for(box of boxes){
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`
    msgContainer.classList.remove("hide");

}
const checkWinner = () => {
    for(let pattern of winPatterns){
    
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
            showWinner(pos1Val);
            disableBoxes();
            gameOver = true;
            return;

            }
        }
    }
    };
newGamebtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click", resetGame); 




