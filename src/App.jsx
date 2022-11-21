// TODO Check diagonals and rows
// TODO Reset game
// TODO Scores across games
// TODO AI implementation

import { useState } from 'react'
import './App.css'
import Square from './Components/Square'

// Convert symbol index to symbol  
function getText(num) {
  if (num === 0) {
    return ""
  }
  if (num === 1) {
    return "x"
  }
  else {
    return "o"
  }
}

function WinnerDisplay({ winner }) {
  // Show the winner or announce that the game ended
  // in a draw.
  // If the game is still running, don't show anything.
  let text = "The player with " + getText(winner) + " won!";

  if (winner === -1) {
    text = "";
  }

  if (winner === 0) {
    text = "It's a draw!";
  }
  return <div>{text}</div>
}



export default function App() {
  const [gameState, setGameState] = useState(Array(9).fill(0))
  const [turn, setTurn] = useState(1)
  const squares = gameState.map(
    (v, i) => <Square text={getText(v)} key={i} callback={() => handleClick(i)}/>)
  
  function checkWinner() {
    // Check rows
    for(let y = 0; y < 3; y++) {
      let last = gameState[y * 3]
      let won = true
      for (let x = 1; x < 3; x++) {
        let current = gameState[x + y * 3]
        if (current !== last) {
          won = false
          break
        }
        last = current
      }
      if (won && last !== 0) return last
    }
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i] === 0) return -1
    }
    return 0
  }

  function handleClick(clickedIndex) {
    if (winner !== -1) return
    if (gameState[clickedIndex] === 0) {
      turn === 1 ? setTurn(2) : setTurn(1)
    }
    setGameState(gameState.map((v, i) => {
      
      if(i === clickedIndex && v === 0) {
        return turn
      }
      return v
    }))
  }
  
  const winner = checkWinner()
  
  return (
    <main>
      <div className="board" >
        {squares}
      </div>
      <WinnerDisplay winner={winner} />
    </main>
  );
}
