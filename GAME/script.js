//constants
const Started=0
const Ended=1

//html emenents
const playerSpan =document.getElementById('player')
const gametable=document.getElementById('game')

const game={
	state: Started,
	turn:'X',
	move:0
}

function endgame(winner) {
	if(winner)
		{
			alert('Game Over | Winner is'+ winner )
		}
		else{
			alert('Game Over | Draw')
		}
	game.state='Ended'
	if(game.state===Ended)
	{
		alert('Game Ended |Restart to Play Again')
		return
	}

}

function restart(){
	if(Math.random()>0.5)
		game.turn='O'
	else
		game.turn='X'

	game.state=Started
	move=0
	Array.from(document.getElementsByTagName('td')).forEach(cell =>{
		cell.textContent=''
	})

}
function nextTurn(){
	if(game.state===Ended)
		return
	game.move++
	if(game.turn=='X')
		game.turn='O'
	else
		game.turn='X'
	if(game.move==9){
		endgame()
	}
	playerSpan.textContent=game.turn
}

function isSeqCaptured(arrayof3cells){
	let winningcombo=game.turn+game.turn+game.turn
	if(arrayof3cells.map(i => i.textContent).join('')===winningcombo){
		endgame(game.turn)
	}
}

function isRowCaptured(row){
	let tableRow=Array.from(gametable.children[0].children[row-1].children) 
	isSeqCaptured(tableRow)
}

function isColCaptured(col){
	let tableCol=[
	gametable.children[0].children[0].children[col-1],
	gametable.children[0].children[1].children[col-1],
	gametable.children[0].children[2].children[col-1]
	]
	isSeqCaptured(tableCol)
}

function isDiagCaptured(row,col){
	if(row!==col && (row+col)!==4)
		return

	let diag1=[gametable.children[0].children[0].children[0],
	gametable.children[0].children[1].children[1],
	gametable.children[0].children[2].children[2]
	]
	let diag2=[gametable.children[0].children[0].children[2],
	gametable.children[0].children[1].children[1],
	gametable.children[0].children[2].children[0]
	]
	isSeqCaptured(diag1)
	isSeqCaptured(diag2)
}

function boxClicked(row,col){
	console.log('box clicked= ',row,col)
	let clickedBox=gametable.children[0].children[row-1].children[col-1]
	clickedBox.textContent=game.turn
	isRowCaptured(row)
	isColCaptured(col)
	isDiagCaptured(row,col)
	nextTurn()
}