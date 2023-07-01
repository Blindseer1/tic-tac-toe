let gameBoard=(()=>{
    let gameSquares=['X','0', 'X','0', 'X','0', 'X','0', ];
    const boardCreate=(parent)=>{
        for(let i=0;i<9;i++)
        {
            let square=document.createElement('div');
            square.dataset.index=`${i}`;
            square.classList.add('square');
            parent.appendChild(square)
        }
       
    }
 
 

    return  { boardCreate,gameSquares };
})();
let htmlBoard=document.querySelector('.board');

gameBoard.boardCreate(htmlBoard);
console.log(document.querySelectorAll('.square'))




let game=true;

const GameFlow=(()=>
{
    
const Player=(playerName,playerMarker)=>
{
    let getMarker=()=>playerMarker;
    const getName=()=>playerName;
    return {getMarker,getName};
};

let player1=Player('firstPlayer','X' );
let player2=Player('secondPlayer','0' );

let activePlayer=player1;
let round=0;
document.querySelectorAll('.square').forEach(cell=>cell.addEventListener('click',
function eventHandler()
{
   console.log(gameBoard.gameSquares) 
   console.log(cell.dataset.index)
  
   
    if(cell.innerHTML==""&& activePlayer==player1)
    {
        cell.innerHTML=player1.getMarker();
        gameBoard.gameSquares[cell.dataset.index]=player1.getMarker();
        console.log('p1 turn');
        activePlayer=player2;
        round++
        console.log(round)
    }
    else if(cell.innerHTML==""&& activePlayer==player2)
    {
        cell.innerHTML=player2.getMarker();
        gameBoard.gameSquares[cell.dataset.index]=player2.getMarker();
        activePlayer=player1;
        console.log('p2 turn')
        round++
        console.log(round)

    }
   
   

}))



const playRound=()=>
{
    let activePlayer=player1;
    if(activePlayer==player1)
    {
        gameBoard.gameSquares.push(player1.getMarker());
        console.log(player1.getMarker())
    }

    
   
}
return{playRound}


})();
