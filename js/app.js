
// varible
let openCard = [];
let allCards=[];
let time=0;
let isTimerOff=true;
let timer=0;

//Elements in a variable
const start=document.getElementById("start");
const restart=document.querySelector("#restart");
const exit=document.querySelector(".exit");
const displayTime=document.getElementById("timer");
const displayVictoryTime=document.querySelector("#victory-time");
const SelectedCard=document.querySelector("#deck")



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
function CheckForVictory(card1,card2){
    allCards.push(openCard[0].children[0]);
    allCards.push(openCard[1].children[0]);

        setTimeout(function(){
            if(allCards.length==16){
                document.querySelector(".pop-up").classList.add("vis");
                clearInterval(timer);
                isTimerOff=true;
                victoryTime()
                console.log(allCards[0].children[0])
                for(let i=0;i<16;i++){
                    allCards[i].children[0].className.remove("match");
                    allCards[i].children[0].classList.remove("open");

                }
            }
        },500)
}

function victoryTime(){
    const min=Math.floor(time/60);
    const sec=time%60;

    if(sec<10){
        displayVictoryTime.innerHTML= `You finished the game in ${min}:0${sec}`
    }
    else{
        displayVictoryTime.innerHTML=`${min}:${sec}`
    }
}

function checkMatch(){
    if(openCard[0].children[0].className == openCard[1].children[0].className){

        openCard[0].classList.add("match");
        openCard[1].classList.add("match");
        
        CheckForVictory(openCard[0],openCard[1])
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

SelectedCard.addEventListener("click",function(event){

    if(isTimerOff){
        startTimer();
    }
    if(validClick(event.target)){
        event.target.classList.add("open");
        push(event.target);
        if(openCard.length==2){
            
            checkMatch()
            
        }
    }
})

exit.addEventListener("click",() => {
    
        document.querySelector(".pop-up").classList.remove("vis");
        clearInterval(timer);
        isTimerOff=true;
        time=0;
        updateTimer();
    })
///here
    restart.addEventListener("click",()=>{        
        clearInterval(timer);
        isTimerOff=true;
        time=0;
        updateTimer();

    });