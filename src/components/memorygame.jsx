import { useEffect,useState } from 'react'
import '../styles/memorygame.css'

function Game() {
  const [score, setScore] = useState(0)
  const [characterOrder, setCharacterOrder] = useState(0);
  const test = "Hey!"
  
  function changeScore(){
    setScore(score +1 );
  }
  function changeOrder() {
    setCharacterOrder(); // order 
  }

  return (
    <>
      <div>
      <button onClick={changeScore}>score is {score}</button>
      </div>
    </>
  )
}

export default Game