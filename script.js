let result=document.querySelector('.result');
let htmlBoard=document.querySelector('.board');
const start=document.querySelector('.start')
let turn=document.querySelector('.turn');
let firstScore=document.querySelector('#firstPScore')
let secondScore=document.querySelector('#secondPScore')


let gameSquares=[];


let gameBoard=(()=>{
   
    const boardCreate=(parent)=>{
        for(let i=0;i<9;i++)
        {
            let square=document.createElement('div');
            square.dataset.index=`${i}`;
            square.classList.add('square');
            parent.appendChild(square)
        }
       
    }
 
    return  { boardCreate };
})();


function markerArray(i)
{
    gameSquares[i]=GameFlow.getActivePlayer().getMarker();
}




gameBoard.boardCreate(htmlBoard);
console.log(document.querySelectorAll('.square'))


const Player=(playerName,playerMarker,number)=>
{
let newName=playerName;
    let getMarker=()=>playerMarker;
  
    const changeName=(name)=>{
        newName=name;
    }
    const getName=()=>newName;
    const getNumber=()=>number;
    return {getMarker,getName,getNumber,changeName};
};

let player1=Player('firstPlayer','X' ,'1');
let player2=Player('secondPlayer','0' ,'2');



const GameFlow=(()=>
{
    let game=false;
    let roundCount=0;
    let round;
    let winner;

let activePlayer;

let getGameState=()=>game;

const gameOver=()=>
{
    game=false;
    winner=getActivePlayer().getName()
    if(winner)
    {
        if(getActivePlayer().getNumber()=='1')
    {
       firstScore.textContent=+firstScore.textContent+1;
    }
    else  if(getActivePlayer().getNumber()=='2')
    {
       secondScore.textContent=+secondScore.textContent+1;
    }
    result.innerHTML=`Player ${winner} won this round`;
    }
    
    roundCount++
 
    gameSquares=[];
    document.querySelectorAll('.square').forEach(item=>item.innerHTML="")
    if(roundCount==3)
    {
        result.innerHTML=`Player ${winner} won this set`;
    }
}



//start a new round
const playRound=()=>{
    game=true;
    round=0;
    activePlayer=player1;  
    turn.textContent=`It is ${getActivePlayer().getName()}'s turn`;
    result.textContent=''
    console.log(gameSquares)
   
}

const checkWin=()=>
{
    if(gameSquares[0]!=undefined 
        && 
        gameSquares[4]==gameSquares[8]
        &&
        gameSquares[4]==gameSquares[0])
    {
        gameOver()
       
    }else  if(gameSquares[2]!=undefined && gameSquares[4]==gameSquares[6] &&gameSquares[6]==gameSquares[2])
    {
        gameOver()
    }else if(gameSquares[0]!=undefined&& gameSquares[3]==gameSquares[6] && gameSquares[6]==gameSquares[0])
    {
        gameOver()
    }else if(gameSquares[1]!=undefined && gameSquares[4]==gameSquares[7] && gameSquares[7]==gameSquares[1])
    {
        gameOver()
    }else if(gameSquares[2]!=undefined && gameSquares[5]==gameSquares[8] &&gameSquares[8]==gameSquares[2])
    {
        gameOver()
    }else   if(gameSquares[0]!=undefined && gameSquares[1]==gameSquares[2] &&gameSquares[1]==gameSquares[0])
    {
        gameOver()
    }else  if(gameSquares[3]!=undefined && gameSquares[4]==gameSquares[5] &&gameSquares[4]==gameSquares[3])
    {
        gameOver()
    }else if(gameSquares[6]!=undefined && gameSquares[7]==gameSquares[8] && gameSquares[7]==gameSquares[6])
    {
        gameOver()
    }
}


const getActivePlayer=()=>activePlayer;
const switchTurns=()=>
{
    console.log(getActivePlayer().getName())
  
    round++
    if(round>=5 && round<9)
    {
        checkWin()
    }
    else
    if(round==9)
    {
       if(!checkWin())
       {
        result.innerHTML=`It's a draw this round`;
        firstScore.textContent=+firstScore.textContent+1;
        secondScore.textContent=+secondScore.textContent+1;
        roundCount++
        console.log(roundCount)
        game=false;
        gameSquares=[];
        document.querySelectorAll('.square').forEach(item=>item.innerHTML="")
       } 
        
    }
    winner=activePlayer.getName();
    activePlayer==player1 ? activePlayer=player2: activePlayer=player1;
    console.log('round number is '+ round)
   
    turn.textContent=`It is ${getActivePlayer().getName()}'s turn`;
}
//game over 







return{playRound,gameOver,getGameState,getActivePlayer,switchTurns}


})();

start.addEventListener('click',function ()
{
        let firstPlayerInput=document.querySelector('#player1Input')
        let secondPlayerInput=document.querySelector('#player2Input')
        player1.changeName(firstPlayerInput.value);
        player2.changeName(secondPlayerInput.value);
    GameFlow.playRound()
   

document.querySelectorAll('.square').forEach(item=>item.addEventListener('click',function()
{
    let game=GameFlow.getGameState();
    let cellIndex=item.dataset.index;
    if(game==true)
    {
        let activePlayer=GameFlow.getActivePlayer();
        if(+activePlayer.getNumber()==1 && item.innerHTML=="")
        {
            item.innerHTML=activePlayer.getMarker();
            markerArray(cellIndex)
            GameFlow.switchTurns()
            console.log(gameSquares)
           
        }
        else  if(+activePlayer.getNumber()==2 && item.innerHTML=="")
        {
            item.innerHTML=activePlayer.getMarker();
            markerArray(cellIndex)
            GameFlow.switchTurns()
            console.log(gameSquares)

        }
    }
}))
  
})
    

   



    


