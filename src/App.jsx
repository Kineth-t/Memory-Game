import { useState, useEffect } from 'react'
import './App.css'
import Card from './Components/Card'

function App() {
  const [points, setPoints] = useState(0)
  const [selected, setSelected] = useState([])
  const [highestPoints, setHighestPoints] = useState(0)
  const [pokemons, setPokemons] = useState([])

   useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        // Generate 20 random IDs (Pokémon IDs go up to 1010+)
        const randomIds = Array.from({ length: 24 }, () => 
          Math.floor(Math.random() * 1000) + 1
        );

        // Fetch all Pokémon concurrently
        const promises = randomIds.map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          return response.json();
        });

        const results = await Promise.all(promises);
        setPokemons(results);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchRandomPokemon();
  }, []);

  return (
    <>
      <h1>Pokemon Memory Game</h1>
      <div className='introduction'>Start the game by selecting a card. To gain a point, select a card you have not select.</div>
      <div className='pointsContainer'>
        <div className='currentPoint'>Current Points: {points}</div>
        <div className='recordPoint'>Highest Points: {highestPoints}</div>
      </div>
      <div className='cardsContainer'>
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} img={pokemon.sprites.other['official-artwork'].front_default} name={pokemon.name}/>
        ))}
      </div>
    </>
  )
}

export default App
