import './Wrapper.css'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group';

import Pokelist from '../Pokelist/Pokelist'
import Form from '../Form/Form'
import Alert from '../Alert/Alert';

const Wrapper = ({ passSelectedPokemon }) => {
  const [pokemons, setPokemons] = useState([]);
  const [originalPokemons, setOriginalPokemons] = useState([])
  const [alert, setAlert] = useState({})

  const [warningFound, setWarningFound] = useState(false)
  const [errorFound, setErrorFound] = useState(false)

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=494');
        setPokemons(response.data.results);
        setOriginalPokemons(response.data.results);
      } catch (error) {
        const alert = {
          text: "Error fetching pokemons",
          error: true
        }

        setErrorFound(true)

        setTimeout(() => {
          setErrorFound(false)
        }, 6000);

        setAlert(alert)
      }
    };

    fetchPokemons();
  }, []);

  const handleClick = (text) => {
    const pokemonBuscado = pokemons.find(p => p.name.toLowerCase() === text.toLowerCase());

    if (pokemonBuscado) {
      setPokemons([pokemonBuscado]);
    } else if (text!="" && !pokemonBuscado) {
      const alert = {
        text: "No results were found.",
        error: false
      }

      setAlert(alert)
      setWarningFound(true)

      setTimeout(() => {
        setWarningFound(false)
      }, 3000);

      setPokemons(originalPokemons);
    } else if (text=="") {
      setPokemons(originalPokemons);
    }
  }

  const handleGetSelectedTypes = (selectedTypes) => {
    setSelectedTypes(selectedTypes)


  }

  return (
    <div>
      <CSSTransition in={errorFound} classNames="alert" timeout={300} unmountOnExit>
        <Alert
          text={alert.text}
          error={true}
        />
      </CSSTransition>

      <CSSTransition in={warningFound} classNames="alert" timeout={300} unmountOnExit>
        <Alert
          text={alert.text}
          error={false}
        />
      </CSSTransition>

      <Form 
        handleClick={handleClick}
      />

      <Pokelist 
        pokemonList={pokemons}
        passSelectedPokemon={passSelectedPokemon}
      />
    </div>
  )
}

export default Wrapper
