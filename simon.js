let gameSeq = [];
let userSeq = [];
let high_score = [0];
let btns = ["yellow", "red", "purple", "green"];
var emoji = String.fromCodePoint(0x1f60a);

let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keydown", function () {
    if (started === false) {
        started = true;
        levelUp();
    }
});

function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;

    //random button choose
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
};

function gameFlash(btn) {
    btn.classList.add("gameflash");
    setTimeout(function () {
        btn.classList.remove("gameflash");
    }, 250);
};

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(function () {
                levelUp();
            }, 800)
            userSeq = [];
        }
    }
    else {
        high_score.push(level);
        console.log(high_score);
        let body = document.querySelector("body");
        let max_score = Math.max(...high_score);

        //body red
        body.classList.add("wrong");
        setTimeout(function () {
            body.classList.remove("wrong");
        }, 1000);

        //display score
        h2.innerHTML = `Game Over! Your score was <b style = "color:blue">${level}</b> ${emoji} <br/>Press any key to Restart Game`;
        h3.innerHTML = `Your highest score is <b style = "color:blue">${max_score}</b>`;
        started = false;
        level = 0;
        userSeq = [];
        gameSeq = [];
    }
}


function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
};

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
    btn.addEventListener("click", function () {
        let btn = this;
        userFlash(btn);
    })
}