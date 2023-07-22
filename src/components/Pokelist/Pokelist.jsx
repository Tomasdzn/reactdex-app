import React, { useState, useEffect } from 'react';
import './Pokelist.css';
import axios from 'axios';
import { Capitalize, getPokemonNumberFromURL, buildPokemonURLFromNumber } from '../../utils/misc';
import Card from '../Card/Card';

const Pokelist = ({ pokemonList, passSelectedPokemon }) => {
  const [pokemonImages, setPokemonImages] = useState({});
  const [selectedPokemon, setSelectedPokemon] = useState()

  useEffect(() => {
    const fetchSprites = async () => {
      const imagePromises = pokemonList.map(pk => {
        const pokemonNumber = getPokemonNumberFromURL(pk.url);
        const pokemonURL = buildPokemonURLFromNumber(pokemonNumber);
        return axios.get(pokemonURL)
          .then(response => {
            if (response.data && response.data.sprites && response.data.sprites.front_default) {
              const frontDefaultSprite = response.data.sprites.front_default;
              return { [pokemonNumber]: frontDefaultSprite };
            } else {
              console.log(`No se encontró la propiedad 'front_default' en el objeto 'sprites' para el pokémon número ${pokemonNumber}.`);
              return { [pokemonNumber]: null };
            }
          })
          .catch(error => {
            console.error(`Error al cargar la imagen para el pokémon número ${pokemonNumber}: ${error}`);
            return { [pokemonNumber]: null };
          });
      });

      const images = await Promise.all(imagePromises);
      const imageMap = images.reduce((acc, image) => ({ ...acc, ...image }), {});
      setPokemonImages(imageMap);
    };

    fetchSprites();
  }, [pokemonList]);

  const fetchPokemonTypes = async (url) => {
    try {
      const typesArray = await getPokemonTypesFromURL(url);
      return typesArray;
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; // Make sure to return a default value in case of an error.
    }
  }

  const getPokemonTypesFromURL = (url) => {
    return axios
      .get(url)
      .then(response => {
        const typesArray = response.data.types.map(typeInfo => typeInfo.type.name);
        return typesArray
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        return [];
      });
  }

  return (
    <div className='pokelist-container'>
      {pokemonList.map(pk => (
        <Card
          name={Capitalize(pk.name)}
          key={getPokemonNumberFromURL(pk.url)}
          value={getPokemonNumberFromURL(pk.url)}
          imgURL={pokemonImages[getPokemonNumberFromURL(pk.url)]}
          fetchPokemonTypes={() => fetchPokemonTypes(pk.url)}
          passSelectedPokemon={passSelectedPokemon}
        />
      ))}
    </div>
  );

};

export default Pokelist;