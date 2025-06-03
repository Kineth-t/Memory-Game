import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Card from './Components/Card'
import Start from './Components/Start'

  let backgroundMusic = null;

function App() {
  const [loading, setLoading] = useState(true)
  const [justStarted, setJustStarted] = useState(true)
  const [points, setPoints] = useState(0)
  const [selected, setSelected] = useState([])
  const [highestPoints, setHighestPoints] = useState(0)
  const [pokemons, setPokemons] = useState([])
  const [musicMuted, setMusicMuted] = useState(false);

   useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        setLoading(true)

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
      finally {
        setLoading(false)
      }
    };

    fetchRandomPokemon();
  }, []);

    // Shuffle function using Fisher-Yates algorithm
  const shuffle = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleSelect = (pokemonId) => {
    // Use functional updates to avoid stale state
    setSelected(prevSelected => {
      const isAlreadySelected = prevSelected.includes(pokemonId);
      
      if (isAlreadySelected) {
        // Game over - update high score and reset
        setPoints(prevPoints => {
          setHighestPoints(prevHigh => Math.max(prevHigh, prevPoints));
          return 0;
        });
        return [];
      } else {
        // Add to selected and increase points
        setPoints(prevPoints => prevPoints + 1);
        return [...prevSelected, pokemonId];
      }
    });
    
    // Shuffle the cards after click
    setPokemons(prevPokemons => shuffle(prevPokemons));
  };

  const startGame = () => {
    // Go to the game page
    setJustStarted(false)

    // Only initialise and play once, loop when finished
    if (!backgroundMusic) {
      backgroundMusic = new Audio('/Assets/pallet-town-theme.mp3')
      backgroundMusic.loop = true
      backgroundMusic.volume = 0.5
    }

    if (!musicMuted) {
        backgroundMusic.play().catch((err) => {
          console.error('Failed to play audio:', err);
        });
      }
  }

  const toggleMusic = () => {
    const newMutedSetting = !musicMuted
    setMusicMuted(newMutedSetting);

      if (backgroundMusic) {
        if (newMutedSetting) {
          backgroundMusic.pause();
        } else {
          backgroundMusic.play().catch((err) => {
            console.error('Failed to play audio:', err);
          });
        }
      }

      return newMutedSetting;
  };


  if (loading) {
    return (
      <div className="loading-container">
        <h1>Pokémon Memory Game</h1>
        <div className="loadingText">Catching Pokémons...</div>
        <div className="loading">
          <img src="/Assets/pokeball.png" alt="Pokeball loading logo" className='pokeball'/>
          <div className='shadow'></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1>Pokémon Memory Game</h1>
      {justStarted ? <Start onClick={startGame}/> : <>
      <button className="muteButton" onClick={toggleMusic}>
        {musicMuted ? '🔇' : '🔊'}
      </button>
      <div className='pointsContainer'>
        <div className='currentPoint'>Current Points: {points}</div>
        <div className='recordPoint'>Highest Points: {highestPoints}</div>
      </div>
      <div className='cardsContainer'>
        {pokemons.map((pokemon) => (
          <Card 
          key={pokemon.id} 
          img={pokemon.sprites.other['official-artwork'].front_default} 
          name={pokemon.name}
          onClick={() => handleSelect(pokemon.id)}/>
        ))}
      </div>
    </>}
  </>)
}

export default App
