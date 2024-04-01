var timer = 60;
var score = 0;
var hitNum = 0;

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
    for(var i=1 ; i<134 ; i++)
    {
        var rn = Math.floor(Math.random()*10);
        clutter += `<div class="bubble">${rn}</div>`
    }
    document.querySelector("#pbottom").innerHTML = clutter;
}

function runTimer()
{
    var timeStorer = setInterval(() => {
        if(timer > 0)
        {
            timer--;
            document.querySelector("#timerValue").textContent = timer;
        }
        else
        {
            clearInterval(timeStorer);
            document.querySelector("#pbottom").innerHTML = `<h1> GAME OVER </h1>`;
        }
    },1000);
}

makeBubble();
runTimer();
getNewHit();

document.querySelector("#pbottom").addEventListener("click",(details)=>{
    var clickedNum = Number(details.target.textContent);
    if(hitNum === clickedNum)
    {
        increaseScore();
        makeBubble();
        getNewHit();
    }
});