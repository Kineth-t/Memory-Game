import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [points, setPoints] = useState(0)
  const [highestPoints, setHighestPoints] = useState(0)

  

  return (
    <>
      <h1>Pokemon Memory Game</h1>
      <div className='introduction'>Start the game by selecting a card. To gain a point, select a card you have not select.</div>
      <div className='pointsContainer'>
        <div className='currentPoint'>Current Points: {points}</div>
        <div className='recordPoint'>Highest Points: {highestPoints}</div>
      </div>
      <div className='cardsContainer'>

      </div>
    </>
  )
}

export default App
