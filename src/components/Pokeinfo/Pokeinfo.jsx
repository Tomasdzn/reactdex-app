import { buildPokemonURLFromNumber } from '../../utils/misc';
import { useState, useEffect } from 'react';
import { Capitalize } from '../../utils/misc';
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';

import './Pokeinfo.css'

const Pokeinfo = ({ selectedPokemon }) => {
  const [pokemonData, setPokemonData] = useState({})
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fetchPokemonData = async () => {
      if (selectedPokemon === undefined) {
        setPokemonData({});
        return;
      }

      try {
        const pkmnUrl = buildPokemonURLFromNumber(selectedPokemon);
        const response = await axios.get(pkmnUrl);
        setPokemonData(response.data);
        setVisible(true)
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonData();
  }, [selectedPokemon]);

  const setInvisible = () => {
    setVisible(false)
  }

  return (
    visible ? 

    <div className='pokeinfo-container'>
      <div className='pokeinfo-button'>
        <div className='separator1'>
          <div className='pokeinfo-title'>
            <h2>{Capitalize(pokemonData.name)}</h2>
            <span>Id {pokemonData.id}</span>
          </div>
        </div>
        <div className='separator2' onClick={setInvisible}>
          <RxCross1 />
        </div>
      </div>

      <img src={pokemonData.sprites.front_default} alt="front-sprite" />
      
      <div className='more-info'>
        <div className='more-info-type'>
          <h3>Type</h3>
          {pokemonData.types.map((ty, index) => (
            <p key={index}>{Capitalize(ty.type.name)}</p>
          ))}
        </div>

        <div className='more-info-passives'>
          <h3>Abilities</h3>
          {pokemonData.abilities.map((ab, index) => (
            <p key={index}>{Capitalize(ab.ability.name)}</p>
          ))}
          
        </div>

        <div className='more-info-shiny'>
          <h3>Shiny</h3>
          <img src={pokemonData.sprites.front_shiny} alt="sprite-shiny" />
        </div>
      </div>

      <div className='more-info-stats'>
      {pokemonData.stats.map((st, index) => (
        <>
          {index > 0 && <br />} {/* Renderiza <br> solo si el índice es mayor que 0 */}
          <b>{Capitalize(st.stat.name)}: </b>
          <span>{st.base_stat}</span>
        </>
      ))}


        </div>
    </div>

    :

    <div className='pokeinfo-container'>
      <h1>No pokemon selected</h1>
    </div> 
  )
}

export default Pokeinfo
