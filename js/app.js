
// varible
let openCard = [];
let allCards=[];
let time=0;
let isTimerOff=true;
let timer=0;
let moves=0;

//Elements in a variable
const start=document.getElementById("start");
const restart=document.querySelector("#restart");
const exit=document.querySelector(".exit");
const displayTime=document.getElementById("timer");
const victory_DisplayTime=document.querySelector("#victory-time");
const victory_DisplayMoves=document.querySelector("#victory-movesNo");
const displayMoves=document.querySelector("#moves");
const firstHeart=document.getElementById("firstHeart");
const secondHeart=document.getElementById("secondHeart");
const heartOne=document.getElementById("heartOne");
const heartTwo=document.getElementById("heartTwo");
const selectedCard=document.querySelector("#deck")



//functions
//use this function to start the timer
const startTimer=()=>{
    isTimerOff=false;
    timer= setInterval(()=>{
        time++;
        updateTimer();
    },1000)
}

//this function update the timer values

const updateTimer=()=>{

    const min=Math.floor(time/60);
    const sec=time%60;

    if(sec<10){
        displayTime.innerHTML= `${min}:0${sec}`
    }
    else{
        displayTime.innerHTML=`${min}:${sec}`
    }
}

function push(card){
    openCard.push(card);
}
function checkForVictory(card1,card2){
    allCards.push(openCard[0].children[0]);
    allCards.push(openCard[1].children[0]);

        setTimeout(function(){
            if(allCards.length==16){
                document.querySelector(".pop-up").classList.add("vis");
                stopTimer()
                victoryTime()
                victoryMoves()
            }
        },500)
}

function stopTimer(){
    clearInterval(timer);
    isTimerOff=true;
}
function victoryTime(){
    const min=Math.floor(time/60);
    const sec=time%60;

    if(sec<10){
        victory_DisplayTime.innerHTML= `You finished the game in ${min}:0${sec}`
    }
    else{
        victory_DisplayTime.innerHTML=`${min}:${sec}`
    }
}
function victoryMoves(){
    victory_DisplayMoves.innerHTML= `${moves} moves`
    if(moves>=16){
        heartOne.classList.add("inv")
    }
    if(moves>=24){
        heartOne.classList.add("inv")
        heartTwo.classList.add("inv")
    }
}

function updateMoves(){
    moves++
    displayMoves.innerHTML= `${moves} moves`
    if(moves>=16){
        firstHeart.classList.add("inv")
    }
    if(moves>=24){
        firstHeart.classList.add("inv")
        secondHeart.classList.add("inv")
    }
}

function checkMatch(){
    if(openCard[0].children[0].className == openCard[1].children[0].className){

        openCard[0].classList.add("match");
        openCard[1].classList.add("match");
        
        checkForVictory(openCard[0],openCard[1])
        openCard = [];

    }

    else{
    
        setTimeout(function RemoveOpen(){
            openCard[0].classList.remove("open");
            openCard[1].classList.remove("open");
            openCard = [];
    
        },500)
    }
}

function validClick(card){
if( card.classList.contains("card")&&!card.classList.contains("match")&&!openCard.includes(card)&&openCard.length <2)
return true;
else
return false;

}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}





// event listeners

selectedCard.addEventListener("click",function(event){

    if(isTimerOff){
        startTimer();
    }
    if(validClick(event.target)){
        event.target.classList.add("open");
        push(event.target);

        if(openCard.length==2){
            updateMoves()
            checkMatch()
            
        }
    }
})

exit.addEventListener("click",() => {
    
        document.querySelector(".pop-up").classList.remove("vis");
        allCards=[]
        resetTime()
        resetCards()
        resetMoves()
    })
///here
function resetTime(){
    clearInterval(timer);
    isTimerOff=true;
    time=0;
    updateTimer();
}
function resetCards(){
    for(let card of selectedCard.children){
        card.classList.remove("match","open")
    }
}
function resetMoves(){
    moves=0
    displayMoves.innerHTML= `${moves} moves`
    firstHeart.classList.remove("inv")
    secondHeart.classList.remove("inv")
}
    restart.addEventListener("click",()=>{   
        allCards=[]
        resetTime()
        resetCards()
        resetMoves()
    });