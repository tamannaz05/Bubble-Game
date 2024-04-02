var timer = 30;
var score = 0;
var hitNum = 0;
var timerRunning = false;
var winSound = new Audio('mixkit-quick-win-video-game-notification-269.wav');
var oopsSound = new Audio('mixkit-click-error-1110.wav');
const helpButton = document.getElementById('help-button');
const helpMenu = document.getElementById('help-menu');
const navbar = document.getElementById('navbar');


function playWinSound(){
    winSound.play();
}

function playOopsSound(){
    oopsSound.play();
}

function increaseScore()
{
    score += 10;
    document.querySelector("#scoreValue").textContent = score;
}

function getNewHit()
{
    hitNum = Math.floor(Math.random()*10);
    document.querySelector("#hitValue").textContent = hitNum;
}

function makeBubble()
{
    var clutter = "";
    for(var i=1 ; i<1000 ; i++)
    {
        var rn = Math.floor(Math.random()*10);
        clutter += `<div class="bubble">${rn}</div>`
    }
    document.querySelector("#pbottom").innerHTML = clutter;
}

function displayResetButton() {
    var resetButton = document.createElement("button");
    resetButton.setAttribute("type", "button");
    resetButton.setAttribute("id", "resetButtonId");
    resetButton.textContent = "Reset";

    // Insert the reset button below the "GAME OVER" heading
    var gameOverHeading = document.querySelector("#pbottom h1");
    gameOverHeading.insertAdjacentElement('afterend', resetButton);

    resetButton.addEventListener("click", () => {
        timer = 30;
        score = 0;
        hitNum = 0;
        makeBubble();
        getNewHit();
        document.querySelector("#timerValue").textContent = timer; // Reset timer display
        document.querySelector("#scoreValue").textContent = score; // Reset score display
        document.querySelector("#hitValue").textContent = hitNum; // Reset hit value display
        document.getElementById("resetButtonId").remove(); // Remove the reset button
    });
}

function runTimer() 
{
    timerRunning = true;
    var timeStorer = setInterval(() => {
        if (timer > 0) 
        {
            timer--;
            document.querySelector("#timerValue").textContent = timer;
        } 
        else 
        {
            clearInterval(timeStorer);
            timerRunning = false; // Reset timerRunning when timer reaches 0
            document.querySelector("#pbottom").innerHTML = `<h1> GAME OVER </h1>`;
            displayResetButton();
        }
    }, 1000);
}
helpButton.addEventListener('click', () => {
    if (navbar.style.width === '100%') {
        navbar.style.width = '40%';
    } 
    else 
    {
        navbar.style.width = '90%';
    }
    helpMenu.style.display = 'block';
    setTimeout(() => {
        helpMenu.style.height = '40%';
    }, 100);
});

helpMenu.addEventListener('click', (event) => {
    if (event.target === helpMenu) {
        navbar.style.width = '100%';
        helpMenu.style.height = '0';
        setTimeout(() => {
            helpMenu.style.display = 'none';
        }, 500);
    }
});

makeBubble();
getNewHit();

document.querySelector("#pbottom").addEventListener("click", function(event) {
    // Start the timer only if it's not already running and the clicked element is a bubble
    if (!timerRunning && event.target.classList.contains('bubble')) {
        runTimer();
    }
});
document.querySelector("#pbottom").addEventListener("click",(details)=>{
    var clickedNum = Number(details.target.textContent);
    if(hitNum === clickedNum)
    {
        increaseScore();
        makeBubble();
        getNewHit();
        playWinSound();
    }
    else
    {
        playOopsSound();
    }
});